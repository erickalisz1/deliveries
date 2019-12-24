import React, { useState } from 'react';
import { FlatList, TouchableOpacity, Platform } from 'react-native';
import LargeText from '../components/LargeText';
import Container from '../components/Container';
import HelpModal from '../components/HelpModal';
import HelpItem from '../components/HelpItem';

const AppHelp = () => {

    const [displayHelpModal, setDisplayHelpModal] = useState(false);
    const [itemSelected, setItemSelected] = useState(null);

    let items = [
        {//defining title, description and modal size
            display:'Adding days to your list', 
            description:'To add days to your list is vey simple:\nYou don\'t have to do it! Once you open the app, it will check if today exists and if it doesn\'t, the app will add the following week for you\n:-D',
            flex:Platform.OS === 'ios' ? 9 : 18
        },
        {
            display:'Updating days', 
            description:'To update a day, simply tap and hold it on the main list and input the data related to the day you selected.',
            flex:Platform.OS === 'ios' ? 11 : 22
        },
        {
            display:'Calculating deliveroo earnings', 
            description:'To know the exact amount you\'ve earned when working with deliveroo, simply tap the text box and input your order fees and the tips or extras you\'ve earned. The app will then calculate the exact amount you will earn.',
            flex:Platform.OS === 'ios' ? 8 : 13
        },
        {
            display:'Calculating hours worked',
            description:'To properly calculate how much you have earned per hour, we need the total time to be decimal. To calculate it, simply tap the hours text box upon updating and provide the amount of hours and minutes you\'ve worked and the app will do the rest.',
            flex:Platform.OS === 'ios' ? 9 : 13
        },
        {
            display:'Changing list sort', 
            description:'To change how the main list is sorted, simply tap and hold the top label and select the value you wish to sort the list with.',
            flex:Platform.OS === 'ios' ? 11 : 24
        },
        {
            display:'Toggling list orientation', 
            description:'To change the list orientation, simply tap the label at the top of the main list and the orientation will be toggled.',
            flex:Platform.OS === 'ios' ? 12 : 20
        },
        {
            display:'Dark mode', 
            description:'To activate or deactivate dark mode, simply go to the Settings tab and switch it on or off.',
            flex:Platform.OS === 'ios' ? 12 : 23
        },
    ];

    return (
        <Container dark={true}>

            <HelpModal visible={displayHelpModal} onClose={() => setDisplayHelpModal(false)} item={itemSelected}/>

            <LargeText modal={true} moreMargin={true} >What would you like help with?</LargeText>
            <FlatList 
                keyExtractor={item => item.display}
                data={items}
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