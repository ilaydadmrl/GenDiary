import React, { Component } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native';

export default class Deneme extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDropdown: false,
      selectedItem: null,
    };
    this.dropdownItems = ['Male', 'Female', 'Other'];
  }

  genderDropdown = () => {
    this.setState((prevState) => ({
      showDropdown: !prevState.showDropdown,
    }));
  };

  selectGender = (item) => {
    this.setState({
      selectedItem: item,
      showDropdown: false,
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.genderDropdown} style={styles.dropdownButton}>
          <Text>{this.state.selectedItem || 'Gender'}</Text>
        </TouchableOpacity>
        <Modal
          visible={this.state.showDropdown}
          animationType="slide"
          transparent={true}
          onRequestClose={() => this.setState({ showDropdown: false })}
        >
          <View style={styles.modalContainer}>
            {this.dropdownItems.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.dropdownItem}
                onPress={() => this.selectGender(item)}
              >
                <Text>{item}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropdownButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
  },
  modalContainer: {
    marginTop: 'auto',
    marginBottom: 0,
    backgroundColor: 'white',
    width: '100%',
  },
  dropdownItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});
