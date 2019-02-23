import React, { Component } from 'react';
import { touch, getTasks, modifyPage, NEXT, PREV } from '../../actions/userActions';
import { connect } from 'react-redux';
import TaskTable from './task-table';
import AddTask from './add-task';
import {
	Button,
	Spinner
} from 'reactstrap';


class Dashboard extends Component {
	constructor(props) {
		super(props);

		this.state = {
			globalCheck: false,
			tasks: props.tasks,
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

	clickPageButton = e => {
		const { page, maxCount, tasks } = this.props;
		const name = e.target.name
		if (name == NEXT && Math.trunc(tasks.length / maxCount) + 1 > page
			|| name == PREV && page > 1)
			this.props.modifyPage(name);

	}

	render() {
		const { page, maxCount, tasks, idle } = this.props;
		return (
			<div id="dashboard">
				<div>
					<div id="task-panel">
						<AddTask />
						{idle ?
							<span id="synched">Synched</span>
							: <Spinner color="warning" hidden={idle} />
						}
						<div id="display-panel">
							<div id="display-count">Showing {maxCount * (page - 1) + 1}-{Math.min(page * maxCount, tasks.length)} of {tasks.length}</div>
							<Button name={PREV} onClick={this.clickPageButton}>Prev</Button>
							<Button name={NEXT} onClick={this.clickPageButton}>Next</Button>
						</div>

					</div>
					<TaskTable tasks={tasks} maxCount={maxCount} page={page} idle={idle} />
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		tasks: state.user.tasks,
		maxCount: state.user.maxCount,
		page: state.user.page,
		idle: state.user.idle
	}
}

export default connect(mapStateToProps, { touch, getTasks, modifyPage, NEXT, PREV })(Dashboard);