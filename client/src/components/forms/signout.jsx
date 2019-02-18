import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signOut } from '../../actions/userActions';
import { Button } from 'reactstrap';

class SignOut extends Component {
	constructor(props) {
		super(props);
	}

	logout = e => {
		e.preventDefault(e);
		this.props.signOut(localStorage.getItem('session'));
	}

	render() {
		return (
			<div>
				<form onSubmit={this.logout}>
					<Button color="link">Sign out</Button>
				</form>
			</div>
		);
	}
}

export default connect(null, { signOut })(SignOut)