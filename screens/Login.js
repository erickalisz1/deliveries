import React, { useState } from 'react';
import firebase from 'firebase';
import { Alert, Platform, View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';

import Container from '../components/Container';
import { TextInput } from 'react-native';
import MyButton from '../components/MyButton';
import { myStyles } from '../assets/helper/Styles';
import Colours from '../assets/constants/Colours';
import { fireRef, deliveriesRef, SetPrecision, checkIfTodayExists } from '../assets/helper/helper';
import { ACTIONS } from '../store/actions/actions';
import Deliveries from '../assets/models/Deliveries';
import Loading from '../components/Loading';
import Weeks from '../assets/models/Weeks';
import DismissKeyboard from '../components/DismissKeyboard';
import { ROUTES } from '../assets/constants/strings';

const Login = (props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isFetchingData, setIsFetchingData] = useState(false);

    const dispatch = useDispatch();//to update store

    const usernameInput = (input) => {
        setUsername(input);
    };

    const passwordInput = (input) => {
        setPassword(input);
    };

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
                                    then(() => {
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
                console.log('before checkIfTodayExists:', localList.length);
                localList = checkIfTodayExists(localList);
                console.log('after checkIfTodayExists:', localList.length);
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

        console.log('Fetching Weeks List for', userName);

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
            {// setting username
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
        //finished building user
        setIsFetchingData(false);
        //clear inputs
        setUsername('');
        setPassword('');

        //redirect to main app
        props.navigation.navigate(ROUTES.TABS);
    };

    

    return (
        isFetchingData ? <Loading /> :
            <Container>
                <DismissKeyboard>
                    <View>
                        <TouchableOpacity
                            // onPress={()=> {setUsername('admin@admin.com'); setPassword('adminait')}}
                            style={styles.imageContainer}
                            onPress={() => { setUsername('eric@ait.com'); setPassword('eric123') }}
                            // onPress={() => { setUsername('carol@ait.com'); setPassword('carol1') }}
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
                            value={username}
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
                        <MyButton
                            onPress={() => firebaseLogin(username, password)}
                            text='Login'
                            colour={Colours.success}
                            textColour={Colours.black} />
                        <MyButton
                            onPress={() => props.navigation.navigate(ROUTES.REGISTER)}
                            text='Register'
                            colour={Colours.success}
                            textColour={Colours.black} />
                    </View>
                </DismissKeyboard>
            </Container>
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