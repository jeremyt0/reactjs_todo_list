// import { render } from '@testing-library/react';
import { Component, React } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Header from './components/layout/Header';
import Todos from './components/Todo';
import AddTodo from './components/AddTodo';
import About from './components/pages/About';
// import {v4 as uuid} from 'uuid';
import axios from 'axios';

class App extends Component {
    state = {
      todos: []
    }

    componentDidMount() {
      axios.get('https://jsonplaceholder.typicode.com/todos?_limit=10').then(res => this.setState({ todos: res.data }))
    }

    // Toggle if todo is complete
    markComplete = (id) => {
      this.setState({ todos: this.state.todos.map(todo => {
        if (todo.id === id) {
          todo.completed = !todo.completed
        }
        return todo;
      }) });
    }

    // Delete todo
    delTodo = (id) => {
      axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`).then(
        res => this.setState({ todos: [...this.state.todos.filter(todo => todo.id !== id)] })
      )
    }

    // Add todo
    addTodo = (title) => {
      axios.post('https://jsonplaceholder.typicode.com/todos', {
        title: title,
        completed: false
      })
        .then(res => this.setState({ 
          todos: [...this.state.todos, res.data] 
        })
        );
      
    }


    render() {
      return (

        <Router>

          <body>
            <div className="app">
              <div className="container">
                <Header />

                <Route exact path="/" render={ props => (
                  <>

                    <AddTodo addTodo={this.addTodo} />
                    <Todos todos={this.state.todos} delTodo={this.delTodo} markComplete={this.markComplete}/>

                  </>
                ) }/>

                <Route path="/about" component={About} />

              </div>
            </div>
          </body>

      </Router>

      );
    }
}


export default App;
