import React, { Component } from 'react';
import { getTasks, modifyPage, NEXT, PREV } from '../../actions/tasksActions';
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
		const { page, maxCount, length } = this.props;
		const name = e.target.name

		if (name == NEXT && Math.trunc(length / maxCount) + 1 > page
			|| name == PREV && page > 1)
			this.props.modifyPage(name);

	}

	render() {
		const { page, maxCount, length, idle } = this.props;
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
							<div id="display-count">Showing {maxCount * (page - 1) + 1}-{Math.min(page * maxCount, length)} of {length}</div>
							<Button name={PREV} onClick={this.clickPageButton}>Prev</Button>
							<Button name={NEXT} onClick={this.clickPageButton}>Next</Button>
						</div>

					</div>
					<TaskTable maxCount={maxCount} page={page} idle={idle} />
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		length: state.tasks.length,
		maxCount: state.tasks.maxCount,
		page: state.tasks.page,
		idle: state.tasks.idle
	}
}

export default connect(mapStateToProps, { getTasks, modifyPage, NEXT, PREV })(Dashboard);