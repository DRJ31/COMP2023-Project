var elements=[];//array of elements you may need to get
var countlogin=0;//count how many time you have clicked log in
var origintime=[];
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
    var days=new Date();
    return (days.getMinutes()*60+days.getSeconds()-origintime[1]*60-origintime[2]);
}