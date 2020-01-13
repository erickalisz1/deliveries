import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';

import LargeText from '../components/LargeText';
import Container from '../components/Container';
import HelpModal from '../components//modals/HelpModal';
import HelpItem from '../components/HelpItem';
import { helpItems } from '../assets/helper/helper';

const AppHelp = () => {

    const [displayHelpModal, setDisplayHelpModal] = useState(false);
    const [itemSelected, setItemSelected] = useState(null);

    let displayItems = helpItems.map((row, index) => {//function to better display items
        return (
            <TouchableOpacity style={{ width: '90%' }} key={index} onPress={() => { setItemSelected(row); setDisplayHelpModal(true); }}>
                <HelpItem
                    title={row.display}
                />
            </TouchableOpacity>
        );
    })

    return (
        <Container dark={true}>

            <HelpModal visible={displayHelpModal} onClose={() => setDisplayHelpModal(false)} item={itemSelected} />

            <LargeText modal={true} moreMargin={true} >What would you like help with?</LargeText>
           
            {displayItems}

        </Container>
    );

};


export default AppHelp;