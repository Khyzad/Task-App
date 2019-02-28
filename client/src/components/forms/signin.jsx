import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signIn } from '../../actions/userActions';
import {
	Button,
	Form,
	Label,
	Input,
	Modal,
	ModalHeader,
	ModalBody,
	ModalFooter
} from 'reactstrap'

class SignIn extends Component {
	constructor(props) {
		super(props);

		this.state = {
			modal: false,
			form: {
				email: '',
				password: ''
			},
			validCombination: true
		}
	}

	toggle = () => {
		this.setState({ modal: !this.state.modal });
	}

	submit = (e) => {
		e.preventDefault();

		this.props.signIn(this.state.form, (err) => {
			if (err)
				this.setState({ validCombination: false })
			else
				this.setState({ validCombination: true })
		})
	}

	onchange = (e) => {
		this.setState({
			form: {
				...this.state.form,
				[e.target.name]: e.target.value
			}
		})
	}

	render() {
		return (
			<div id='sign-in'>
				<Button onClick={this.toggle} color="link" style={{ color: 'white' }}>Sign in</Button>
				<Modal isOpen={this.state.modal} toggle={this.toggle}>
					<Form onSubmit={this.submit}>
						<ModalHeader toggle={this.toggle}>
							Sign in
						</ModalHeader>
						<ModalBody>
							{!this.state.validCombination &&
								<div className="errors">
									<span>• Invalid email/password combination</span>
								</div>
							}
							<Label>Email:</Label>
							<Input name='email' onChange={this.onchange}></Input>
							<Label>Password:</Label>
							<Input name='password' type='password' onChange={this.onchange}></Input>
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

export default connect(null, { signIn })(SignIn);