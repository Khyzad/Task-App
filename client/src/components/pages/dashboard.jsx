import React, { Component } from 'react';
import { touch, getTasks } from '../../actions/userActions';
import { connect } from 'react-redux';
import TaskTable from './task-table';
import AddTask from './add-task';
import {
	Button
} from 'reactstrap';


class Dashboard extends Component {
	constructor(props) {
		super(props);

		this.state = {
			globalCheck: false,
			tasks: props.tasks
		}
	}

	globalCheck = e => {
		this.setState({ globalCheck: !this.state.globalCheck })
	}

	doubleclick = (e) => {
		console.log('this was double clicked')
	}

	componentDidMount() {
		this.props.getTasks()
	}

	render() {
		return (
			<div id="dashboard">
				<div>
					<div id="task-panel">
						<div id="task-button-panel">
							<AddTask />
							<Button>Save</Button>
							<Button>Undo</Button>
						</div>
						<div id="display-count">Showing x of y</div>
					</div>
					<TaskTable tasks={this.props.tasks} />
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		tasks: state.user.tasks
	}
}

export default connect(mapStateToProps, { touch, getTasks })(Dashboard);