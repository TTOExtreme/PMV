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
				echo "<form target='frame-print'>";
				echo "<input style='display:none' type='text' name='id' value='{$_id}'>";
				echo "<button class='input' type='submit' formaction='http://".$_SERVER['HTTP_HOST']."/OSti/plugins/fields/files/print_page.php?id={$_id}'>Imprimir</button>";
				echo "</form>";

				echo "<iframe name='frame-print' src='http://".$_SERVER['HTTP_HOST']."/OSti-DAEV/plugins/fields/files/print_visu.php?id={$_id}'></iframe>";
				
				
			}
		}
	}

	function LoadCss(){
		echo"
		<style type='text/css'>
			iframe{
				border: none;
				width:100%;
				height:80vh; 
			}

		</style>
		";
	}

?>
