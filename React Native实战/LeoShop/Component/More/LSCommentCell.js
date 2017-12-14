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
    Switch
} from 'react-native';


var LSCommentCell = React.createClass({

    getDefaultProps(){
        return{
            title:'',
            isSwitch:false,
            subTitle:''
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
                    <Text style={{marginLeft:10}}>{this.props.title}</Text>
                    {this.renderRightView()}
                </View>
            </TouchableOpacity>

        );
    },

    renderRightView(){
        if(this.props.isSwitch){
            return(
                <Switch style={{marginRight:10}} onValueChange={()=> {this.setState({isOn:!this.state.isOn})}} value={this.state.isOn == true}/>
            )
        } else {

          return(
              <View style={styles.subTitleStyle}>
            {this.renderSubTitle()}
            <Image source={{uri:'icon_cell_rightArrow'}} style={{width:8,height:13,marginRight:10}}/>
            </View>
          )
        }

    },

    renderSubTitle(){
        if (this.props.subTitle.length > 0){
            return(
                <Text style={{marginRight:3}}>{this.props.subTitle}</Text>
            )
        } else {
            return;
        }
    },
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

    subTitleStyle:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',


    }

});

module.exports = LSCommentCell;