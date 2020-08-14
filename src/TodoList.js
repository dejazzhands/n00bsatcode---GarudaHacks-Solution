import React, { useState, useEffect } from 'react';

var rand = require("random-key");

function TodoList () {
  const [tasks, setTasks] = useState(JSON.parse(localStorage.getItem('tasks')) || []);

  const [input, setInput] = useState('');
  const inputChangeHandler = e => {
    setInput(e.target.value);
  }

  const addTaskHandler = e => {
    if (input !== '') {
      setTasks([...tasks, {
        name: input,
        id: rand.generate(5),
        completed: false
      }]);
      setInput('');
    }
  }

  const completeTaskHandler = e => {
    const selectedTask = tasks.find(task => task.id === e.target.id);
    const { completed, name, id } = selectedTask;
    const updatedTask = {
      name,
      id,
      completed: !completed
    }
    const otherTasks = tasks.filter(task => task.id !== e.target.id)
    setTasks([...otherTasks, updatedTask])
  }

  const enterTaskHandler = e => {
    if (e.keyCode === 13) {
      addTaskHandler();
    }
  }

  const deleteTaskHandler = e => {
    const incompleteTasks = tasks.filter(task => !task.completed);
    setTasks(incompleteTasks);
  }

  useEffect(() => {
    console.log(tasks);
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks])

  const TaskItem = ({ task, classes }) => (
    <li
      key={task.id}
      id={task.id}
      className={classes}
      onClick={completeTaskHandler}
    >
      {task.name}
    </li>
  );

    return (
      <div className="todo-list">
        <h1>Tasks</h1>
        <ul className="incomplete-tasks">
          {tasks.filter(task => !task.completed).map(task =>
            <TaskItem key={task.id} task={task} classes="task-wrapper"/>
          )}
        </ul>
        <ul className="complete-tasks">
          {tasks.filter(task => task.completed).map(task =>
            <TaskItem key={task.id} task={task} classes="task-wrapper completed"/>
          )}
        </ul>
        <div className="task-input">
          <button className="add-task-btn" type="button" onClick={addTaskHandler}>+</button>
          <input value={input} onChange={inputChangeHandler} onKeyUp={enterTaskHandler} type="text"/>
        </div>
        <div>
          <button className="clear-tasks-btn" onClick={deleteTaskHandler}>Clear completed tasks</button>
        </div>
      </div>
    )
}

export default TodoList;
