import axios from 'axios';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableElement,
  View,
  TouchableWithoutFeedback
} from 'react-native';

import * as React from 'react';
import ListItem from './ListItem';
import {Component} from 'react';
import { connect } from 'react-redux';

class Contacts extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      contacts: props.contacts
    };
  }
  
  goToViewContact(){
      this.props.navigation.navigate('Contact Details');
  }
  
  componentDidUpdate() {
    
    this.setState({...this.state, contacts: this.props.contacts});

  }

  addNewContact() {
  }
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Add Contact',{contact: null})}
          style={styles.touchableOpacityStyle}>
          <Image
            source={{
              uri: 'https://reactnativecode.com/wp-content/uploads/2017/11/Floating_Button.png',
            }}
            style={styles.floatingButton}
          />
        </TouchableOpacity>

        <FlatList
          data={this.state.contacts}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Contact Details',{contact: item})}>
            <View>
            <ListItem
              leftElement={
                <View>
                  <Image
                    source={{uri: item.image}}
                    style={{width: 45, height: 45, borderRadius: 45}}
                  />
                </View>
              }
              key={item.id}
              contact={item}
            />
            </View>
            </TouchableOpacity>
          )}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },

  touchableOpacityStyle: {
    position: 'absolute',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    right: 30,
    bottom: 30,
    zIndex: 1,
  },

  floatingButton: {
    resizeMode: 'contain',
    width: 50,
    height: 50,
    zIndex: 1,
  },
});


export default connect((state) => ({
    contacts: state.contacts
  }))(Contacts);


