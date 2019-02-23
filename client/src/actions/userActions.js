import axios from 'axios';

export const SIGN_IN = 'SIGN_IN';
export const SIGN_UP = 'SIGN_UP';
export const SIGN_OUT = 'SIGN_OUT';
export const GET_TASKS = 'GET_TASKS';
export const ADD_TASK = 'ADD_TASK';
export const DELETE_TASK = 'DELETE_TASK';
export const TOGGLE_COMPLETE = 'TOGGLE_COMPLETE';
export const NEXT = 'NEXT';
export const PREV = 'PREV';
export const ACKNOWLEDGE = 'ACKNOWLEDGE';
export const ACTIVE = 'ACTIVE';

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

			console.log(res.data)
			localStorage.setItem('session', res.data.session)

			dispatch({
				type: SIGN_IN,
				payload: {
					session: res.data.session,
					tasks: res.data.tasks
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

export const getTasks = () => dispatch => {
	active(dispatch);
	axios.get(`/task/${localStorage.getItem('session')}`)
		.then(res => {
			dispatch({
				type: GET_TASKS,
				payload: {
					tasks: res.data.tasks
				}
			})

			return res.data.tasks;
		})
		.catch(e => {
			console.log(e)
		})
}

export const addTask = (form) => dispatch => {
	active(dispatch);
	axios.put(`/task/${localStorage.getItem('session')}`, form)
		.then(res => {
			dispatch({
				type: ADD_TASK,
				payload: {
					task: form,
				}
			})
		})
		.catch(e => {
			console.log(e);
		})
}

export const deleteTask = (task, i) => dispatch => {
	axios.delete(`/task/${localStorage.getItem('session')}/${task._id}`)
		.then(res => acknowledge(dispatch));
	dispatch({
		type: DELETE_TASK,
		payload: {
			task,
			i: i
		}
	})
}

export const toggleComplete = (task, i) => dispatch => {
	axios.post(`/task/${localStorage.getItem('session')}/${task._id}`, task)
		.then(res => acknowledge(dispatch));
	dispatch({
		type: TOGGLE_COMPLETE,
		payload: {
			task: {
				...task,
				completed: !task.completed
			},
			i: i
		}
	})
}

export const modifyPage = (type) => dispatch => {
	dispatch({ type })
}

export const touch = () => dispatch => {
	dispatch({ type: '' })
}


const acknowledge = dispatch => {
	dispatch({ type: ACKNOWLEDGE })
}
const active = dispatch => {
	dispatch({ type: ACTIVE })
}
