
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ListView,
    Image,
    TouchableOpacity,
    AlertIOS
} from 'react-native';


var Dimension = require('Dimensions');
var  {width} = Dimension.get('window');

var dataArr = require('./Wine.json');

var ListViewDemo = React.createClass({

    getDefaultProps(){
        return{
        }
    },


    // 设置可变的和初始值
    getInitialState(){
        var demo = new ListView.DataSource({rowHasChanged: (r1,r2) => r1 !== r2});

        return{
            dataSource: demo.cloneWithRows(dataArr)
        }
    },
    render() {
        return (
            <ListView
                dataSource={this.state.dataSource}
                renderRow={this.renderRow}
            />
        );

    },

    renderRow(rowData, sectionID, rowID, highlightRow){

        return(
            <TouchableOpacity onPress={() => {AlertIOS.alert('点击了' + rowID +'行')}}>
            <View style={styles.cellStyle}>
                <Image source={{uri:rowData.image}} style={styles.imageStyle}/>
                <View style={styles.titleStyle}>
                    <Text style={styles.topTitleStyle}>{rowData.name}</Text>
                    <Text style={styles.bottomTitleStyle}>¥{rowData.money}</Text>
                </View>
            </View>
            </TouchableOpacity>
        );
    }

});

const styles = StyleSheet.create({

    cellStyle:{
        borderBottomWidth:0.5,
        borderColor:'#e8e8e8',
        padding:10,
        flexDirection:'row',
    },

    imageStyle:{
        width:60,
        height:60
    },

    titleStyle:{
        justifyContent:'center',
        marginLeft:10,
    },

    topTitleStyle:{

        width:width*0.8,

    },

    bottomTitleStyle:{

        marginTop:10,
        color:'red',
    }

});

module.exports = ListViewDemo;



