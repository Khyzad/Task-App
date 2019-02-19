import { SIGN_IN, SIGN_OUT, SIGN_UP, GET_TASKS } from '../actions/userActions';

const initialState = {
	session: '',
	tasks: [],
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
				tasks: action.payload.tasks
			}
		}
		default:
			return {
				...state,
				touch: !state.touch
			};
	}
}