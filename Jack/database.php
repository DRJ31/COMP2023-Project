<?php
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
//echo $retval;
for ($i=0;$i<count($arr);$i++){
    if($i==count($arr)-1){
        echo "[".$arr[$i][0].",".$arr[$i][1]."]";
    }
    else{
        echo "[".$arr[$i][0].",".$arr[$i][1]."],";
    }
}
mysqli_close($conn);

