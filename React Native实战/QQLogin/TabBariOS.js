
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ListView,
    Image,
    TouchableOpacity,
    TabBarIOS
} from 'react-native';


var Dimension = require('Dimensions');
var  {width} = Dimension.get('window');


var TabBariOS = React.createClass({

    getDefaultProps(){
        return{

        }
    },


    // 设置可变的和初始值
    getInitialState(){
        return{

            selectedItemName:'home'
        }
    },
    render() {
        return(
            <View style={styles.outerViewStyle}>
                <View style={styles.titleStyle}>
                    <Text style={{color:'white', fontSize:25}}>SeeMyGo品牌</Text>
                </View>
                <TabBarIOS>
                    <TabBarIOS.Item
                        systemIcon="downloads"
                        title="张三"
                        badge={'3'}
                        selected={this.state.selectedItemName == 'home'}
                        onPress={()=>{this.setState({selectedItemName:'home'})}}
                    >
                        <View style={[styles.commonViewStyle,{backgroundColor:'red'}]}>
                            <Text>首页</Text>
                        </View>
                    </TabBarIOS.Item>

                    <TabBarIOS.Item
                        systemIcon="downloads"
                        title="李四"
                        selected={this.state.selectedItemName == 'second'}
                        onPress={()=>{this.setState({selectedItemName:'second'})}}
                    >
                        <View style={[styles.commonViewStyle,{backgroundColor:'yellow'}]}>
                            <Text>2</Text>
                        </View>
                    </TabBarIOS.Item>
                    <TabBarIOS.Item
                        systemIcon="downloads"
                        title="王五"
                        selected={this.state.selectedItemName == 'three'}
                        onPress={()=>{this.setState({selectedItemName:'three'})}}
                    >
                        <View style={[styles.commonViewStyle,{backgroundColor:'gray'}]}>
                            <Text>3</Text>
                        </View>
                    </TabBarIOS.Item>
                    <TabBarIOS.Item
                        systemIcon="downloads"
                        title="小六"
                        selected={this.state.selectedItemName == 'four'}
                        onPress={()=>{this.setState({selectedItemName:'four'})}}
                    >
                        <View style={[styles.commonViewStyle,{backgroundColor:'green'}]}>
                            <Text>4</Text>
                        </View>
                    </TabBarIOS.Item>
                </TabBarIOS>
            </View>
        );

    },

    componentDidMount(){

    },


});

// 设置样式
const  styles = StyleSheet.create({

    outerViewStyle:{
        flex:1
    },

    titleStyle:{
        backgroundColor:'red',
        alignItems:'center',
        height:64,
        justifyContent:"center"
    },

    commonViewStyle:{
        flex:1,

        justifyContent:'center',
        alignItems:'center'

    },



});



module.exports = TabBariOS;



