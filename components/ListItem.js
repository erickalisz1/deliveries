import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { formatDate, SetPrecision } from '../assets/helper/helper';
import { myStyles } from '../assets/helper/Styles';
import { stringDel, stringPer, stringUber, stringTotal, stringVal } from '../assets/constants/strings';
import { Ionicons } from '@expo/vector-icons';
import Colours from '../assets/constants/darkTheme';

const ListItem = (props) => {

    const { columnToSort, selectedDay } = props;

    const handleUpdate = () => {
        props.onPress(selectedDay);
    };

    let ActualDay = selectedDay.actualDay;
    let Del = SetPrecision(selectedDay.deliveroo);
    let Uber = SetPrecision(selectedDay.uber);
    let Hours = SetPrecision(selectedDay.hours);
    let Total = SetPrecision(selectedDay.total);
    let Per = SetPrecision(selectedDay.per);

    let weekday = new Date(ActualDay).toDateString().substr(0, 3);// 'Mon'
    let day = formatDate(ActualDay);

    let text = weekday + ', ' + day;// 'Mon, 23/09/2018'

    if (columnToSort === 'dayNumber') {//default sorting
        if (Hours === 0 && Total < 1) {//not worked

            text += ' - N/W'
        }

        else if (Hours === 0 && Total > 0) {//worked but don't know the hours
            text += stringVal(Total);
        }

        else {
            text += stringVal(Total) + ' - ' + Hours + 'h ' + stringPer(Per);
        }
    }

    else if (columnToSort === 'deliveroo') {//sorting by deliveroo
        if (Hours > 0 && Del > 0) {
            text += stringVal(Del) + stringPer(Per);
        }
        else if (Hours < 1 && Del > 0) {
            text += stringVal(Del);
        }
        else text = '-1';
    }

    else if (columnToSort === 'uber') {//sorting by uber
        if (Hours > 0 && Uber > 0) {
            text += stringUber(Uber) + stringPer(Per);
        }
        else if (Hours < 1 && Uber > 0) {
            text += stringUber(Uber);
        }
        else text = '-1';
    }
    else if (columnToSort === 'total') {//sorting by total
        if (Hours > 0 && Total > 0) {
            text += stringTotal(Total) + stringPer(Per);
        }
        else if (Hours < 1 && Total > 0) {
            text += stringTotal(Total);
        }
        else text = '-1';
    }
    else if (columnToSort === 'per') {//sorting by per
        if (Hours > 0 && Per > 0) {
            text += stringTotal(Total) + stringPer(Per);
        }
        else text = '-1';
    }

    else text = '-1';

    return text === '-1' ? (null) : (
        <View style={myStyles.listItem}>
            <View style={myStyles.listItemColumn}>
                <Text style={myStyles.listItemValue}>{text}</Text>
            </View>
            <View style={myStyles.listItemColumn}>
                <TouchableOpacity onPress={handleUpdate} style={{paddingHorizontal:5}}>
                    <Ionicons name='ios-create' size={15} color={props.buttonColour} />
                </TouchableOpacity>
            </View>
        </View>
    );
}


export default ListItem;