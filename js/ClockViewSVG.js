class ClockViewSVG {
    svg_ns = "http://www.w3.org/2000/svg";
    angleStep = 6;
    angleHourStep = 30;
    strokeWidth = 3;
    centerX = 0;
    centerY = 0;
    indent = 0;
    clockRadius = 0;

    hands = {
        hourHand: document.createElementNS(this.svg_ns, "line"),
        minuteHand: document.createElementNS(this.svg_ns, "line"),
        secondHand: document.createElementNS(this.svg_ns, "line")
    };

    constructor (container) {
        const pictureElement = container.querySelector(".picture");
        const height = getComputedStyle(pictureElement).getPropertyValue("height");
        const width = getComputedStyle(pictureElement).getPropertyValue("width");
        pictureElement.innerHTML = `<svg width="${parseFloat(width)}" height="${parseFloat(height)}"></svg>`;
        this.svg = pictureElement.querySelector("svg");
        this.addDefs();
        this.centerX = parseFloat(width) / 2;
        this.centerY = parseFloat(height) / 2;
        this.clockRadius = this.centerX > this.centerY ? this.centerY : this.centerX;
        this.indent = this.clockRadius / 5;
        this.drawTheClock();
    }

    drawTheClock () {
        this.svg.append(this.drawBase());
        this.svg.append(this.drawDial());
        this.drawHands();
        this.svg.append(this.hands.hourHand);
        this.svg.append(this.hands.minuteHand);
        this.svg.append(this.hands.secondHand);
    }

    drawBase () {
        const clock = document.createElementNS(this.svg_ns, "circle");
        clock.setAttributeNS(null, "cx", this.centerX);
        clock.setAttributeNS(null, "cy", this.centerY);
        clock.setAttributeNS(null, "r", this.clockRadius);
        clock.setAttributeNS(null, "id", "theClock");
        clock.setAttributeNS(null, "fill", "url(#Gradient)");
        return clock;
    }

    drawDial () {
        const dialGroup = document.createElementNS(this.svg_ns, "g");
        dialGroup.setAttributeNS(null, "fill", "white");

        let radians = 0;
        const radius = (this.clockRadius - this.indent) / 5;
        const dest = this.clockRadius - this.indent;

        for (let i = 0; i < 12; i++) {
          let circle = document.createElementNS(this.svg_ns, "circle");
          circle.setAttributeNS(null, "cx", this.centerX + dest * Math.sin(radians));
          circle.setAttributeNS(null, "cy", this.centerY - dest * Math.cos(radians));
          circle.setAttributeNS(null, "r", radius);
          circle.setAttributeNS(null, "fill", "#c9abea");
          circle.setAttributeNS(null, "filter", "url(#blur)");
          radians += Math.PI / 6;
          dialGroup.append(circle);

          const text = document.createElementNS(this.svg_ns, "text");
          text.setAttributeNS(null, "x", circle.getAttributeNS(null, "cx"));
          text.setAttributeNS(null, "y", circle.getAttributeNS(null, "cy"));
          text.innerHTML = i === 0 ? 12 : i;
          dialGroup.append(text);
        }
        return dialGroup;
    }

    drawHands () {
        const hands = this.hands;
        for (let key in hands) {
          hands[key].setAttributeNS(null, "id", key);
          hands[key].setAttributeNS(null, "x1", this.centerX);
          hands[key].setAttributeNS(null, "y1", this.centerY);
          hands[key].setAttributeNS(null, "x2", this.centerX);
        }
          
        hands.hourHand.setAttributeNS(null, "y2", this.centerY / 2);
        hands.hourHand.setAttributeNS(null, "stroke-width", this.strokeWidth * 3);
        hands.hourHand.setAttributeNS(null, "stroke", "black");
  
        hands.minuteHand.setAttributeNS(null, "y2", this.indent + ((this.clockRadius - this.indent) / 7));
        hands.minuteHand.setAttributeNS(null, "stroke-width", this.strokeWidth * 2);
        hands.minuteHand.setAttributeNS(null, "stroke", "black");
  
        hands.secondHand.setAttributeNS(null, "y2", this.indent);
        hands.secondHand.setAttributeNS(null, "stroke-width", this.strokeWidth);
        hands.secondHand.setAttributeNS(null, "stroke", "red");
    }

    tick (currentTime) {
        this.rotate(this.hands.secondHand, currentTime.seconds * this.angleStep);
        this.rotate(this.hands.minuteHand, currentTime.minutes * this.angleStep + currentTime.seconds / 10);
        this.rotate(this.hands.hourHand, currentTime.hours * this.angleHourStep + currentTime.minutes / 2 + currentTime.seconds / 120);
    }

    rotate (hand, angle) {
        hand.setAttributeNS(null, "transform", `rotate(${(angle)}, ${this.centerX}, ${this.centerY})`);
    }

    stop (currentTime) {
        this.tick(currentTime);
    }

    addDefs() {
        this.svg.innerHTML = `<defs>
        <radialGradient id="Gradient">
          <stop offset="0" stop-opacity="0.98047" stop-color="#c2c2ed" />
          <stop offset="0" stop-opacity="0.99219" stop-color="#fcfcff" />
          <stop offset="1" stop-opacity="0.98047" stop-color="#06063d" />
          <stop offset="1" stop-opacity="0.99609" stop-color="#000000" />
        </radialGradient>
        <filter id="blur">
          <feGaussianBlur in="SourceGraphic" stdDeviation="5" />
        </filter>
      </defs>`;
    }
}