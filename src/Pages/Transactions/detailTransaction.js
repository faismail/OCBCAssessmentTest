import React, {Component, useEffect, useState} from 'react';
import {
  View, Text, Image, ImageBackground, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import { Container, Content, Grid, Col, Card, Icon} from 'native-base';
import {RFValue, RFPercentage } from "react-native-responsive-fontsize";
import LinearGradient from 'react-native-linear-gradient';

const DetailTransaction = ({route, navigation: { goBack  }}) => {

    const { value } = route.params;

    const copyToClipboard = () => {
      Alert.alert('Copy to Clipboard');
    };

  return (
    <View style={styles.container}>
        <Col style={styles.Box} >
            <LinearGradient useAngle={true}
                            angle={136}
                            colors={['#D0C1C1' , '#F50303',]}
                            locations={[0,1]}
                            start={{x: 0, y: 0}} end={{x: 1, y: 0}}
                            style={styles.CardTransaction}>

                          <View style={{ height:'15%', justifyContent:'center', flexDirection:'row' , marginTop:'5%', marginLeft:'5%' }} >
                              <Text style={styles.TitleText}>Transaction ID: #{value.transactionId}</Text>
                              <TouchableOpacity style={{ alignItems:'center', justifyContent:'center', marginHorizontal:'5%'}} onPress={copyToClipboard}>
                                 <Icon type="FontAwesome" name="copy" style={{ fontSize:RFValue(20, 680),  color:'white' }}/>
                              </TouchableOpacity>
                          </View>

                          <View style={{marginLeft:'5%', height:'15%', flexDirection:'row',  alignItems:'center',    }}>
                            <Text style={styles.TitleText}>DETAIL TRANSACTION </Text>
                            <TouchableOpacity style={{marginLeft:'15%', marginTop:'2%',  alignItems:'center'}} onPress={() => goBack()}>
                                <Text style={styles.CloseText}>
                                  go Back
                                </Text>
                            </TouchableOpacity>
                          </View>
            
                          <View style={{height:'15%', marginLeft:'5%', flexDirection:'row', alignItems:'center', justifyContent:'space-between',  }}>
                          {(function() {
                                        if (value.sender) 
                                        {
                                            return  <View style={{ flexDirection:'column', }}>
                                                        <Text style={styles.TitleText}>{value.sender.accountHolder}</Text>
                                                        <Text style={styles.TitleText}>{value.sender.accountNo}</Text>
                                                    </View>
                                        } 
                                        else {
                                            return <View style={{ flexDirection:'column', }}>
                                                    <Text style={styles.TitleText}>{value.receipient.accountHolder}</Text>
                                                    <Text style={styles.TitleText}>{value.receipient.accountNo}</Text>
                                                </View>
                                        }
                                        })
                                    ()}
                            <View style={{ flexDirection:'column', }}>
                              <Text style={styles.TitleText}>{value.accountHolder}</Text>
                              <Text style={styles.TitleText}>{value.accountNo}</Text>
                            </View>


                            <View style={{ flexDirection:'column', marginRight:'20%'}}>
                              <Text style={styles.TitleText}>Amount</Text>
                              <Text style={styles.ContentText}>{value.amount}</Text>
                            </View>
                          </View>

                            <View style={{height:'15%', marginLeft:'5%', flexDirection:'column', }}>                            
                                <Text style={styles.TitleText}>Transaction Type</Text>
                                <Text style={styles.ContentText}>{value.transactionType}</Text>
                            </View>
                            
                            <View style={{height:'15%', marginLeft:'5%', flexDirection:'column', }}>
                                <Text style={styles.TitleText}>Description</Text>
                                <Text style={styles.ContentText}>{value.description}</Text>
                            </View>                       
                       

                          <View style={{height:'15%', marginLeft:'5%', flexDirection:'column', }}>
                              <Text style={styles.TitleText}>Transaction Date</Text>
                              <Text style={styles.ContentText}>{value.transactionDate}</Text>
                          </View>
            </LinearGradient>
        </Col>          
    </View>
)};

const styles = StyleSheet.create({

container: {
  flex: 1,
  padding: 5,
  backgroundColor: '#DCECF6',
  },

Box: {
  width: '100%',
  height: '100%',
  padding: 5,
  alignItems:'center',

},

CardTransaction: {
  width: '100%',
  height:'70%',
  marginTop:'15%', 
  alignSelf:'center',
  borderRadius:8, 
  borderWidth:1,
  borderColor:'rgba(104, 148, 181, 0.5)', 
},

TitleText:{
  fontFamily: 'Avenir Next',
  fontWeight: '600',
  fontSize: RFValue(18,680),
  color:'black',
  marginTop:'3%',
},

ContentText:{
  fontFamily: 'Avenir Next',
  fontWeight: '500',
  fontSize: RFValue(16,680),
  color:'black',
},

CloseText:{
  fontFamily: 'Avenir Next',
  fontWeight: '600',
  fontSize: RFValue(15,680),
  color:'white',
  textAlign:'center'
}

});

export default DetailTransaction;