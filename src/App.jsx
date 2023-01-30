import React, { Component } from 'react';
import './App.css';

export class App extends Component {
  state = {
    tasks: '',
    tasksSave: [],
    tasksCompleted: [],
  };

  componentDidMount() {
    this.recoverTask();
  }

  getInput = ({ target: { value } }) => {
    this.setState({
      tasks: value,
    });
  };

  deleteTask = (index) => {
    console.log('oi');
    const { tasksSave } = this.state;
    const newTask = tasksSave.filter((_, i) => i !== index);
    this.setState({
      tasksSave: newTask,
    }, () => {
      localStorage.setItem('task', JSON.stringify(newTask));
    });
  };

  recoverTask = () => {
    const tasksLocalStorage = JSON.parse(localStorage.getItem('task'));
    if (tasksLocalStorage) {
      this.setState({
        tasksSave: tasksLocalStorage,
      });
    }

    const tasksCompleteLocalStorage = JSON.parse(localStorage.getItem('complete'));
    if (tasksCompleteLocalStorage) {
      this.setState({
        tasksCompleted: tasksCompleteLocalStorage,
      });
    }
  };

  handleTask = () => {
    const { tasks, tasksSave } = this.state;
    const newTasks = tasksSave.length === 0 ? [tasks] : [...tasksSave, tasks];
    this.setState({
      tasksSave: newTasks,
      tasks: '',
    }, () => {
      localStorage.setItem('task', JSON.stringify(newTasks));
    });
  };

  taskCompleted = (index) => {
    const { tasksSave, tasksCompleted } = this.state;
    const taskCheck = tasksSave[index];
    const taskFiltered = tasksSave.filter((_, i) => i !== index);
    const newArrayTask = tasksCompleted.length === 0
      ? [taskCheck] : [...tasksCompleted, taskCheck];
    this.setState({
      tasksSave: taskFiltered,
      tasksCompleted: newArrayTask,
    }, () => {
      localStorage.setItem('task', JSON.stringify(taskFiltered));
      localStorage.setItem('complete', JSON.stringify(newArrayTask));
    });
  };

  deleteCompleteTask = (index) => {
    console.log(index);
    const { tasksCompleted } = this.state;
    const newTasksComplet = tasksCompleted.filter((_, i) => i !== index);
    this.setState({
      tasksCompleted: newTasksComplet,
    }, () => {
      localStorage.setItem('complete', JSON.stringify(newTasksComplet));
    });
  };

  render() {
    const { tasks, tasksSave, tasksCompleted } = this.state;
    const { handleTask, getInput, deleteTask, taskCompleted, deleteCompleteTask } = this;
    return (
      <section>
        <header className="header">
          <h1>
            Lista de Tarefas
          </h1>
        </header>

        <div>
          <form>
            <h3>Adicionar uma tarefa</h3>
            <input
              type="text"
              id="input"
              value={ tasks }
              onChange={ getInput }
            />
            <button
              type="button"
              onClick={ () => handleTask() }
              disabled={ tasks.length === 0 }
            >
              Adicionar tarefa
            </button>

            {/* <select id="escolha">
              <option value="suave">Tranquila</option>
              <option value="deboa">Moderada</option>
              <option value="hard">Urgente</option>
            </select> */}
          </form>
        </div>

        <div>
          {
            tasksSave.map((task, index) => (
              <ul key={ index }>
                <li>{task}</li>
                <button
                  type="button"
                  onClick={ () => deleteTask(index) }
                >
                  Excluir Tarefa
                </button>
                <button
                  type="button"
                  onClick={ () => taskCompleted(index) }
                >
                  Concluido
                </button>
              </ul>
            ))
          }
        </div>

        <div>
          <h3>Tarefas Concluidas</h3>

          {
            tasksCompleted.map((task, index) => (
              <ul key={ index }>
                <li>{task}</li>
                <button
                  type="button"
                  onClick={ () => deleteCompleteTask(index) }
                >
                  Excluir tarefa
                </button>
              </ul>
            ))
          }
        </div>

      </section>
    );
  }
}
