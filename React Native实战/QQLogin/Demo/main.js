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
    TabBarIOS,
    Image,
    NavigatorIOS

} from 'react-native';

// 导入外部的json数据

var Home = require('../Demo/home');
var Messa = require('../Demo/message');
var Find = require('../Demo/find');
var Mine = require('../Demo/mine');

var Main = React.createClass({

    getInitialState(){
        return{
            selectedItem :'home'
        }
    },
    render(){
        return(

            <TabBarIOS>
                <TabBarIOS.Item
                    icon={{uri:'tabbar_home'}}
                    title='首页'
                    selected={this.state.selectedItem == 'home'}
                    onPress={() => {this.setState({selectedItem: 'home'})}}
                >
                    <NavigatorIOS
                        style={{flex:1}}
                            initialRoute={
                                {
                                    component: Home,
                                    title: '首页',
                                    rightButtonIcon: {uri: 'navigationbar_pop'},
                                    leftButtonIcon: {uri: 'navigationbar_friendattention'}

                                }
                            }
                    />
                </TabBarIOS.Item>
                <TabBarIOS.Item
                    icon={{uri:'tabbar_discover'}}
                    title='发现'
                    selected={this.state.selectedItem == 'find'}
                    onPress={() => {this.setState({selectedItem: 'find'})}}
                >

                    <NavigatorIOS
                        style={{flex:1}}

                        initialRoute={
                        {
                            component: Find,
                            title:'发现'
                        }
                        }
                    />
                </TabBarIOS.Item>
                <TabBarIOS.Item
                    icon={{uri:'tabbar_message_center'}}
                    title='消息'
                    selected={this.state.selectedItem == 'messa'}
                    onPress={() => {this.setState({selectedItem: 'messa'})}}
                >
                    <NavigatorIOS
                        style={{flex:1}}

                        initialRoute={
                            {
                                component: Find,
                                title:'发现'
                            }
                        }
                    />
                </TabBarIOS.Item>
                <TabBarIOS.Item
                    icon={{uri:'tabbar_profile'}}
                    title='我的'
                    selected={this.state.selectedItem == 'mine'}
                    onPress={() => {this.setState({selectedItem: 'mine'})}}
                >

                    <NavigatorIOS
                        style={{flex:1}}

                        initialRoute={
                        {
                            component: Mine,
                            title:'我的'
                        }
                        }
                    />
                </TabBarIOS.Item>
            </TabBarIOS>
        );
    },


});


// 设置样式
const  styles = StyleSheet.create({

});


module.exports = Main;