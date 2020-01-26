import React, { useState } from 'react';
import { Alert, TextInput, View } from 'react-native';
import firebase from 'firebase';
import { useDispatch, useSelector } from "react-redux";

import * as myActions from "../store/actions/actions";

import Container from '../components/Container';
import MyButton from '../components/MyButton';
import Colours from '../assets/constants/Colours';
import LargeText from "../components/LargeText";
import { ACTIONS } from '../store/actions/actions';
import { ROUTES } from '../assets/constants/strings';
import { myStyles } from '../assets/helper/Styles';
import HelpItem from '../components/HelpItem';

const MyAccount = (props) => {

    const [isChangeClicked, setIsChangeClicked] = useState(false);
    const [newPassword, setNewPassword] = useState('');

    const list = useSelector(state => state.user.userDaysList);
    let appOffline = useSelector(state => state.user.appOffline);

    const dispatch = useDispatch();

    const inputPassword = (input) => {
        setNewPassword(input);
    };

    const currentUser = firebase.auth().currentUser;

    const promptUser = () => {
        Alert.alert(
            'Offline Browsing',
            'To have access to your data without internet connection, simply press Download and the next time you login, you will be able to browse offline by providing your email address',
            [{ text: 'Cancel', style: 'cancel' }, { text: 'Download', onPress: () => exportList() }]);
    };

    const exportList = () => {
        try {
            dispatch(myActions.DownloadListToDevice(currentUser.email, currentUser.uid, currentUser.displayName, list));
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

    //onSignedOut
    const firebaseLogout = () => {


        // dispatch(myActions.loadUserList(firebase.auth().currentUser.uid));


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

    let title = !appOffline ? 'Settings' : 'Offline Mode';

    return (
        <Container>

            <LargeText style={{ margin: 20 }}>{title}</LargeText>
            {appOffline ? null :
                <View style={{width: '90%'}}>
                    <HelpItem title='Setup Offline Browsing' style={{ marginVertical: 3, borderWidth: 1, borderColor: Colours.selected }} onPress={() => promptUser()} />
                    <HelpItem title='Change Password' style={{ marginVertical: 3, borderWidth: 1, borderColor: Colours.selected }} onPress={() => setIsChangeClicked(true)} />
                </View>
            }

            {isChangeClicked ?
                (
                    <View style={{ marginTop: 20 }}>
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
                )
                :
                <MyButton
                    text="Log out"
                    colour={Colours.cancel}
                    textColour={Colours.white}
                    onPress={() => firebaseLogout()}
                    style={{ marginTop: 30 }}
                />}

        </Container>
    );
};

export default MyAccount;