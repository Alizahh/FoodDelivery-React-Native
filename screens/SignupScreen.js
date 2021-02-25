import React, { useContext, useState } from 'react';
import { Modal, View, Text, TouchableOpacity, Image, StyleSheet, TouchableHighlight } from 'react-native';
import FormInput from '../components/FormInput.js';
import FormButton from '../components/FormButton';
import axios from "axios";
import { GoogleSignin, GoogleButton, GoogleSigninButton } from '@react-native-community/google-signin';
import { User_Log_In, Add_User_Data } from "../Redux/Actions/userAction";
//redux
import { connect } from 'react-redux';

GoogleSignin.configure({
    webClientId: "1000922679265-0ve5obpvsbljskh9j7j437ecb9tghpcg.apps.googleusercontent.com",
    offlineAccess: true
})
const SignupScreen = (props) => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [emailValidation, setEmailValidation] = useState();
    // const [confirmPassword, setConfirmPassword] = useState();
    const [ModalOpen, setModaOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [usergoogleinfo, setUsergoogleinfo] = useState({
        userGoogleInfo: {},
        loader: false
    });
    const signIn = async () => {
        try {
            let test = await GoogleSignin.hasPlayServices();
            console.log(test, "testttttttttttttt")
            const userInfo = await GoogleSignin.signIn();
            console.log(userInfo, "userInfooooooooooooooooooooooooo");
            console.log
            setUsergoogleinfo({
                userGoogleInfo: userInfo,
                loader: true
            });
            SVGPathSegCurvetoCubicSmoothRel.log(userInfo, "userrrrrrrrrrrrrrrrrrrr infooooooooooooo")
            props.navigation.navigate('Home');
        } catch (e) {
            console.log(e, "error");
        }
    }
    const emailChange = (e) => {
        let email = /^(([^<>()\\.,;:\s@"]+(\.[^<>()\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i;

        if (!email.test(e)) {
            setEmailValidation(false);
        } else {
            setEmailValidation(true);
        }

        setEmail(e);
    };

    const submitUser = async () => {
        let data = {
            email: email,
            password: password,
            Bank_Balance: 4000
        }
        if (email !== "" && password !== "") {
            try {
                let submit = await axios.post(`https://sleepy-earth-11653.herokuapp.com/user/regUser`, data);
                console.log(submit.data.data, "user reguser request")
                props.User_Log_In(true);
                props.Add_User_Data(submit.data.data);
                let email = await axios.post(`https://sleepy-earth-11653.herokuapp.com/sendMail`);
                setMessage("You have successfully signed in!")
                setModaOpen(true);
                setEmail("")
                setPassword("")
                props.navigation.navigate('Home');
                return submit;
            } catch (e) {
                setMessage("This email is already in user.")
                setEmail("")
                setPassword("")
                setModaOpen(true);
                console.log(e, "erorr in sending reg req")
            }
        } else {
            setMessage("Empty fields aren't accepted.")
            setEmail("")
            setPassword("")
            setModaOpen(true);
        }
    };

    return (
        <View style={styles.container}>
            <Modal
                transparent={true}
                visible={ModalOpen}
                onRequestClose={() => {
                    setModaOpen(false);
                }}
            >
                <View style={styles.view}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalTextHeading}> Disclaimer</Text>
                        <Text style={styles.modalText}>{message}</Text>

                        <TouchableHighlight
                            style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                            onPress={() => {
                                setModaOpen(false);
                            }}
                        >
                            <Text style={styles.textStyle}>Cancel</Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </Modal>
            <Text style={styles.text}>Create an account</Text>

            <FormInput
                labelValue={email}
                onChangeText={(e) => emailChange(e)}
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
                onPress={() => props.navigation.navigate('Login')}>
                <Text style={styles.navButtonText}>
                    Have an account? Sign In
        </Text>
            </TouchableOpacity>
        </View>
    );
};

const mapStateToProps = (state) => ({
    UserLogin: state.user.userLoggedIn
});
export default connect(mapStateToProps, { User_Log_In, Add_User_Data })(SignupScreen);

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



    view: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    openButton: {
        backgroundColor: "#115454",
        borderRadius: 5,
        padding: 15,
        elevation: 2
    },
    textStyle: {
        color: "white",
        textAlign: "center",
    },
    modalText: {
        marginBottom: 15,
    },
    modalTextHeading: {
        marginBottom: 15,
        fontWeight: "bold",
        // fontSize: "16px"
    }
});