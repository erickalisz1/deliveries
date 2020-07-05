import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { formatDate, SetPrecision } from '../assets/helper/helper';
import { myStyles } from '../assets/helper/Styles';
import { stringPer, stringVal } from '../assets/constants/strings';
import { Ionicons } from '@expo/vector-icons';
import { useSelector } from "react-redux";

const ListItem = (props) => {

    const appOffline = useSelector(state => state.user.appOffline);

    const { columnToSort, selectedDay } = props;

    const handleUpdate = () => {
        props.onPress(selectedDay);
    };

    const ActualDay = selectedDay.actualDay;

    //Number values

    const Del = SetPrecision(selectedDay.deliveroo);
    const Uber = SetPrecision(selectedDay.uber);
    const Hours = SetPrecision(selectedDay.hours);
    const Total = SetPrecision(selectedDay.total);
    const Per = SetPrecision(selectedDay.per);

    //Formatted string values

    const sDel = stringVal(Del);
    const sUber = stringVal(Uber);
    const sTotal = stringVal(Total);
    const sPer = stringPer(Per);

    const weekday = new Date(ActualDay).toDateString().substr(0, 3);// 'Mon'
    const day = formatDate(ActualDay);

    const date = weekday + ', ' + day;// 'Mon, 23/09/2018'

    let firstValue = '-', secondValue = '-';
    let shouldDisplay = true;

    if (columnToSort === 'dayNumber') {//default sorting
        if (Hours <= 0 && Total <= 0) {// not worked
            //do nothing
        }
        else if (Hours <= 0 && Total > 0) {//worked but don't know the hours
            firstValue = sTotal;
        }

        else { //all data valid
            firstValue = sTotal;
            secondValue = sPer;
        }
    }

    else if (columnToSort === 'deliveroo') {//sorting by deliveroo
        if (Hours > 0 && Del > 0) { //all data valid
            firstValue = sDel;
            secondValue = sPer;
        }
        else if (Hours <= 0 && Del > 0) { //worked but dunno hours
            firstValue = sDel;
        }
        else shouldDisplay = false;
    }

    else if (columnToSort === 'uber') {//sorting by uber
        if (Hours > 0 && Uber > 0) {//all data valid
            firstValue = sUber;
            secondValue = sPer;
        }
        else if (Hours <= 0 && Uber > 0) {//worked but dunno hours
            firstValue = sUber;
        }
        else shouldDisplay = false;
    }

    else if (columnToSort === 'total') {//sorting by total
        if (Hours > 0 && Total > 0) {//all data valid
            firstValue = sTotal;
            secondValue = sPer;
        }
        else if (Hours < 1 && Total > 0) {//worked but dunno hours
            firstValue = sTotal;
        }
        else shouldDisplay = false;
    }

    else if (columnToSort === 'per') {//sorting by per
        if (Hours > 0 && Per > 0) {//all data valid
            firstValue = sTotal;
            secondValue = sPer;
        }
        else shouldDisplay = false;
    }

    else shouldDisplay = false;

    return !shouldDisplay ? (null) : (
        <View style={myStyles.listItem}>
            {appOffline ? null :
                <View style={{ flex: 1 }}>
                    <TouchableOpacity onPress={handleUpdate} style={{ paddingLeft: 5, paddingRight: 10 }}>
                        <Ionicons name='ios-create' size={20} color={props.buttonColour} />
                    </TouchableOpacity>
                </View>}

            <View style={{ flex: 9, display: 'flex', flexDirection: 'row' }}>

                <View style={{ flex: 3 }}>
                    <Text style={myStyles.listItemValue}>
                        {date}
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


export default ListItem;


