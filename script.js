const togglebtn = document.getElementById("toggle-btn")
const start = document.getElementById("start")
const cloud1 = document.getElementById("cloud1")
const cloud2 = document.getElementById("cloud2")
const l1 = document.getElementById("l1")
const l2 = document.getElementById("l2")
const bg = document.getElementById("bg")
const people = document.getElementById("people")
const music = document.getElementById("music")
const speaker = document.getElementById("speaker")
const rain = document.getElementById("rain")
const rainaudio = document.getElementById("rain-audio")
const thunderaudio = document.getElementById("thunder-audio")
const rainbg = document.getElementById("rain-container")
const campfire = document.getElementById("campfire")
var isToggle = 0
var isStart = 0
var isL = 0

function toggle() {
    if (isToggle == 0) {
        isToggle = 1
        togglebtn.src = "/FIRE VOLCANO/assets/closemenu.png"
        start.style.display = "block"
        rain.style.display = "block"
    } else {
        isToggle = 0
        togglebtn.src = "/FIRE VOLCANO/assets/menu.png"
        start.style.display = "none"
        rain.style.display = "none"
    }
}

function startToggle() {
    if (isStart == 0) {
        isStart = 1
        start.src = "/FIRE VOLCANO/assets/stop.png"
        cloud1.style.opacity = "100%"
        cloud2.style.opacity = "100%"
        setTimeout(ligth, 2000)
    } else {
        location.reload()
        isStart = 0
        start.src = "/FIRE VOLCANO/assets/start.png"
    }
}

function ligth() {
    bg.src = "/FIRE VOLCANO/assets/firebg.png"
    l1.style.opacity = "100%"
    l1.style.animation = "lightning 0.5s forwards"
    l2.style.opacity = "100%"
    l2.style.animation = "lightning 0.5s forwards"
    thunderaudio.currentTime = 0.5
    thunderaudio.play()
    setTimeout(popcloud, 500)
    setTimeout(stand, 100)
    music.style.display = "none"
    isL = 1
}

function popcloud() {
    cloud1.style.opacity = "0%"
    cloud2.style.opacity = "0%"
}

var interVal

function stand() {
    people.src = "/FIRE VOLCANO/assets/people.png"
    people.style.width = "250px"
    people.style.height = "250px"
    people.style.top = "75%"

    setTimeout(prerun, 150)
}

var isLeft = 0
var dist = 56

function prerun() {
    people.style.width = "200px"
    people.style.height = "200px"
    if (isLeft == 0) {
        people.src = "/FIRE VOLCANO/assets/run1.png"
        isLeft = 1
    } else {
        people.src = "/FIRE VOLCANO/assets/run2.png"
        isLeft = 0
    }
    people.style.left = "56%"
    speaker.style.top = "77%"
    interVal = setInterval(run, 250)

}

function run() {
    if (dist > 150) {
        clearInterval(interVal)
    }
    if (isLeft == 0) {
        people.src = "/FIRE VOLCANO/assets/run1.png"
        isLeft = 1
    } else {
        people.src = "/FIRE VOLCANO/assets/run2.png"
        isLeft = 0
    }
    dist += 5
    people.style.left = `${dist + 1}%`
    speaker.style.left = `${dist}%`
}

var dist2 = 0

function run2() {
    people.style.transition = "0.5s"
    speaker.style.transition = "0.5s"
    if(dist2 >= 45) {
        location.reload()
    }
    if (isLeft == 0) {
        people.src = "/FIRE VOLCANO/assets/run1.png"
        isLeft = 1
    } else {
        people.src = "/FIRE VOLCANO/assets/run2.png"
        isLeft = 0
    }
    dist2 += 5
    people.style.left = `${dist2 + 1}%`
    speaker.style.left = `${dist2}%`
}

var isRain = 0

function rainToggle() {
    if (isRain == 0) {
        rainaudio.currentTime = 0
        rainaudio.play()
        rainbg.style.display = "block"
        setTimeout(() => {
            bg.src = "/FIRE VOLCANO/assets/bg.png"
        }, 1000)
        isRain = 1
        campfire.src = "/FIRE VOLCANO/assets/camp.png"
        campfire.style.top = "81%"
        people.style.transition = "0"
        speaker.style.transition = "0"
        people.style.left = "1%"
        speaker.style.left = "0%"
        setInterval(run2, 250)
    } else {
        rainbg.style.display = "none"
        isRain = 0
        rainaudio.pause()
        togglePlayPause()
        toggleYouTubeUI()
    }
}

// 
const tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
document.head.appendChild(tag);

let ytPlayer;
let isMuted = false;
let isPlaying = false;
let seekBar = document.getElementById('seekBar');

// สร้าง player
function onYouTubeIframeAPIReady() {
    ytPlayer = new YT.Player('yt-player', {
        height: '0',
        width: '0',
        videoId: '',
        playerVars: { 'playsinline': 1 },
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}

function onPlayerReady(event) {
    setInterval(updateSeekBar, 1000); // อัปเดตตำแหน่งทุกวินาที
}

function onPlayerStateChange(event) {
    isPlaying = event.data === YT.PlayerState.PLAYING;
}

function extractVideoId(url) {
    const regExp = /^.*(youtu\.be\/|v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
}

function loadYouTube() {
    const url = document.getElementById("youtubeUrl").value;
    const videoId = extractVideoId(url);
    if (videoId) {
        ytPlayer.loadVideoById(videoId);
    } else {
        alert("ลิงก์ไม่ถูกต้อง");
    }
}

function togglePlayPause() {
    if (!ytPlayer) return;
    if (isPlaying) {
        ytPlayer.pauseVideo();
    } else {
        ytPlayer.playVideo();
    }
}

function muteToggle() {
    if (!ytPlayer) return;
    if (isMuted) {
        ytPlayer.unMute();
    } else {
        ytPlayer.mute();
    }
    isMuted = !isMuted;
}

function updateSeekBar() {
    if (!ytPlayer || !ytPlayer.getDuration) return;
    const current = ytPlayer.getCurrentTime();
    const duration = ytPlayer.getDuration();
    seekBar.max = Math.floor(duration);
    seekBar.value = Math.floor(current);
}

// กดเลื่อน seekBar เพื่อเปลี่ยนตำแหน่ง
seekBar.addEventListener('input', function () {
    if (ytPlayer && ytPlayer.seekTo) {
        ytPlayer.seekTo(parseInt(this.value), true);
    }
});

let volumeBar = document.getElementById('volumeBar');

// ปรับระดับเสียงเมื่อเลื่อนแถบ
volumeBar.addEventListener('input', function () {
    if (ytPlayer && ytPlayer.setVolume) {
        ytPlayer.setVolume(parseInt(this.value));
    }
});

function toggleYouTubeUI() {
    if (!isL) {
        const ui = document.getElementById('youtube-player-ui');
        ui.classList.toggle('visible');
    }
}