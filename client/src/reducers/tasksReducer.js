import {
	GET_TASKS,
	ADD_TASK,
	UPDATE_TASK,
	DELETE_TASK,
	NEXT,
	PREV,
	ACTIVE
} from '../actions/tasksActions';

const initialState = {
	length: 0,
	idle: false,
	page: 1,
	maxCount: 10,
	list: {}
};

export default (state = initialState, action) => {
	switch (action.type) {
		case GET_TASKS: {
			const list = {}
			action.payload.tasks.forEach(task => {
				list[task._id] = task;
			});

			return {
				...state,
				length: action.payload.tasks.length,
				idle: true,
				list
			}
		}
		case ADD_TASK: {

			return {
				...state,
				list: {
					...state.list,
					[action.payload.task._id]: action.payload.task
				},
				idle: true,
				length: state.length + 1
			}
		}
		case DELETE_TASK: {
			let list = state.list;
			delete list[action.payload.task._id]

			return {
				...state,
				idle: true,
				length: state.length - 1,
				list
			}
		}
		case UPDATE_TASK: {
			return {
				...state,
				idle: true,
				list: {
					...state.list,
					[action.payload.task._id]: action.payload.task
				}
			}
		}
		case NEXT: {
			return{
				...state,
				page: state.page + 1
			}
		}
		case PREV: {
			return{
				...state,
				page: state.page - 1
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
			};
	}
}