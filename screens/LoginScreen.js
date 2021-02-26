import React, { useEffect, useState } from 'react';
import { Modal, View, Text, TouchableOpacity, Image, StyleSheet, TouchableHighlight } from 'react-native';
import FormInput from '../components/FormInput.js';
import FormButton from '../components/FormButton';
import axios from "axios";
import { connect } from "react-redux";
import { User_Log_In, Add_User_Data, Clear_User_Order } from "../Redux/Actions/userAction";
const LoginScreen = (props) => {
    useEffect(() => {
        props.User_Log_In(false);
        props.Clear_User_Order();
        setEmail("");
        setPassword("");
    }, [])
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userDetails, setUserDetails] = useState({});
    const [ModalOpen, setModaOpen] = useState(false);
    const [message, setMessage] = useState("");
    const submitUser = async () => {
        let data = {
            email: email,
            password: password
        }
        if (email !== "" && password !== "") {
            try {
                let submit = await axios.post(`https://sleepy-earth-11653.herokuapp.com/user/login`, data);
                console.log(submit.data.data, "submit");
                setUserDetails(submit.data.data);
                props.Add_User_Data(submit.data.data);
                props.User_Log_In(true);
                setMessage("You have successfully logged in!")
                setEmail("")
                setPassword("")
                setModaOpen(true);
                // let email = await axios.post(`https://sleepy-earth-11653.herokuapp.com/sendMail`);
                // console.log(email, "emailllllllllllll")
                // alert("email sent");
                props.navigation.navigate('Home');

            } catch (e) {
                setMessage("Wrong password or email.")
                setPassword("")
                setModaOpen(true);
                console.log(e, "error in login");
                // alert("Wrong Password or email");
            }

        } else {
            setMessage("Empty fields aren't accepted.")
            setEmail("")
            setPassword("")
            setModaOpen(true);
            props.navigation.navigate('Login');
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
            <FormButton
                buttonTitle="Login"
                onPress={submitUser}
            />
            <TouchableOpacity
                style={styles.navButton}
                onPress={submitUser}>
            </TouchableOpacity>

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

                        <TouchableOpacity
                            style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                            onPress={() => {
                                setModaOpen(false);
                            }}
                        >
                            <Text style={styles.textStyle}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};
const mapStateToProps = state => ({

});
export default connect(mapStateToProps, { User_Log_In, Add_User_Data, Clear_User_Order })(LoginScreen);

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