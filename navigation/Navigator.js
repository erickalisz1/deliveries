import React from 'react';

import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createAppContainer } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';

import MainList from '../screens/MainList';
import AppHelp from '../screens/AppHelp';
import Colours from '../assets/constants/darkTheme';
import WeeksList from '../screens/WeeksList';

const TabNavigator = createBottomTabNavigator({
    Main: {
        screen: MainList,
        navigationOptions: {
            tabBarLabel: 'Main List',
            tabBarIcon: <Ionicons name='ios-list' size={25} color={Colours.accent} />,
            tabBarColor: Colours.backgroundLight,
        }
    },
    Weeks: {
        screen: WeeksList,
        navigationOptions: {
            tabBarLabel: 'Weeks List',
            tabBarIcon: <Ionicons name='ios-calendar' size={25} color={Colours.accent} />,
            tabBarColor: Colours.backgroundLight,
        },
    },
    Help: {
        screen: AppHelp,
        navigationOptions: {
            tabBarLabel: 'Help',
            tabBarIcon: <Ionicons name='ios-help-circle-outline' size={25} color={Colours.accent} />,
            tabBarColor: Colours.backgroundLight
        }
    },
},
    {
        tabBarOptions: {
            style: {            
                backgroundColor: Colours.backgroundLight,
                overflow: 'hidden'
            },
            activeTintColor: Colours.success
        }
    });

export default createAppContainer(TabNavigator);