import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

class CreatePost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedImage: null,
      description: '',
      token: '',
    };
  }

  async componentDidMount() {
    try {
      const storedToken = await AsyncStorage.getItem('userToken');
      if (!storedToken) {
        Alert.alert("Login Required", "Please log in to create a post.");
        // Optionally navigate to the login screen
      }
      this.setState({ token: storedToken });
    } catch (error) {
      console.error('Error retrieving token:', error);
    }
  }

  pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert("Permission Required", "Gallery access permission is required to select images.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      this.setState({ selectedImage: result.uri });
    }
  };

  handleSubmit = async () => {
    const { selectedImage, description, token } = this.state;
    if (!selectedImage || !token) {
      Alert.alert("Missing Data", "Please select an image and ensure you are logged in.");
      return;
    }

    const formData = new FormData();
    formData.append('image', {
      uri: selectedImage,
      type: 'image/jpeg', // Adjust the mime type to match your image type
      name: 'post-image.jpg',
    });
    formData.append('content', description);

    try {
      const response = await fetch('http://192.168.1.103:8089/post', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });
      const responseData = response.ok ? await response.json() : await response.text();

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status} - ${responseData}`);
      }
  
     
      Alert.alert("Success", "Post created successfully.");
    console.log('Response Data:', responseData); // Log the successful response
  } catch (error) {
    console.error('Error creating post:', error);
    Alert.alert("Error", "Failed to create the post: " + error.message);
  }
};
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.photoContainer} onPress={this.pickImage}>
          {this.state.selectedImage ? (
            <Image source={{ uri: this.state.selectedImage }} style={styles.image} />
          ) : (
            <Text>Select a Photo</Text>
          )}
        </TouchableOpacity>

        <TextInput
          placeholder="Description"
          multiline
          onChangeText={(text) => this.setState({ description: text })}
          style={styles.descriptionContainer}
        />

        <TouchableOpacity style={styles.submitContainer} onPress={this.handleSubmit}>
          <Text style={styles.submitText}>Submit</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default CreatePost;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f0f0',
    padding: 20,
  },
  photoContainer: {
    borderWidth: 1,
    borderColor: 'black',
    width: 330,
    height: 330,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 15,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  descriptionContainer: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 8,
    width: '100%',
    padding: 10,
    marginBottom: 15,
  },
  submitContainer: {
    borderWidth: 1,
    borderRadius: 8,
    width: '50%',
    padding: 10,
    backgroundColor: 'blue',
  },
  submitText: {
    color: 'white',
    textAlign: 'center',
  },
});