
function ZoomInPC() {
    document.querySelector(".engineButton").style.left = 'calc(50% - 400px)';
    document.querySelector(".MainInputBoxStyle").style.width = '800px';
    WebButtonShow(false);
    document.querySelector(".MainInputBoxStyle").style.backgroundColor = 'rgba(0, 0, 0,0.8)';
    document.getElementById("inputBox").placeholder = "";
    document.getElementById('bgImage').style.transform = 'scale(1.2)';
    document.getElementById('bgImage').style.filter = 'blur(5px)';
}
function ZoomInMobile() {
    document.querySelector(".engineButton").style.left = 'calc(50% - 200px)';
    document.querySelector(".MainInputBoxStyle").style.width = '400px';
    WebButtonShow(false);
    document.querySelector(".MainInputBoxStyle").style.backgroundColor = 'rgba(0, 0, 0,0.8)';
    document.getElementById("inputBox").placeholder = "";
    document.getElementById('bgImage').style.transform = 'scale(1.2)';
    document.getElementById('bgImage').style.filter = 'blur(5px)';
}

function ZoomOut() {
    document.querySelector(".engineButton").style.left = 'calc(50% - 150px)';
    document.querySelector(".MainInputBoxStyle").style.width = '300px';
    WebButtonShow(true);
    document.querySelector(".MainInputBoxStyle").style.backgroundColor = 'rgba(0, 0, 0,0.6)';
    const emoticons = [
        "ヾ(≧▽≦*)o",
        "φ(*￣0￣)",
        "q(≧▽≦q)",
        "ψ(｀∇´)ψ",
        "（￣︶￣）↗",
        "*^____^*",
        "(～￣▽￣)～",
        "( •̀ ω •́ )✧",
        "[]~(￣▽￣)~*",
        "φ(゜▽゜*)♪"
    ];
    const randomEmoticon = emoticons[Math.floor(Math.random() * emoticons.length)];
    document.getElementById("inputBox").placeholder = randomEmoticon;
    document.getElementById('bgImage').style.transform = 'scale(1)';
    document.getElementById('bgImage').style.filter = 'blur(0)';
}

function WebButtonShow(value){
    
    if(value){
        setTimeout(function() {
            document.getElementById("bilibiliButton").style.opacity = 1;
            document.getElementById("githubButton").style.opacity = 1;
            document.getElementById("cloudButton").style.opacity = 1;
            document.getElementById("copilotButton").style.opacity = 1;
            document.getElementById("bilibiliButton").disabled = false;
            document.getElementById("githubButton").disabled = false;
            document.getElementById("cloudButton").disabled = false;
            document.getElementById("copilotButton").disabled = false;

            document.getElementById("bilibiliButton").style.cursor = "pointer";
            document.getElementById("githubButton").style.cursor = "pointer";
            document.getElementById("cloudButton").style.cursor = "pointer";
            document.getElementById("copilotButton").style.cursor = "pointer";
        }, 200);
        return;
    }
    setTimeout(function() {
    document.querySelector(".webButton").cursor = "pointer";
    document.getElementById("bilibiliButton").style.opacity = 0;
    document.getElementById("githubButton").style.opacity = 0;
    document.getElementById("cloudButton").style.opacity = 0;
    document.getElementById("copilotButton").style.opacity = 0;

    document.getElementById("bilibiliButton").disabled = true;
    document.getElementById("githubButton").disabled = true;
    document.getElementById("cloudButton").disabled = true;
    document.getElementById("copilotButton").disabled = true;

    document.getElementById("bilibiliButton").style.cursor = "default";
    document.getElementById("githubButton").style.cursor = "default";
    document.getElementById("cloudButton").style.cursor = "default";
    document.getElementById("copilotButton").style.cursor = "default";
    }, 200);
   
}

function ZoomIn() {
    if (isPC) {
        ZoomInPC();
    } else {
        ZoomInMobile();
    }
}

function ShowLoginMainContent() {
    var box = document.getElementById("LoginBox");
    var overlay = document.getElementById("Overlay");

    overlay.style.display = "block";
    setTimeout(function () {
        overlay.classList.add("show");
        box.style.transform = "translate(-50%, 140%) scale(1.02)";
        setTimeout(function () {
            box.style.transform = "translate(-50%, 140%) scale(1)";
        }, 300);
    }, 10);
}
function HideLoginMainContent() {
    var box = document.getElementById("LoginBox");
    var overlay = document.getElementById("Overlay");

    box.style.transform = "translate(-50%, 140%) scale(1.02)";
    setTimeout(function () {
        box.style.transform = "translate(-50%, 140%) scale(0)";
        overlay.classList.remove("show");
        setTimeout(function () {
            overlay.style.display = "none";
        }, 300);
    }, 300);
}

function HideUserBox() {
    var userBox = document.getElementById("UserBox");
    userBox.classList.remove("show");
    userBox.classList.add("hide");
    setTimeout(function () {
        userBox.style.display = "none";
    }, 300);
}


function ShowUserBox() {
    if (!isLogin)
    {
        ShowLoginMainContent();
        return;
    }
    var userBox = document.getElementById("UserBox");
    userBox.style.display = "block";
    setTimeout(function () {
        userBox.classList.remove("hide");
        userBox.classList.add("show");
    }, 10);
}


function HideSettingBox() {
    var settingBox = document.getElementById("SettingBox");
    settingBox.classList.remove("show");
    settingBox.classList.add("hide");
    setTimeout(function () {
        settingBox.style.display = "none";
    }, 300);
    
}
function ShowSettingBox() {
    var settingBox = document.getElementById("SettingBox");
    settingBox.style.display = "block";
    setTimeout(function () {
        settingBox.classList.remove("hide");
        settingBox.classList.add("show");
    }, 10);
}









