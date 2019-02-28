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
				email: '',
				password: '',
				password2: '',
			},
			passwordMatch: true,
			emailAvailable: true,
			passwordFormat: true,
			validEmail: true,
		}
	}

	toggle = e => {
		this.setState({
			modal: !this.state.modal
		})
	}

	submit = e => {
		e.preventDefault();
		var passwordMatch = true, passwordFormat = true, validEmail = true;

		if (this.state.form.password !== this.state.form.password2) {
			passwordMatch = false;
		}
		if (this.state.form.password.length < 7) {
			passwordFormat = false;
		}
		if (!this.state.form.email.match(/^\w+@\w+\.\w+$/)) {
			validEmail = false;
		}

		if (passwordMatch && passwordFormat && validEmail) {
			this.props.signUp(this.state.form, (err) => {
				if (err)
					this.setState({ emailAvailable: false })
				else
					this.toggle();
			})
		}

		this.setState({ passwordMatch, passwordFormat, validEmail })
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
							{!this.state.emailAvailable &&
								<div className="errors">
									<span>• Email is unavailable</span>
									<br />
								</div>
							}
							{!this.state.validEmail &&
								<div className="errors">
									<span>• Email is invalid</span>
									<br />
								</div>
							}
							{!this.state.passwordMatch &&
								<div className="errors">
									<span>• Passwords do not match</span>
									<br />
								</div>
							}
							{!this.state.passwordFormat &&
								<div className="errors">
									<span>
										• Password needs to contain at least 7 characters
									</span>
									<br />
								</div>
							}


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
			</div >
		)
	}
}

export default connect(null, { signUp })(SignUp);