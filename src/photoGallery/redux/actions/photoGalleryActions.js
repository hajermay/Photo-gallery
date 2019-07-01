import axios from 'axios';
import {endPoint} from './config';
import {
    ADD_COMMENT,
    ADD_COMMENT_FAILED,
    ADD_COMMENT_SUCCESS,
    GET_PHOTO_LIST,
    GET_PHOTO_LIST_FAILED,
    GET_PHOTO_LIST_SUCCESS
} from '../types';

export const getPhotoList = () => {
    return (dispatch) => {
        dispatch({type: GET_PHOTO_LIST});
        axios.get(`${endPoint}photos/`)
            .then(response => {
                console.log('response', response)
                dispatch({type: GET_PHOTO_LIST_SUCCESS, payload: response.data.data});
            })
            .catch(error => {
                dispatch({type: GET_PHOTO_LIST_FAILED, payload: error});
            });
    };
};
export const addComment = (id, comment, callback) => {
    return (dispatch) => {
        dispatch({type: ADD_COMMENT});
        return axios({
            method: 'post',
            url: `${endPoint}addComment/${id}`,
            data: {
                comment: comment
            }
        })
            .then(response => {
                dispatch({type: ADD_COMMENT_SUCCESS, payload: response});
                callback()
            })
            .catch(error => {
                dispatch({type: ADD_COMMENT_FAILED, payload: error});
            });
    };
};