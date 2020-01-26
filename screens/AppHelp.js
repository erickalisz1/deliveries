import React, { useState } from 'react';


import LargeText from '../components/LargeText';
import Container from '../components/Container';
import HelpModal from '../components//modals/HelpModal';
import HelpItem from '../components/HelpItem';
import { helpItems } from '../assets/helper/helper';
import { ROUTES } from '../assets/constants/strings';
import Colours from '../assets/constants/Colours';

const AppHelp = (props) => {

    const [displayHelpModal, setDisplayHelpModal] = useState(false);
    const [itemSelected, setItemSelected] = useState(null);

    let displayItems = helpItems.map((row, index) => {//function to better display items
        return (
            <HelpItem
                title={row.display}
                style={{ width: '90%', marginVertical: 3 }}
                key={index}
                onPress={() => { setItemSelected(row); setDisplayHelpModal(true); }}
            />
        );
    });

    return (
        <Container dark={true}>

            <HelpModal visible={displayHelpModal} onClose={() => setDisplayHelpModal(false)} item={itemSelected} />

            <LargeText modal={true} moreMargin={true} >What would you like help with?</LargeText>

            {displayItems}

            <HelpItem title='My Account' style={{ width: '90%', marginVertical: 3, borderWidth: 1, borderColor: Colours.selected }} onPress={() => props.navigation.navigate(ROUTES.ACCOUNT)} />

        </Container>
    );
};


export default AppHelp;