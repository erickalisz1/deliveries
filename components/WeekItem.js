import React from 'react';
import { Text, View } from 'react-native';
import { myStyles } from '../assets/helper/Styles';
import { stringVal, stringPer } from '../assets/constants/strings';
import { SetPrecision, setWeekString } from '../assets/helper/helper';

const WeekItem = (props) => {

    const { selectedWeek, column } = props;

    const week = setWeekString(selectedWeek.start, selectedWeek.end);

    const Del = SetPrecision(selectedWeek.deliveroo);
    const Uber = SetPrecision(selectedWeek.uber);
    const Hours = SetPrecision(selectedWeek.hours);
    const Total = SetPrecision(selectedWeek.total);
    const Per = SetPrecision(selectedWeek.per);
    const Acc = selectedWeek.accurate;

    //Formatted string values

    const sDel = stringVal(Del);
    const sUber = stringVal(Uber);
    const sTotal = stringVal(Total);
    const sPer = stringPer(Per);

    let firstValue = '-', secondValue = '-';
    let shouldDisplay = true;

    if (column === 'week') {//default sorting
        if (Hours === 0 && Total < 1) {//not worked
            //do nothing
        }

        else if (Hours === 0 && Total > 0 || !Acc) {//worked but don't know the hours
            firstValue = sTotal;
        }

        else { //all data valid
            firstValue = sTotal;
            secondValue = sPer;
        }
    }
    else if (column === 'deliveroo') {//sorting by deliveroo

        if (!Acc || (Hours < 1 && Del > 0)) {//not accurate or no hours recorded at all
            firstValue = sDel;
        }
        else if (Hours > 0 && Del > 0) {// everything set
            firstValue = sDel;
            secondValue = sPer;
        }
        else shouldDisplay = false;
    }
    else if (column === 'uber') {//sorting by uber

        if (!Acc || (Hours < 1 && Uber > 0)) {//not accurate or no hours recorded at all
            firstValue = sUber;
        }
        else if (Hours > 0 && Uber > 0) {// everything set
            firstValue = sUber;
            secondValue = sPer;
        }
        else shouldDisplay = false;
    }
    else if (column === 'total') {//sorting by total

        if (!Acc || (Hours < 1 && Total > 0)) {//not accurate or no hours recorded at all
            firstValue = sTotal;
        }
        else if (Hours > 0 && Total > 0) {// everything set
            firstValue = sTotal;
            secondValue = sPer;
        }
        else shouldDisplay = false;
    }
    else if (column === 'per') {//sorting by per
        if (Acc && Hours > 0 && Per > 0) {// everything set
            firstValue = sTotal;
            secondValue = sPer;
        }
        else shouldDisplay = false;
    }
    else shouldDisplay = false;

    return !shouldDisplay ? (null) : (
        <View style={myStyles.listItem}>
            <View style={{ flex: 9, display: 'flex', flexDirection: 'row' }}>

                <View style={{ flex: 3 }}>
                    <Text style={myStyles.listItemValue}>
                        {week}
                    </Text>
                </View>

                <View style={{ flex: 2 }}>
                    <Text style={myStyles.listItemValue}>
                        {firstValue}
                    </Text>
                </View>

                <View style={{ flex: 2 }}>
                    <Text style={myStyles.listItemValue}>
                        {secondValue}
                    </Text>
                </View>

            </View>
        </View>
    );
}
export default WeekItem;

