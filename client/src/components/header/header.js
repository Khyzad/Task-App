import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import About from '../pages/about';
import Home from '../pages/about';


class Header extends Component {
	render() {
		return (
			<header style={bannerStyle} id="header" class="hero is-dark">
				<div class="hero-head" style={titleStyle}>
					<h1 class="title is-center">Library App</h1>
					<h2 class="subtitle">A proof of concept</h2>
				</div>
				<section id="nav-links" class="" style={navStyle}>
					<span><Link to='/'>Home</Link></span>
					<span>Sign in</span>
					<span>Sign up</span>
					<span><Link to='/about'>About</Link></span>
				</section>
			</header>
		)
	}
}

const bannerStyle = {
	display: 'grid',
	gridTemplateColumns: '3fr 1fr'
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