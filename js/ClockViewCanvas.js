class ClockViewCanvas {
    indent = 0;
    strokeWidth = 3;
    centerX = 0;
    centerY = 0;
    clockRadius = 0;

    constructor (container) {
        const pictureElement = container.querySelector(".picture");
        const height = getComputedStyle(pictureElement).getPropertyValue("height");
        const width = getComputedStyle(pictureElement).getPropertyValue("width");
        pictureElement.innerHTML = `<canvas width="${parseFloat(width)}" height="${parseFloat(height)}"></canvas>`
        this.canvas = pictureElement.querySelector("canvas");
        this.ctx = this.canvas.getContext("2d")
        this.centerX = parseFloat(width) / 2;
        this.centerY = parseFloat(height) / 2;
        this.clockRadius = this.centerX > this.centerY ? this.centerY : this.centerX;
        this.indent = this.clockRadius / 5;
    }

    tick(currentTime) {
        this.drawClock(currentTime);
    }

    stop(currentTime) {
        this.drawClock(currentTime);
    }

    drawClock(currentTime) {
        this.ctx.clearRect(0, 0, this.centerX * 2, this.centerY * 2);
        this.drawBase();
        this.drawDial();
        this.drawHands(currentTime);
        this.ctx.restore();
    }

    drawBase () {
        const gradient = this.ctx.createRadialGradient(this.centerX, this.centerY, this.clockRadius, this.centerX, this.centerY, 0);
        gradient.addColorStop(0, "#06063d");
        gradient.addColorStop(1, "white");
        this.ctx.fillStyle = gradient;
        this.ctx.beginPath();
        this.ctx.arc(this.centerX, this.centerY, this.clockRadius, 0, Math.PI * 2);
        this.ctx.fill();
    }

    drawDial () {
        let radians = 0;
        const radius = (this.clockRadius - this.indent) / 5;
        const dest = this.clockRadius - this.indent;
        for (let i = 0; i < 12; i++) {
            this.ctx.fillStyle = "#c9abea";
            this.ctx.shadowColor = "#c9abea";
            this.ctx.shadowBlur = 10;
            this.ctx.beginPath();
            this.ctx.arc(this.centerX + dest * Math.sin(radians), this.centerY - dest * Math.cos(radians), radius, 0, Math.PI * 2);
            this.ctx.fill();

            this.ctx.font = "32px serif";
            this.ctx.textAlign = "center";
            this.ctx.textBaseline = "middle";
            this.ctx.fillStyle = "white";
            this.ctx.fillText(`${i === 0 ? 12 : i}`, this.centerX + dest * Math.sin(radians), this.centerY - dest * Math.cos(radians));
            radians += Math.PI / 6;
        }
    }

    drawHands (currentTime) {
        let h = currentTime.hours;
        let min = currentTime.minutes;
        let sec = currentTime.seconds;

        //hands
        this.ctx.save();
        this.ctx.translate(this.centerX, this.centerY);
        this.ctx.rotate(- Math.PI / 2);
        this.ctx.strokeStyle = "black";

        //hour hand
        this.ctx.save();
        this.ctx.rotate(h * (Math.PI / 6) + min * (Math.PI / 360) + sec * (Math.PI / 21600));
        this.ctx.beginPath();
        this.ctx.lineWidth = this.strokeWidth * 3;
        this.ctx.moveTo(0, 0);
        this.ctx.lineTo(this.centerX / 2, 0);
        this.ctx.stroke();
        this.ctx.restore();

        //minute hand
        this.ctx.save();
        this.ctx.rotate(min * (Math.PI / 30) + sec * (Math.PI / 1800));
        this.ctx.beginPath();
        this.ctx.lineWidth = this.strokeWidth * 2;
        this.ctx.moveTo(0, 0);
        this.ctx.lineTo(this.centerX / 2 + (this.clockRadius - this.indent) / 5, 0);
        this.ctx.stroke();
        this.ctx.restore();

        //second hand
        this.ctx.save();
        this.ctx.rotate(sec * (Math.PI / 30));
        this.ctx.beginPath();
        this.ctx.lineWidth = this.strokeWidth;
        this.ctx.strokeStyle = "red";
        this.ctx.moveTo(0, 0);
        this.ctx.lineTo(this.centerX / 2 + this.indent, 0);
        this.ctx.stroke();
        this.ctx.restore();
    }

}