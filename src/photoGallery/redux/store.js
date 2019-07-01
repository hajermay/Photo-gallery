import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

import photoGallery from './reducers/photoGalleryReducer';

const rootReducer = combineReducers({
    photoGallery,
});

const configureStore = () => {
    return createStore(rootReducer, applyMiddleware(thunk));
}

export default configureStore;