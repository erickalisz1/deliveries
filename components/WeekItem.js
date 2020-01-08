import React from 'react';
import { Text, View } from 'react-native';

import { myStyles } from '../assets/helper/Styles';
import { stringVal, stringPer, SetPrecision, setWeekString } from '../assets/helper/helper';

const WeekItem = (props) => {

    const { selectedWeek, column } = props;

    let week = setWeekString(selectedWeek.start, selectedWeek.end);

    let Del = SetPrecision(selectedWeek.deliveroo);
    let Uber = SetPrecision(selectedWeek.uber);
    let Hours = SetPrecision(selectedWeek.hours);
    let Total = SetPrecision(selectedWeek.total);
    let Per = SetPrecision(selectedWeek.per);
    let Acc = selectedWeek.accurate;

    let text = '';

    if (column === 'week') {//default sorting
        if (Hours === 0 && Total < 1) {//not worked
            text = week + ' - Not worked';
        }

        else if (Hours === 0 && Total > 0 || !Acc) {//worked but don't know the hours
            text = week + stringVal(Total);
        }

        else text = week + stringVal(Total) + stringPer(Per);
    }
    else if (column === 'deliveroo') {//sorting by deliveroo

        if (!Acc || (Hours < 1 && Del > 0)) {//not accurate or no hours recorded at all
            text = week + stringVal(Del);
        }
        else if (Hours > 0 && Del > 0) {// everything set
            text = week + stringVal(Del) + stringPer(Per);
        }
        else text = '-1';
    }
    else if (column === 'uber') {//sorting by uber

        if (!Acc || (Hours < 1 && Uber > 0)) {//not accurate or no hours recorded at all
            text = week + stringVal(Uber);
        }
        else if (Hours > 0 && Uber > 0) {// everything set
            text = week + stringVal(Uber) + stringPer(Per);
        }
        else text = '-1';
    }
    else if (column === 'total') {//sorting by total

        if (!Acc || (Hours < 1 && Total > 0)) {//not accurate or no hours recorded at all
            text = week + stringVal(Total);
        }
        else if (Hours > 0 && Total > 0) {// everything set
            text = week + stringVal(Total) + stringPer(Per);
        }
        else text = '-1';
    }
    else if (column === 'per') {//sorting by per
        if (Acc && Hours > 0 && Per > 0) {// everything set
            text = week + stringVal(Total) + stringPer(Per);
        }
        else text = '-1';
    }

    return text === '-1' ? (null) : (
        <View style={myStyles.listItem}>
            <Text style={myStyles.listItemValue}>{text}</Text>
        </View>
    );
}
export default WeekItem;

