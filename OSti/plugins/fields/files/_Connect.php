<?php
  	function Connect(){
		//$servername = $_SERVER['HTTP_HOST'];
		$servername = "localhost";
		$username = "OSTI-pmv";
		$password = "osti@pmv";
		$GLOBALS['dbname'] = "PMV_OSTI_PMV";
		$GLOBALS['table'] = $GLOBALS['dbname'].".glpi_tickets";
		return new mysqli($servername, $username, $password, $GLOBALS['dbname']);
	}
?> 