import axios from 'axios';

export const SIGN_IN = 'SIGN_IN';
export const SIGN_UP = 'SIGN_UP';
export const SIGN_OUT = 'SIGN_OUT';

export const signUp = form => dispatch => {
	console.log('inside signup action reducer');

	axios.post('/user/signUp', form)
		.then(res => {

			console.log(res.data)
			localStorage.setItem('session', res.data.session)
			dispatch({
				type: SIGN_UP,
				payload: {
					session: res.data.session
				}
			})

			window.location.reload();

		}).catch(e => {
			console.log(e)
		})
}

export const signIn = form => dispatch => {
	console.log('inside signin action reducer');

	axios.post('/user/signIn', form)
		.then(res => {

			localStorage.setItem('session', res.data.session)
			dispatch({
				type: SIGN_IN,
				payload: {
					session: res.data.session,
					books: res.data.books
				}
			})

			window.location.reload();

		}).catch(e => {
			console.log(e)
		})
}

export const signOut = session => dispatch => {
	console.log('inside signout action reducer');
	localStorage.removeItem('session')
	axios.post(`/user/signOut/${session}`)
		.then(data => {

			localStorage.removeItem('session', data.session)
			dispatch({
				type: SIGN_OUT,
			})

			window.location.reload();
		}).catch(e => {
			console.log(e)
		})
}