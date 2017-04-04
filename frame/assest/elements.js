var elements=[];//array of elements you may need to get
var countlogin=0;//count how many time you have clicked log in
function changeborder() {
    getid("getusername").style.borderBottom="1px solid rgb(63,81,181)";
}

function recoverborder() {
    getid("getusername").style.borderBottom="1px solid #ccc";
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