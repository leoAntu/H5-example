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

const screnW = require('Dimensions').get('window').width;
var cols = 5;
var cellWH = 80;
var topMargin = 10;
var leftMargin = (screnW - cellWH * 5) / (cols + 1);


var LSMineCell = React.createClass({

    getDefaultProps(){
        return{
            dataArr: []

        }
    },

    getInitialState(){
        var  ds = new ListView.DataSource({
            rowHasChanged:(r1,r2) => r1 != r2
        });

        return{
            dataSource: ds.cloneWithRows(this.props.dataArr)
        }
    },

    render() {
        return (
            <ListView
                dataSource={this.state.dataSource}
                renderRow={this.renderCell}
                contentContainerStyle={styles.listViewStyle}
                scrollEnabled={false}
            />



        );
    },

    renderCell(rowData, sectionID, rowID, highlightRow){
        return(
            <TouchableOpacity onPress={()=> this.onClick(rowID)}>
                <View style={styles.cellStyle} >
                    <Image source={{uri:rowData.image}} style={{width:52,height:52}}/>
                    <Text>{rowData.title}</Text>
                </View>
            </TouchableOpacity>

        )
    },

    onClick(rowID){
        alert(rowID)
    }


});

const styles = StyleSheet.create({
    listViewStyle:{
        width:screnW,
        flexDirection:'row',
        flexWrap:'wrap'
    },

    cellStyle:{
        width:cellWH,
        height:cellWH,
        marginTop:topMargin,
        marginLeft:leftMargin,
        alignItems:'center'
    }
});

module.exports = LSMineCell;