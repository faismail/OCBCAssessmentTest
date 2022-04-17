import React, { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity,TextInput, Alert } from 'react-native';
import { Card, CardItem, Container, Text, Form, View, Textarea, Picker, Col, Icon} from 'native-base';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';

const Register = ({navigation}) => {

    const [Username, setUsername] = useState('');
    const [Password, setPassword] = useState('');
    const [Confirmpassword, setConfirmpassword] = useState('');
    const [hidePass, setHidePass] = useState(true);


    const processRegister = () => {
        
    // console.log(Username,Password, Confirmpassword)

    if (Confirmpassword != Password) {
        Alert.alert('Password Tidak Sama')
    }
    else {
    axios({
        method: 'POST',
        url: 'https://green-thumb-64168.uc.r.appspot.com/register',
        headers:{
            Accept:'application/json',
            'Content-Type':'application/json',
        },
        data: {
            username: Username,
            password: Password,
            confirmpassword: Confirmpassword
        }
      })

    .then(res => {
        if(res.data.status == 'success'){
            Alert.alert('Registration Success')
        } 
        navigation.navigate('Login')
    })

    .catch(function(error) {
        if ( error.response.status  ) {
            Alert.alert(error.response.data.error)
            
        }
      });
    }
}

    return (
        <Container style={styles.container}>
            
            <Col style={{ flex:2, justifyContent:'center', alignItems:'center',   }}>  

                <LinearGradient useAngle={true}
                                    angle={136}
                                    colors={['#D0C1C1' , '#F50303',]}
                                    locations={[0,1]}
                                    start={{x: 0, y: 0}} end={{x: 1, y: 0}}
                                    style={styles.register}> 
                    <Text  style={styles.registerText}>
                        Register
                    </Text>
                </LinearGradient>

                <View style={styles.formInput}>
                    <Icon type="FontAwesome5" name="user" style={{fontSize:RFValue(20, 680), marginLeft:'5%', marginRight:'3%', alignSelf:'center', color:'black' }}/>
                    <TextInput  style={styles.UserTextInput}
                                autoCapitalize='none'
                                placeholder="Username"
                                placeholderTextColor = "black"
                                selectionColor="black"
                                spellCheck={false}
                                autoCorrect={false}
                                onChangeText={(value)=>setUsername(value)}
                                />
                </View>

                <View style={styles.formInput}>
                    <Icon type='FontAwesome5' name="lock" style={{fontSize:RFValue(20, 680), marginLeft:'5%', marginRight:'3%', alignSelf:'center', color:'black'}}/>
                    <TextInput  style={styles.PassTextInput}
                                placeholder="Password"
                                placeholderTextColor = "black"
                                selectionColor="black"
                                secureTextEntry={hidePass ? true : false}
                                onChangeText={(value)=>setPassword(value)}
                                />
                    <Icon   type='FontAwesome5' name={hidePass ? 'eye-slash' : 'eye'}  style={{fontSize:RFValue(20, 680), alignSelf:'center', color:'black'}}
                            onPress={() => setHidePass(!hidePass)}/>

                </View>    

                <View style={styles.formInput}>
                    <Icon type='FontAwesome5' name="lock" style={{fontSize:RFValue(20, 680), marginLeft:'5%', marginRight:'3%', alignSelf:'center', color:'black'}}/>
                    <TextInput  style={styles.PassTextInput}
                                placeholder="Confirm Password"
                                placeholderTextColor = "black"
                                selectionColor="black"
                                secureTextEntry={hidePass ? true : false}
                                onChangeText={(value)=>setConfirmpassword(value)}
                                />
                    <Icon   type='FontAwesome5' name={hidePass ? 'eye-slash' : 'eye'}  style={{fontSize:RFValue(20, 680), alignSelf:'center', color:'black'}}
                            onPress={() => setHidePass(!hidePass)}/>

                </View>    

                <LinearGradient useAngle={true}
                                angle={136}
                                colors={['#D0C1C1' , '#F50303',]}
                                locations={[0,1]}
                                start={{x: 0, y: 0}} end={{x: 1, y: 0}}
                                style={styles.buttonRegister}> 
                    <TouchableOpacity style={{ width:'100%'}} onPress={processRegister}>
                            <Text style={styles.buttontextRegister}>
                            Register
                            </Text>
                    </TouchableOpacity> 
                </LinearGradient> 

                <LinearGradient useAngle={true}
                                angle={136}
                                colors={['#D0C1C1' , '#F50303',]}
                                locations={[0,1]}
                                start={{x: 0, y: 0}} end={{x: 1, y: 0}}
                                style={styles.buttonLogin}>    
                    <TouchableOpacity style={{ width:'100%'}} onPress={()=>navigation.navigate('Login')}>
                        <Text style={styles.buttontextLogin}>
                           Login
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

    register: {
        width: RFPercentage(35),
        height: RFPercentage(8),
        borderWidth:1,
        justifyContent:'center',
        alignItems:'center',
        borderColor:'#DCECF6',
        borderRadius: 22,
        marginVertical: '5%',
        marginRight:'50%'
    },
    registerText: {
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
    UserTextInput: {
        width: RFPercentage(38),
        fontFamily: 'Avenir Next',
        fontSize: RFValue(16, 680),
        color: 'black',
    },

    PassTextInput: {
        width:'73%',
        fontFamily: 'Avenir Next',
        fontSize: RFValue(16, 680),
        color: 'black',
    },

    buttonRegister: {
        width: RFPercentage(45),
        height: RFPercentage(6),
        justifyContent:'center',
        alignItems:'center',
        borderWidth:1,
        borderColor:'#DCECF6',
        alignSelf:'center',
        borderRadius: 20,
        marginTop: '25%',
        marginVertical:'5%',
        marginRight:'50%'
    },
    buttonLogin: {
        width: RFPercentage(45),
        height: RFPercentage(6),
        backgroundColor: 'black',
        justifyContent:'center',
        alignItems:'center',
        borderWidth:1,
        borderColor:'#DCECF6',
        alignSelf:'center',
        borderRadius: 22,
        marginLeft:'50%'
    },

    buttontextRegister: {
        fontFamily: 'Avenir Next',
        fontSize: RFValue(20, 680),
        color: 'black',
        textAlign: 'center',
        marginLeft:'30%'
    },
    buttontextLogin: {
        fontFamily: 'Avenir Next',
        fontSize: RFValue(20, 680),
        color: 'black',
        textAlign: 'center',
        marginRight:'40%'
    },

});

export default Register