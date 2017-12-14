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


const LSHomeSectionHeader = require('../More/LSHomeSetionHeaderView');

var LSHomeLike = React.createClass({

    getDefaultProps(){
        return{
            api_url:'http://api.meituan1.com/group/v2/recommend/homepage/city/20?userId=160495643&userid=160495643&__vhost=api.mobile.meituan.com&position=23.134643%2C113.373951&movieBundleVersion=100&utm_term=6.6&limit=40&wifi-mac=64%3A09%3A80%3A10%3A15%3A27&ci=20&__skcy=X6Jxu5SCaijU80yX5ioQuvCDKj4%3D&__skua=5657981d60b5e2d83e9c64b453063ada&__skts=1459731016.350255&wifi-name=Xiaomi_1526&client=iphone&uuid=5C7B6342814C7B496D836A69C872202B5DE8DB689A2D777DFC717E10FC0B4271&__skno=FEB757F5-6120-49EC-85B0-D1444A2C2E7B&utm_content=5C7B6342814C7B496D836A69C872202B5DE8DB689A2D777DFC717E10FC0B4271&utm_source=AppStore&utm_medium=iphone&version_name=6.6&wifi-cur=0&wifi-strength=&offset=0&utm_campaign=AgroupBgroupD100H0&__skck=3c0cf64e4b039997339ed8fec4cddf05&msid=0FA91DDF-BF5B-4DA2-B05D-FA2032F30C6C2016-04-04-08-38594'
        }
    },

    getInitialState(){
        return{
        }
    },

    render() {
        return (
            <View style={{backgroundColor:'white'}}>
                <LSHomeSectionHeader
                    icon={'gw'}
                    title={'购物中心'}
                    subTitle={'全部4家'}
                    indicator={'icon_cell_rightArrow'}
                />
            </View>
        )
    },

    componentDidMount(){
        this.loadDataFormNet();
    },

    loadDataFormNet(){
        fetch(this.props.api_url)
            .then((response) => response.json()) // 下一步
            .then((responseData) => {
               console.log(responseData);
            })
            .catch((error)=>{
                console.log(error);
                console.log('sdfsdfsdsdsddf');

            })
    }
});



const styles = StyleSheet.create({

});

module.exports = LSHomeLike;