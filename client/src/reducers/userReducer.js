import {
	SIGN_IN,
	SIGN_OUT,
	SIGN_UP,
	GET_TASKS,
	ADD_TASK,
	TOGGLE_COMPLETE,
	DELETE_TASK,
	NEXT,
	PREV,
	ACKNOWLEDGE,
	ACTIVE,
} from '../actions/userActions';

const initialState = {
	session: '',
	tasks: [],
	maxCount: 10,
	page: 1,
	idle: true,
	touch: false
};

export default (state = initialState, action) => {
	switch (action.type) {
		case SIGN_UP:
			return {
				...state,
				session: action.payload.session
			}
		case SIGN_IN:
			return {
				...state,
				session: action.payload.session,
			}
		case SIGN_OUT: {
			return {
				session: '',
				tasks: []
			}
		}
		case GET_TASKS: {
			return {
				...state,
				idle: true,
				tasks: action.payload.tasks
			}
		}
		case ADD_TASK: {
			return {
				...state,
				idle: true,
				tasks: [
					...state.tasks,
					action.payload.task,
				]
			}
		}
		case DELETE_TASK: {
			return {
				...state,
				idle: false,
				tasks: state.tasks.filter((task, i) => {
					if (i != action.payload.i)
						return task
				})
			}
		}
		case TOGGLE_COMPLETE: {
			return {
				...state,
				idle: false,
				tasks: state.tasks.map((task,i) => {
					if (i == action.payload.i)
						task.completed = !task.completed
					return task;
				}),
			}
		}
		case NEXT: {
			return {
				...state,
				page: state.page + 1
			}
		}
		case PREV: {
			return {
				...state,
				page: state.page - 1
			}
		}
		case ACKNOWLEDGE: {
			return{
				...state,
				idle: true
			}
		}
		case ACTIVE: {
			return{
				...state,
				idle: false
			}
		}
		default:
			return {
				...state,
				touch: !state.touch
			};
	}
}