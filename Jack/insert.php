<?php
$dbhost='45.78.44.25:3306';//host
$dbuser='demonist';//username
$dbpass='008691';//password
$conn=mysqli_connect($dbhost,$dbuser,$dbpass);
if(!$conn){
    die('Could not connect: '.mysqli_error($conn));
}
$username="Google";
$score=835;
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