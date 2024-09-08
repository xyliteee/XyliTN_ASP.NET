function JumpToMyGithub() {
    window.location.href = "https://github.com/xyliteee"
}

function JumpToMyCloudMusic() {
    window.location.href = "https://music.163.com/#/artist?id=30216433"
}

function JumpToMyBiliBili() {
    window.location.href = "https://space.bilibili.com/52515295"
}

function DownloadRandomPicture() {
    const randomParam = new Date().getTime();
    fetch(`api/download/randomPicture?random=${randomParam}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.blob();
        })
        .then(blob => {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            a.download = 'RandomPicture.jpg';
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}

