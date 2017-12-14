/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
    TouchableOpacity,
    Image
} from 'react-native';

import {StackNavigator, TabNavigator} from "react-navigation";

var Home = require('./Component/Home/LSHome');
var Shop = require('./Component/Shop/LSShop');
var Mine = require('./Component/Mine/LSMine');
var More = require('./Component/More/LSMore');

var HomeSecond = require('./Component/Home/LSHomeSecondController');


const styles = StyleSheet.create({
  icon: {
    height: 30,
    width: 30,
    resizeMode: 'contain'
  },

  headerStyle:{
      backgroundColor:'red'
  }
});


class ChatScreen extends React.Component {

    static navigationOptions = ({ navigation}) => ({
        title: `chat with ${navigation.state.params.user}`,
        headerLeft : <TouchableOpacity><Image style={styles.icon} source={{uri : 'navigationbar_arrow_up'}}/></TouchableOpacity>,
        barTintColor:'orange',
        headerStyle:styles.headerStyle


    });

    constructor(props){
        super(props);
        this.state = { name: 'goback' };

    }
    render() {
        const {params} = this.props.navigation.state;
        const {goBack,state} = this.props.navigation;
        return (
            <View>
                <Text>Chat with {params.user}</Text>

                <TouchableOpacity onPress={ () => {
                    params.callBack('aaa');
                    goBack();
                }}>
                    <Text>{this.state.name}</Text>
                </TouchableOpacity>

            </View>
        );
    }

    change(){
        alert('sdf');
        this.setState({
            name : 'sdf'
        })
    }
}

class HomeScreen extends React.Component {
    static navigationOptions = {
        title: 'Welcome',
    };
    render() {
        const { navigate } = this.props.navigation;
        return (
            <View>
                <TouchableOpacity onPress={ () => navigate('Chat',
                    {
                        user:'lucy',
                        callBack:(data) => {
                            alert(data);
                        }
                    })}>
                <Text>Hello, Chat App!</Text>
                </TouchableOpacity>
            </View>
          );
    }

}

class RecentChatsScreen extends React.Component {
    render() {
        return <Text>List of recent chats</Text>
    }
}

class AllContactsScreen extends React.Component {
    render() {
        return <Text>List of all contacts</Text>
    }
}

const MainScreenNavigator = TabNavigator({
    Home: {
        screen: Home,
        navigationOptions: {
            title: '首页',
            tabBarIcon: ({ tintColor }) => (
                <Image
                    source={{uri:'icon_tabbar_homepage'}}
                    style={[styles.icon, {tintColor: tintColor}]}
                />
            ),
        }

    },

    Shop: {
        screen: Shop,
        navigationOptions: {
            title: '商家',
            tabBarIcon: ({ tintColor }) => (
                <Image
                    source={{uri:'icon_tabbar_merchant_normal'}}
                    style={[styles.icon, {tintColor: tintColor}]}
                />
            ),
        }
    },

    Mine: {
        screen: Mine,
        navigationOptions: {
            title: '我的',
            tabBarIcon: ({ tintColor }) => (
                <Image
                    source={{uri:'icon_tabbar_mine'}}
                    style={[styles.icon, {tintColor: tintColor}]}
                />
            ),
        }
    },

    More: {
        screen: More ,
        navigationOptions: {
            title: '更多',
            tabBarIcon: ({ tintColor }) => (
                <Image
                    source={{uri:'icon_tabbar_misc'}}
                    style={[styles.icon, {tintColor: tintColor}]}
                />
            ),
        },

    },

},{
    tabBarOptions:{
        activeTintColor:'#ed4d4d',
        lazy:true
    }
});


const App = StackNavigator({
   Home: {
       screen: MainScreenNavigator,

   },

    Detail: {
        screen: HomeSecond,

    }

},{
    navigationOptions:{
        headerStyle:{
            backgroundColor:'rgba(255,96,0,1.0)',
        },
        headerTitleStyle:{color:'white',fontSize:17}
    }
});

AppRegistry.registerComponent('LeoShop', () => App);
