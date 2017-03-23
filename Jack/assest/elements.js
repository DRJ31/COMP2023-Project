var elements=[];//array of elements you may need to get
var countlogin=0;//count how many time you have clicked log in
var randomarr=[];
var intervals;
var regexp=/[^\D]\d/g;
window.onload=function () {
    elements[0]=document.getElementById("righttext");
    elements[1]=document.getElementById("gametitle");
    elements[2]=document.getElementById("startbutton");
    elements[3]=document.getElementById("level1");
    elements[4]=document.getElementById("level2");
    elements[5]=document.getElementById("level3");
    elements[6]=document.getElementById("getusername");
    elements[7]=document.getElementById("login");
    elements[8]=document.getElementById("time");
    elements[9]=document.getElementById("remain");
};

function changeborder() {
    elements[6].style.borderBottom="1px solid rgb(63,81,181)";
}

function recoverborder() {
    elements[6].style.borderBottom="1px solid #ccc";
}

function showlogin(){//show login div
    if(countlogin==0){
        elements[7].style.transform="translate3d(0,170px,0)";
        countlogin++;
    }
    else{
        hidelogin();
    }
}

function hidelogin() {//hide login div
    elements[7].style.transform="translate3d(0,0,0)";
    countlogin--;
}

function getid(idname){//shorter function for document.getelementbyid
    return document.getElementById(idname);
}

function counttime() {
    var regarr=getid("time").innerHTML.match(regexp);
    var now=parseInt(getid("time").innerHTML)+1;
    return calculatetime(now);
}

function getrandom(){//randomly src photos
    while(randomarr.length<16){
        var num=Math.floor(Math.random()*16);
        var counter=0;
        for(var j=0;j<randomarr.length;j++){
            if(num==randomarr[j]){
                counter++;
            }
        }
        if(counter==0){
            randomarr.push(num);
        }
    }
}

function begintime(){
    intervals=setInterval(function () {
        getid("time").innerHTML=counttime();
    },1000);
}

function calculatetime(times){
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