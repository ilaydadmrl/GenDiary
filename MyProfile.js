import React, { Component} from "react";
import PostTemplate from './PostTemplate';
import ProfileTemplate from "./ProfileTemplate";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
  Image,
  Button,
} from "react-native";

class MyProfile extends Component {
  render() {  
    return (
      <View>
        <ScrollView>
        <ProfileTemplate 
        username="ilayda.ddmrl"
        pfp={require('./assets/images/post3.jpeg')}
        />
        <Text style={styles.diaries}>Pinned Diaries</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
        <View style={styles.bigPlusContainer}>
          <View onPress={()=>this.props.navigation.navigate("CreatePost")} style={[styles.smallBox, { left: '10%' }]}>
            
          </View>
          <View style={{ height: '100%', width: 1, backgroundColor: 'black', position: 'absolute', left: '50%' }}></View>
          <View style={[styles.smallBox, { left: '60%' }]}></View>
        </View>
      </View>
        <Text style={styles.diaries}>All Diaries</Text>
        <PostTemplate
          username="ilayda.ddmrl"
          description={"İnanılmaz bir gün"}
          image={require('./assets/images/post2.jpeg')} 
          pimage={require('./assets/images/stockprofile2.jpeg')}
        />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  diaries: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#09333f',
    marginBottom: 10,
    marginLeft: 15,
  },
  bigPlusContainer: {
    marginTop: 25,
    borderWidth: 2,
    borderColor: 'black',
    width: 330,
    height: 165,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    position: 'relative',
  },
  smallBox: {
    width: 100,
    height: 100,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 4,
    position: 'absolute',
  },
});

export default MyProfile;