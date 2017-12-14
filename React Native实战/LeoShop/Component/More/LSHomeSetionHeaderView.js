/**
 * Created by leo on 2017/5/24.
 */
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
    TouchableOpacity,
    ListView,
    ScrollView

} from 'react-native';


var LSHomeSecitionHeader = React.createClass({

    getDefaultProps(){
        return{
            icon:'',
            title:'',
            subTitle:'',
            indicator:''
        }
    },

    getInitialState(){
        return{
        }
    },

    render() {
        return (
            <TouchableOpacity>
                <View style={styles.containStyle}>
                    <View style={styles.leftStyle}>
                        <Image source={{uri:this.props.icon}} style={{width:23,height:23,marginRight:5}}></Image>
                        <Text>{this.props.title}</Text>
                    </View>
                    <View style={styles.rightStyle}>
                        <Text>{this.props.subTitle}</Text>
                        <Image source={{uri:this.props.indicator}} style={{width:8,height:13,marginLeft:5}}></Image>
                    </View>
                </View>
            </TouchableOpacity>
        );
    },

});

const styles = StyleSheet.create({
    containStyle:{

        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        height:44,
        borderBottomColor:'#dddddd',
        borderBottomWidth:1

    },
    leftStyle:{
        flexDirection:'row',
        alignItems:'center',
        marginLeft:8

    },
    rightStyle:{
        flexDirection:'row',
        alignItems:'center',
        marginRight:8
    }
});

module.exports = LSHomeSecitionHeader;