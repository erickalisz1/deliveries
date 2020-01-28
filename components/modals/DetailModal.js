import React from 'react';
import { Text, View, Modal } from 'react-native';
import { useSelector } from "react-redux";

import { setWeekString, setDateString, setDailyMessage, setWeeklyMessage } from '../../assets/helper/helper';
import { myStyles } from '../../assets/helper/Styles';
import Colours from '../../assets/constants/Colours';
import LargeText from '../LargeText';
import ModalContainer from './ModalContainer';
import ModalSpace from './ModalSpace';
import MyButton from '../MyButton';
import Row from '../Row';

const DetailModal = (props) => {

    let appOffline = useSelector(state => state.user.appOffline);

    if (props.week) {

        const { week } = props
        let weekString = setWeekString(week.start, week.end);

        let details = setWeeklyMessage(week);

        //ES-6 regular expression to count how many lines I have in my string
        let count = (details.match(/\n/g) || []).length;

        //the more lines I have, the less space I will need outside my ModalContainer
        let space = 19 - count;

        return (

            <Modal transparent={true} visible={props.visible} animationType='slide'>

                <ModalSpace onClose={props.onClose} flex={space} />

                <ModalContainer minHeight={130} smaller detail>

                    <View style={myStyles.modalRow}>
                        <LargeText modal={true}>{weekString}</LargeText>
                    </View>

                    <View style={myStyles.modalRow}>
                        <Text style={myStyles.modalDescriptionLarge}>{details}</Text>
                    </View>

                    <MyButton
                        text='Got it'
                        colour={Colours.selected}
                        textColour={Colours.black}
                        onPress={props.onClose}
                        style={myStyles.modalRow} />

                </ModalContainer>

                <ModalSpace onClose={props.onClose} flex={space} />
            </Modal>


        );
    }
    else if (props.day) {

        const { day, list } = props;

        let date = setDateString(day.actualDay);

        let details = setDailyMessage(day, list);

        //ES-6 regular expression to count how many lines I have in my string
        let count = (details.match(/\n/g) || []).length;

        //the more lines I have, the less space I will need outside my ModalContainer
        let space = 17 - count;

        console.log(space)

        //fixing space
        space = space === 2 ? space = 4 : space;

        return (

            <Modal transparent={true} visible={props.visible} animationType='slide'>

                <ModalSpace onClose={props.onClose} flex={space} />

                <ModalContainer dark={false} smaller detail>

                    <View style={myStyles.modalRow}>
                        <LargeText modal={true}>{date}</LargeText>
                    </View>

                    <View style={myStyles.modalRow}>
                        <Text style={myStyles.modalDescriptionLarge}>{details}</Text>
                    </View>

                    <Row>
                        {appOffline ? null :
                            <MyButton
                                text='Update'
                                colour={Colours.selected}
                                textColour={Colours.black}
                                onPress={props.edit}
                                style={{ marginHorizontal: 10 }}
                            />}


                        <MyButton
                            text='Got it'
                            colour={Colours.success}
                            textColour={Colours.black}
                            onPress={props.onClose}
                            style={{ marginHorizontal: 10 }}
                        />

                    </Row>
                </ModalContainer>

                <ModalSpace onClose={props.onClose} flex={space} />
            </Modal>


        );
    }

    else return null;
};

export default DetailModal;