if($_GET["type"]=="cumulative"){
        $usa_historical_data = json_decode(file_get_contents("https://corona.lmao.ninja/v2/historical/usa"));
        $usa_timeline = $usa_historical_data->timeline;
        $usa_cases = $usa_timeline->cases;
        $usa_deaths = $usa_timeline->deaths;

        $uk_historical_data = json_decode(file_get_contents("https://corona.lmao.ninja/v2/historical/uk"));
        $uk_timeline = $uk_historical_data->timeline;
        $uk_cases = $uk_timeline->cases;
        $uk_deaths = $uk_timeline->deaths;

        $array['cols'][] = array("label"=>"Date", "type"=>"date");
        $array['cols'][] = array("label"=>"USA deaths", "type"=>"number");
        $array['cols'][] = array("label"=>"UK deaths", "type"=>"number");
        foreach($uk_deaths as $date=>$count){
            if ($count > 0)
                $date_formatted = 'Date(' . date("Y", strtotime($date)) . ', ' . (((int)date("m", strtotime($date)))-1) . ', ' . date("d", strtotime($date)) . ')' ;
                $array['rows'][] = array('c' => array( array('v' => $date_formatted), array('v' => $usa_deaths->$date,), array('v' => $uk_deaths->$date,)));
        }
        unset($date);
        unset($count);
        echo json_encode($array);
    }
