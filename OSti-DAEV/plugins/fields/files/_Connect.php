<?php
  	function Connect(){
		//$servername = $_SERVER['HTTP_HOST'];
		$servername = "localhost";
		$username = "glpi";
		$password = "tipmv2018";
		$GLOBALS['dbname'] = "osti_daev";
		$GLOBALS['table'] = $GLOBALS['dbname'].".glpi_tickets";
		return new mysqli($servername, $username, $password, $GLOBALS['dbname']);
	}
?>