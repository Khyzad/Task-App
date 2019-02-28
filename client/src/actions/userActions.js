import axios from 'axios';

export const SIGN_IN = 'SIGN_IN';
export const SIGN_UP = 'SIGN_UP';
export const SIGN_OUT = 'SIGN_OUT';

export const signUp = (form, callback) => dispatch => {
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

			callback(null);

			window.location.reload();
		}).catch(e => {
			// should perform different actions depending on status code and error message
			callback(e);
		})
}

export const signIn = (form, callback) => dispatch => {
	console.log('inside signin action reducer');

	axios.post('/user/signIn', form)
		.then(res => {

			console.log(res.data)
			localStorage.setItem('session', res.data.session)

			dispatch({
				type: SIGN_IN,
				payload: {
					session: res.data.session,
					tasks: res.data.tasks
				}
			})

			callback(null);

			window.location.reload();

		}).catch(e => {
			// should perform different actions depending on status code and error message
			callback(e);
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
