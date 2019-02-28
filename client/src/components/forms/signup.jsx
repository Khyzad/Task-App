import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signUp } from '../../actions/userActions';
import {
	Button,
	Form,
	Input,
	Modal,
	ModalHeader,
	ModalBody,
	ModalFooter
} from 'reactstrap'

class SignUp extends Component {
	constructor(props) {
		super(props);
		this.state = {
			modal: false,
			form: {
				name: {
					first: '',
					last: '',
				},
				email: '',
				password: '',
				password1: '',
			}
		}
	}

	toggle = e => {
		this.setState({
			modal: !this.state.modal
		})
	}

	submit = e => {
		e.preventDefault();
		if (this.state.password !== this.state.password1) {
			console.log('error');
		} else {
			this.props.signUp(this.state.form)
			this.toggle();
		}
	}

	change = e => {
		this.setState({
			form: {
				...this.state.form,
				[e.target.name]: e.target.value
			}
		})
	}

	render() {
		return (
			<div>
				<Button onClick={this.toggle} color="link" style={{ color: 'white' }}>Sign up</Button>
				<Modal isOpen={this.state.modal} toggle={this.toggle}>
					<Form onSubmit={this.submit}>
						<ModalHeader toggle={this.toggle}>Sign Up</ModalHeader>
						<ModalBody>
							First Name:
						<Input name='first-name' type='text' onChange={this.change} />
							Last Name:
						<Input name='last-name' type='text' onChange={this.change} />
							Email:
						<Input name='email' type='text' onChange={this.change} />
							Password:
						<Input name='password' type='password' onChange={this.change} />
							Password Confirmation:
						<Input name='password2' type='password' onChange={this.change} />
						</ModalBody>
						<ModalFooter>
							<Button>Submit</Button>
						</ModalFooter>
					</Form>
				</Modal>
			</div>
		)
	}
}

export default connect(null, { signUp })(SignUp);