import React from 'react';
import PhotoGallery from './photoGallery/pages/photoGallery';
import {Provider} from 'react-redux';
import configureStore from '../src/photoGallery/redux/store';


const store = configureStore()

class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <PhotoGallery/>
            </Provider>
        );
    }
}

export default App;
