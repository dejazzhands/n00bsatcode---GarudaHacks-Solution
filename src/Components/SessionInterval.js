import React from 'react';
import '../ComponentStyles/SessionInterval.css';

function SessionInterval(props) {

  function increaseCounter() {
    const currentInterval = props.sessionInterval;

    if (currentInterval >= 60) {
      return;
    }
    props.onSessionIntervalChange(props.sessionInterval + 1);
  }

  function decreaseCounter() {
    const currentInterval = props.sessionInterval;

    if (currentInterval === 0) {
      return;
    }

    props.onSessionIntervalChange(currentInterval - 1);
  }

  return (
    <section id="session-interval-container">
      <h4>Session Length</h4>
      <section id="session-interval">
        <button
        disabled = {props.isPlay ? "disabled" : ""}
        onClick = {decreaseCounter}
        className="counter-btn">Down</button>
        <p className="session-time">{props.sessionInterval}</p>
        <button
        disabled = {props.isPlay ? "disabled" : ""}
        onClick = {increaseCounter}
        className="counter-btn">Up</button>
      </section>
    </section>
  )
}

export default SessionInterval;