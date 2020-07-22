export default function appReducer(state={}, action) {
	switch (action.type) {
		case 'SET_USER':
			return Object.assign({}, state, action.payload);
		case 'SET_PASSWORD_ERROR':
			return Object.assign({}, state, action.payload);
		default:
			return state
	}
};