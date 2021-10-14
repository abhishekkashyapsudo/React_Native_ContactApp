import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MyDrawer from './android/app/main_store/MyDrawer'
import { Component } from 'react';
import { Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk';
import contacts from './android/app/reducers/contacts';


export default class App extends Component {

  constructor() {
    super();

  }
  store = createStore(
    contacts, applyMiddleware(thunk) 
  )
  
  render() {
  return (
    <Provider store={this.store}>
    <NavigationContainer>
      <MyDrawer />
    </NavigationContainer>
    </Provider>
  );
  }
}

  


  

  
  