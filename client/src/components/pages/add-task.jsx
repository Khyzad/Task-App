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

		this.state = {
			modal: false,
			form: {
				title: '',
				description: '',
			}
		}
	}

	toggle = e => {
		this.setState({ modal: !this.state.modal });
	}

	change = e => {
		this.setState({
			form: {
				...this.state.form,
				[e.target.name]: e.target.value
			}
		});
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
							<Input name="title" value={this.state.title} onChange={this.change} />
							Description:
							<Input name="description" value={this.state.description} onChange={this.change} type="textarea" />
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