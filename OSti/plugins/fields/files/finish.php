<?php

	if (empty($_GET["id"])) {
		$_GET["id"] = "";
	}
	include '_Connect.php';

	$DB = Connect();
		LoadCss();
	if(!empty($DB) && empty($_GET["solve"]) && empty($_GET["_id"])){
		GetPageId($_GET["id"]);
	}else{
		if(!empty($_GET["solve"]) && !empty($_GET["_id"])){
			Solve($_GET["_id"]);
		}else{
			echo "Preencha todos os campos";
		}
	}

	function GetPageId($_id){
		$DB = Connect();
		$query = "SELECT * FROM ".$GLOBALS['table']." WHERE id='".$_id."';";
		$result = $DB->query($query);
		if ($result->num_rows > 0) {
			while($row = $result->fetch_assoc()) {
				echo "<center><form method='get' target='returnframe'><table style='max-width:480px; width:480px;'>";
				echo "<tr style='display:none'><td><input type='text' name='_id' value='{$_id}'></td></tr>";
				echo "<tr><td><textarea class='input' type='text' name='solve' placeholder='Solução:'></textarea></td></tr>";
				echo "<tr><td><button class='input' type='submit' formaction='http://{$_SERVER['HTTP_HOST']}/OSti/plugins/fields/files/finish.php'>Salvar</button>";
				echo "</table></form></center>";
				echo "<iframe name='returnframe' style='border:none;'></iframe>";//<iframe name="returnframe" style="display: none;"></iframe>
			}
		}
	}

	function Solve($_id){
		$DB = Connect();
		//UPDATE $table SET `ranking` = `ranking`-1 WHERE plugin_fields_containers_id = {$_POST['container_id']}
		$query = "UPDATE ".$GLOBALS['table']." SET solution='".$_GET['solve']."' WHERE id='".$_id."';";
		$result = $DB->query($query);
		//print_r($result);
		$query = "UPDATE ".$GLOBALS['table']." SET status='6' WHERE id='".$_id."';";
		$result = $DB->query($query);

		$query = "UPDATE ".$GLOBALS['table']." SET closedate=CURRENT_TIME() WHERE id='".$_id."';";
		$result = $DB->query($query);
		$query = "UPDATE ".$GLOBALS['table']." SET solvedate=CURRENT_TIME() WHERE id='".$_id."';";
		$result = $DB->query($query);
		print_r($result);
	}

	function LoadCss(){
		echo"
		<style type='text/css'>
			td,table{
				border: solid 1px black; 
			}
			.input{
				width:100%;
			}

		</style>
		";
	}

?>
