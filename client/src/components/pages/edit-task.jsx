import React, { Component } from 'react';
import { connect } from 'react-redux'
import { updateTask } from '../../actions/tasksActions'
import {
	Modal,
	Form,
	ModalBody,
	ModalHeader,
	ModalFooter,
	Input,
	Button,
} from 'reactstrap'

class EditTask extends Component {
	constructor(props) {
		super(props);

		this.titleLimit = 20;
		this.descriptionLimit = 140;

		this.state = {
			task: this.props.task
		}
	}

	limit = name => {
		if (name == 'title')
			return this.titleLimit
		if (name == 'description')
			return this.descriptionLimit
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.edit !== this.props.edit)
			this.setState({ edit: this.props.edit })
	}

	onchange = e => {
		if (this.limit(e.target.name) >= e.target.value.length) {
			this.setState({
				task: {
					...this.state.task,
					[e.target.name]: e.target.value
				}
			})
		}
	}

	onsubmit = e => {
		e.preventDefault();
		this.props.updateTask(this.state.task)
		this.props.toggleEdit();
	}

	render() {
		const { edit, toggleEdit } = this.props;

		return (
			<Modal isOpen={edit}>
				<Form onSubmit={this.onsubmit}>
					<ModalHeader toggle={toggleEdit}>
						Edit Task
					</ModalHeader>
					<ModalBody>
						Title:
						<Input onChange={this.onchange} name="title" type="text" value={this.state.task.title} />
						<span>{this.state.task.title.length}/{this.titleLimit}</span>
						<br />
						Description:
						<Input onChange={this.onchange} name="description" type="textarea" value={this.state.task.description} />
						<span>{this.state.task.description.length}/{this.descriptionLimit}</span>
					</ModalBody>
					<ModalFooter>
						<Button>Edit</Button>
					</ModalFooter>
				</Form>
			</Modal>
		)
	}
}

export default connect(null, { updateTask })(EditTask);