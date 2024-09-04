var isPC;
var isLogin;
function SearchClick() {
    var query = document.getElementById('inputBox').value;
    window.location.href = searchString + encodeURIComponent(query);
};



function JumpToWeb(button) {
    var tag = button.dataset.tag;
    if (tag == "bilibili") { window.location.href = "https://www.bilibili.com"; }
    if (tag == "github") { window.location.href = "https://www.github.com"; }
    if (tag == "cloudMusic") { window.location.href = "https://music.163.com"; }
    if (tag == "copilot") { window.location.href = "https://www.bing.com/chat?q=Microsoft+Copilot"; }
}

var searchEngines = [
    { name: '百度', url: 'https://www.baidu.com/s?wd=' },
    { name: '谷歌', url: 'https://www.google.com/search?q=' },
    { name: 'Pix', url: 'https://www.pixiv.net/tags/' },
    { name: '必应', url: 'https://www.bing.com/search?q=' },
];

function ChoseEngine() {
    var button = document.getElementById('engineButton');
    currentIndex = (currentIndex + 1) % searchEngines.length;
    var newEngine = searchEngines[currentIndex];
    button.textContent = newEngine.name;
    searchString = newEngine.url;
    localStorage.setItem('selectedEngine', JSON.stringify(newEngine));
}
function GetCurrentTime() {
    var currentDate = new Date();
    var hours = currentDate.getHours().toString().padStart(2, '0');
    var minutes = currentDate.getMinutes().toString().padStart(2, '0');

    var formattedDate = hours + ':' + minutes;
    document.querySelector('.timeLable').textContent = formattedDate;
}

function LoadEngine() {
    var button = document.getElementById('engineButton');
    var storedEngine = localStorage.getItem('selectedEngine');
    if (storedEngine) {
        var engineObj = JSON.parse(storedEngine);
        button.textContent = engineObj.name;
        searchString = engineObj.url;
        currentIndex = searchEngines.findIndex(engine => engine.name === engineObj.name);
    } else {
        var defaultEngine = searchEngines[0];
        searchString = defaultEngine.url;
        button.textContent = defaultEngine.name;
        currentIndex = 0;
    }
}

function processFocus()
{
    document.getElementById("engineButton").addEventListener("mousedown", function (event) {
        event.preventDefault();
    });
    document.getElementById("searchButton").addEventListener("mousedown", function (event) {
        event.preventDefault();
    });
}

function CallEnter() {
    const inputBox = document.getElementById('inputBox');
    inputBox.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' && inputBox.value !== '') {
            SearchClick();
        }
    });
}

function JudgeThDevice () {
    fetch('/Index?handler=UserAgent')
        .then(response => response.json())
        .then(data => {
            isPC = data.isPC;    
        })
        .catch(error => console.error('Error:', error));
}

function Login() {
    var userNameBox = document.getElementById("UserNameBox");
    var passwordBox = document.getElementById("PassWordBox");

    var username = userNameBox.value.toString();
    var password = passwordBox.value.toString();
    LoginContent(username, password)
        .then(res => {
            if (res) {
                alert("登录成功！");
                HideLoginMainContent();
                localStorage.setItem('username', username);
                localStorage.setItem('password', password);
                UpdataUser(username);
            } else {
                alert("用户名不存在或密码错误！");
            }
        })
        .catch(error => {
            console.error("登录出错：", error);
        });  
}

function LoginContent(username, password) {
    return new Promise((resolve, reject) => {
        password = encryptedPassword(password);
        fetch('/api/service/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username: username, password: password })
        })
            .then(response => {
                return response.json();
            })

            .then(data => {
                console.log(data.message)
                if (data.success) {
                    isLogin = true;
                    localStorage.setItem('isAutoLogin', 'true');
                    resolve(true);
                } else {
                    isLogin = false;
                    resolve(false);
                }
            })
            .catch(error => {
                console.log(error);
                reject(error);
            });
    });
}


function AutoLogin() {
    var isAuto = localStorage.getItem('isAutoLogin');
    if (isAuto != 'true') {
        return;
    }
    var username = localStorage.getItem('username');
    var password = localStorage.getItem('password');

    if (!username || !password) {
        return;
    }

    LoginContent(username, password)
        .then(res => {
            if (res) {
                localStorage.setItem('username', username);
                localStorage.setItem('password', password);
                UpdataUser(username);
            } else {
                localStorage.removeItem('username');
                localStorage.removeItem('password');
            }
        })
        .catch(error => {
            console.error("登录出错：", error);
        });
}


function Register() {
    var userNameBox = document.getElementById("UserNameBox");
    var passwordBox = document.getElementById("PassWordBox");

    var usernameStr = userNameBox.value.toString();
    var passwordStr = passwordBox.value.toString();

    if (!usernameStr || !passwordStr) {
        alert("用户名和密码不能为空！");
        return;
    }
    if (!/^[A-Za-z][A-Za-z0-9]*$/.test(usernameStr)) {
        alert("用户名必须以英文开头且不能包含特殊字符！");
        return;
    }
    if (passwordStr.length <= 8 || /[^A-Za-z0-9\?\-\!]/.test(passwordStr)) {
        alert("密码必须大于八位且不能包含特殊字符！");
        return;
    }

    passwordStr = encryptedPassword(passwordStr);
    console.log(passwordStr);

    fetch("/api/service/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=UTF-8"
        },
        body: JSON.stringify({ username: usernameStr, password: passwordStr })
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert("注册成功！");
            } else {
                alert("注册失败：" + data.message);
            }
        })
        .catch(error => {
            console.error("网络请求错误：", error);
        });
}


function Logoff()
{
    isLogin = false;
    localStorage.setItem('isAutoLogin', 'false');
    var userNameBox = document.getElementById("UserButton");
    userNameBox.innerText = "登录";
    var userBox = document.getElementById("UserBox");
    userBox.classList.remove("show");
    userBox.classList.add("hide");
    setTimeout(function () {
        userBox.style.display = "none";
    }, 300);
    alert("已注销");
}
function UpdataUser(name) {
    var userNameBox = document.getElementById("UserButton");
    name = name.slice(0, 4);
    userNameBox.innerText = name;
}

function SetBG() {
    var fileInput = document.getElementById("fileInput");
    fileInput.click();
    fileInput.onchange = function () {
        var file = fileInput.files[0];
        if (file) {
            if (file.size > 4.9 * 1024 * 1024) { 
                alert("文件大小不能超过 5MB！");
                return;
            }
            if (file.type.startsWith('image/')) {
                var reader = new FileReader();
                reader.onload = function (e) {
                    var bgImage = document.getElementById("bgImage");
                    bgImage.src = e.target.result;
                    localStorage.setItem('bgImage', e.target.result);
                };
                reader.readAsDataURL(file);
            } else {
                alert("请选择一个有效的图片文件！");
            }
        }
    };
}


function LoadBG()
{
    var bgImage = document.getElementById("bgImage");
    var savedImage = localStorage.getItem('bgImage');
    if (savedImage) {
        bgImage.src = savedImage;
    } else
    {
        bgImage.src = "/images/back.jpg";
    }
}

function ResetBG() {
    localStorage.removeItem('bgImage');
    var bgImage = document.getElementById("bgImage");
    bgImage.src = "/images/back.jpg";
}
window.onload = function () {
    GetCurrentTime();
    setInterval(GetCurrentTime, 1000);
    processFocus();
    LoadEngine();
    CallEnter();
    JudgeThDevice();
    LoadBG();
    AutoLogin();
}



