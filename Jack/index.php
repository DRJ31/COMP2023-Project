<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Fruit Pairs</title>
    <meta name="viewport" content="initial-scale=1,maximum-scale=1,user-scalable=no,width=device-width">
    <link rel="stylesheet" href="assest/style.css">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700" type="text/css">
    <script src="assest/elements.js"></script>
    <script>
        var globalarr=[<?php
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
            $conn=mysql_connect($dbhost,$dbuser,$dbpass);
            if (!$conn){
                die('Could not connect!');
            }
            $getdata="SELECT * FROM fruit_score";
            mysql_select_db('demonist');
            $retval=mysql_query($getdata);
            if(!$retval){
                die('Could not get data!');
            }
            while($row=mysql_fetch_array($retval,MYSQLI_ASSOC))
            {
                array_push($arr,array($row["username"],$row["score"]));
            }
            for ($i=0;$i<count($arr);$i++){
                if($i==count($arr)-1){
                    echo "[\"".$arr[$i][0]."\",\"".$arr[$i][1]."\"]";
                }
                else{
                    echo "[\"".$arr[$i][0]."\",\"".$arr[$i][1]."\"],";
                }
            }
            $insertdata="INSERT INTO userinfo".
                "(useragent, ipaddress, date, time)".
                "VALUES".
                "('$ua','$ipadd',NOW(),NOW())";
            $retval=mysql_query($insertdata);
            if(!$retval){
                die('Could not insert data!');
            }
            mysql_close($conn);
            ?>];
    </script>
</head>
<body>
<div class="header">Fruit Pairs <span id="righttext" onclick="showlogin()">Log in</span></div>
<div id="login">
    <input type="text" id="getusername" onfocus="changeborder()" onfocusout="recoverborder()" maxlength="10">
    <button class="checkbutton" onclick="log_in()">Login</button>
    <button class="checkbutton" onclick="hidelogin()">Cancel</button>
</div>
<!--contents in the left of the page-->
<div class="leftcol">
    <div id="maingame">
        <!--fixed part-->
        <div id="blackbg">
            <div id="pausediv">
                <h1>You have Paused</h1>
                <div class="pausebtn" onclick="continuegame()">Continue</div>
                <div class="pausebtn" onclick="replay()">Menu</div>
            </div>
            <div id="ranks" class="ranks">
                <h1>Top List</h1>
                <form action="insert.php" method="post">
                <div class="rankdiv">1 <span class="name" id="name0">GUest</span> <input type="submit" value="Upload" onclick="uploadvalue(0)" id="input0"><span class="score" id="time0">0:30</span></div>
                <div class="rankdiv">2 <span class="name" id="name1"></span> <input type="submit" value="Upload" onclick="uploadvalue(1)" id="input1"><span class="score" id="time1"></span></div>
                <div class="rankdiv">3 <span class="name" id="name2"></span> <input type="submit" value="Upload" onclick="uploadvalue(2)" id="input2"><span class="score" id="time2"></span></div>
                <div class="rankdiv">4 <span class="name" id="name3"></span> <input type="submit" value="Upload" onclick="uploadvalue(3)" id="input3"><span class="score" id="time3"></span></div>
                <div class="rankdiv">5 <span class="name" id="name4"></span> <input type="submit" value="Upload" onclick="uploadvalue(4)" id="input4"><span class="score" id="time4"></span></div>
                    <div class="rankdiv">6 <span class="name" id="name5"></span> <input type="submit" value="Upload" onclick="uploadvalue(5)" id="input5"><span class="score" id="time5"></span></div>
                    <input type="text" name="uploadname" style="display: none" id="uploadname">
                    <input type="text" name="uploadscore" style="display: none" id="uploadscore">
                </form>
                <div class="rankbtn" onclick="replay()">Menu</div>
                <div class="rankbtn" onclick="ranklist(0)">Global Rank</div>
            </div>
            <div id="globalrank" class="ranks">
                <h1>Top List</h1>
                    <div class="rankdiv">1 <span class="name" id="names0"></span> <span class="score" id="times0"></span></div>
                    <div class="rankdiv">2 <span class="name" id="names1"></span> <span class="score" id="times1"></span></div>
                    <div class="rankdiv">3 <span class="name" id="names2"></span> <span class="score" id="times2"></span></div>
                    <div class="rankdiv">4 <span class="name" id="names3"></span> <span class="score" id="times3"></span></div>
                    <div class="rankdiv">5 <span class="name" id="names4"></span> <span class="score" id="times4"></span></div>
                    <div class="rankdiv">6 <span class="name" id="names5"></span> <span class="score" id="times5"></span></div>
                <div class="rankbtn" onclick="replay()">Menu</div>
                <div class="rankbtn" onclick="ranklist(1)">Local Rank</div>
            </div>
        </div>
        <!--welcome part and level choosing part-->
        <div id="gametitle">Fruit <span class="titlespan">Pair</span></div>
        <div id="startbutton" onclick="startgame()"><img src="assest/play.png" id="play" alt=""></div>

        <!--game part begin-->
        <!--top bar-->
        <div id="gamedata">
            <div class="words">Time</div>
            <div class="datacontainer" id="time">0:00</div>
            <div class="words">Remain</div>
            <div class="datacontainer" id="remain">8 Pairs</div>
        </div>
        <div id="pause" onclick="pausebtn()"><b>||</b></div><!--pause button-->

        <!--main game container-->
        <div id="game">
            <div class="img4" id="p1"><img src="img/cardback.png" alt="" onclick="cardback(this,'p1')"></div>
            <div class="img4" id="p2"><img src="img/cardback.png" alt="" onclick="cardback(this,'p2')"></div>
            <div class="img4" id="p3"><img src="img/cardback.png" alt="" onclick="cardback(this,'p3')"></div>
            <div class="img4" id="p4"><img src="img/cardback.png" alt="" onclick="cardback(this,'p4')"></div>
            <div class="img4" id="p5"><img src="img/cardback.png" alt="" onclick="cardback(this,'p5')"></div>
            <div class="img4" id="p6"><img src="img/cardback.png" alt="" onclick="cardback(this,'p6')"></div>
            <div class="img4" id="p7"><img src="img/cardback.png" alt="" onclick="cardback(this,'p7')"></div>
            <div class="img4" id="p8"><img src="img/cardback.png" alt="" onclick="cardback(this,'p8')"></div>
            <div class="img4" id="p9"><img src="img/cardback.png" alt="" onclick="cardback(this,'p9')"></div>
            <div class="img4" id="p10"><img src="img/cardback.png" alt="" onclick="cardback(this,'p10')"></div>
            <div class="img4" id="p11"><img src="img/cardback.png" alt="" onclick="cardback(this,'p11')"></div>
            <div class="img4" id="p12"><img src="img/cardback.png" alt="" onclick="cardback(this,'p12')"></div>
            <div class="img4" id="p13"><img src="img/cardback.png" alt="" onclick="cardback(this,'p13')"></div>
            <div class="img4" id="p14"><img src="img/cardback.png" alt="" onclick="cardback(this,'p14')"></div>
            <div class="img4" id="p15"><img src="img/cardback.png" alt="" onclick="cardback(this,'p15')"></div>
            <div class="img4" id="p16"><img src="img/cardback.png" alt="" onclick="cardback(this,'p16')"></div>
        </div>
    </div>
</div>
<!--contents in the right of the page-->
<div class="rightcol">
    <div class="user">
        <h1 id="username">Guest</h1><!--set limit of 12 letters-->
        <p>Username</p>
    </div>
    <div class="footer">
        ©Copyright UIC-PANICS <br/>
        All Rights Reserved
        <p>Developers: </p>
        <ul>
            <li>Renjie Deng l630003010</li>
            <li>Qingbo Li l630003028</li>
            <li>Anqin Zha l6300001</li>
        </ul>
        Group I @ SDWI 2017 <br/>
        Version 1.0
    </div>
</div>
</body>
</html>