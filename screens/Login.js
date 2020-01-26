import React, { useState } from 'react';
import firebase from 'firebase';
import { Alert, Platform, View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import Container from '../components/Container';
import { TextInput } from 'react-native';
import MyButton from '../components/MyButton';
import { myStyles } from '../assets/helper/Styles';
import Colours from '../assets/constants/Colours';
import { fireRef, deliveriesRef, SetPrecision, checkIfTodayExists, assembleLocalWeeksList, assembleLocalDaysList } from '../assets/helper/helper';
import { ACTIONS } from '../store/actions/actions';
import Deliveries from '../assets/models/Deliveries';
import Loading from '../components/Loading';
import Weeks from '../assets/models/Weeks';
import DismissKeyboard from '../components/DismissKeyboard';
import { ROUTES } from '../assets/constants/strings';
import SmallText from '../components/SmallText';
import * as myActions from "../store/actions/actions";
import SortingButton from '../components/SortingButton';

const Login = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isFetchingData, setIsFetchingData] = useState(false);
    const [isOfflinePressed, setIsOfflinePressed] = useState(false);

    const dispatch = useDispatch();//to update store

    //once sql list is set, redirect user to main app
    let SQList = useSelector(state => state.user.sqlList);

    const handleLocalListLoaded = () => {
        //redirecting to main app and setting app offline
        // toggleOffline();
        props.navigation.navigate(ROUTES.TABS);
    };

    if (SQList.length > 0) {
        dispatch(
            {//setting app offline
                type: ACTIONS.IS_OFFLINE,
                value: true
            });
        dispatch(
            {// setting email
                type: ACTIONS.SET_USER_NAME,
                value: SQList[0].userName
            });
        dispatch(
            {//setting days list
                type: ACTIONS.SET_USER_DAYS_LIST,
                value: assembleLocalDaysList(SQList)
            });
        dispatch(
            {//setting weeks list
                type: ACTIONS.SET_USER_WEEKS_LIST,
                value: assembleLocalWeeksList(SQList)
            });
        Alert.alert('Your list was found!', '', [{ text: "Great!", onPress: () => { handleLocalListLoaded(); } }]);

    }

    const usernameInput = (input) => {
        setEmail(input);
    };

    const passwordInput = (input) => {
        setPassword(input);
    };

    const toggleOffline = () => {
        let current = isOfflinePressed;
        setIsOfflinePressed(!current);
    };

    const findMe = () => {
        try {
            dispatch(myActions.GetUserList(email));
        } catch (error) {
            console.log(error);
            Alert.alert(error.message);
        }
        //send list to next screen
    };

    let mode;

    if (isOfflinePressed) {
        mode = <View style={{ marginHorizontal: '15%', flex: 5 }}>
            <SmallText style={{ marginBottom: 30, minHeight: 120 }}>If you have previously downloaded your list when Logged in this device, you can browse it simply by providing your email address</SmallText>
            <TextInput
                placeholder={'Email'}
                placeholderTextColor={Colours.placeholder}
                style={myStyles.login}
                onChangeText={usernameInput}
                value={email}
                keyboardType='email-address'
            />
            {email.length < 4 ? null :
                <MyButton
                    onPress={() => { setPassword(''); setEmail(''); findMe() }}
                    text='Find my list'
                    colour={Colours.success}
                    textColour={Colours.black}
                    style={{ marginBottom: 100 }}
                />}


        </View>
    }
    else {
        mode = <View style={{ flex: 5 }}>
            <TouchableOpacity
                onPress={() => { setEmail('admin@admin.com'); setPassword('adminait') }}
                style={styles.imageContainer}
            // onPress={() => { setEmail('eric@ait.com'); setPassword('eric123') }}
            // onPress={() => { setEmail('carol@ait.com'); setPassword('carol1') }}
            >
                <Image
                    source={require('../assets/login.png')}
                    resizeMode="cover"
                    style={styles.image} />
            </TouchableOpacity>

            <TextInput
                placeholder={'Email'}
                placeholderTextColor={Colours.placeholder}
                style={myStyles.login}
                onChangeText={usernameInput}
                value={email}
                keyboardType='email-address'
            />
            <TextInput
                placeholder={'Password'}
                placeholderTextColor={Colours.placeholder}
                style={myStyles.login}
                onChangeText={passwordInput}
                value={password}
                keyboardType='default'
                secureTextEntry={true}
            />
            <View style={{ marginHorizontal: 30 }}>

                <MyButton
                    onPress={() => firebaseLogin(email, password)}
                    text='Login'
                    colour={Colours.success}
                    textColour={Colours.black}
                    style={{ marginBottom: 20 }}
                />
                <SortingButton
                    light
                    text='Register'
                    colour={Colours.success}
                    onPress={() => props.navigation.navigate(ROUTES.REGISTER)}
                />

            </View>
        </View>;
    }

    const firebaseLogin = (email, password) => {
        setIsFetchingData(true);
        firebase.auth().signInWithEmailAndPassword(email, password).
            then(() => {

                let userID = firebase.auth().currentUser.uid;

                firebase.
                    database().
                    ref(fireRef).
                    orderByKey().
                    once('value').
                    then(snapshot => {
                        snapshot.forEach(child => {

                            if (child.key === userID) {

                                firebase.auth().currentUser.
                                    updateProfile({ displayName: child.val().firstName }).
                                    then(() => {//  FOUND USER
                                        fetchDaysList(userID, firebase.auth().currentUser.displayName);
                                    });
                            }
                        });
                    }).catch(error => Alert.alert(error));

                console.log('user found:', userID);
                Alert.alert('Welcome back!\nWait a moment while we get your information');

            }).catch(error => {
                Alert.alert(error.message);
                setIsFetchingData(false);
            });
    };

    const fetchDaysList = (userID, userName) => {

        let localList = [];

        let start = new Date();
        let daysCount = 0;
        let week = 0;

        console.log('Fetching Days List for', userName);

        // SELECT * STATEMENT
        firebase.
            database().
            ref(fireRef + userID + deliveriesRef).
            orderByKey().
            once('value').
            then(snapshot => {
                snapshot.forEach(day => {

                    const delivery = new Deliveries();

                    let id = day.key;

                    delivery.dayNumber = Number(id);
                    delivery.actualDay = day.val().actualDay;
                    delivery.deliveroo = day.val().deliveroo;
                    delivery.uber = day.val().uber;
                    delivery.hours = day.val().hours;
                    delivery.total = delivery.deliveroo + delivery.uber;

                    delivery.hours > 0 ? (delivery.per = delivery.total / delivery.hours) : (delivery.per = 0);

                    delivery.week = week;
                    delivery.dayOfWeek = new Date(delivery.actualDay).getDay();

                    localList.push(delivery);

                    //logic to define weeks based on days
                    daysCount += 1;
                    if (daysCount === 7) {
                        daysCount = 0;
                        week += 1;
                    }
                });

                //finished building list
                let finish = new Date();
                console.log((finish - start) + 'ms to fetch list on', Platform.OS);

            }).then(() => {
                localList = checkIfTodayExists(localList);
                // before moving along our logic, first check if the app needs to add days to the list
                createWeeksListFromDaysList(localList, userName);
            });
    };

    const createWeeksListFromDaysList = (daysList, userName) => {
        let weeksList = [];

        let started = new Date();

        //declaring them outside loops to don't loose them after iterations
        let daysCount = 0;
        let weekNumber = 0;
        let delSum = 0, ubSum = 0, hoursSum = 0;
        let daysWithDel = 0, daysWithUber = 0, daysWithHours = 0;
        let weekStart = '';

        console.log('Assembling Weeks List for', userName);

        // SELECT * STATEMENT
        daysList.forEach(day => {

            let week = new Weeks();

            //incrementing sums
            delSum += day.deliveroo;
            ubSum += day.uber;
            hoursSum += day.hours;

            //checkning the days with data
            daysWithDel = day.deliveroo === 0 ? daysWithDel : daysWithDel += 1;//if its zero, dont increase the count
            daysWithUber = day.uber === 0 ? daysWithUber : daysWithUber += 1;
            daysWithHours = day.hours === 0 ? daysWithHours : daysWithHours += 1;

            //because I started on a tuesday
            if (day.key === '1') {
                weekStart = day.actualDay;
            }

            if (daysCount === 0) {
                weekStart = day.actualDay;
            }

            daysCount += 1;

            if (daysCount === 7) {//end of week reached
                daysCount = 0;

                week.week = weekNumber;
                week.deliveroo = SetPrecision(delSum);
                week.uber = SetPrecision(ubSum);
                week.hours = SetPrecision(hoursSum);
                week.total = SetPrecision(week.deliveroo + week.uber);

                week.hours > 0 ? (week.per = SetPrecision(week.total / week.hours)) : (week.per = 0);

                week.start = weekStart;
                week.end = day.actualDay;

                //checking if it has accurate data by evaluating if the number of days with all 3 values is the same
                if (daysWithHours !== daysWithDel && daysWithHours !== daysWithUber) {
                    week.accurate = false;
                }
                else week.accurate = true;

                weeksList.push(week);

                //resetting values for next iteration
                daysWithHours = 0;
                daysWithDel = 0;
                daysWithUber = 0;

                delSum = 0;
                ubSum = 0;
                hoursSum = 0;
                //increment week number
                weekNumber += 1;
            }
        });

        //finished building list
        let finish = new Date();
        console.log((finish - started) + 'ms to fetch list on', Platform.OS);
        listsLoaded(daysList, weeksList, userName);
    };

    const listsLoaded = (daysList, weeksList, userName) => {
        //updating app state
        console.log('Dispatching actions--> user signed in');

        dispatch(
            {// setting email
                type: ACTIONS.SET_USER_NAME,
                value: userName
            });
        dispatch(
            {//setting days list
                type: ACTIONS.SET_USER_DAYS_LIST,
                value: daysList
            });
        dispatch(
            {//setting weeks list
                type: ACTIONS.SET_USER_WEEKS_LIST,
                value: weeksList
            });
        dispatch(
            {//setting weeks list
                type: ACTIONS.IS_OFFLINE,
                value: false
            });
        //finished building user
        setIsFetchingData(false);
        //clear inputs
        setEmail('');
        setPassword('');
        handleLocalListLoaded();
    };


    return (
        isFetchingData ? <Loading /> :
            <DismissKeyboard>
                <Container>
                    <SortingButton
                        style={{ margin: 30 }}
                        light
                        onPress={() => toggleOffline()}
                        text='Offline Mode'
                        colour={Colours.primaryText} />

                    {mode}

                </Container>
            </DismissKeyboard>
    );
};

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: '100%',
    },
    imageContainer: {
        width: 200,
        height: 200,
        marginVertical: 10
    },
});

export default Login;