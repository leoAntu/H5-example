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

} from 'react-native';


var LSMineCell = React.createClass({

    getDefaultProps(){
        return{
            leftIcon:'',
            title:'',
            subTitle:'',
            news:false
        }
    },

    getInitialState(){
        return{
            isOn: false
        }
    },

    render() {
        return (
            <TouchableOpacity>
                <View style={styles.container}>
                    {this.renderLeftView()}
                    {this.renderRightView()}
                </View>
            </TouchableOpacity>

        );
    },

    renderLeftView(){
        return(
            <View style={styles.subViewStyle}>
                <Image source={{uri:this.props.leftIcon}} style={styles.leftIconStyle}/>
                <Text >{this.props.title}</Text>
            </View>
        )
    },

    renderRightView(){
        return(
            <View style={styles.subViewStyle}>
                {this.renderRightText()}
                <Image source={{uri:'icon_cell_rightArrow'}} style={{width:8,height:13,marginRight:10}}/>
            </View>
        )
    },
    renderRightText(){

        if (this.props.news) {
            return(
                <Image style={{marginRight:10,width:20,height:10}} source={{uri:'me_new'}}/>
            )
        } else {
            return(
                <Text style={{marginRight:10}}>{this.props.subTitle}</Text>
            )
        }
    }

});

const styles = StyleSheet.create({

    container:{
        height:40,
        backgroundColor:'white',
        borderBottomColor:'#DDDDDD',
        borderBottomWidth:0.5,

        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },

    leftIconStyle:{
        width:30,
        height:30,
        borderRadius:15,
        marginLeft:10,
        marginRight:10
    },
    subViewStyle:{
        flexDirection:'row',
        alignItems:'center'
    },


});

module.exports = LSMineCell;