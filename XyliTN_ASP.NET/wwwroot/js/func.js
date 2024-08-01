
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
function main() {
    window.onload = function () {
        GetCurrentTime();
        setInterval(GetCurrentTime, 1000);
        processFocus();
        LoadEngine();
        CallEnter();
    }
}
main();


