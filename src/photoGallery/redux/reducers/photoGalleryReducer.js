import {GET_PHOTO_LIST, GET_PHOTO_LIST_FAILED, GET_PHOTO_LIST_SUCCESS} from '../types';

const INITIAL_STATE = {
    photosList: [],
    loading: true,
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {

        case GET_PHOTO_LIST:
            return {...state, loading: true,};
        case GET_PHOTO_LIST_SUCCESS:
            return {
                ...state,
                photosList: action.payload,
                loading: false
            };
        case GET_PHOTO_LIST_FAILED:
            return {
                ...state,
                loading: false
            };
        default:
            return state;
    }
};