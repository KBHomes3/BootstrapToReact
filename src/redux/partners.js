import * as ActionTypes from './ActionTypes';
const initialState = {
    isLoading: true,
    errMess: null,
    partners: []
}
export const Partners = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.PARTNERS_LOADING:
            return {...state, isLoading: true, errMess: null, partners: []};  

        case ActionTypes.PARTNERS_FAILED:
            return {...state, isLoading: false, errMess: action.payload};
        
        case ActionTypes.ADD_PARTNERS:
            return {...state, isLoading: false, errMess: null, partners: action.payload};
        default:
          return state;
      }
};

