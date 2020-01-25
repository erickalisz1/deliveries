import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import Colours  from '../assets/constants/Colours';
import { myStyles } from '../assets/helper/Styles';

const HelpItem = (props) => {

    return (
        <TouchableOpacity style={props.style} onPress={props.onPress}>
            <View style={myStyles.listItemRow}>
                <View style={myStyles.listItemColumn}>
                    <Text style={myStyles.listItemValueLarge}>{props.title}</Text>
                </View>
                <View style={myStyles.listItemColumn}>
                    <Ionicons name='ios-arrow-forward' size={25} color={Colours.selected} />
                </View>
            </View>
        </TouchableOpacity>
    );
}

export default HelpItem;