import React from 'react';

import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from '@react-navigation/native'

import { Restaurant, OrderDelivery, LoginScreen, SignupScreen } from './screens'
import Tabs from './navigation/tabs'

//redux
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./Redux/Store";

const Stack = createStackNavigator();

const App = () => {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <NavigationContainer>
                    <Stack.Navigator
                        screenOptions={{
                            headerShown: false
                        }}
                        initialRouteName={'Signup'}
                    >
                        <Stack.Screen name="Signup" component={SignupScreen} />
                        <Stack.Screen name="Login" component={LoginScreen} />
                        <Stack.Screen name="Home" component={Tabs} />
                        <Stack.Screen name="Restaurant" component={Restaurant} />
                        <Stack.Screen name="OrderDelivery" component={OrderDelivery} />

                    </Stack.Navigator>
                </NavigationContainer>
            </PersistGate>
        </Provider>
    )
}

export default App;