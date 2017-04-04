var countlogin=0;//count how many time you have clicked log in
var randomarr=[];//array of randomly src photos
var intervals;//id of interval
var regexp=/[^\D]\d*/g;//regexp to get numbers in string
var choosing="";//judge if the first chosen card is the same as the second one
var countclick=0;//count how many time you have click cards
var firstone;//element information of first click cardback
var scorearr=[[],[],[]];//score you've got local
var rank=[];//array which is use to rank scores
var levelnum=0;//judge level
if(screen.width<768) {//auto adjust window height
    window.onload = function () {
        getid("maingame").style.height = (screen.height-22)+"px";
        getid("blackbg").style.height=(screen.height-22)+"px";
    };
}
function writegame(number){//write the inner html of game
    var content="";
    for (var i=1;i<=number*number;i++){
        content+='<div class="img'+number+'" id="p'+i+'"><img src="img/cardback.png" alt="" onclick="cardback(this,\'p'+i+'\')"></div>';
    }
    getid("game").innerHTML=content;
}
function pairremain(num){//set number in remain
    getid("remain").innerHTML=num+" pairs";
}
function leveltochoose(){//show level choosing part
    getid("easy").style.display="block";
    getid("normal").style.display="block";
    getid("expert").style.display="block";
    getid("startbutton").style.display="none";
}
function globalranking(number) {//get global ranking from database
    for (var i = 0; i < globalarr[number].length; i++) {
        if (rank.length === 0) {
            rank.push(globalarr[number][i]);
        }
        else {
            for (var j = 0; j < rank.length; j++) {
                if (globalarr[number][i][1] <= rank[j][1]) {
                    rank.splice(j, 0, globalarr[number][i]);
                    break;
                }
                else if (globalarr[number][i][1] > rank[rank.length - 1][1]) {
                    rank.push(globalarr[number][i]);
                    break;
                }
            }
        }
    }
    for(var k=0;k<6;k++){
        getid("names"+k).innerHTML=rank[k][0];
        getid("times"+k).innerHTML=rank[k][1];
    }
    rank=[];
}
function ranking(number){//rank the numbers in array
for(var i=0;i<scorearr[number].length;i++) {
    if (rank.length === 0) {
        rank.push(scorearr[number][i]);
    }
    else {
        for (var j = 0; j < rank.length; j++) {
            if (scorearr[number][i][1] <= rank[j][1]) {
                rank.splice(j, 0, scorearr[number][i]);
                break;
            }
            else if (scorearr[number][i][1] > rank[rank.length - 1][1]) {
                rank.push(scorearr[number][i]);
                break;
            }
        }
    }
}
}
function changeborder() {//change border color of input
    getusername.style.borderBottom="1px solid rgb(63,81,181)";
}

function recoverborder() {//recover border of input
    getusername.style.borderBottom="1px solid #ccc";
}

function showlogin(){//show login div
    if(countlogin===0){
        getid("login").style.transform="translate3d(0,170px,0)";
        countlogin++;
    }
    else{
        hidelogin();
    }
}

function hidelogin() {//hide login div
    getid("login").style.transform="translate3d(0,0,0)";
    countlogin--;
}

function getid(idname){//shorter function for document.getelementbyid
    return document.getElementById(idname);
}

function counttime() {//change time into second
    var regarr=getid("time").innerHTML.match(regexp);
    var times=parseInt(regarr[0])*60+parseInt(regarr[1])+1;
    return calculatetime(times);
}

function getrandom(number){//randomly src photos
    while(randomarr.length<number*2){
        var num=Math.floor(Math.random()*number);
        var counter=0;
        for(var j=0;j<randomarr.length;j++){
            if(num===randomarr[j]){
                counter++;
            }
        }
        if(counter<2){
            randomarr.push(num);
        }
    }
}

function begintime(){//begin timer
    intervals=setInterval(function () {
        getid("time").innerHTML=counttime();
    },1000);
}

function calculatetime(times){//change second into time
    var str="";
    var min=Math.floor(times/60);
    var seconds=times%60;
    if(times%60<10){
        str=min+":0"+seconds;
    }
    else if(times<60){
        str="0:"+times;
    }
    else{
        str=min+":"+seconds;
    }
    return str;
}
function clearrank(){//clear rank in different levels
    var element1=document.getElementsByClassName("name");
    var element2=document.getElementsByClassName("score");
    for(var i=0;i<6;i++){
        element1[i].innerHTML="";
        element2[i].innerHTML="";
        getid("input"+i).style.display="none";
    }
}

//main part
function startgame(num1,number){//function while click start button
    var judge=confirm("Are you sure you are going to start the game?");
    if(judge){
        clearrank();
        getid("easy").style.display="none";
        getid("normal").style.display="none";
        getid("expert").style.display="none";
        getid("gametitle").style.display="none";
        getid("game").style.display="block";
        getid("gamedata").style.display="block";
        getid("pause").style.display="block";
        writegame(num1);
        levelnum=num1/2-1;
        pairremain(number);
        randomsrc(number);
        randomarr=[];
        begintime();
    }
}

function randomsrc(number){//function to randomly src photos
        getrandom(number);
        for(var i=1;i<=number*2;i++){
            getid("p"+i).style.backgroundImage='url("img/'+randomarr[i-1]+'.png")';
            getid("p"+i).style.backgroundSize="cover";
        }
}

function cardback(name,idname){//function while click the card
    if(countclick===0){//first click
        name.style.display="none";
        choosing=getid(idname).style.backgroundImage;
        countclick++;
        firstone=name;
    }
    else if(countclick===1){//second click
        name.style.display="none";
        if(getid(idname).style.backgroundImage!=choosing){
            countclick++;
            setTimeout(function () {
                name.style.display="block";
                firstone.style.display="block";
                countclick=0;
            },1000);
        }
        else{
            var num=parseInt(getid("remain").innerHTML.match(regexp));//find out number in "n pairs"
            getid("remain").innerHTML=(num-1)+" Pairs";
            if(num===1){//the last pair
                getid("blackbg").style.display="block";
                getid("ranks").style.display="block";
                clearInterval(intervals);
                scorearr[levelnum].push([getid("username").innerHTML,getid("time").innerHTML]);
                ranking(levelnum);
                writeresult();
                rank=[];
                globalranking(levelnum);
                changecolor(1);
            }
            countclick=0;
        }
    }
}

function log_in(){//login function
    getid("username").innerHTML=getid("getusername").value;
    getid("righttext").innerHTML="Exit";
    getid("righttext").setAttribute("onclick","log_out()");
    getid("getusername").value="";
    hidelogin();
}
function log_out(){//logout function
    getid("username").innerHTML="Guest";
    getid("righttext").setAttribute("onclick","showlogin()");
    getid("righttext").innerHTML="Log in";
}

function pausebtn(){//function of pause
    changecolor(1);
    getid("blackbg").style.display="block";
    getid("pausediv").style.display="block";
    clearInterval(intervals);
}

function continuegame(){//function of continue game
    changecolor(0);
    getid("blackbg").style.display="none";
    getid("pausediv").style.display="none";
    begintime();
}

function replay(){//go to first page
    changecolor(0);
    countclick=0;
    getid("blackbg").style.display="none";
    getid("gamedata").style.display="none";
    getid("game").style.display="none";
    getid("pause").style.display="none";
    getid("ranks").style.display="none";
    getid("pausediv").style.display="none";
    getid("time").innerHTML="0:00";
    getid("remain").innerHTML="8 Pairs";
    getid("startbutton").style.display="block";
    getid("gametitle").style.display="block";
    getid("globalrank").style.display="none";
    var elements=document.getElementsByTagName("img");
    for(var i=0;i<elements.length;i++){
        elements[i].style.display="block";
    }
}

function writeresult(){//write result in rank board
    for(var i=0;i<rank.length;i++){
        if(i>=6){
            break;
        }
        else{
            getid("name"+i).innerHTML=rank[i][0];
            getid("time"+i).innerHTML=rank[i][1];
            getid("input"+i).style.display="block";
        }
    }
}

function ranklist(num){//show global score and local score
    if(num===0){
        getid("ranks").style.display="none";
        getid("globalrank").style.display="block";
    }
    else{
        getid("ranks").style.display="block";
        getid("globalrank").style.display="none";
    }
}

function uploadvalue(num){
    getid("uploadname").value=getid("name"+num).innerHTML;
    getid("uploadscore").value=getid("time"+num).innerHTML;
    getid("uploadlevel").value=levelnum;
}

function changecolor(num){//change theme color
    if(num===1){
        document.getElementsByName("theme-color")[0].setAttribute("content","rgba(0,0,0,0.8)");
    }
    else{
        document.getElementsByName("theme-color")[0].setAttribute("content","rgb(0,205,255)");
    }
}
