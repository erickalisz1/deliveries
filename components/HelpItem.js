import React from 'react';
import { Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import Colours from '../assets/constants/darkTheme';
import { myStyles } from '../assets/helper/Styles';

const HelpItem = (props) => {

    return (
        <View style={myStyles.listItemRow}>
            <View style={myStyles.listItemColumn}>
                <Text style={myStyles.listItemValueLarge}>{props.title}</Text>
            </View>
            <View style={myStyles.listItemColumn}>
                <Ionicons name='ios-arrow-forward' size={25} color={Colours.selected} />
            </View>
        </View>
    );
}

export default HelpItem;