import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SignUp from '../forms/signup';
import SignIn from '../forms/signin';
import SignOut from '../forms/signout';


class Header extends Component {
	render() {
		return (
			<header style={bannerStyle} id="header" >
				<div style={titleStyle}>
					<h1>Library App</h1>
					<h4>A proof of concept</h4>
				</div>
				<section id="nav-links" style={navStyle}>
					<span><Link to='/'>Home</Link></span>
					{localStorage.getItem('session') ?
						<span><SignOut /></span>
						:
						<span><SignIn /></span>
					}
					{localStorage.getItem('session') ?
						<span><Link to='/dashboard'>Dashboard</Link></span>
						:
						<span><SignUp /></span>
					}
					<span><Link to='/about'>About</Link></span>
				</section>
			</header>
		)
	}
}

const bannerStyle = {
	display: 'grid',
	gridTemplateColumns: '3fr 1fr',
	backgroundColor: '#161234',
	color: '#f5f5f5',
	borderBottomStyle: 'outset',
	borderColor: 'rgb(29, 29, 29)'
	// borderBottomColor: 'outset'
}

const titleStyle = {
	padding: '20px 10px',
}

const navStyle = {
	textAlign: 'center',
	verticalAlign: 'middle',
	paddingTop: '60px',
	display: 'grid',
	gridTemplateColumns: 'repeat(4, 1fr)'
}

export default Header;