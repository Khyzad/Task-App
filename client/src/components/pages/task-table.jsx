import React, { Component } from 'react';
import { touch, getTasks, toggleComplete } from '../../actions/userActions';
import { connect } from 'react-redux';
import {
	Table,
} from 'reactstrap';

class TaskTable extends Component {
	constructor(props) {
		super(props)

		this.state = {
			globalCheck: false,
		}
	}

	toggleComplete = e => {
		this.props.toggleComplete(this.props.tasks[e.target.name], e.target.name);
	}

	className = (task) => {
		if (task.completed)
			return "completed-button"
		else
			return "inprogress-button"
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

	globalCheck = e => {
		console.log(this.state);
		this.setState({ globalCheck: !this.state.globalCheck })
	}

	render() {
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
					{this.props.tasks.map((task, i) => {
						return (
							<tr key={"row" + i}>
								<td><button className="delete-button" name={i}>X</button> </td>
								<td>
									<button
										className={this.className(task)}
										name={i}
										onClick={this.toggleComplete}>
										{this.value(task)}
									</button>
								</td>
								<td onDoubleClick={this.doubleclick} style={this.strike(task)}>{task.title}</td>
							</tr>
						);
					})}
				</tbody>
			</Table>
		)
	}
}



export default connect(null, { touch, getTasks, toggleComplete })(TaskTable);