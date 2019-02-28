import React, { Component } from 'react';
import { addTask } from '../../actions/tasksActions';
import { connect } from 'react-redux';
import {
	Button,
	Modal,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Form,
	Input,
} from 'reactstrap';

class AddTask extends Component {
	constructor(props) {
		super(props);

		this.titleLimit = 20;
		this.descriptionLimit = 140;

		this.state = {
			modal: false,
			form: {
				title: '',
				description: '',
			}
		}
	}

	limit = name => {
		if (name == 'title')
			return this.titleLimit
		if (name == 'description')
			return this.descriptionLimit
	}

	toggle = e => {
		this.setState({ modal: !this.state.modal });
	}

	change = e => {
		if (this.limit(e.target.name) >= e.target.value.length) {
			this.setState({
				form: {
					...this.state.form,
					[e.target.name]: e.target.value
				}
			});
		}
	}

	submit = e => {
		e.preventDefault();
		this.props.addTask(this.state.form);

		this.toggle()
	}

	render() {
		return (
			<div id="add-task">
				<Button onClick={this.toggle}>Add</Button>
				<Modal isOpen={this.state.modal} toggle={this.toggle}>
					<Form onSubmit={this.submit}>
						<ModalHeader toggle={this.toggle}>
							Add Task
						</ModalHeader>
						<ModalBody>
							Title:
							<Input name="title" value={this.state.form.title} onChange={this.change} />
							<span>{this.state.form.title.length}/{this.titleLimit}</span>
							<br />
							Description:
							<Input name="description" value={this.state.form.description} onChange={this.change} type="textarea" />
							<span>{this.state.form.description.length}/{this.descriptionLimit}</span>
						</ModalBody>
						<ModalFooter>
							<Button>Submit</Button>
						</ModalFooter>
					</Form>
				</Modal>
			</div>
		);

	}
}

export default connect(null, { addTask })(AddTask);