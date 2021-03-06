import React from 'react';
import { Text, View, Modal, Dimensions, Platform } from 'react-native';

import Colours from '../../assets/constants/Colours';
import LargeText from '../LargeText';
import ModalContainer from './ModalContainer';
import ModalSpace from './ModalSpace';
import MyButton from '../MyButton';
import { myStyles } from '../../assets/helper/Styles';
import { SetPrecision } from '../../assets/helper/helper';

const CardDetail = (props) => {

    const { item } = props;

    if (item) {

        let beforeText = '', afterText = '';//need these variables because values displayed can be dollars, hours or dollars per hour

        const height = Dimensions.get('window').height;

        if (item.type === 'number') {
            beforeText = '$'
        }
        else if (item.type === 'hours') {
            afterText = 'h'
        }
        else if (item.type === 'per') {
            beforeText = '$';
            afterText = '/h';
        }

        return (

            <Modal transparent={true} visible={props.visible} animationType='slide'>

                <ModalSpace onClose={props.onClose} flex={20} />

                <ModalContainer colour={item.colour} minHeight={height < 700 || Platform.OS === 'android' ? 190 : 150} dark={false}>

                    <View style={myStyles.modalRow}>
                        <LargeText colour={item.colour} modal={true}>{item.column}</LargeText>
                    </View>


                    <View style={myStyles.contentRow}>
                        <View style={myStyles.contentColumn}>

                            <Text style={myStyles.cardContentCenter}>{'\n'}</Text>
                            <Text style={myStyles.cardContent}>Minimum:</Text>
                            <Text style={myStyles.cardContent}>Average:</Text>
                            <Text style={myStyles.cardContent}>Maximum:</Text>

                        </View>
                        <View style={myStyles.contentColumn}>

                            <Text style={myStyles.cardContent}>on a Day{'\n'}</Text>
                            <Text style={myStyles.cardContent}>{beforeText}{SetPrecision(item.min)}{afterText}</Text>
                            <Text style={myStyles.cardContent}>{beforeText}{SetPrecision(item.avg)}{afterText}</Text>
                            <Text style={myStyles.cardContent}>{beforeText}{SetPrecision(item.max)}{afterText}</Text>

                        </View>
                        <View style={myStyles.contentColumn}>

                            <Text style={myStyles.cardContent}>on a Week{'\n'}</Text>
                            <Text style={myStyles.cardContent}>{beforeText}{SetPrecision(item.weeksMin)}{afterText}</Text>
                            <Text style={myStyles.cardContent}>{beforeText}{SetPrecision(item.weekAvg)}{afterText}</Text>
                            <Text style={myStyles.cardContent}>{beforeText}{SetPrecision(item.weeksMax)}{afterText}</Text>

                        </View>
                    </View>
                    <MyButton
                        text='Got it'
                        colour={item.colour}
                        textColour={Colours.black}
                        onPress={props.onClose}
                        style={myStyles.modalRow} />

                </ModalContainer>

                <ModalSpace onClose={props.onClose} flex={20} />
            </Modal>


        );
    }
    else return null;
};

export default CardDetail;