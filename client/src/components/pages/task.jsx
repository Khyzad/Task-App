import React, { Component } from 'react'
import {
	touch,
	getTasks,
	toggleComplete,
	deleteTask
} from '../../actions/tasksActions';
import { connect } from 'react-redux'

class Task extends Component {
	constructor(props) {
		super(props)

		this.state = {
			completed: props.task.completed,
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

	componentWillReceiveProps(nextProps) {
		if (nextProps.task.completed !== this.props.task.completed)
			this.setState({completed: this.props.task.completed})
	}


	render() {
		const { task, i } = this.props;
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