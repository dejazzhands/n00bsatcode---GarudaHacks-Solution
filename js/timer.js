class State
{
    constructor(startTimeStamp, difference, suspended) {
        this.startTimeStamp = startTimeStamp;
        this.difference = difference;
        this.suspended = suspended;
    }
    static ready()
    {
    return new State(null, 0, 0);
    }
}

class Stopwatch {
    constructor(state) {
        this.state = state;
        this.requestAnimationID = null;
        this.handleClickStart = this.handleClickStart.bind(this);
        document
            .getElementById("start")
            .addEventListener("click", this.handleClickStart);
        this.handleClickStop = this.handleClickStop.bind(this);
        document
            .getElementById("reset")
            .addEventListener("click", this.handleClickStop);
        this.handleClickReset = this.handleClickReset.bind(this);
        document
            .getElementById("reset")
            .addEventListener("click", this.handleClickReset);
        this.tick = this.tick.bind(this);
        this.render();
    }
    static ready() {
        return new Stopwatch(State.ready());
    }

    setState(newState) {
        this.state = {...this.state, ...newState};
        this.render();
    }

    tick()
    {
    this.setState({
        difference: new Date(new Date() - this.state.startTimeStamp)
    })
    this.requestAnimationID = requestAnimationFrame(this.tick);
    }
    handleClickStart() {
    if(this.state.startTimeStamp) {
        return;
    }
    this.setState({
        startTimestamp: new Date() - this.state.suspended,
        suspended = 0
    });
    this.requestAnimationID = requestAnimationFrame(this.tick);
    }

    handleClickStop() {
        cancelAnimationFrame(this.requestAnimationID);
        this.setState({
            startTimeStamp: null,
            suspended: this.state.difference
        });
    }

    handleClickReset() {
        cancelAnimationFrame(this.requestAnimationID);
        this.setState(State.ready());
    }

    render() {
        const {difference} = this.state;
        const seconds = (difference ? Math.floor(difference.getSeconds()) : 0)
        .toString()
        .padStart(2, "0");
        const minutes = (difference ? Math.floor(difference.getMinutes()) : 0)
        .toString()
        .padStart(2, "0");
        const hours = (difference ? Math.floor(difference.getHours()) : 0)
        .toString()
        .padStart(2, "0");

        document.getElementById("hours").textContent = hours;
        document.getElementById("minutes").textContent = minutes;
        document.getElementById("seconds").textContent = seconds;
    }
}

const STOPWATCH = Stopwatch.ready();