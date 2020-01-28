import React, { useState } from 'react';
import { Alert, TextInput, View } from 'react-native';
import firebase from 'firebase';
import { useDispatch, useSelector } from "react-redux";

import * as myActions from "../store/actions/actions";//Async
import { ACTIONS } from '../store/actions/actions';
import { ROUTES } from '../assets/constants/strings';

import Container from '../components/Container';
import MyButton from '../components/MyButton';
import Colours from '../assets/constants/Colours';
import LargeText from "../components/LargeText";
import { myStyles } from '../assets/helper/Styles';
import HelpItem from '../components/HelpItem';
import { fireRef, deliveriesRef } from '../assets/helper/helper';
import Deliveries from '../assets/models/Deliveries';
import Loading from '../components/Loading';
import SortingButton from '../components/SortingButton';
import DismissKeyboard from '../components/DismissKeyboard';

const MyAccount = (props) => {

    const [isChangeClicked, setIsChangeClicked] = useState(false);
    const [newPassword, setNewPassword] = useState('');
    const [isFetchingData, setIsFetchingData] = useState(false);

    let appOffline = useSelector(state => state.user.appOffline);

    const dispatch = useDispatch();

    const inputPassword = (input) => {
        setNewPassword(input);
    };

    const currentUser = firebase.auth().currentUser;

    const promptUser = (type) => {
        if (type === 'Download')
            Alert.alert(
                'Offline Browsing',
                'To have access to your data without internet connection, simply press Download and the next time you login, you will be able to browse offline by providing your email address',
                [{ text: 'Cancel', style: 'cancel' }, { text: 'Download', onPress: () => exportList() }]);
        else {
            Alert.alert(
                'Delete Account',
                'Beware, this action will permanently erase all of your data from Firebase and from your device!',
                [{ text: 'Cancel', style: 'cancel' }, { text: 'Delete', onPress: () => deleteCurrentUser() }]);
        }
    };

    const exportList = () => {
        try {
            //if user wishes to save list to SQLite, fetch it again from firebase to ensure it is up to date
            setIsFetchingData(true);

            let localList = [];

            let start = new Date();
            let daysCount = 0;
            let week = 0;

            console.log('Fetching Days List for', currentUser.displayName);

            // SELECT * STATEMENT
            firebase.
                database().
                ref(fireRef + currentUser.uid + deliveriesRef).
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
                    console.log((finish - start) + 'ms to fetch list. Saving to SQLite...');

                }).then(() => {
                    console.log('Inserting', localList.length, 'days into SQLite');
                    dispatch(myActions.DownloadListToDevice(currentUser.email, currentUser.uid, currentUser.displayName, localList));
                    setIsFetchingData(false);
                    Alert.alert('You can now Browse your data offline!');
                });
        } catch (err) {
            console.log(err);
        }
    };

    const changePassword = () => {

        newPassword.length < 6 ?
            Alert.alert('Minimum 6 characters')
            :
            firebase.
                auth().
                currentUser.
                updatePassword(newPassword).
                then(() => { Alert.alert('Password updated'); setIsChangeClicked(false) }).catch(err => {
                    Alert.alert(err.message);
                });
    };

    const firebaseLogout = () => {

        firebase.auth().signOut().then(() => {

            console.log('Dispatch--> userName = \'\' ');
            dispatch({
                type: ACTIONS.SET_USER_NAME,
                value: ''
            });
            console.log('Dispatch--> daysList = \'\' ');
            dispatch({
                type: ACTIONS.SET_USER_DAYS_LIST,
                value: []
            });
            console.log('Dispatch--> weeksList = \'\' ');
            dispatch({
                type: ACTIONS.SET_USER_WEEKS_LIST,
                value: []
            });
            console.log('Dispatch--> SQList = \'\' ');
            dispatch({
                type: ACTIONS.SET_SQL_LIST,
                value: []
            });
            props.navigation.navigate(ROUTES.LOGIN);
        });
    };

    const deleteCurrentUser = () => {

        dispatch(myActions.DeleteUserList(currentUser.email));

        firebase.database().ref(fireRef + currentUser.uid).remove().then(() => {

            firebase.auth().currentUser.delete().then(() => {
                Alert.alert('Your account has been deleted');
                console.log('Dispatch--> userName = \'\' ');
                dispatch({
                    type: ACTIONS.SET_USER_NAME,
                    value: ''
                });
                console.log('Dispatch--> daysList = \'\' ');
                dispatch({
                    type: ACTIONS.SET_USER_DAYS_LIST,
                    value: []
                });
                console.log('Dispatch--> weeksList = \'\' ');
                dispatch({
                    type: ACTIONS.SET_USER_WEEKS_LIST,
                    value: []
                });
                console.log('Dispatch--> SQList = \'\' ');
                dispatch({
                    type: ACTIONS.SET_SQL_LIST,
                    value: []
                });
                props.navigation.navigate(ROUTES.LOGIN);
            });
        });
    };

    let title = !appOffline ? 'Settings' : 'Offline Mode';

    return (isFetchingData ? <Loading /> :
        <Container dark={true}>
            <View style={{ flex: 1, margin: 30 }}>

                <LargeText style={{ margin: 20 }}>{title}</LargeText>
                {/* if on offline mode, just show the logout */}
                {appOffline ?
                    <View style={{ marginHorizontal:10,flex: 1, alignItems: 'center'  }}>
                        <HelpItem title='Log Out' onPress={() => firebaseLogout()} />
                    </View>
                    :
                    <View style={{ flex: 1, alignItems: 'center' }}>
                        <HelpItem title='Setup Offline Browsing' onPress={() => promptUser('Download')} />
                        <HelpItem title='Change Password' onPress={() => setIsChangeClicked(true)} />
                        <HelpItem title='Log Out' onPress={() => firebaseLogout()} />
                    </View>
                }

                {isChangeClicked ?
                    (
                        <DismissKeyboard>
                            <View style={{ flex: 1, alignItems: 'center' }}>
                                <TextInput
                                    value={newPassword}
                                    onChangeText={inputPassword}
                                    secureTextEntry={true}
                                    placeholder={'New Password'}
                                    placeholderTextColor={Colours.placeholder}
                                    style={myStyles.login}
                                />

                                <MyButton
                                    text="Done"
                                    colour={Colours.success}
                                    textColour={Colours.white}
                                    onPress={() => changePassword()} />
                                <MyButton
                                    text="Cancel"
                                    colour={Colours.cancel}
                                    textColour={Colours.white}
                                    onPress={() => setIsChangeClicked(false)} />
                            </View>
                        </DismissKeyboard>
                    )
                    : null}
                {appOffline || isChangeClicked ? null :
                    <SortingButton
                        colour={Colours.cancel}
                        text='Delete My Account'
                        onPress={() => promptUser('delete')}
                        style={{ marginHorizontal: 40 }}
                    />
                }
            </View>
        </Container>
    );
};

export default MyAccount;