import {
	GET_TASKS,
	ADD_TASK,
	TOGGLE_COMPLETE,
	DELETE_TASK,
	NEXT,
	PREV,
	ACKNOWLEDGE
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
				idle: false,
				length: state.length - 1,
				list
			}
		}
		case TOGGLE_COMPLETE: {
			return {
				...state,
				idle: false,
				list: {
					...state.list,
					[action.payload.task._id]: {
						...action.payload.task,
						completed: !action.payload.task.completed
					}
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
		case ACKNOWLEDGE:{
			return{
				...state,
				idle: true,
			}
		}


		default:
			return {
				...state,
			};
	}
}