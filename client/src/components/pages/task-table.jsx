import React, { Component } from 'react';
import { touch, getTasks, toggleComplete, deleteTask } from '../../actions/userActions';
import Task from './task';
import { connect } from 'react-redux';
import {
	Table,
} from 'reactstrap';

class TaskTable extends Component {
	constructor(props) {
		super(props)

		this.state = {
			tasks: props.tasks,
			globalCheck: false,
		}
	}

	globalCheck = e => {
		console.log(this.state);
		this.setState({ globalCheck: !this.state.globalCheck })
	}

	componentDidUpdate(props) {
		console.log(props)
		if (this.state.tasks !== props.tasks)
			this.setState({ tasks: props.tasks })
	}

	x = (page, maxCount, tasks) => {
		tasks.slice((page - 1) * maxCount, Math.min(page * maxCount, tasks.length))
			.map((task, i) => {
				return <Task key={task._id} task={task} i={i} />
			})
	}

	render() {
		let { page, maxCount, tasks } = this.props;
		return (
			<Table borderless striped dark hover id="task-table">
				<thead>
					<tr>
						<th id="delete-col" width="5%" >
							<button className="delete-button">X</button>
						</th>
						<th id="check-col" width="5%" >
							<button className="completed-button">✓</button>
						</th>
						<th width="90%">Tasks</th>
					</tr>
				</thead>
				<tbody>
					{
						//this.x
						tasks.slice((page - 1) * maxCount, Math.min(page * maxCount, tasks.length))
							.map((task, i) => {
								return <Task key={task._id} task={task} i={i} />
							})
					}
				</tbody>
			</Table>
		)
	}
}



export default connect(null, { touch, getTasks, toggleComplete, deleteTask })(TaskTable);