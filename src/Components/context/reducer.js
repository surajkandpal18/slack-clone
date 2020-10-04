export const initialState = {
  user: null,
  drawer: false,
};

export const actionTypes = {
  SET_USER: "SET_USER",
  SET_DRAWER:'SET_DRAWER',
};

const reducer = (state, action) => {
  console.log(action);

  switch (action.type) {
    case actionTypes.SET_USER:
      return { ...state, user: action.payload };
    case actionTypes.SET_DRAWER:
      console.log('hii')
      return {...state,drawer:action.payload};
    default:
      return state;
  }
};

export default reducer;
