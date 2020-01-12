import React from 'react';
import { Platform } from 'react-native';

import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createAppContainer } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';

import MainList from '../screens/MainList';
import AppHelp from '../screens/AppHelp';
import Colours from '../assets/constants/darkTheme';
import WeeksList from '../screens/WeeksList';
import Dashboard from '../screens/Dashboard';

const TabNavigator = createBottomTabNavigator({
    Dashboard: {
        screen: Dashboard,
        navigationOptions: {
            tabBarLabel: 'Dashboard',
            tabBarIcon: <Ionicons name='ios-clipboard' size={25} color={Colours.accent} />,
            tabBarColor: Colours.backgroundLight,
        }
    },
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
                overflow: 'hidden',
                padding: 10,
                height: Platform.OS === 'ios' ? 55 : 65
            },
            activeTintColor: Colours.success
        }
    });

export default createAppContainer(TabNavigator);