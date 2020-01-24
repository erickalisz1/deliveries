import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import firebase from 'firebase';
import { useSelector } from 'react-redux';

import LargeText from '../components/LargeText';
import Container from '../components/Container';
import HelpModal from '../components//modals/HelpModal';
import HelpItem from '../components/HelpItem';
import { helpItems } from '../assets/helper/helper';
import MyButton from '../components/MyButton';
import Colours from '../assets/constants/darkTheme';
import Login from './Login';

const AppHelp = () => {

    const [displayHelpModal, setDisplayHelpModal] = useState(false);
    const [itemSelected, setItemSelected] = useState(null);
    const [isUserSignedIn, setIsUserSignedIn] = useState(true);
    
    console.log('useSelector(state => state.user.isLoggedIn):', useSelector(state => state.user.isLoggedIn));

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
        firebase.auth().currentUser.updateProfile({displayName:""});
        firebase.auth().signOut().then(() => { setIsUserSignedIn(false); });
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