var countlogin=0;//count how many time you have clicked log in
var randomarr=[];//array of randomly src photos
var intervals;//id of interval
var regexp=/[^\D]\d*/g;//regexp to get numbers in string
function changeborder() {
    getusername.style.borderBottom="1px solid rgb(63,81,181)";
}

function recoverborder() {
    getusername.style.borderBottom="1px solid #ccc";
}

function showlogin(){//show login div
    if(countlogin==0){
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

function getrandom(){//randomly src photos
    while(randomarr.length<16){
        var num=Math.floor(Math.random()*8);
        var counter=0;
        for(var j=0;j<randomarr.length;j++){
            if(num==randomarr[j]){
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

//main part
function startgame(){//function while click start button
    var judge=confirm("Are you sure you are going to start the game?");
    if(judge==true){
        getid("gametitle").style.display="none";
        getid("startbutton").style.display="none";
        getid("game").style.display="block";
        getid("gamedata").style.display="block";
        getid("pause").style.display="block";
        randomsrc();
        setTimeout(begintime,1000);
    }
}

function randomsrc(){//function to randomly src photos
        getrandom();
        for(var i=1;i<=16;i++){
            getid("p"+i).setAttribute("src",'img/'+randomarr[i-1]+'.png');console.log(true);
        }
}

function cardback(name){
    name.style.display="none";
}

function log_in(){
    getid("username").innerHTML=getid("getusername").value;
    getid("righttext").innerHTML="Exit";
    getid("righttext").setAttribute("onclick","log_out()");
    getid("getusername").value="";
    hidelogin();
}
function log_out(){
    getid("username").innerHTML="Guest";
    getid("righttext").setAttribute("onclick","showlogin()");
    getid("righttext").innerHTML="Log in";
}