updateClock = () => {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, "0");//nếu ko đủ độ dài là 2 sẽ chèn 0 ở trước
    const minutes = String(now.getMinutes()).padStart(2, "0");//nếu ko đủ độ dài là 2 sẽ chèn 0 ở trước
    const seconds = String(now.getSeconds()).padStart(2, "0");//nếu ko đủ độ dài là 2 sẽ chèn 0 ở trước
    //ghép giờ phút giây
    const clock = `${hours}:${minutes}:${seconds}`;

    document.getElementById("clock").innerHTML = clock;
}

setInterval(updateClock, 1000);// lặp lại infinity
