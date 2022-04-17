import React, { useState, useEffect, } from 'react';
import { StyleSheet, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { Card, CardItem, Container, Text, Form, View, Textarea, Picker, Col, Icon, Button} from 'native-base';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { ocbclogo } from '../../Assets/Images/index';
import AsyncStorage from '@react-native-async-storage/async-storage';

const StartedPage = ({ navigation }) => {

  return (
    <Container style={styles.container}>
        <Col style={{  justifyContent:'center', alignSelf:'center',  }}>  
                <TouchableOpacity onPress={()=>navigation.replace('Register')}>
                    <Image style={styles.logoStyle} source={ocbclogo} />
                    <Text style={styles.buttonText}>
                        Getting Started
                    </Text>
                </TouchableOpacity>     
        </Col>
    </Container>
  );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundColor:'black',
        justifyContent: 'center',
    },

    logoStyle: {
        alignSelf: 'center',
        justifyContent: 'center',
        width: RFPercentage(38),
        height: RFPercentage(8),
        },

    buttonText: {
        fontFamily: 'Avenir Next',
        fontSize: RFValue(25, 680),
        color: 'red',
        textAlign: 'center',
        marginTop:'10%'
    },
});

export default StartedPage;