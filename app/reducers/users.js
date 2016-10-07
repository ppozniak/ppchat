const usersReducer = (state = [], action) => {
  switch(action.type) {
    case 'ADD_USER':
      return state.concat([action.user]);
    case 'REMOVE_USER':
      if(state.indexOf(action.user) === -1) return state;
      return [...state.slice(0, state.indexOf(action.user)), ...state.slice(state.indexOf(action.user) + 1)];
    default:
      return state;
  }
}

export default usersReducer;
