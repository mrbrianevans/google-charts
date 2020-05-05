function drawCharts() {
    let xhttps = new XMLHttpRequest();
    xhttps.open("GET", "https://brianevans.tech/coronavirus/historical.php?type=cumulative", false);
    xhttps.send();
    let data = JSON.parse(xhttps.response);
    var datatable = new google.visualization.DataTable(data);

    var details = {"title": "Cumulative Deaths",
        width:document.getElementsByClassName("singlebox").width,
        height:window.innerHeight,
        hAxis: {
            format: 'd'
        },
        animation: {
            startup: true,
            duration: 8000,
            easing: 'out',
        }
    };
    var graph = new google.visualization.ColumnChart(document.getElementById("deathsgraph"));
    graph.draw(datatable, details);
}

google.charts.load('current', {'packages': ['corechart']});
google.charts.setOnLoadCallback(drawCharts);
