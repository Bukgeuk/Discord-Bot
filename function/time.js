exports.MsToTime = function (duration) {
    let milliseconds = parseInt((duration % 1000) / 100)
    let seconds = parseInt((duration / 1000) %60)
    let minutes = parseInt((duration / (1000 * 60)) % 60)
    let hours = parseInt((duration / (1000 * 60 * 60)) % 24)
    let days = parseInt(duration / (1000 * 60 * 60 * 24))

    /*hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;*/
    milliseconds = (milliseconds < 10) ? "0" + milliseconds : milliseconds;

    return days + "일 " + hours + "시간 " + minutes + "분 " + seconds + "초 " + milliseconds;
}
