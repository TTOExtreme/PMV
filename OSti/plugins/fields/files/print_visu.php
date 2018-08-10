<?php

	if (empty($_GET["id"])) {
		$_GET["id"] = "";
	}
	include '_Connect.php';

	$DB = Connect();
	if(!empty($DB)){
		LoadCss();
		GetPageId($_GET["id"]);
	}

	function GetPageId($_id){
		$DB = Connect();
		$query = "SELECT * FROM ".$GLOBALS['table']." WHERE id='".$_id."';";
		$result = $DB->query($query);
		if ($result->num_rows > 0) {
			while($row = $result->fetch_assoc()) {
				echo "<table style='max-width:480px; width:480px;'>";
				echo "<tr><td colspan='3'>Numero da OS: {$row['id']}</td></tr>";
				echo "<tr><td colspan='3'>Encarregado: ".GetTech($row['id'])."</td></tr>";
				echo "<tr><td colspan='3'>Data de emissão: {$row['date_creation']}</td></tr>";
				echo "<tr><td colspan='3'>Emissor: ".GetUser($row['users_id_recipient'])."</td></tr>";
				echo "<tr><td colspan='3'>Problema: {$row['content']}</td></tr>";
				echo "<tr><td>Urgencia: {$row['urgency']}</td>";
				echo "<td>Impacto: {$row['impact']}</td>";
				echo "<td>Prioridade: {$row['priority']}</td></tr>";
				echo "<tr><td colspan='3'>Localizaçao: ".GetLocation(GetUserLoc($row['users_id_recipient']))."</td></tr>";
				echo "</table></br>";
				
				
			}
		}
	}

	function GetLocation($_id){
		$DB = Connect();
		$query = "SELECT * FROM ".$GLOBALS['dbname'].".glpi_locations WHERE id='".$_id."';";
		$result = $DB->query($query);
		if ($result->num_rows > 0) {
			while($row = $result->fetch_assoc()) {
				return $row['name'];
			}
		}
	}
	function GetUser($_id){
		$DB = Connect();
		$query = "SELECT * FROM ".$GLOBALS['dbname'].".glpi_users WHERE id='".$_id."';";
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
		$query = "SELECT * FROM ".$GLOBALS['dbname'].".glpi_tickets_users WHERE tickets_id='".$_id."' AND type='2';";
		$result = $DB->query($query);
		//print_r($result);
		if ($result->num_rows > 0) {
			while($row = $result->fetch_assoc()) {
				return GetUser($row['users_id']);
			}
		}
	}
	function LoadCss(){
		echo"
		<style type='text/css'>
			td,table{
				border: solid 1px black; 
			}

		</style>
		";
	}

?>
