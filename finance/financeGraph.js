google.charts.load('current', {'packages': ['corechart']});
google.charts.setOnLoadCallback(graph);
function graph() {
    let FileLocation = "sampleFileLocation";
    let url = "https://www.server.com/file.php?getData=" + FileLocation;
    var fileRequest = new XMLHttpRequest();
    var datatable = new google.visualization.DataTable();
    var details = {
        "title": "Financial graph",
        height: 500,
        isStacked: true,
        legend: {
            position: "top"
        },
        vAxis: {
            format: "percent" // this is changed later if needed
        },
        areaOpacity: 0.7,
        backgroundColor: {fill: "antiquewhite"}, // add this for a border: , stroke: "black", strokeWidth: 2
        series: {},
        selectionMode: "single",
        tooltip: {trigger: "selection"}, // you have to click for a tooltip to show
        focusTarget: "category" // it will show all series values for that date
    };
    var series = {};
    var columnIndices = [];
    datatable.addColumn("date", "Date");
    fileRequest.onreadystatechange = function () {
        if (this.status === 200 && this.readyState === 4) {
            var data = JSON.parse(this.response);
            for (column in data[Object.keys(data)[0]]) {
                columnIndex = datatable.addColumn("number", column);
                columnIndices.push(columnIndex);
                // this is optional:
                let colourRequest = new XMLHttpRequest();
                let colourURL = "https://www.server.com/file.php?colour="+column; // get the color of a particular stock
                colourRequest.open("GET", colourURL, false);
                colourRequest.send();
                let colorCode = colourRequest.response;
                if(colorCode.length > 1){
                    series[columnIndex-1] = {"color": colorCode}; 
                }else{
                    series[columnIndex-1] = {};
                }
            }
            details.series = series;
            datatable.addRows(Object.keys(data).length); // add the required number of empty rows
            let row = 0;
            for (let day in data) {
                let column = 0;
                for (let property in data[day]) {
                    datatable.setCell(row, ++column, data[day][property]); 
                }
                datatable.setCell(row++, 0, new Date(day));
            }
            // if there is only one series, it formats as a percentage, and if there are multiple, it formats as currency
            if(columnIndices.length===1){
                let percentFormatter = new google.visualization.NumberFormat({pattern: "#,###.##%"});
                percentFormatter.format(datatable, 1);
            }else{
                let dollarFormatter = new google.visualization.NumberFormat({pattern: "$#,###.##"});
                details.vAxis.format = "currency";
                for (let i = 1; i <= columnIndices.length; i++) {
                    dollarFormatter.format(datatable, i);
                }
            }
            //draw the graph
            var graph = new google.visualization.SteppedAreaChart(document.getElementById('portfolioGraph'));
            graph.draw(datatable, details);
        }
    };
    fileRequest.open("GET", url, true);
    fileRequest.send();


}
