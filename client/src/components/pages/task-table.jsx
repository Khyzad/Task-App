import React, { Component } from 'react';
import {touch, getTasks} from '../../actions/userActions';
import { connect } from 'react-redux';
import {
	Table,
} from 'reactstrap';

class TaskTable extends Component {
	constructor(props) {
		super(props)

		this.state = {
			globalCheck: false,
			tasks: props.tasks
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
						<th width="5%" >
							<input name="globalCheck" type="checkbox" checked={this.state.globalCheck} onChange={this.globalCheck} />
						</th>
						<th width="95%">Tasks</th>
					</tr>
				</thead>
				<tbody>
					{this.props.tasks.map((task, i) => {
						return (
							<tr key={"row" + i}>
								<td><input name={"checkbox" + task._id} type="checkbox" /></td>
								<td onDoubleClick={this.doubleclick}>{task.title}</td>
							</tr>
						);
					})}
				</tbody>
			</Table>
		)
	}
}

export default connect(null, {touch, getTasks})(TaskTable);