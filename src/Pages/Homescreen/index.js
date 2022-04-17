import React, { useState, useEffect, } from 'react';
import { StyleSheet, TouchableOpacity, ScrollView, Image  } from 'react-native';
import { Card, Container, Text, View,  Col, } from 'native-base';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { useIsFocused } from '@react-navigation/native';
import { iconocbc } from '../../Assets/Images/index';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';


const Homescreen = ({navigation}) => {

    const isFocused = useIsFocused();
    const [balance, setBalance] = useState('');
    const [accountNo, setAccountNo] = useState('');
    const [username, setUsername] = useState('');
    const [transactions, setTransactions] = useState([]);

    const monthNames = [
        'Januari',
        'Februari',
        'Maret',
        'April',
        'Mei',
        'Juni',
        'Juli',
        'Agustus',
        'September',
        'Oktober',
        'November',
        'Desember',
    ];

    const getBalance = async () =>  {
        const token = await AsyncStorage.getItem('token')

        setUsername(await AsyncStorage.getItem('username'))
        setAccountNo(await AsyncStorage.getItem('accountNo'))
        // console.log( data, username, token  )
 
            axios.get
            (   
                'https://green-thumb-64168.uc.r.appspot.com/balance',
            {
            headers:{
                Accept:'application/json',
                'Content-Type':'application/json',
                'Authorization': token
            }
        })
        .then(res => {
            if(res.data.status == 'success'){
                // console.log(res.data)
                setBalance(res.data.balance)
                
            } 
        })
        .catch(function(error) {
            if ( error.response.status ) {
                // alert(error.response.data.error.name)
            }
          });
    }

    const getTransactions = async () =>  {

        const token = await AsyncStorage.getItem('token')
        axios.get
        (   
            'https://green-thumb-64168.uc.r.appspot.com/transactions',
        {
        headers:{
            Accept:'application/json',
            'Content-Type':'application/json',
            'Authorization': token
        }
        })
        .then(res => {
            if(res.data.status == 'success'){
                setTransactions(Object.values(res.data.data))
                
            } 
        })
        .catch(function(error) {
            if ( error.response ) {
                // alert(error.response.data.error)
            }
          });
    }

    const LogOut = async () => {
        await AsyncStorage.clear(); 
        navigation.replace('StartedPage')
     };

    const convertDate = (waktu) => {
          let date = new Date(waktu).getDate()
          let month = new Date(waktu).getMonth()
          let year = new Date(waktu).getFullYear() 
          return `${date} ${monthNames[month]} ${year}`
    };

useEffect(() => {
    getBalance()
    getTransactions()

}, [isFocused]);

    return (
        <Container style={styles.container}>
            <Col style={{flex:2, flexDirection:'column', justifyContent:'center', alignItems:'center',  marginTop:'5%',    }}>  
                <TouchableOpacity style={{ alignSelf:'flex-end', marginRight:'5%' }}>
                    <Text style={styles.buttonText} onPress={LogOut}>
                        Log Out
                    </Text>
                </TouchableOpacity>    
            
                <View style={styles.formInput}>
                    <Col style={{flex: 2, justifyContent:'center', marginLeft:'5%'}}>
                        <Text style={styles.tittleText}>Your Balance</Text>
                        <Text style={styles.balanceText}>SGD {balance}</Text>
                        <Text style={styles.userText}>Account Number</Text>
                        <Text style={styles.tittleText}>{accountNo}</Text>
                        <Text style={styles.userText}>Account Holder</Text>
                        <Text style={styles.tittleText}>{username}</Text>
                    </Col>
                    <Col style={{flex: 1, justifyContent:'center', alignItems:'center', marginRight:'5%' }}>
                        <Image style={styles.logoStyle} source={iconocbc} />
                    </Col> 
                </View>
            </Col> 

            <Col style={{flex:3, justifyContent:'center', alignItems:'center', }}> 
                <View>
                    <Text style={styles.transactiontittleText}>Your Transactions Here </Text>
                </View>

                <ScrollView style={{ width:'100%', }}>
                    {
                        transactions.map(( value, index ) => (
                            <LinearGradient useAngle={true}
                                            angle={136}
                                            colors={['#D0C1C1' , '#F50303',]}
                                            locations={[0,1]}
                                            start={{x: 0, y: 0}} end={{x: 1, y: 0}}
                                            style={styles.CardTransaction}
                                            key={value + index}>
                            <TouchableOpacity style={styles.CardTransaction} onPress={() => navigation.navigate('DetailTransaction', {value})}>
                                <Col style={{ flex:0.5 , alignSelf:'flex-start', justifyContent:'center', marginLeft:'5%',   }}>
                                    <Text style={styles.userText} >{ convertDate (value.transactionDate)}</Text>
                                </Col>

                                {(function() {
                                        if (value.sender) 
                                        {
                                            return  <Col style={{ flex: 1, flexDirection:'row',   }}>

                                                        <Col style={{ alignItems:'flex-start', justifyContent: 'space-evenly', marginLeft:'5%',  }}>
                                                            <Text style={styles.tittleText} >{value.sender.accountHolder}</Text>
                                                            <Text style={styles.userText} >{value.sender.accountNo}</Text>
                                                        </Col>
                    
                                                        <Col >
                                                            <Text style={styles.amountTextSend} >SGD {value.amount}</Text>
                                                        </Col>
                                                    </Col>
                                        } 
                                        else {
                                            return <Col style={{ flex: 1, flexDirection:'row',  }}>
                                                        <Col style={{ alignItems:'flex-start', justifyContent: 'space-evenly', marginLeft:'5%',  }}>
                                                            <Text style={styles.tittleText} >{value.receipient.accountHolder}</Text>
                                                            <Text style={styles.userText} >{value.receipient.accountNo}</Text>
                                                        </Col>
                    
                                                        <Col >
                                                            <Text style={styles.amountTextRecieve} >-SGD {value.amount}</Text>
                                                        </Col>
                                                    </Col>
                                        }
                                        })
                                    ()}
                            </TouchableOpacity>
                            </LinearGradient>
                        ))
                    }
                </ScrollView>
            </Col> 

            <Col style={{flex:1,  justifyContent:'center', alignSelf:'center',   }}>  
                <LinearGradient useAngle={true}
                                angle={136}
                                colors={['#D0C1C1' , '#F50303',]}
                                locations={[0,1]}
                                start={{x: 0, y: 0}} end={{x: 1, y: 0}}
                                style={styles.button}>
                    <TouchableOpacity style={{width: RFPercentage(30), height: RFPercentage(6), justifyContent:'center', alignSelf:'center',}} onPress={()=>navigation.navigate('Transactions')}>
                        <Text style={styles.buttonText}>
                            Make Transactions
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
    justifyContent: 'space-around',
    },

    formInput:{
    width: RFPercentage(46),
    height: RFPercentage(25),
    flexDirection:'row',
    justifyContent:'space-evenly',
    borderWidth:1,
    borderColor:'black',
    backgroundColor:'black',
    borderRadius: 20,
  },
  userText: {
    fontFamily: 'Avenir Next',
    fontSize: RFValue(13, 680),
    color: 'white',
    marginTop:'3%'
    },
  tittleText: {
    fontFamily: 'Avenir Next',
    fontSize: RFValue(16, 680),
    fontWeight:'bold',
    color: 'white',
    },
    balanceText: {
    fontFamily: 'Avenir Next',
    fontSize: RFValue(20, 680),
    fontWeight:'bold',
    color: 'white',
    marginTop:'2%'
    },
    transactiontittleText: {
    fontFamily: 'Avenir Next',
    fontSize: RFValue(15, 680),
    fontWeight:'bold',
    color: 'black',
    },
  button: {
    width: RFPercentage(30),
    height: RFPercentage(6),
    justifyContent:'center',
    borderWidth:1,
    borderColor:'#b8c6db',
    alignSelf:'center',
    borderRadius: 20,
    marginBottom:'8%'
},

buttonText: {
    fontFamily: 'Avenir Next',
    fontSize: RFValue(14, 680),
    color: 'black',
    textAlign: 'center',
    fontWeight:'bold'
},
amountTextSend: {
    fontFamily: 'Avenir Next',
    fontSize: RFValue(18, 680),
    color: 'black',
    textAlign: 'center',
    marginTop:'15%',
    fontWeight:'bold'
},
amountTextRecieve: {
    fontFamily: 'Avenir Next',
    fontSize: RFValue(18, 680),
    color: 'white',
    textAlign: 'center',
    marginTop:'15%',
    fontWeight:'bold'
},
  CardTransaction: {
    width: '90%',
    height:RFPercentage(15),
    borderRadius:10, 
    flexDirection:'column',
    justifyContent:'space-evenly',
    borderColor:'#b8c6db',
    alignSelf:'center',
    marginVertical:'1%'
  },

  logoStyle: {
    alignSelf: 'center',
    justifyContent: 'center',
    width: RFPercentage(12),
    height: RFPercentage(12),
    },


});
export default Homescreen