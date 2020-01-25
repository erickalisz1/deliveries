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

const MyAccount = (props) => {

    const [isChangeClicked, setIsChangeClicked] = useState(false);
    const [newPassword, setNewPassword] = useState('');

    const list = useSelector(state => state.user.userDaysList);

    const dispatch = useDispatch();

    const inputPassword = (input) => {
        setNewPassword(input);
    };

    const currentUser = firebase.auth().currentUser;

    // dispatch(placesActions.addPlace(titleValue, selectedImage));

    const exportList = () => {
        try {
            dispatch(myActions.download(currentUser.email, currentUser.uid, currentUser.displayName, list));
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
            props.navigation.navigate(ROUTES.LOGIN);
        });
    };



    return (
        <Container>
            <LargeText>Settings</LargeText>
            <MyButton
                text="Enable Offline Mode"
                colour={Colours.days}
                textColour={Colours.background}
                onPress={() => exportList()}
            />
            <MyButton
                text="Change Password"
                colour={Colours.accent}
                textColour={Colours.black}
                onPress={() => setIsChangeClicked(true)}
            />
            {isChangeClicked ?
                (
                    <View>
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
                />}

        </Container>
    );
};

export default MyAccount;