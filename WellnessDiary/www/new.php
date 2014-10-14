<?php
     inlcude_once('db.php');
	 
	 $Snack = $_Post['Snack'];
	 $Time = $_Post['Time'];
	 
     if mysql_query(insert into user VALUES('$Snack','$Time'))
	   echo"Successfully added";
	 else
	   echo"Add Failed";
	   
?>