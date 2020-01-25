import React from 'react';
import { useSelector } from 'react-redux';

import Container from '../components/Container';
import Card from '../components/Card';
import LargeText from '../components/LargeText';

import { SetPrecision, filters } from '../assets/helper/helper';
import { DAYS } from '../assets/constants/strings';



const Dashboard = () => {

    let list = useSelector(state => state.user.userDaysList);
    let name = useSelector(state => state.user.username);

    let Cards;
    //the columns I want to display
    let columns = filters.filter(item => item.key !== DAYS);

    const displayCards = (loadedList) => {

        //creating list
        let listOfCards = [];
        columns.forEach(column => {
            let cardList = loadedList.filter(item => item[column.value] > 0);

            let min = Number.POSITIVE_INFINITY, max = Number.NEGATIVE_INFINITY, temp;

            for (let i = cardList.length - 1; i >= 0; i--) {
                temp = cardList[i][column.value];
                if (temp < min) min = temp;
                if (temp > max) max = temp;
            }
            let avg = (SetPrecision(cardList.reduce((total, next) => total + next[column.value], 0) / cardList.length));


            listOfCards.push({
                column: column.key,
                avg: avg > 0 && avg < 100000 ? avg : 0,
                min: min > 0 && min < 100000 ? min : 0,
                max: max > 0 && max < 100000 ? max : 0,
                key: column.value,
                colour: column.colour,
                type: column.type
            });
        });

        Cards = listOfCards.map(row => {
            return <Card
                title={row.column}
                average={row.avg}
                min={row.min}
                max={SetPrecision(row.max)}
                key={row.key}
                colour={row.colour}
                type={row.type} />
        });

    }

    displayCards(list);

    return (
        <Container dark={true}>
            <LargeText style={{ marginVertical: 5 }}>{name}'s Summary</LargeText>
            {Cards}
        </Container> 
    );
};
export default Dashboard;