import React from 'react';
import '../ComponentStyles/SessionActions.css';
import '../ComponentStyles/Timer.css';

class Timer extends React.Component {
  constructor() {
    super()

    this.state = {
      timerSeconds: 0,
      intervalId: '',
      isSessionInterval: true
    }

    this.playStopTimer = this.playStopTimer.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
  }

  playStopTimer(event) {
    const action = event.target.dataset.type;

    switch (action) {
      case 'play':
        this.props.onPlayChange(true);
        this.decreaseTimer();
        break;
      case 'stop':
        this.props.onPlayChange(false);
        clearInterval(this.state.intervalId);
        break;
      default:
        break;
    }
  }

  decreaseTimer() {
    let intervalId = setInterval(() => {
      switch(this.state.timerSeconds) {
        case 0:
          if (this.props.timerMinute === 0) {
            if (this.state.isSessionInterval) {
              // start break timer
              this.setState({
                isSessionInterval: false
              })

              this.props.onTimerMinuteChange(this.props.breakInterval);
            } else {
              // start session timer
              this.setState({
                isSessionInterval: true
              })

              this.props.onTimerMinuteChange(this.props.sessionInterval);
            }
          } else {
            this.props.onTimerMinuteChange(this.props.timerMinute - 1);
            this.setState({
              timerSeconds: 59
            })
          }
          break;
        default:
        this.setState({
          timerSeconds: this.state.timerSeconds - 1
        })
          break;
      }
    }, 1000);

    this.setState({
      intervalId: intervalId
    });
  }

  resetTimer() {
    clearInterval(this.state.intervalId);

    this.props.resetTimer();
    this.props.onPlayChange(false);

    this.setState({
      timerSeconds: 0
    })
  }

  render() {
    let timerClass = this.props.timerMinute === 0 ? "timer-alert" : "";
    timerClass += " session-timer";
    return (
      <section>
        <section id="session-container">
          <h4 className="session-header">{this.state.isSessionInterval ? 'Session' : 'Break'}</h4>
          <span
          className={timerClass}>
          {this.props.timerMinute}</span>
          <span
          className={timerClass}
          id="colon">:</span>
          <span
          className={timerClass}>{this.state.timerSeconds === 0 ? '00' : this.state.timerSeconds < 10 ? '0' + this.state.timerSeconds : this.state.timerSeconds}</span>
        </section>
        <section id="actions-container">
          <button data-type="play" onClick = {this.playStopTimer}>Play</button>
          <button data-type="stop" onClick = {this.playStopTimer}>Stop</button>
          <button onClick = {this.resetTimer}>Refresh</button>
        </section>
      </section>
    )
  }
}

export default Timer;