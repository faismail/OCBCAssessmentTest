import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {StartedPage, Register, Login, Homescreen, Transactions, Splash, DetailTransaction } from "../Pages"
import { IconButton } from 'react-native-paper';

const Stack = createStackNavigator();

const Router = ({ navigation }) => {
  return (
    <Stack.Navigator>
        <Stack.Screen
            name="Splash"
            component={Splash}
            options={{
            headerShown: false,
            }}
        />
        <Stack.Screen
            name="StartedPage"
            component={StartedPage}
            options={{
            headerShown: false,
            }}
        />
        <Stack.Screen
            name="Register"
            component={Register}
            options={{
            headerShown: false,
            }}
        />
        <Stack.Screen
            name="Login"
            component={Login}
            options={{
            headerShown: false,
            }}
        />
        <Stack.Screen
            name="Homescreen"
            component={Homescreen}
            options={{
            headerShown: false,
            }}
        />
        <Stack.Screen
            name="Transactions"
            component={Transactions}
            options={{
            headerShown: false,
            }}
        />
        <Stack.Screen
            name="DetailTransaction"
            component={DetailTransaction}
            options={{
            headerShown: false,
            }}
        />
    </Stack.Navigator>
  );
};

export default Router;
