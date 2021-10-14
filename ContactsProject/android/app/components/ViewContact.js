import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  ToastAndroid,
  Alert
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import * as React from 'react';
import axios from 'axios';


const dimensions = Dimensions.get('window');

const ViewContact = (props) => {

  React.useLayoutEffect(() => {
    props.navigation.setOptions({
      
          headerRight: () => (
            <View style={styles.inline}>
              <Icon
                name="edit"
                size={30}
                style={{marginRight: 10}}
                onPress={() => props.navigation.navigate('Add Contact',{contact: contact})}></Icon>
              <Icon
                name="trash"
                size={30}
                style={{marginRight: 10}}
                onPress={() => showConfirmDialog(contact.id)}></Icon>
              <Icon size={30}  name={contact.isFavourite ? "star": "star-o"} style={{marginRight: 10}}></Icon>
            </View>
          ),
        
      
    });
  }, [props.navigation]);

  const showConfirmDialog = (id) => {
    return Alert.alert(
      "Are your sure?",
      "Are you sure you want to delete this Contact?",
      [
        // The "Yes" button
        {
          text: "Delete",
          onPress: () => {
            deleteId(id);
          },
        },
        {
          text: "Cancel",
        },
      ]
    );
  };

  deleteId = (id) =>{
    axios
      .delete('http://10.0.2.2:3010/contacts/'+id)
      .then(result => {
        alert('Contact Deleted successfully!');
        props.navigation.navigate('Contact List');
      })
      .catch(error => console.log(JSON.stringify(error)));
    
  }
    const contact = props.route.params.contact;
    return (
      <View style={styles.container}>
        
        <Image
            source={{
              uri: contact.image
            }}
            style={styles.image}
          />
        <Text style={styles.titleText}>{"\n"}Name:       {contact.name}</Text>
        <Text style={styles.titleText}>Mobile:     {contact.mobile}</Text>
        <Text style={styles.titleText}>Landline:  {contact.landline}</Text>
        <TouchableOpacity
          onPress={() => console.log('hello')}
          style={styles.touchableOpacityStyle}>
          
        </TouchableOpacity>

        
      </View>
    );
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

  image: {
    width: dimensions.width,
    height: dimensions.height/3,
    zIndex: 1,
  },
  icon: {
    backgroundColor: '#ccc',
    position: 'absolute',
    right: 0,
    bottom: 0
   },
   titleText: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft:'10%'
  },
  inline: {
    flexDirection: 'row',
    marginLeft: 20,
    justifyContent: 'space-evenly',
  },
});



export default ViewContact;