import React from 'react';
import '../ComponentStyles/BreakInterval.css';

function BreakInterval(props) {
  function increaseCounter() {
    props.onBreakIntervalChange(props.breakInterval + 1);
  }

  function decreaseCounter() {
    const currentInterval = props.breakInterval;

    if (currentInterval === 0) {
      return;
    }

    props.onBreakIntervalChange(currentInterval - 1);
  }

  return (
    <section id="break-interval-container">
      <h4>Break Length</h4>
      <section id="break-time-interval">
        <button
        disabled = {props.isPlay ? "disabled" : ""}
        onClick = {decreaseCounter}
        className='counter-btn'>Down</button>
        <p className="break-time">{props.breakInterval}</p>
        <button
        disabled = {props.isPlay ? "disabled" : ""}
        onClick = {increaseCounter}
        className="counter-btn">Up</button>
      </section>
    </section>
  )
}

export default BreakInterval;