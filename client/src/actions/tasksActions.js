import axios from 'axios';

export const GET_TASKS = 'GET_TASKS';
export const ADD_TASK = 'ADD_TASK';
export const DELETE_TASK = 'DELETE_TASK';
export const UPDATE_TASK = 'UPDATE_TASK';
export const NEXT = 'NEXT';
export const PREV = 'PREV';
export const ACTIVE = 'ACTIVE';

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
					task: res.data.task,
				}
			})
		})
		.catch(e => {
			console.log(e);
		})
}

export const deleteTask = (task, i) => dispatch => {
	active(dispatch);

	axios.delete(`/task/${localStorage.getItem('session')}/${task._id}`)
		.then(res => {
			dispatch({
				type: DELETE_TASK,
				payload: {
					task,
					i: i
				}
			})
		});
}

export const updateTask = task => dispatch => {
	active(dispatch);

	axios.post(`/task/${localStorage.getItem('session')}/${task._id}`, task)
		.then(res => {
			dispatch({
				type: UPDATE_TASK,
				payload: {
					task
				}
			})
		});
}

export const modifyPage = (type) => dispatch => {
	dispatch({ type })
}

const active = dispatch => {
	dispatch({ type: ACTIVE })
}
