<?php
$dbhost="120.77.38.66:3306";//host
$dbuser='demonist';//username
$dbpass='008691';//password
$conn=mysqli_connect($dbhost,$dbuser,$dbpass,$dbuser);
$show="SELECT * FROM fruit_score";
if(!$conn){
    die("Shit!");
}
$retval=mysqli_query($conn,$show);
if(!$retval){
    die("Fuck!");
}
echo "Success!";
mysqli_close($conn);