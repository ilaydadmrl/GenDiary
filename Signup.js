import React, { Component,useState } from "react";

import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
  Image,
  Platform,
  Modal,
  Alert
  
} from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
  

export default class Signup extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      showDatePicker: false,
      birthDate: new Date(),
      showDropdown: false,
      gender: null,
      username:'',
      firstName:'',
      lastName:'',
      email:'',
      country:'',
      password:'',
      confirmPassword:'',
      countries:['Turkey', 'USA']
    };

    this.dropdownItems = ['Male', 'Female', 'Other'];
  }

  handleDateChange = (event, selectedDate) => {
    this.setState({
       showDatePicker: Platform.OS === 'ios',
       birthDate: selectedDate || this.state.birthDate });
  };

  showDatePicker = () => {
    this.setState({ showDatePicker: true });
  };

  hideDatePicker = () => {
    this.setState({ showDatePicker: false });
  };

  genderDropdown = () => {
    this.setState((prevState) => ({
      showDropdown: !prevState.showDropdown,
    }));
  };

  selectGender = (item) => {
    this.setState({
      gender: item,
      showDropdown: false,
    });
  };
  setUsername = (username) => {
    this.setState({username: username});
  };
  setName = (name) => {
    this.setState({firstName: name});
  };
  setSurname = (surname) => {
    this.setState({lastName: surname});
  };
  setCountry = (country) => {
    this.setState({country: country});
  };
  setEmail = (email) => {
    this.setState({email: email});
  };
  setPassword = (password) => {
    this.setState({password: password});
  };
  setConfirmPassword = (confirmPassword) => {
    this.setState({ confirmPassword: confirmPassword });
  };
  selectCountry = (item) => {
    this.setState({
      country: item,
      showCountryDropdown: false, // Assuming you'll have a flag to show/hide the country dropdown
    });
  };
  setCountry = () => {
    this.setState((prevState) => ({
      showCountryDropdown: !prevState.showCountryDropdown,
    }));
  };
  
 
  handleClick = (e) => {
    e.preventDefault();
    const { username, firstName, lastName, country, email, password,gender, birthDate } = this.state;
    const user = { username, firstName, lastName, country, email, password, gender, birthDate};
    if(password === this.state.confirmPassword && username !=="" && firstName !=="" && lastName !=="" && email !=="" && gender !==null && country !==null)  
    {
      console.log(user);
      fetch("http://192.168.1.103:8089/auth/registration", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user)
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
     return response.json();
    })
    .then(data => {
      console.log('Success:', data);
      Alert.alert('Register Successful', 'Your registration was successful.');
      this.props.navigation.navigate('Login');
    })
    .catch(error => {
      console.error('Error:', error);
  
    });
    }
    else if(password !== this.state.confirmPassword){
      Alert.alert('Sign Up Error!', 'Password Does Not Match!');
    }
    else{
      Alert.alert('Sign Up Error!', 'You Must Fill the Required Areas!');
    }
    

  };
  

  render() {
    
    
    return (
      
      <ScrollView>
      <View style={style.container}>
      
        <View><Image source={require('./assets/logo.png')} style={{marginTop:300, width:200,height:200}}></Image></View>
        <View>
          
          <View style={{ flex: 30, flexdirection: "column" }}>
            <TextInput style={style.text_box} value={this.state.username} onChangeText={(username) => this.setUsername(username)} placeholder="Username" placeholderTextColor='#effaf6' />
            
            <TextInput style={style.text_box} value={this.state.name} onChangeText={(name) => this.setName(name)} placeholder="Name" placeholderTextColor='#effaf6' />
            <TextInput style={style.text_box} value={this.state.surname} onChangeText={(surname) => this.setSurname(surname)} placeholder="Surname" placeholderTextColor='#effaf6' />
            <TouchableOpacity onPress={this.setCountry} style={[style.text_box, style.dropdownButton]}>
              <Text style={style.text_style}>{this.state.country || 'Country'}</Text>
            </TouchableOpacity>
            {this.state.showCountryDropdown && (
              <Modal
                visible={this.state.showCountryDropdown}
                animationType="slide"
                transparent={true}
                onRequestClose={() => this.setState({ showCountryDropdown: false })}
              >
                <View style={style.modalContainer}>
                  {this.state.countries.map((item, index) => (
                    <TouchableOpacity
                      key={index}
                      style={style.dropdownItem}
                      onPress={() => this.selectCountry(item)}
                    >
                      <Text>{item}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </Modal>
            )}
            <TouchableOpacity style={style.text_box} onPress={this.showDatePicker}>
              <Text style={[style.text_style,{marginTop:7, marginLeft:3}]}>{this.state.birthDate.toLocaleDateString()}</Text>
            </TouchableOpacity>

            {this.state.showDatePicker && (
              <DateTimePicker
                testID="dateTimePicker"
                value={this.state.birthDate}
                mode="date"
                is24Hour={true}
                display="default"
                onChange={this.handleDateChange}
                onTouchCancel={this.hideDatePicker}
              />
            )}
            
            <TouchableOpacity onPress={this.genderDropdown} style={[style.text_box, style.dropdownButton]}>
          <Text style={style.text_style}>{this.state.gender || 'Gender'}</Text>
        </TouchableOpacity>
        <Modal
          visible={this.state.showDropdown}
          animationType="slide"
          transparent={true}
          onRequestClose={() => this.setState({ showDropdown: false })}
        >
          <View style={style.modalContainer}>
            {this.dropdownItems.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={style.dropdownItem}
                onPress={() => this.selectGender(item)}
              >
                <Text>{item}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </Modal>

            <TextInput style={style.text_box} value={this.state.email} onChangeText={(email) => this.setEmail(email)} placeholder="Email" placeholderTextColor='#effaf6' />
            <TextInput style={style.text_box} value={this.state.password} onChangeText={(password) => this.setPassword(password)} placeholder="Password" placeholderTextColor='#effaf6' secureTextEntry={true} />
            <TextInput style={style.text_box} value={this.state.confirmpassword} onChangeText={(confirmpassword) => this.setConfirmPassword(confirmpassword)} placeholder="Confirm Password" placeholderTextColor='#effaf6' secureTextEntry={true} />
            <View style={{flexDirection:'row', alignItems: 'flex-end', marginTop:10}}>
            </View>
            <View style={{flexDirection: 'row', marginTop:30,justifyContent: 'center'}}>
            
            
            <TouchableOpacity
              style={style.button} onPress={this.handleClick}>
              <Text style={style.buttonText}>Sign Up</Text>
            </TouchableOpacity>
            </View>


            
          </View>
        </View>
        <View></View>
      </View>
      </ScrollView>
    );
  }
}



const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#09333f"
  },
  text_box: {
    height: 40,
    width: 200,
    borderColor: "#effaf6",
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 20,
    borderRadius: 20,
    fontSize: 20,
    color: '#effaf6'
  },
  checkbox: {
    width: 16,
    height: 16,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#effaf6',
    marginTop:10
  },
  text_style: {
    color: '#effaf6'
  },
  button: {
    backgroundColor: '#09333f',
    padding: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#effaf6',
    width:90
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  image_style:{
    marginTop:10
  },
  dropdownButton: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: "#effaf6",
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dropdownButtonText: {
    fontSize: 20,
    color: '#effaf6',
  },
  modalContainer: {
    marginTop: 'auto',
    marginBottom: 0,
    backgroundColor: 'white',
    width: '100%',
  },
  dropdownItem: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#effaf6",
    borderRadius: 20,
    marginBottom: 10,
    fontSize: 20,
    color: '#effaf6',
  },
 
});

