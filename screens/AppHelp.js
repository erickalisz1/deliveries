import React, { useState } from 'react';
import { FlatList, TouchableOpacity } from 'react-native';

import LargeText from '../components/LargeText';
import Container from '../components/Container';
import HelpModal from '../components//modals/HelpModal';
import HelpItem from '../components/HelpItem';
import { helpItems } from '../assets/helper/helper';

const AppHelp = () => {

    const [displayHelpModal, setDisplayHelpModal] = useState(false);
    const [itemSelected, setItemSelected] = useState(null);

    

    return (
        <Container dark={true}>

            <HelpModal visible={displayHelpModal} onClose={() => setDisplayHelpModal(false)} item={itemSelected}/>

            <LargeText modal={true} moreMargin={true} >What would you like help with?</LargeText>
            <FlatList 
                keyExtractor={item => item.display}
                data={helpItems}
                style={{maxWidth:'95%'}}

                renderItem={(item) =>
                (
                    <TouchableOpacity 
                        onPress={() => {setItemSelected(item.item); setDisplayHelpModal(true);}}>

                        <HelpItem
                            title={item.item.display}
                        />
                    </TouchableOpacity>
                )}
            />
        </Container>
    );

};


export default AppHelp;