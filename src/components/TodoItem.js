import React, { Component } from 'react'
import PropTypes from 'prop-types';


export class TodoItem extends Component {
    getStyle = () => {
        return {
            background: 'grey',
            padding: '10px',
            borderBottom: '1px #ccc dotted',
            textDecoration: this.props.todo.completed ? 'line-through' : 'none'
        }
    }


    render() {

        const { id, title } = this.props.todo;

        return (
            <div style={ this.getStyle() }>
                    <input type="checkbox" onChange={this.props.markComplete.bind(this, id)}/>
                    <h3> { title } </h3>
                    <button onClick={this.props.delTodo.bind(this, id)} style={btnStyle}>x</button>
            </div>
        )
    }
}

// PropTypes
TodoItem.propTypes = {
    todos: PropTypes.array.isRequired,
    markComplete: PropTypes.func.isRequired,
    delTodo: PropTypes.func.isRequired,
}

const btnStyle = {
    backgroundColor: 'red',
    color: 'white',
    border: 'none',
    padding: '5px 8px',
    borderRadius: '50%',
    cursor: 'pointer'
}

export default TodoItem
