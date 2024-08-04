var isPC;
var isLogin = false;
function SearchClick() {
    var query = document.getElementById('inputBox').value;
    window.location.href = searchString + encodeURIComponent(query);
};

function JumpToMyGithub(){
    window.location.href = "https://github.com/xyliteee"
}

function JumpToWeb(button) {
    var prefix = "https://"
    var tag = button.dataset.tag;
    if (tag == "bilibili") { window.location.href = prefix + "www.bilibili.com"; }
    if (tag == "github") { window.location.href = prefix + "www.github.com"; }
    if (tag == "cloudMusic") { window.location.href = prefix + "music.163.com"; }
    if (tag == "copilot") { window.location.href = prefix + "www.bing.com/chat?q=Microsoft+Copilot"; }
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
        event.preventDefault();//阻止更换搜索引擎的按钮获取焦点
    });
    document.getElementById("searchButton").addEventListener("mousedown", function (event) {
        event.preventDefault();//阻止搜索按钮获取焦点
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

    var username = userNameBox.value;
    var password = passwordBox.value;

    fetch('/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: username, password: password })
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('登录成功,但这没什么用处');
                hideLoginBox();
                UpdataUser(username[0])
                localStorage.setItem('username', username);
                localStorage.setItem('isLoggedIn', 'true');
            } else {
                alert('登录失败：' + data.message);
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
}
function checkLoginStatus() {
    var isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn === 'true') {
        var username = localStorage.getItem('username');
        UpdataUser(username[0]);
    }
}
function Register() {
    var userNameBox = document.getElementById("UserNameBox");
    var passwordBox = document.getElementById("PassWordBox");

    var usernameStr = userNameBox.value;
    var passwordStr = passwordBox.value;

    if (!usernameStr || !passwordStr) {
        alert("用户名和密码不能为空！");
        return;
    }

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/api/register", true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var response = JSON.parse(xhr.responseText);
            if (response.success) {
                alert("注册成功！");
            } else {
                alert("注册失败：" + response.message);
            }
        }
    };
    xhr.send(JSON.stringify({ username: usernameStr, password: passwordStr }));
}

function Logoff()
{
    localStorage.setItem('isLoggedIn', 'false');
    var userNameBox = document.getElementById("UserButton");
    isLogin = false;
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
    isLogin = true;
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
    checkLoginStatus();
    LoadBG()
}



