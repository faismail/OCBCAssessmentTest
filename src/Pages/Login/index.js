import React, { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, TextInput, Alert  } from 'react-native';
import { Container, Text, View, Col, Icon} from 'native-base';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import axios from 'axios';
import { CommonActions } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';


const Login = ({navigation}) => {

const [Username, setUsername] = useState('');
const [Password, setPassword] = useState('');
const [hidePass, setHidePass] = useState(true);

const storeData = async (token, username, accountNo) => {
    try {
      await AsyncStorage.setItem('token', token);
      await AsyncStorage.setItem('username', username);
      await AsyncStorage.setItem('accountNo', accountNo);

    } catch (e) {
      // saving error
    }
  };

const processLogin= async () => {

    axios({
        method: 'POST',
        url: 'https://green-thumb-64168.uc.r.appspot.com/login',
        headers:{
            Accept:'application/json',
            'Content-Type':'application/json',
        },
        data: {
            username: Username,
            password: Password
        }
      })
    .then(res => {
        if(res.data.status == 'success'){
            // console.log(res.data.token, res.data.username, res.data.accountNo)
            storeData(res.data.token, res.data.username, res.data.accountNo)
            navigation.dispatch(
              CommonActions.reset({
                  index: 0,
                  routes: [
                  { name: 'Homescreen' },
                  ],
              })
              );
        } 
    })
    .catch(function(error) {
        if ( error.response.status ) {
            Alert.alert(error.response.data.error)
        }
      });      
}

  return (
    <Container style={styles.container}>
      <Col style={{ flex:2, justifyContent:'center', alignItems:'center',   }}>  

        <LinearGradient useAngle={true}
                        angle={136}
                        colors={['#D0C1C1' , '#F50303',]}
                        locations={[0,1]}
                        start={{x: 0, y: 0}} end={{x: 1, y: 0}}
                        style={styles.login}> 
            <Text  style={styles.loginText}>
                Login
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
    </Col>

    <Col style={{  justifyContent:'center', alignItems:'center',  }}>  
          <LinearGradient useAngle={true}
                          angle={136}
                          colors={['#D0C1C1' , '#F50303',]}
                          locations={[0,1]}
                          start={{x: 0, y: 0}} end={{x: 1, y: 0}}
                          style={styles.button}> 
            <TouchableOpacity style={styles.button} onPress={processLogin}>
                <Text style={styles.buttonText}>
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

login: {
  width: RFPercentage(30),
  height: RFPercentage(8),
  borderWidth:1,
  justifyContent:'center',
  alignItems:'center',
  borderColor:'#DCECF6',
  borderRadius: 22,
  marginVertical: '5%',
  marginRight:'50%'
},

loginText: {
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

button: {
  width: RFPercentage(30),
  height: RFPercentage(6),
  justifyContent:'center',
  alignItems:'center',
  borderWidth:1,
  borderColor:'#DCECF6',
  alignSelf:'center',
  borderRadius: 20,
  marginVertical: '5%',
},

buttonText: {
  fontFamily: 'Avenir Next',
  fontSize: RFValue(20, 680),
  color: 'white',
  textAlign: 'center',
},

});

export default Login