import React, { Component } from 'react'
import {
	touch,
	getTasks,
	toggleComplete,
	deleteTask
} from '../../actions/userActions';
import { connect } from 'react-redux'

class Task extends Component {
	constructor(props) {
		super(props)

		console.log(props.task)

		this.state = {
			task: props.task,
			i: props.i,
			globalCheck: false,
		}
	}

	className = (task) => {
		if (task.completed)
			return "completed-button"
		else
			return "inprogress-button"
	}

	toggleComplete = e => {
		this.props.toggleComplete(this.props.task, this.props.i);
	}

	deleteTask = e => {
		this.props.deleteTask(this.props.task, this.props.i);
	}

	value = task => {
		if (task.completed)
			return "✓"
		else
			return "O"
	}

	strike = task => {
		if (task.completed)
			return {
				textDecoration: 'line-through red'
			}
	}

	doubleclick = e => {

	}

	componentDidUpdate(props) {
		console.log(props)
		if (this.state.task !== props.task)
			this.setState({task: props.task})
	}


	render() {
		const { task, i } = this.state//props;
		return (
			<tr key = {"row" + i} >
				<td>
					<button
						className="delete-button"
						name={i}
						onClick={this.deleteTask}>X
					</button>
				</td>
				<td>
					<button
						className={this.className(task)}
						name={i}
						onClick={this.toggleComplete}>
						{this.value(task)}
					</button>
				</td>
				<td onDoubleClick={this.doubleclick}
					style={this.strike(task)}>
					{task.title}
				</td>
			</tr>
		)
	}
}

export default connect(null, { touch, getTasks, toggleComplete, deleteTask })(Task)