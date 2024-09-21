class Clock {
    timerId = 0;
    currentTime ={
        hours: 0,
        minutes: 0,
        seconds: 0
    }
    constructor (view) {
        this.view = view;
    }

    start (timeZone) {
        this.timerId = setInterval (() => {
            this.setCurrentTime(timeZone);
            this.view.tick(this.currentTime);
        }, 1000);
    }

    stop () {
        clearInterval(this.timerId);
        this.view.stop(this.currentTime);
    }

    setCurrentTime (timeZone) {
        const timeArr = new Date().toLocaleTimeString("ru-RU", {timeZone: `${timeZone}`}).split(":");
        let sec = timeArr[2];
        let min = timeArr[1];
        let h = timeArr[0] > 12 ? timeArr[0] - 12 : timeArr[0];
        if (sec > 59) {
          min += Math.floor(sec / 60);
          sec = sec % 60;
          if (min > 59) {
            h += Math.floor(min / 60);
            min = min % 60;
            h > 12 ? h - 12 : h;
          }
        } 
        this.currentTime.seconds = sec;
        this.currentTime.minutes = min;
        this.currentTime.hours = h;
    }
}