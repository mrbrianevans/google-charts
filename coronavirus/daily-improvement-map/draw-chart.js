    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if(xhttp.readyState===4){
            const data = JSON.parse(this.response);
            var newCasesDatatable = google.visualization.arrayToDataTable([
                [{label:'State', type:'string'},   {label:'Average days of decline in new cases', type:'number'}]
            ]);
            for (var state in data){
                newCasesDatatable.addRow([state, (data[state])]);
            }

            var options = {
                region: 'US',
                resolution: 'provinces',
                displayMode: 'regions',
                colorAxis: {colors: ['#f54e42', '#66f542']},
                backgroundColor: "#03a9fc",
                defaultColor: "#fc03e8",
                datalessRegionColor: "#3b3b3b"
            };

            var map = new google.visualization.GeoChart(document.getElementById("chart-div"));
            map.draw(newCasesDatatable, options);
        }
    };
    xhttp.open("GET", "coronavirus/daily-improvement-map/data-processing.php?daily-cases-improvement=true", true);
    xhttp.send();
