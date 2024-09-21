class ClockControllerButtons {
    
    constructor (model, container) {
        this.model = model;
        this.container = container;
        this.timeZone = container.querySelector(".time-zone").dataset.timeZone;

        const btnStart = container.querySelector(".start");
        btnStart.addEventListener("click", (event) => {
            event.preventDefault();
            this.model.start(this.timeZone);
        })

        const btnStop = container.querySelector(".stop");
        btnStop.addEventListener("click", (event) => {
            event.preventDefault();
            this.model.stop();
        })

        document.addEventListener("DOMContentLoaded", () => {
            this.model.start(this.timeZone);
          });
    }
}