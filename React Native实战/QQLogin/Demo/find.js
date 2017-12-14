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

} from 'react-native';

// 导入外部的json数据


var Find = React.createClass({

    render(){
        return(
            <View style={styles.outerViewStyle}>
                <Text>find</Text>
            </View>

        );
    },


});


// 设置样式
const  styles = StyleSheet.create({
    outerViewStyle:{
        //占满窗口
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
});


module.exports = Find;