import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import firebase from 'firebase';
import { useSelector, useDispatch } from 'react-redux';

import LargeText from '../components/LargeText';
import Container from '../components/Container';
import HelpModal from '../components//modals/HelpModal';
import HelpItem from '../components/HelpItem';
import { helpItems } from '../assets/helper/helper';
import MyButton from '../components/MyButton';
import Colours from '../assets/constants/darkTheme';
import Login from './Login';
import { ACTIONS } from '../store/actions/actions';

const AppHelp = (props) => {

    const [displayHelpModal, setDisplayHelpModal] = useState(false);
    const [itemSelected, setItemSelected] = useState(null);

    const dispatch = useDispatch();
    let isUserSignedIn = useSelector(state => state.user.isLoggedIn);

    let displayItems = helpItems.map((row, index) => {//function to better display items
        return (
            <TouchableOpacity style={{ width: '90%' }} key={index} onPress={() => { setItemSelected(row); setDisplayHelpModal(true); }}>
                <HelpItem
                    title={row.display}
                />
            </TouchableOpacity>
        );
    })
    //onSignedOut
    const firebaseLogout = () => {
        firebase.auth().signOut().then(() => {
            
            console.log('Dispatch--> loggedIn = false');
            dispatch({
                type: ACTIONS.SET_IS_LOGGED,
                value: false
            });
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
            props.navigation.navigate('Login');
        });
    };

    return isUserSignedIn ? (
        <Container dark={true}>

            <HelpModal visible={displayHelpModal} onClose={() => setDisplayHelpModal(false)} item={itemSelected} />

            <LargeText modal={true} moreMargin={true} >What would you like help with?</LargeText>

            {displayItems}

            <MyButton text="Log Out" colour={Colours.cancel} textColour={Colours.white} onPress={() => firebaseLogout()} />

        </Container>
    ) : <Login />;
};


export default AppHelp;