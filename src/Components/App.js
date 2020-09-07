import React from 'react';
import '../ComponentStyles/App.css';
import BreakInterval from './BreakInterval';
import SessionInterval from './SessionInterval';
import Timer from './Timer';
import ListItems from './ListItems';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

library.add(faTrash);

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      items:[],
      currentItem:{text:'',key:''},
      breakInterval: 5,
      sessionInterval: 25,
      timerMinute: 25,
      isPlay: false,
    }

    this.onBreakIntervalChange = this.onBreakIntervalChange.bind(this);
    this.onSessionIntervalChange = this.onSessionIntervalChange.bind(this);
    this.onTimerMinuteChange = this.onTimerMinuteChange.bind(this);
    this.onPlayChange = this.onPlayChange.bind(this);
    this.onResetTimer = this.onResetTimer.bind(this);

    this.addItem = this.addItem.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.setUpdate = this.setUpdate.bind(this);
  }

  onPlayChange(isPlay) {
    this.setState({
      isPlay: isPlay
    })
  }

  onBreakIntervalChange(newBreakLength) {
    this.setState({
      breakInterval: newBreakLength
    })
  }

  onSessionIntervalChange(newSessionLength) {
    this.setState({
      sessionInterval: newSessionLength,
      timerMinute: newSessionLength
    })
  }

  onTimerMinuteChange(minuteChange) {
    this.setState({
      timerMinute: minuteChange
    })
  }

  onResetTimer() {
    this.setState({
      sessionInterval: 25,
      timerMinute: 25,
      breakInterval: 5
    })
  }

  addItem(e){
    e.preventDefault();
    const newItem = this.state.currentItem;
    if(newItem.text !==""){
      const items = [...this.state.items, newItem];
    this.setState({
      items: items, 
      currentItem:{ text:'', key:''}
    })
    }
  }

  handleInput(e){
    this.setState({
      currentItem:{
        text: e.target.value,
        key: Date.now()
      }
    })
  }

  deleteItem(key){
    const filteredItems= this.state.items.filter(item =>
      item.key!==key);
    this.setState({
      items: filteredItems
    })
  }

  setUpdate(text,key){
    console.log("items:"+this.state.items);
    const items = this.state.items;
    items.map(item=>{      
      if(item.key===key){
        console.log(item.key +"    "+key)
        item.text= text;
      }
    })
    this.setState({
      items: items
    })
  }

  render() {
    return (
      <main className="App">
          <section>
            <h2 className="app-title">Student's Solution</h2>
            <section id="interval-container">
              <BreakInterval
              onBreakIntervalChange = {this.onBreakIntervalChange}
              breakInterval = {this.state.breakInterval}
              isPlay = {this.state.isPlay}
              />
              <SessionInterval
              onSessionIntervalChange = {this.onSessionIntervalChange}
              sessionInterval = {this.state.sessionInterval}
              isPlay = {this.state.isPlay}
              />
              </section>
              <Timer
              sessionInterval = {this.state.sessionInterval}
              timerMinute = {this.state.timerMinute}
              onTimerMinuteChange = {this.onTimerMinuteChange}
              breakInterval = {this.state.breakInterval}
              onPlayChange = {this.onPlayChange}
              resetTimer = {this.onResetTimer}
              />
          </section>
          <section className="TodoApp">
            <div>
              <form id="to-do-form" onSubmit={this.addItem}>
                <input type="text" placeholder="Enter your task here..." value= {this.state.currentItem.text} onChange={this.handleInput}></input>
                <button type="submit">Add</button>
              </form>
                <p>{this.state.items.text}</p>
                <ListItems items={this.state.items} deleteItem={this.deleteItem} setUpdate={this.setUpdate}/>
            </div>
          </section>
      </main>
    )
  }
}

export default App;