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
    Image,
} from 'react-native';

import TabNavigator from 'react-native-tab-navigator';
import { StackNavigator } from 'react-navigation';


var Home = require('../../Component/Home/LSHome');
var Shop = require('../../Component/Shop/LSShop');
var Mine = require('../../Component/Mine/LSMine');
var More = require('../../Component/More/LSMore');


var LSMain = React.createClass({

    getInitialState(){
        return{
            selectedTab: 'home',
        }
    },
    render() {
        return (
            <TabNavigator
                barTintColor='orange'
            >
                <TabNavigator.Item
                    selected={this.state.selectedTab === 'home'}
                    title="首页"
                    renderIcon={() => <Image source={{uri:'icon_tabbar_homepage'}} style={styles.iconStyle}/>}
                    renderSelectedIcon={() => <Image source={{uri:'icon_tabbar_homepage_selected'}} style={styles.iconStyle}/>}
                    badgeText="1"
                    onPress={() => this.setState({ selectedTab: 'home' })}>


                    <Text>sdfsdf</Text>
                </TabNavigator.Item>
                <TabNavigator.Item
                    selected={this.state.selectedTab === 'profile'}
                    title="商家"
                    renderIcon={() => <Image source={{uri:'icon_tabbar_merchant_normal'}} style={styles.iconStyle} />}
                    renderSelectedIcon={() => <Image source={{uri:'icon_tabbar_merchant_selected'}} style={styles.iconStyle}/>}
                    onPress={() => this.setState({ selectedTab: 'profile' })}>
                    <Text>sdfsdf</Text>

                </TabNavigator.Item>

                <TabNavigator.Item
                    selected={this.state.selectedTab === 'mine'}
                    title="我的"
                    renderIcon={() => <Image source={{uri:'icon_tabbar_mine'}} style={styles.iconStyle} />}
                    renderSelectedIcon={() => <Image source={{uri:'icon_tabbar_mine_selected'}} style={styles.iconStyle}/>}
                    onPress={() => this.setState({ selectedTab: 'mine' })}>
                    <Text>sdfsdf</Text>

                </TabNavigator.Item>

                <TabNavigator.Item
                    selected={this.state.selectedTab === 'more'}
                    title="更多"
                    renderIcon={() => <Image source={{uri:'icon_tabbar_misc'}} style={styles.iconStyle} />}
                    renderSelectedIcon={() => <Image source={{uri:'icon_tabbar_misc_selected'}} style={styles.iconStyle}/>}
                    onPress={() => this.setState({ selectedTab: 'more' })}>
                    <Text>sdfsdf</Text>

                </TabNavigator.Item>
            </TabNavigator>
        );
    }
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    iconStyle:{
        width:30,
        height:30
    }

});

module.exports = LSMain;