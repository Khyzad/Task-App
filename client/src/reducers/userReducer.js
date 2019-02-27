import {
	SIGN_IN,
	SIGN_OUT,
	SIGN_UP,
} from '../actions/userActions';

const initialState = {
	session: '',
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
		default:
			return {
				...state,
			};
	}
}