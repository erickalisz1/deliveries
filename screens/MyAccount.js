import React from 'react';
import firebase from 'firebase';
import { useDispatch } from "react-redux";

import Container from '../components/Container';
import MyButton from '../components/MyButton';
import Colours from '../assets/constants/Colours';
import LargeText from "../components/LargeText";
import { ACTIONS } from '../store/actions/actions';
import { ROUTES } from '../assets/constants/strings';

const MyAccount = (props) => {

    const dispatch = useDispatch();

    //onSignedOut
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
            props.navigation.navigate(ROUTES.LOGIN);
        });
    };



    return (
        <Container>
            <LargeText>Settings</LargeText>
            <MyButton 
                text="Change Password"
                colour={Colours.days}
                textColour={Colours.background}
                onPress={() => firebaseLogout()}
            />
            <MyButton 
                text="Change Display Name"
                colour={Colours.accent}
                textColour={Colours.black}
                onPress={() => firebaseLogout()}
            />
            <MyButton 
                text="Log out"
                colour={Colours.cancel}
                textColour={Colours.white}
                onPress={() => firebaseLogout()}
            />
        </Container>
    );
};

export default MyAccount;