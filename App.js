import React from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import Signup from "./Signup";
import ForgotPassword from "./ForgotPassword";
import Feed from "./Feed";
import CreatePost from "./CreatePost";
import Login from "./Login";
import MyProfile from "./MyProfile";


const Stack = createStackNavigator({
  Login: {
    screen: Login,
    navigationOptions:{
      title:'',
      headerStyle:{
        backgroundColor:'#09333f',
      },
      header: () => null,
    },
    
  },
  Signup: {
    screen: Signup,
    navigationOptions:{
      title:'Sign Up',
      headerStyle:{
        backgroundColor:'#09333f',
      },
      headerTintColor: "#effaf6",
    },
  },
  Feed:{
    screen:Feed,
    navigationOptions:{
      title:'',
      headerStyle:{
        backgroundColor:'#09333f',
      },
      header: () => null,
    },
  },
  ForgotPassword:{
    screen:ForgotPassword,
    navigationOptions:{
      title:'Forgot My Password',
      headerStyle:{
        backgroundColor:'#09333f',
      },
      headerTintColor: "#effaf6",
    },
  },
 
  MyProfile:{
    screen:MyProfile,
    navigationOptions:{
      title:'My Profile'
    },
  },
  CreatePost:{
    screen:CreatePost,
    navigationOptions:{
      title:'Create Post'
    },
  },
 

});

const AppContainer = createAppContainer(Stack);

const App = () => {
  return <AppContainer />;
};

export default App;
