<?php
  	function Connect(){
		//$servername = $_SERVER['HTTP_HOST'];
		$servername = "localhost";
		$username = "glpi";
		$password = "tipmv2018";
		$GLOBALS['dbname'] = "osti_edu";
		$GLOBALS['table'] = $dbname.".glpi_tickets";
		return new mysqli($servername, $username, $password, $GLOBALS['dbname']);
	}
?>