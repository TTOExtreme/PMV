<?php
	$GLOBALS['colh'] = "#276859";
	$GLOBALS['colht'] = "#ffffff";
	$GLOBALS['col1'] = "#00b88d";
	$GLOBALS['col2'] = "#279178";

	$GLOBALS['pri1'] = "#5eabc7";
	$GLOBALS['pri2'] = "#54d99b";
	$GLOBALS['pri3'] = "#f5ee6e";
	$GLOBALS['pri4'] = "#ff9d3b";
	$GLOBALS['pri5'] = "#ff4c4f";
	$GLOBALS['pri6'] = "#000000";

	$GLOBALS['pri1t'] = "#000000";
	$GLOBALS['pri2t'] = "#000000";
	$GLOBALS['pri3t'] = "#000000";
	$GLOBALS['pri4t'] = "#000000";
	$GLOBALS['pri5t'] = "#000000";
	$GLOBALS['pri6t'] = "#ffffff";

	$GLOBALS['CC'] = true;

	include '_Connect.php';
	//echo "<html><head><meta http-equiv='refresh' content='5;URL=http://192.168.0.23/OSti/Call/index.php'></head><body onload='launchFullScreen(document.getElementById(\"tb\"));' id='tb'>";
	LoadScript();
	LoadCss();
	Update();
	header("content-type: text/html; charset=UTF-8");  

	$GLOBALS['maxint'] = 8;

	function Update(){
		$DB = Connect();
		pushLastFinish();
		echo "<table style='width:100%; background-color:".$GLOBALS['colh']."; color:".$GLOBALS['colht']."'>";
		echo "
			<tr><td class='td0'style='width:80px;'><center><b>Nº OS: {$row['id']}</td>
			<td class='td0'style='width:220px;'><center><b><u>Data:</td>
			<td class='td0'style='width:220px;'><center><b><u>Responsável:</td>
			<td class='td0'style='width:220px;'><center><b><u>Emissor:</td>
			<td class='td0'style='width:220px;'><center><b><u>Prioridade:</td>
			<td class='td0'style='width:220px;'><center><b><u>Localização:</td></tr>";
			pushPriory(6);
			pushPriory(5);
			pushPriory(4);
			pushPriory(3);
			pushPriory(2);
			pushPriory(1);
		echo "</table></br></body></html>";
	}

	function pushPriory($id){
		$DB = Connect();
		$query = "SELECT * FROM ". $GLOBALS['dbname']. ".glpi_tickets WHERE status!=6 and priority=".$id." ORDER BY id DESC;";
		$DB->query("set character_set_results='utf8';");
		$result = $DB->query($query);
		if ($result->num_rows > 0) {
			$i = 4;
			$row = $result->fetch_assoc();
			while($row = $result->fetch_assoc()) {
				//echo "<script>console.log( 'Debug Objects: " . $row['content'] . "' );</script>";
				if($GLOBALS['CC']){
					$GLOBALS['CC'] = false;
					echo "<table style='width:100%; background-color:".$GLOBALS['col1'].";'>
					<tr><td rowspan='2' style='width:80px; font-size:28pt;background-color:".$GLOBALS['col2'].";'><center><b>{$row['id']}</b></td>";
				
					echo "
						<td class='td1' style='width:220px;max-width:220px;background-color:#e6e6fa;'><center>{$row['date_creation']}</td>
						<td class='td1' style='width:220px;max-width:220px;background-color:#e6e6fa;'><center>".GetTech($row['id'])."</td>
						<td class='td1' style='width:220px;max-width:220px;background-color:#e6e6fa;'><center>".GetUser($row['users_id_recipient'])."</td>
						<td class='td1 class_".$row['priority']."'style='width:220px;max-width:220px;'><center><b>".GetPriority($row['priority'])."</td>
						<td class='td1' style='width:220px;max-width:220px;background-color:#e6e6fa;'><center>".GetLocation(GetUserLoc($row['users_id_recipient']))."</td></tr>
						<tr><td class='td1' colspan='5' style='background-color:".$GLOBALS['col2']."; color:#e6e6fa'><b style='margin-left:10px; color:#fff'>Problema:</b> {$row['content']}</td></tr>
						</table>";

				}else{
					$GLOBALS['CC'] = true;
					echo "<table style='width:100%; background-color:".$GLOBALS['col2'].";'>
					<tr><td rowspan='2' style='width:80px; font-size:28pt;background-color:".$GLOBALS['col1'].";'><center><b>{$row['id']}</b></td>";
				
					echo "
						<td class='td2' style='width:220px;max-width:220px;background-color:#e6e6fa;'><center>{$row['date_creation']}</td>
						<td class='td2' style='width:220px;max-width:220px;background-color:#e6e6fa;'><center>".GetTech($row['id'])."</td>
						<td class='td2' style='width:220px;max-width:220px;background-color:#e6e6fa;'><center>".GetUser($row['users_id_recipient'])."</td>
						<td class='td2 class_".$row['priority']."'style='width:220px;max-width:220px;'><center><b>".GetPriority($row['priority'])."</td>
						<td class='td2' style='width:220px;max-width:220px;background-color:#e6e6fa;'><center>".GetLocation(GetUserLoc($row['users_id_recipient']))."</td></tr>
						<tr><td class='td2' colspan='5' style='background-color:".$GLOBALS['col1']."; color:#fff'><b style='margin-left:10px;color:#fff''>Problema:</b> {$row['content']}</td></tr>
						</table>";
				}
				$i--;
				$GLOBALS['maxint'] = $GLOBALS['maxint'] -1;
				if($i==0 || $GLOBALS['maxint'] == 0){break;}
			}
		} 
	}

	function pushLastFinish(){
		$DB = Connect();
		$query = "SELECT * FROM " . $GLOBALS['dbname'] . ".glpi_tickets WHERE status=6 ORDER BY id DESC;";
		$result = $DB->query($query);
		if ($result->num_rows > 0) {
			$i = 1;
			$row = $result->fetch_assoc();
			while($row = $result->fetch_assoc()) {
				if($GLOBALS['CC']){
					$GLOBALS['CC'] = false;
					echo "<table style='width:100%; background-color:".$GLOBALS['col1'].";'>";
				}else{
					$GLOBALS['CC'] = true;
					echo "<table style='width:100%; background-color:".$GLOBALS['col2'].";'>";
				}
				echo "
					<tr><td rowspan='2' style='width:50px;'><center><b>{$row['id']}</b></td>
					<td>{$row['date_creation']}</td>
					<td>".GetTech($row['id'])."</td>
					<td>".GetUser($row['users_id_recipient'])."</td>
					<td>".GetPriority($row['priority'])."</td>
					<td>".GetLocation(GetUserLoc($row['users_id_recipient']))."</td></tr>
					<tr><td colspan='5' style='padding-left:10px;'>Problema: {$row['content']}</td></tr>
					</table>";
				$i--;
				if($i==0){break;}
			}
		} 
	}

	function GetLocation($_id){
		$DB = Connect();
		$query = "SELECT * FROM " . $GLOBALS['dbname'] . ".glpi_locations WHERE id='".$_id."';";
		$result = $DB->query($query);
		if ($result->num_rows > 0) {
			while($row = $result->fetch_assoc()) {
				return $row['name'];
			}
		}
	}
	function GetUser($_id){
		$DB = Connect();
		$query = "SELECT * FROM " . $GLOBALS['dbname'] . ".glpi_users WHERE id='".$_id."';";
		$result = $DB->query($query);
		if ($result->num_rows > 0) {
			while($row = $result->fetch_assoc()) {
				if($row['firstname']!=""){
					return $row['firstname']." ".$row['realname'];
				}else{
					return $row['name'];
				}
			}
		}
	}
	function GetUserLoc($_id){
		$DB = Connect();
		$query = "SELECT * FROM " . $GLOBALS['dbname'] . ".glpi_users WHERE id='".$_id."';";
		$result = $DB->query($query);
		if ($result->num_rows > 0) {
			while($row = $result->fetch_assoc()) {
				return $row['locations_id'];
			}
		}
	}
	function GetTech($_id){
		$DB = Connect();
		$query = "SELECT * FROM " . $GLOBALS['dbname'] . ".glpi_tickets_users WHERE tickets_id='".$_id."' AND type='2';";
		$result = $DB->query($query);
		//print_r($result);
		if ($result->num_rows > 0) {
			while($row = $result->fetch_assoc()) {
				return GetUser($row['users_id']);
			}
		}
	}
	function GetPriority($_id){
		$arr = array("","Muito Baixa","Baixa","Média","Alta","Muito Alta","Crítica");
		return $arr[$_id];
	}
	function LoadCss(){
		echo"
		<style type='text/css'>
			body{
				font-family:calibri;
				max-heigth:100%;
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
			}
			tr{
				margin: 0px;
				padding:0px;
				border: 0px;
			}
			td{
				width:11vw;
				height:35px;
				margin: 2px;
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
			}
			table{
				margin: 0px;
				padding:2px;
				margin-bottom:5px;
				font-size: 21pt;
			}

			.td0{
				border: solid 1px #a9abae; 
			}
			.td1{
				border: solid 2px ". $GLOBALS['col1']."; 
			}
			.td2{
				border: solid 2px ".$GLOBALS['col2']."; 
			}
			
			.class_6{
				background-color:".$GLOBALS['pri6'].";
				color:".$GLOBALS['pri6t'].";
			}
			.class_5{
				background-color:".$GLOBALS['pri5'].";
				color:".$GLOBALS['pri5t'].";
			}
			.class_4{
				background-color:".$GLOBALS['pri4'].";
				color:".$GLOBALS['pri4t'].";
			}
			.class_3{
				background-color:".$GLOBALS['pri3'].";
				color:".$GLOBALS['pri3t'].";
			}
			.class_2{
				background-color:".$GLOBALS['pri2'].";
				color:".$GLOBALS['pri2t'].";
			}
			.class_1{
				background-color:".$GLOBALS['pri1'].";
				color:".$GLOBALS['pri1t'].";
			}

		</style>
		";
	}

	function LoadScript(){
		echo "
		<script>
		function launchFullScreen(element) {
			if(element.requestFullScreen) {
			  element.requestFullScreen();
			} else if(element.mozRequestFullScreen) {
			  element.mozRequestFullScreen();
			} else if(element.webkitRequestFullScreen) {
			  element.webkitRequestFullScreen();
			}
		}
		</script>
		";
	}

?>