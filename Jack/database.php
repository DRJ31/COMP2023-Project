<?php
function getClientIP()
{
    global $ip;
    if (getenv("HTTP_CLIENT_IP"))
        $ip = getenv("HTTP_CLIENT_IP");
    else if(getenv("HTTP_X_FORWARDED_FOR"))
        $ip = getenv("HTTP_X_FORWARDED_FOR");
    else if(getenv("REMOTE_ADDR"))
        $ip = getenv("REMOTE_ADDR");
    else $ip = "Unknow";
    return $ip;
}
$ipadd=getClientIP();
$ua=$_SERVER['HTTP_USER_AGENT'];
$arr=array();
$dbhost='';//host
$dbuser='';//username
$dbpass='';//password
$conn=mysqli_connect($dbhost,$dbuser,$dbpass);
if (!$conn){
    die('Could not connect: '.mysqli_error($conn));
}
$getdata="SELECT * FROM fruit_score";
mysqli_select_db($conn,'demonist');
$retval=mysqli_query($conn,$getdata);
if(!$retval){
    die('Could not get data'.mysqli_error($conn));
}
while($row=mysqli_fetch_array($retval,MYSQLI_ASSOC))
{
    array_push($arr,array($row["username"],$row["score"]));
}
echo "Done!";
for ($i=0;$i<count($arr);$i++){
    if($i==count($arr)-1){
        echo "[".$arr[$i][0].",".$arr[$i][1]."]";
    }
    else{
        echo "[".$arr[$i][0].",".$arr[$i][1]."],";
    }
}
$insertdata="INSERT INTO userinfo".
    "(useragent, ipaddress, date, time)".
    "VALUES".
    "('$ua','$ipadd',NOW(),NOW())";
mysqli_select_db($conn,'demonist');
$retval=mysqli_query($conn,$insertdata);
if(!$retval){
    die('Could not insert data'.mysqli_error($conn));
}
echo "Success!";
mysqli_close($conn);
