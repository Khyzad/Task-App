import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SignUp from '../forms/signup';
import SignIn from '../forms/signin';
import SignOut from '../forms/signout';
import { relative } from 'path';
import { Button } from 'reactstrap';


class Header extends Component {
	render() {
		return (
			<header style={bannerStyle} id="header" >

				<section id="nav-bar" >
					<div id="nav-links">
						<span><Link to='/'><Button color="link" style={{color: 'white'}}>Home</Button></Link></span>
						{localStorage.getItem('session') ?
							<span><SignOut /></span>
							:
							<span><SignIn /></span>
						}
						{localStorage.getItem('session') ?
							<span><Link to='/dashboard'><Button color="link" style={{color: 'white'}}>Dashboard</Button></Link></span>
							:
							<span><SignUp /></span>
						}
					</div>
				</section>
			</header>
		)
	}
}

const bannerStyle = {
	backgroundColor: '#161234',
	color: '#f5f5f5',
	borderBottomStyle: 'outset',
	borderColor: 'rgb(29, 29, 29)'
}

export default Header;