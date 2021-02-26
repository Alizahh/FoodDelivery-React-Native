import React, { useEffect } from "react";
import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    FlatList,
    Modal,
    TouchableHighlight
} from "react-native";
import axios from "axios";
import { icons, images, SIZES, COLORS, FONTS } from '../constants'
import { useState } from "react/cjs/react.development";

import { GoogleSignin, GoogleButton, GoogleSigninButton } from '@react-native-community/google-signin';
import app from "@react-native-firebase/app"
import auth from '@react-native-firebase/auth';


import { User_Log_In, Clear_User_Order } from "../Redux/Actions/userAction";
//redux
import { connect } from "react-redux";
const Home = (props) => {

    const [orderCount, setOrderCount] = useState("");
    const [orderPrice, setOrderPrice] = useState("");
    const [orderName, setOrderName] = useState("");
    const [loggedIn, setloggedIn] = useState(false);
    //to signout the user


    useEffect(() => {
        GoogleSignin.configure({
            webClientId: "646054229540-s203h9enovmu5d0fcfovfipfdcp21ivv.apps.googleusercontent.com",
            offlineAccess: true
        });

        // const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        // return subscriber; // unsubscribe on unmount
        // props.User_Log_In(true);
        console.log(props.OrderPLaced, "user dataaaaaa")
    }, []);

    // function onAuthStateChanged(user) {
    //     setUser(user);
    //     console.log(user);
    //     if (user) setloggedIn(true);
    // }
    // Dummy Datas
    const [categoryData, setCategoryData] = useState([]);
    const [restaurantData, setRestaurantData] = useState([]);

    //cart modal
    const [cartDetail, setCartDetail] = useState(false);
    const [categories, setCategories] = React.useState(categoryData)
    const [selectedCategory, setSelectedCategory] = React.useState(null)
    const [restaurants, setRestaurants] = React.useState(restaurantData)
    const [currentLocation, setCurrentLocation] = React.useState({});
    // console.log(categories, "categories dataaaaaaaaaaaa")

    const initialCurrentLocation = {
        streetName: "Xord",
        gps: {
            latitude: 24.863689,
            longitude: 67.060469
        }
    }
    const signOut = async () => {
        if (props.GoogleSignin) {
            try {
                await GoogleSignin.revokeAccess();
                await GoogleSignin.signOut();
                auth()
                    .signOut()
                    .then(() => alert('Your are signed out!'));
                setloggedIn(false);
                props.User_Log_In(false)
                props.navigation.navigate("Signup")
                props.Clear_User_Order();
                // setuserInfo([]);
            } catch (error) {
                console.error(error);
            }
        }
        else {
            setloggedIn(false);
            props.navigation.navigate("Signup")
            alert("You are signed out")
            props.User_Log_In(false);
            props.Clear_User_Order();
        }
    };
    const LogOut = () => {
        console.log("logout clicked")
        signOut();
    }
    const APIs = async () => {
        setCurrentLocation(initialCurrentLocation);
        console.log("Categories")
        try {
            const category = await axios.get(`https://sleepy-earth-11653.herokuapp.com/restaurantData/Allcategories`);
            console.log("here", category.data)
            setCategoryData(category.data);
            setCategories(category.data);
        } catch (e) {
            console.log("error in categories fetching===>>>", e, "===========>end")
        }
        try {
            const restaurant = await axios.get(`https://sleepy-earth-11653.herokuapp.com/restaurantData/Allrestaurant`);
            setRestaurantData(restaurant.data);
            setRestaurants(restaurant.data);
        } catch (e) {
            console.log(e, "error in f3tching restaurant data")
        }
    }
    React.useEffect(() => {
        APIs();
    }, [])

    const Cart = () => {
        console.log("clickedddddddd")
        setCartDetail(!cartDetail)
        console.log(props.OrderPLaced, "user dataaaaa Cart")
        if (props.OrderPLaced) {
            console.group(props.userOrder.ItemName, "itemmmmmmmmmm nameeeeeeeeeee")
            setOrderCount(props.userOrder.ItemCount);
            setOrderPrice(props.userOrder.TotalPrice);
            setOrderName(props.userOrder.ItemName);
        }
    };


    function onSelectCategory(category) {
        //filter restaurant
        let restaurantList = restaurantData.filter(a => a.categories.includes(category.id))

        setRestaurants(restaurantList);

        setSelectedCategory(category);
    }

    function getCategoryNameById(id) {
        let category = categories.filter(a => a.id == id)

        if (category.length > 0)
            return category[0].name

        return ""
    }

    function renderHeader() {
        return (
            <View style={{ flexDirection: 'row', height: 50 }}>
                <TouchableOpacity
                    style={{
                        width: 50,
                        paddingLeft: SIZES.padding * 2,
                        justifyContent: 'center'
                    }}
                    onPress={LogOut}
                >
                    <Image
                        source={icons.nearby}
                        resizeMode="contain"
                        style={{
                            width: 30,
                            height: 30
                        }}
                    />
                </TouchableOpacity>

                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <View
                        style={{
                            width: '70%',
                            height: "100%",
                            backgroundColor: COLORS.lightGray3,
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: SIZES.radius
                        }}
                    >
                        <Text style={{ ...FONTS.h3 }}>{initialCurrentLocation.streetName}</Text>
                    </View>
                </View>

                <TouchableOpacity
                    style={{
                        width: 50,
                        paddingRight: SIZES.padding * 2,
                        justifyContent: 'center'
                    }}
                    onPress={Cart}
                >
                    <Image
                        source={icons.basket}
                        resizeMode="contain"
                        style={{
                            width: 30,
                            height: 30
                        }}

                    />
                    < Modal
                        transparent={true}
                        visible={cartDetail}
                        onRequestClose={Cart}
                    >
                        <View style={styles.view}>
                            <View style={styles.modalView}>
                                <Text style={styles.modalTextHeading}> Your Order</Text>
                                <Text style={styles.modalText}>{props.OrderPLaced ? orderName : "no data"}</Text>
                                <Text style={styles.modalText}>{props.OrderPLaced ? orderPrice : "no data"}</Text>
                                <Text style={styles.modalText}>{props.OrderPLaced ? orderCount : "no data"}</Text>
                                <TouchableOpacity
                                    style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                                    onPress={Cart}
                                >
                                    <Text style={styles.textStyle}>Cancel</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
                </TouchableOpacity>
            </View >
        )
    }

    function renderMainCategories() {
        const renderItem = ({ item }) => {
            return (
                <TouchableOpacity
                    style={{
                        padding: SIZES.padding,
                        paddingBottom: SIZES.padding * 2,
                        backgroundColor: (selectedCategory?.id == item.id) ? COLORS.primary : COLORS.white,
                        borderRadius: SIZES.radius,
                        alignItems: "center",
                        justifyContent: "center",
                        marginRight: SIZES.padding,
                        ...styles.shadow
                    }}
                    onPress={() => onSelectCategory(item)}
                >
                    <View
                        style={{
                            width: 50,
                            height: 50,
                            borderRadius: 25,
                            alignItems: "center",
                            justifyContent: "center",
                            backgroundColor: (selectedCategory?.id == item.id) ? COLORS.white : COLORS.lightGray
                        }}
                    >
                        <Image
                            source={icons.fries}
                            resizeMode="contain"
                            style={{
                                width: 30,
                                height: 30
                            }}
                        />
                    </View>

                    <Text
                        style={{
                            marginTop: SIZES.padding,
                            color: (selectedCategory?.id == item.id) ? COLORS.white : COLORS.black,
                            ...FONTS.body5
                        }}
                    >
                        {item.name}
                    </Text>
                </TouchableOpacity>
            )
        }

        return (
            <View style={{ padding: SIZES.padding * 2 }}>
                <Text style={{ ...FONTS.h1 }}>Main</Text>
                <Text style={{ ...FONTS.h1 }}>Categories</Text>

                <FlatList
                    data={categories}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={item => `${item.id}`}
                    renderItem={renderItem}
                    contentContainerStyle={{ paddingVertical: SIZES.padding * 2 }}
                />
            </View>
        )
    }

    function renderRestaurantList() {
        const renderItem = ({ item }) => (
            <TouchableOpacity
                style={{ marginBottom: SIZES.padding * 2 }}
                onPress={() => props.navigation.navigate("Restaurant", {
                    item,
                    currentLocation
                })}
            >
                {/* Image */}
                <View
                    style={{
                        marginBottom: SIZES.padding
                    }}
                >
                    <Image
                        source={images.honey_mustard_chicken_burger}
                        resizeMode="cover"
                        style={{
                            width: "100%",
                            height: 200,
                            borderRadius: SIZES.radius
                        }}
                    />

                    <View
                        style={{
                            position: 'absolute',
                            bottom: 0,
                            height: 50,
                            width: SIZES.width * 0.3,
                            backgroundColor: COLORS.white,
                            borderTopRightRadius: SIZES.radius,
                            borderBottomLeftRadius: SIZES.radius,
                            alignItems: 'center',
                            justifyContent: 'center',
                            ...styles.shadow
                        }}
                    >
                        <Text style={{ ...FONTS.h4 }}>{item.duration}</Text>
                    </View>
                </View>

                {/* Restaurant Info */}
                <Text style={{ ...FONTS.body2 }}>{item.name}</Text>

                <View
                    style={{
                        marginTop: SIZES.padding,
                        flexDirection: 'row'
                    }}
                >
                    {/* Rating */}
                    <Image
                        source={icons.star}
                        style={{
                            height: 20,
                            width: 20,
                            tintColor: COLORS.primary,
                            marginRight: 10
                        }}
                    />
                    <Text style={{ ...FONTS.body3 }}>{item.rating}</Text>

                    {/* Categories */}
                    <View
                        style={{
                            flexDirection: 'row',
                            marginLeft: 10
                        }}
                    >
                        {
                            item.categories.map((categoryId) => {
                                return (
                                    <View
                                        style={{ flexDirection: 'row' }}
                                        key={categoryId}
                                    >
                                        <Text style={{ ...FONTS.body3 }}>{getCategoryNameById(categoryId)}</Text>
                                        <Text style={{ ...FONTS.h3, color: COLORS.darkgray }}> . </Text>
                                    </View>
                                )
                            })
                        }

                        {/* Price */}
                        {
                            [1, 2, 3].map((priceRating) => (
                                <Text
                                    key={priceRating}
                                    style={{
                                        ...FONTS.body3,
                                        color: (priceRating <= item.priceRating) ? COLORS.black : COLORS.darkgray
                                    }}
                                >$</Text>
                            ))
                        }
                    </View>
                </View>
            </TouchableOpacity>
        )

        return (
            <FlatList
                data={restaurants}
                keyExtractor={item => `${item.id}`}
                renderItem={renderItem}
                contentContainerStyle={{
                    paddingHorizontal: SIZES.padding * 2,
                    paddingBottom: 30
                }}
            />
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            {renderHeader()}
            {renderMainCategories()}
            {renderRestaurantList()}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.lightGray4
    },
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 1,
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
})
const mapStateToProps = (state) => ({
    userData: state.user.userData,
    UserLogin: state.user.userLoggedIn,
    userOrder: state.user.UserOrder,
    OrderPLaced: state.user.OrderPLaced,
    GoogleSignin: state.user.GoogleSignin

});
export default connect(mapStateToProps, { User_Log_In, Clear_User_Order })(Home);