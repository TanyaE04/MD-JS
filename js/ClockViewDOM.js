class ClockViewDOM {
    angleStep = 6;
    angleHourStep = 30;
    radius = 0;

    constructor (container) {
        this.clock = container.querySelector(".picture");
        const height = getComputedStyle(this.clock).getPropertyValue("height");
        const width = getComputedStyle(this.clock).getPropertyValue("width");
        this.centerX = parseFloat(width) / 2;
        this.centerY = parseFloat(height) / 2;
        this.clockRadius = this.centerX > this.centerY ? this.centerY : this.centerX;
        this.indent = this.clockRadius / 20;
        this.drawTheClock();
    }

    drawTheClock () {
        this.drawBase();
        this.drawDial();
        this.drawHands();
    }

    drawBase () {
        this.clock.classList.add("circle");
    }

    drawDial () {
        let radians = 0;
        const dest = this.clockRadius - this.indent;
        this.radius = Math.round(dest / 6);
        const dial = document.createElement("div");
        for (let i = 0; i < 12; i++) {
          let circle = document.createElement("div");
          circle.classList.add("small-circle");
          circle.innerText = i === 0 ? 12 : i;
          circle.style.width = this.radius * 2 + "px";
          circle.style.height = this.radius * 2 + "px";
          circle.style.left = ((this.centerX + (dest - this.radius) * Math.sin(radians)) - this.radius) + "px";
          circle.style.top = ((this.centerY - (dest - this.radius) * Math.cos(radians)) - this.radius) + "px";
          radians += Math.PI / 6;
          dial.append(circle);
        }  
        this.clock.append(dial);
    }

    drawHands () {
        const handsDIV = document.createElement("div");
        handsDIV.classList.add("hand");
        this.clock.append(handsDIV);
        const strokeWidth = parseInt(getComputedStyle(handsDIV).getPropertyValue("width"));

        const hour = document.createElement("div");
        hour.classList.add("hand");
        hour.classList.add("hour-hand");
        hour.style.width = (this.centerY / 2) + "px";
        hour.style.height = (strokeWidth * 3) + "px";
        hour.style.top = (this.centerY - strokeWidth * 1.5) + "px";
        hour.style.left = this.centerX + "px";
        handsDIV.append(hour);

        const minute = document.createElement("div");
        minute.classList.add("hand");
        minute.classList.add("minute-hand");
        minute.style.width = this.clockRadius - this.indent - this.radius * 1.5 + "px";
        minute.style.height = (strokeWidth * 2) + "px";
        minute.style.top = (this.centerY - strokeWidth) + "px";
        minute.style.left = this.centerX + "px";
        handsDIV.append(minute);

        const second = document.createElement("div");
        second.classList.add("hand");
        second.classList.add("second-hand");
        second.style.width = this.clockRadius - this.indent - this.radius + "px";
        second.style.height = strokeWidth + "px";
        second.style.top = (this.centerY - strokeWidth / 2) + "px";
        second.style.left = this.centerX + "px";
        handsDIV.append(second);
    }

    tick (currentTime) {
        this.rotate(this.clock.querySelector(".hour-hand"), 
                    currentTime.hours * this.angleHourStep + currentTime.minutes / 2 + currentTime.seconds / 120);

        this.rotate(this.clock.querySelector(".minute-hand"), currentTime.minutes * this.angleStep + currentTime.seconds / 10);

        this.rotate(this.clock.querySelector(".second-hand"), currentTime.seconds * this.angleStep);
    }

    rotate (hand, angle) {
        hand.style.transform = "rotate(" + (angle - 90) + "deg)";
    }

    stop (currentTime) {
        console.log("hi");
        this.tick(currentTime);
    }

}