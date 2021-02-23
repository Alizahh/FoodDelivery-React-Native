import React, { useContext, useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import FormInput from '../components/FormInput.js';
import FormButton from '../components/FormButton';
import axios from "axios";
import { GoogleSignin, GoogleButton, GoogleSigninButton } from '@react-native-community/google-signin';

GoogleSignin.configure({
    webClientId: "850930616765-6qirch0v0p4b0buq5jetf5dju4ec1fuv.apps.googleusercontent.com",
    offlineAccess: true
})
const SignupScreen = ({ navigation }) => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    // const [confirmPassword, setConfirmPassword] = useState();

    const [usergoogleinfo, setUsergoogleinfo] = useState({
        userGoogleInfo: {},
        loader: false
    });
    const signIn = async () => {
        try {
            await GoogleSignin.hasPlayServices()
            const userInfo = await GoogleSignin.signIn();
            setUsergoogleinfo({
                userGoogleInfo: userInfo,
                loader: true
            });
        } catch (e) {
            console.log(e, "error");
        }
    }

    const submitUser = async () => {
        let data = {
            email: email,
            password: password,
            Bank_Balance: 4000
        }
        try {
            let submit = await axios.post(`https://sleepy-earth-11653.herokuapp.com/user/regUser`, data);
            alert("success!");
            navigation.navigate('Home');
        } catch (e) {
            alert("try again");
        }
    }
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Create an account</Text>

            <FormInput
                labelValue={email}
                onChangeText={(userEmail) => setEmail(userEmail)}
                placeholderText="Email"
                iconType="user"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
            />

            <FormInput
                labelValue={password}
                onChangeText={(userPassword) => setPassword(userPassword)}
                placeholderText="Password"
                iconType="lock"
                secureTextEntry={true}
            />

            {/* <FormInput
                labelValue={confirmPassword}
                onChangeText={(userPassword) => setPassword(userPassword)}
                placeholderText="Confirm Password"
                iconType="lock"
                secureTextEntry={true}
            /> */}

            <FormButton
                buttonTitle="Sign Up"
                onPress={submitUser}
            />
            <View>
                <GoogleSigninButton
                    onPress={signIn}
                    size={GoogleSigninButton.Size.Dark}
                    style={{ width: 100, height: 100 }}
                />
                {usergoogleinfo.loaded ?
                    <View>
                        <Text>{usergoogleinfo.userGoogleInfo.user.name}</Text>
                        <Text>{usergoogleinfo.userGoogleInfo.user.email}</Text>
                        <Image
                            style={{ width: '100', height: '100' }}
                            source={{ uri: this.state.GoogleInfo.user.photo }}
                        />
                    </View> :
                    <Text>Not Signedin</Text>
                }
            </View>
            <View style={styles.textPrivate}>
                <Text style={styles.color_textPrivate}>By registering, you confirm that you accept our </Text>
                <TouchableOpacity onPress={() => alert('Terms Clicked!')}>
                    <Text style={[styles.color_textPrivate, { color: '#e88832' }]}>Terms of service</Text>
                </TouchableOpacity>
                <Text style={styles.color_textPrivate}> and </Text>
                <Text style={[styles.color_textPrivate, { color: '#e88832' }]}>Privacy Policy</Text>
            </View>

            <TouchableOpacity
                style={styles.navButton}
                onPress={() => navigation.navigate('Login')}>
                <Text style={styles.navButtonText}>
                    Have an account? Sign In
        </Text>
            </TouchableOpacity>
        </View>
    );
};

export default SignupScreen;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f9fafd',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    text: {
        fontFamily: 'Kufam-SemiBoldItalic',
        fontSize: 28,
        marginBottom: 10,
        color: '#051d5f',
    },
    navButton: {
        marginTop: 15,
    },
    navButtonText: {
        fontSize: 18,
        fontWeight: '500',
        color: '#2e64e5',
        fontFamily: 'Lato-Regular',
    },
    textPrivate: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginVertical: 35,
        justifyContent: 'center',
    },
    color_textPrivate: {
        fontSize: 13,
        fontWeight: '400',
        fontFamily: 'Lato-Regular',
        color: 'grey',
    },
});