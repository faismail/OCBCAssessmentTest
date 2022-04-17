import React, { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity,TextInput, LogBox, Alert } from 'react-native';
import { Card, CardItem, Container, Text, Form, View, Textarea, Picker, Col, Icon, Item} from 'native-base';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';

const Transactions = ({navigation}) => {

    const [amount, setAmount] = useState(0);
    const [description, setDescription] = useState('');
    const [payees, setPayees] = useState([]);
    const [selectedPayees, setSelectedPayees] = useState();
    
    const getPayees = async () =>  {
        const token = await AsyncStorage.getItem('token')
            axios.get
            (   
                'https://green-thumb-64168.uc.r.appspot.com/payees',
            {
            headers:{
                Accept:'application/json',
                'Content-Type':'application/json',
                'Authorization':token
            }
        })
        .then(res => {
            if(res.data.status == 'success'){
                setPayees(res.data.data);
            } 
        })
        .catch(function(error) {
            if ( error.response.status ) {
                alert(error.response.data.error.name)
            }
          });
    }

    const proccesTransfer = async () =>  {

        const token = await AsyncStorage.getItem('token')
        // console.log(selectedPayees, amount, description)

        axios({
            method: 'POST',
            url: 'https://green-thumb-64168.uc.r.appspot.com/transfer',
            headers:{
                Accept:'application/json',
                'Content-Type':'application/json',
                'Authorization':token
            },
            data: {
                receipientAccountNo: selectedPayees,
                amount: parseInt(amount),
                description: description
            }
          })
        .then(res => {
            if(res.data.status == 'success'){
                alert('Transaction Success')
                navigation.navigate('Homescreen')
            } 
        })
        .catch(function(error) {
            if ( error.response.status ) {
                Alert.alert(error.response.data.error)
            }
          });
    }

useEffect(() => {
    getPayees()
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    LogBox.ignoreLogs(['responder.scrollResponderScrollTo is not a function.']);

    
}, []);

    return (
        <Container style={styles.container}>
            <Col style={{ flex:2, justifyContent:'center', alignItems:'center',   }}> 
                <LinearGradient useAngle={true}
                                    angle={136}
                                    colors={['#D0C1C1' , '#F50303',]}
                                    locations={[0,1]}
                                    start={{x: 0, y: 0}} end={{x: 1, y: 0}}
                                    style={styles.transfer}> 
                        <Text  style={styles.transferText}>
                            Transaction
                        </Text>
                </LinearGradient>

                <Picker
                        textStyle={styles.textInput}
                        note
                        mode="dropdown"
                        placeholder= {"Select Payees"}
                        iosIcon= {<Icon regular type="FontAwesome5" name="chevron-down" style={{ fontSize:20 }}/>}
                        placeholderStyle={{color: 'black'}}
                        style={styles.formInput}
                        selectedValue = { selectedPayees }
                        onValueChange = { (value)  => setSelectedPayees (value)}
                        >
                        <Picker.Item label="Payees"  /> 
                        { payees.map(value => (
                            <Item key={value.accountNo}
                                label={value.name}
                                value={value.accountNo}
                            />
                        ))}
                    </Picker>                            
                <View style={styles.formInput}>
                    <Icon type='FontAwesome5' name="dollar-sign" style={{fontSize:RFValue(20, 680), marginLeft:'5%', marginRight:'3%', alignSelf:'center', color:'black'}}/>
                    <TextInput  style={styles.textInput}
                                placeholder="Amount"
                                keyboardType = 'number-pad'
                                placeholderTextColor = "black"
                                selectionColor="black"
                                onChangeText={(value)=>setAmount(value)}
                                />
                </View>    

                <View style={styles.formInput}>
                    <Icon type='FontAwesome5' name="comment" style={{fontSize:RFValue(20, 680), marginLeft:'5%', marginRight:'3%', alignSelf:'center', color:'black'}}/>
                    <TextInput  style={styles.textInput}
                                placeholder="Description"
                                placeholderTextColor = "black"
                                selectionColor="black"
                                onChangeText={(value)=>setDescription(value)}
                                />
                </View>    
            </Col>

            <Col style={{  justifyContent:'center', alignItems:'center',  }}>  
                <LinearGradient useAngle={true}
                                    angle={136}
                                    colors={['#D0C1C1' , '#F50303',]}
                                    locations={[0,1]}
                                    start={{x: 0, y: 0}} end={{x: 1, y: 0}}
                                    style={styles.button}> 
                    <TouchableOpacity  style={styles.button} onPress={proccesTransfer}>
                        <Text style={styles.buttonText}>
                           Transfer Now
                        </Text>
                    </TouchableOpacity>
                </LinearGradient>      
            </Col>
        </Container>
      );
}

const styles = StyleSheet.create ({

    container: {
        flex: 1,
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundColor:'#DCECF6',
        justifyContent: 'center',
    },
    transfer: {
        width: RFPercentage(30),
        height: RFPercentage(8),
        borderWidth:1,
        justifyContent:'center',
        alignItems:'center',
        borderColor:'#DCECF6',
        backgroundColor:'black',
        borderRadius: 22,
        marginVertical: '5%',
        marginRight:'50%'
      },
      
      transferText: {
        fontFamily: 'Avenir Next',
        fontSize: RFValue(22, 680),
        color: 'black',
        textAlign: 'center'
      },

    formInput:{
        width: RFPercentage(46),
        height: RFPercentage(7),
        flexDirection:'row',
        borderWidth:1,
        borderColor:'black',
        backgroundColor:'white',
        borderRadius: 22,
        marginVertical: '5%',
    },
    
    textInput: {
        width:'73%',
        fontFamily: 'Avenir Next',
        fontSize: RFValue(16, 680),
        color: 'black',
    },

    button: {
        width: RFPercentage(30),
        height: RFPercentage(6),
        justifyContent:'center',
        alignItems:'center',
        borderWidth:1,
        borderColor:'#b8c6db',
        alignSelf:'center',
        borderRadius: 20,
        marginVertical: '5%',
    },

    buttonText: {
        fontFamily: 'Avenir Next',
        fontSize: RFValue(20, 680),
        color: 'black',
        textAlign: 'center',
    },


    pickerStyle: {
        shadowRadius: 0.5,
        shadowOpacity: 0.5,
        borderWidth: 0.5,
        shadowOffset: {
          width: 0.5,
          height: 0.5,
        },
        height: 60,
        borderColor: '#303030',
        shadowColor: '#303030',
        borderRadius: 2,
        elevation: 0.5,
      },

});

export default Transactions