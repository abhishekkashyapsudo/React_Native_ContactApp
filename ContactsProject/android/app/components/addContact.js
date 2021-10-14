import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  ToastAndroid,
  Alert,
  PermissionsAndroid,
  TextInput,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import ImagePicker from 'react-native-image-picker';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker'; // Migration from 2.x.x to 3.x.x => showImagePicker API is removed.

import * as React from 'react';
import axios from 'axios';

const AddContact = props => {
  const contact = props.route.params.contact;
  const [uri, setUri] = React.useState(
    contact === null
      ? 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_YuxLRO-EpmE_Bup3AJ7sK8fmZvTLh8Nj_YrcaXhJtdw9HZPBTjuV0F94X4YCpOCmKUE&usqp=CAU'
      : contact.image,
  );
  const [landline, setLandline] = React.useState(
    contact === null ? '' : contact.landline,
  );
  const [mobile, setMobile] = React.useState(
    contact === null ? '' : contact.mobile,
  );
  const [favorite, setFavorite] = React.useState(
    contact === null ? '' : contact.isFavourite,
  );
  const [name, setName] = React.useState(contact === null ? '' : contact.name);
  const [id, setId] = React.useState(contact === null ? '' : contact.id);
  const showConfirmDialog = id => {
    return Alert.alert('Select a Image Source', '', [
      {
        text: 'Cancel',
      },
      {
        text: 'Camera',
        onPress: () => {
          selectFile('camera');
        },
      },
      {
        text: 'Gallery',
        onPress: () => {
          selectFile('gallery');
        },
      },
    ]);
  };
  selectFile = source => {
    if (source === 'camera') {
      captureFromCamera();
    } else if (source === 'gallery') {
      captureFromLibrary();
    }
  };

  const options = {
    title: 'Select Image',
    customButtons: [
      {
        name: 'customOptionKey',
        title: 'Choose file from Custom Option',
      },
    ],
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'App Camera Permission',
          message: 'App needs access to your camera ',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Camera permission given');
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };
  const captureFromCamera = () => {
    requestCameraPermission();
    launchCamera(options, res => {
      console.log('Response = ', res);

      if (res.didCancel) {
        console.log('User cancelled image picker');
      } else if (res.error) {
        console.log('ImagePicker Error: ', res.error);
      } else if (res.customButton) {
        console.log('User tapped custom button: ', res.customButton);
        alert(res.customButton);
      } else {
        let source = res;
        setUri(source.uri);
      }
    });
  };

  const validateLandline = text => {
    let newText = '';
    let numbers = '0123456789';

    for (var i = 0; i < text.length; i++) {
      if (numbers.indexOf(text[i]) > -1) {
        newText = newText + text[i];
      } else {
        ToastAndroid.showWithGravity(
          'Landline should only contain numbers.',
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,
        );
        return;
      }
    }
    setLandline(newText);

  };
  const validateMobile = text => {
    let newText = '';
    let numbers = '0123456789';

    for (var i = 0; i < text.length; i++) {
      if (numbers.indexOf(text[i]) > -1) {
        newText = newText + text[i];
      } else {
        ToastAndroid.showWithGravity(
          'Mobile should only contain numbers.',
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,
        );
        return;
      }
    }
    setMobile(newText);
  };

  const saveContact = () => {
    
    if(contact == null){
      addNewContact();
    }
    else{
      updateContact();
    }
  };

  const addNewContact = () => {
    let data = {
      name: name,
      image: uri,
      mobile: mobile,
      landline: landline,
      isFavourite: favorite,
    };

    axios
      .post("http://10.0.2.2:3010/contacts", data)
      .then((result) => {
        ToastAndroid.showWithGravity(
          'User details added successfully.',
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,
        );
        setTimeout(() => {
          props.navigation.navigate('Contact List');
        }, 1000);
      })
      .catch((error) => console.log(error));
  }
  const updateContact = () => {
    let data = {
      id: id,
      name: name,
      image: uri,
      mobile: mobile,
      landline: landline,
      isFavourite: favorite,
    };

    axios
      .put("http://10.0.2.2:3010/contacts/"+id, data)
      .then((result) => {
        ToastAndroid.showWithGravity(
          'User details updated successfully.',
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,
        );
        setTimeout(() => {
          props.navigation.navigate('Contact List');
        }, 1000);
      })
      .catch((error) => console.log(error));
  }
  const captureFromLibrary = () => {
    launchImageLibrary(options, res => {
      console.log('Response = ', res);

      if (res.didCancel) {
        console.log('User cancelled image picker');
      } else if (res.error) {
        console.log('ImagePicker Error: ', res.error);
      } else if (res.customButton) {
        console.log('User tapped custom button: ', res.customButton);
        alert(res.customButton);
      } else {
        let source = res;
        setUri(source.uri);
      }
    });
  };

  const showDeleteConfirmDialog = (id) => {
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
  React.useLayoutEffect(() => {
    props.navigation.setOptions({
        title: contact === null? 'Add Contact' : 'Edit Contact',
      headerRight: () => (

        
        <View style={styles.inline}>
          {contact == null? <View></View>:
           <Icon
                name="trash"
                size={30}
                style={{marginRight: 10}}
                onPress={() => showDeleteConfirmDialog(contact.id)}></Icon>
          }
          <Icon
            name="save"
            size={30}
            style={{marginRight: 20}}
            onPress={saveContact}></Icon>
        </View>
      ),
    });
  }, [props.navigation]);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={showConfirmDialog} style={{marginBottom: 5}}>
        <Image
          source={{uri: uri}}
          style={{width: 160, height: 160, borderRadius: 160}}
        />
      </TouchableOpacity>
      <Text style={{marginLeft:5,alignSelf: 'flex-start'}}>Name: </Text>
      
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={text=> setName(text)}
        autoCapitalize="none"
      />
      <Text style={{marginLeft:5,alignSelf: 'flex-start'}}>Mobile: </Text>
      <TextInput
        style={styles.input}
        underlineColorAndroid="transparent"
        placeholder="Mobile"
        value={mobile}
        onChangeText={text => validateMobile(text)}
        autoCapitalize="none"
      />
      <Text style={{marginLeft:5,alignSelf: 'flex-start'}}>Landline: </Text>
      <TextInput
        style={styles.input}
        value={landline}
        underlineColorAndroid="transparent"
        onChangeText={text => validateLandline(text)}
        placeholder="Landline"
        autoCapitalize="none"
      />
      {favorite == false ? (
        <View style={{marginBottom: 20}}>
          <Icon.Button
            name="star-o"
            backgroundColor="green"
            onPress={() => setFavorite(!favorite)}>
            <Text style={{fontFamily: 'Arial', fontSize: 15, color: 'white'}}>
              Add To Favorites
            </Text>
          </Icon.Button>
        </View>
      ) : (
        <View style={{marginBottom: 20}}>
          <Icon.Button
            name="star"
            backgroundColor="red"
            onPress={() => setFavorite(!favorite)}>
            <Text style={{fontFamily: 'Arial', fontSize: 15, color: 'white'}}>
              Remove From Favorites
            </Text>
          </Icon.Button>
        </View>
      )}

      <View style={styles.inline}>
        <Icon.Button
          name="save"
          backgroundColor="green"
          onPress={saveContact}
          style={{marginRight: 10, marginLeft: 10}}>
          <Text style={{fontFamily: 'Arial', fontSize: 15, color: 'white'}}>
            {contact== null? 'Save' : 'Update'}
          </Text>
        </Icon.Button>
        <Text> </Text>
        <Icon.Button
          name="close"
          backgroundColor="red"
          onPress={() => props.navigation.goBack()}
          style={{marginRight: 10, marginLeft: 10}}>
          <Text style={{fontFamily: 'Arial', fontSize: 15, color: 'white'}}>
            Cancel
          </Text>
        </Icon.Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  button: {
    width: 250,
    height: 60,
    backgroundColor: '#3740ff',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    marginBottom: 12,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 15,
    color: '#fff',
  },
  input: {
    marginBottom: 5,
    borderColor: 'green',
    borderWidth: 1,
    width: '100%',
  },
  inline: {
    flexDirection: 'row',
    marginLeft: 20,
    justifyContent: 'space-evenly',
  },
});

export default AddContact;
