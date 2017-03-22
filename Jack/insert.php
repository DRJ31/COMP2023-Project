<?php
$dbhost='';//host
$dbuser='';//username
$dbpass='';//password
$conn=mysqli_connect($dbhost,$dbuser,$dbpass);
if(!$conn){
    die('Could not connect: '.mysqli_error($conn));
}
$username="Google";
$score=233;
$insertdata="INSERT INTO fruit_score".
            "(username, score, date, time)".
            "VALUES".
            "('$username','$score',NOW(),NOW())";
mysqli_select_db($conn,'demonist');
$retval=mysqli_query($conn,$insertdata);
if(!$retval){
    die('Could not insert data'.mysqli_error($conn));
}
echo "Success!";
mysqli_close($conn);