
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

var dataArr = require('./Car.json');

var ListViewDemo1 = React.createClass({

    getDefaultProps(){
        return{
        }
    },


    // 设置可变的和初始值
    getInitialState(){

        var sectionData = (dataBlob, sectionID) => {
            return dataBlob[sectionID];
        };

        var rowData = (dataBlob,sectionID,rowID) => {
            return dataBlob[sectionID +':'+ rowID];
        };

        return{
            dataSource: new ListView.DataSource({
                rowHasChanged:(r1 ,r2) => r1 !== r2,
                getSectionHeaderData:sectionData,
                getRowData:rowData,
                sectionHeaderHasChanged:(s1,s2) => s1 !== s2
            })
        }
    },
    render() {
        return(
            <View style={styles.outerViewStyle}>
                {/*头部*/}
                <View style={styles.headerViewStyle}>
                    <Text style={{color:'white', fontSize:25}}>SeeMyGo品牌</Text>
                </View>
                {/*ListView*/}
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow}
                    renderSectionHeader={this.renderSectionHeader}
                />
            </View>
        );

    },

    componentDidMount(){

        this.loadDataFromJson();
    },

    loadDataFromJson(){
        var dataBlob = {};
        var sectionID= [];
        var rowID = [];

        var  data = dataArr.data;
        for (var  i = 0 ; i < data.length ; i++ ){

            sectionID.push(i);
            dataBlob[i] = data[i].title;

            rowID[i] = [];
            var tmpArr = data[i].cars;

            for (var j = 0 ; j < tmpArr.length ; j++){
                rowID[i].push(j);
                dataBlob[i + ':' + j] = tmpArr[j];
            }
        }

        this.setState({
            dataSource:this.state.dataSource.cloneWithRowsAndSections(dataBlob,sectionID,rowID)
        });
    },


    // 每一行的数据
    renderRow(rowData){
        return(
            <TouchableOpacity activeOpacity={0.5}>
                <View style={styles.rowStyle}>
                    <Image source={{uri: rowData.icon}} style={styles.rowImageStyle}/>
                    <Text style={{marginLeft:5}}>{rowData.name}</Text>
                </View>
            </TouchableOpacity>
        );
    },

    // 每一组中的数据
    renderSectionHeader(sectionData, sectionID){
        return(
            <View style={styles.sectionHeaderViewStyle}>
                <Text style={{marginLeft:5, color:'red'}}>{sectionData}</Text>
            </View>
        );
    }
});

// 设置样式
const  styles = StyleSheet.create({
    outerViewStyle:{
        //占满窗口
        flex:1
    },

    headerViewStyle:{
        height:64,
        backgroundColor:'orange',

        justifyContent:'center',
        alignItems:'center'
    },

    rowStyle:{
        // 设置主轴的方向
        flexDirection:'row',
        // 侧轴方向居中
        alignItems:'center',
        padding:10,

        borderBottomColor:'#e8e8e8',
        borderBottomWidth:0.5
    },

    rowImageStyle:{
        width:70,
        height:70,
    },

    sectionHeaderViewStyle:{
        backgroundColor:'#e8e8e8',
        height:25,

        justifyContent:'center'
    }
});



module.exports = ListViewDemo1;



