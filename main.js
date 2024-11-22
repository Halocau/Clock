// Danh sách bài hát
const playlist = ["music1.mp3", "music2.mp3", "music3.mp3"];
let currentSongIndex = 0;
let isRepeat = false;

// Lấy các phần tử DOM
const music = document.getElementById("background-music");
const audioSource = document.getElementById("audio-source");
const playPauseButton = document.getElementById("play-pause");
const volumeSlider = document.getElementById("volume-slider");
const progressBar = document.getElementById("progress-bar");
const currentTimeEl = document.getElementById("current-time");
const totalDurationEl = document.getElementById("total-duration");
const nextButton = document.getElementById("next");
const prevButton = document.getElementById("prev");
const repeatButton = document.getElementById("repeat");
const volumeIcon = document.getElementById("volume-icon");
const volumePopup = document.getElementById("volume-popup");

// Đồng hồ thời gian
function updateClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");
    document.getElementById("clock").innerHTML = `${hours}:${minutes}:${seconds}`;
}
setInterval(updateClock, 1000);

// Phát hoặc dừng nhạc
function toggleMusic() {
    if (music.paused) {
        music.play();
        playPauseButton.textContent = "⏸️";
    } else {
        music.pause();
        playPauseButton.textContent = "▶️";
    }
}
playPauseButton.addEventListener("click", toggleMusic);

// Định dạng thời gian
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
}

// Cập nhật thanh tiến trình và thời gian
function updateProgress() {
    const currentTime = music.currentTime;
    const duration = music.duration;

    currentTimeEl.textContent = formatTime(currentTime);
    totalDurationEl.textContent = duration ? formatTime(duration) : "00:00";

    const progressPercent = (currentTime / duration) * 100;
    progressBar.value = progressPercent || 0;
}

progressBar.addEventListener("input", (e) => {
    const newTime = (e.target.value / 100) * music.duration;
    music.currentTime = newTime;
});

music.addEventListener("timeupdate", updateProgress);

// Điều chỉnh âm lượng
volumeSlider.addEventListener("input", (e) => {
    music.volume = e.target.value / 100;
});

// Phát bài hát tiếp theo
function playNextSong() {
    currentSongIndex = (currentSongIndex + 1) % playlist.length;
    loadSong();
    music.play();
    playPauseButton.textContent = "⏸️";
}

nextButton.addEventListener("click", playNextSong);

// Phát bài hát trước đó
function playPrevSong() {
    currentSongIndex = (currentSongIndex - 1 + playlist.length) % playlist.length;
    loadSong();
    music.play();
    playPauseButton.textContent = "⏸️";
}

prevButton.addEventListener("click", playPrevSong);

// Tải bài hát mới
function loadSong() {
    audioSource.src = playlist[currentSongIndex];
    music.load(); // Tải lại bài hát mới
    updateProgress(); // Cập nhật thanh tiến trình
}

// Lặp lại bài hát
function toggleRepeat() {
    isRepeat = !isRepeat;
    repeatButton.style.color = isRepeat ? "#00cc99" : "#00ffcc";
}

repeatButton.addEventListener("click", toggleRepeat);

// Xử lý sự kiện khi bài hát kết thúc
music.addEventListener("ended", () => {
    if (isRepeat) {
        music.currentTime = 0;
        music.play();
    } else {
        playNextSong();
    }
});

// Hiển thị/Ẩn thanh âm lượng khi nhấn vào loa
volumeIcon.addEventListener("click", () => {
    volumePopup.classList.toggle("show");
});
