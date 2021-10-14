import * as React from 'react';
import {View, Text, StyleSheet, FlatList, Button} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';
import ViewContact from './ViewContact';
import Contacts from './Contacts';
import AddContact from './addContact';
import FavouriteContacts from './FavouriteContacts';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
const InDrawer = (props) => {
  return (
      
    <Drawer.Navigator>
      <Drawer.Screen
        name="Contact List"
        component={Contacts}
        options={{drawerLabel: 'Contact list screen'}}></Drawer.Screen>
      <Drawer.Screen
        name="Favorite List"
        component={FavouriteContacts}
        options={{drawerLabel: 'Favorite contacts'}}
      />
    </Drawer.Navigator>
  );
};


function MyNewDrawer(props) {
  function loadContacts ()  {
    props.getContacts();
  }
  loadContacts();
  return (
    <Stack.Navigator initialRouteName="Drawer">
      <Stack.Screen
        name="Drawer"
        component={InDrawer}
        options={{headerShown: false}}
      />
      
      <Stack.Screen
      
        name="Contact Details"
        component={ViewContact} 
        ></Stack.Screen>
         <Stack.Screen
      
      name="Add Contact"
      component={AddContact}
      ></Stack.Screen>
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  
});
export default MyNewDrawer;
