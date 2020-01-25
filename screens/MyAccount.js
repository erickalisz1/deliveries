import React from 'react';
import {Text} from 'react-native';
import firebase from 'firebase';

import Container from '../components/Container';
import LargeText from '../components/LargeText';
import SmallText from '../components/SmallText';

const MyAccount = () => {

    //onSignedOut
    const firebaseLogout = () => {
        // firebase.auth().signOut().then(() => {

        //     console.log('Dispatch--> loggedIn = false');
        //     dispatch({
        //         type: ACTIONS.SET_IS_LOGGED,
        //         value: false
        //     });
        //     console.log('Dispatch--> userName = \'\' ');
        //     dispatch({
        //         type: ACTIONS.SET_USER_NAME,
        //         value: ''
        //     });
        //     console.log('Dispatch--> daysList = \'\' ');
        //     dispatch({
        //         type: ACTIONS.SET_USER_DAYS_LIST,
        //         value: []
        //     });
        //     console.log('Dispatch--> weeksList = \'\' ');
        //     dispatch({
        //         type: ACTIONS.SET_USER_WEEKS_LIST,
        //         value: []
        //     });
        // });
    };

    return <Container>
        <Text>My account</Text>
    </Container>
};

export default MyAccount;