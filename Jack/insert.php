<html>
<head>
    <title>loading...</title>
</head>
<body>
<?php
$dbhost='';//host
$dbuser='';//username
$dbpass='';//password
$conn=mysql_connect($dbhost,$dbuser,$dbpass);
if(!$conn){
    die('Could not connect!');
}
$username=$_POST["uploadname"];
$score=$_POST["uploadscore"];
$level=$_POST["uploadlevel"];
$insertdata="INSERT INTO fruit_score".
    "(username, score, date, time,level)".
    "VALUES".
    "('$username','$score',NOW(),NOW(),'$level')";
mysql_select_db('demonist');
$retval=mysql_query($insertdata);
if(!$retval){
    die('Could not insert data!');
}
echo "<script>alert('Success!');window.location.href='index.php';</script>";
mysql_close($conn);
?>
</body>
</html>

