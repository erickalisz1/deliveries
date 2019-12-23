import React from 'react';

import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createAppContainer } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';


import MainList from '../screens/MainList';
import AppHelp from '../screens/AppHelp';
import AppSettings from '../screens/AppSettings';
import Colours from '../constants/colours';

const TabNavigator = createBottomTabNavigator({
    Main: {
        screen: MainList,
        navigationOptions: {
            tabBarLabel: 'Main List',
            tabBarIcon: <Ionicons name='ios-list' size={25} color={Colours.accent} />,
            tabBarColor: Colours.backgroundLight,
        }
    },
    Help: {
        screen: AppHelp,
        navigationOptions: {
            tabBarLabel: 'Help',
            tabBarIcon: <Ionicons name='ios-help-circle-outline' size={25} color={Colours.accent} />,
            tabBarColor: Colours.backgroundLight
        }
    },
    Settings: {
        screen: AppSettings,
        navigationOptions: {
            tabBarLabel: 'Settings',
            tabBarIcon: <Ionicons name='ios-settings' size={25} color={Colours.accent} />,
            tabBarColor: Colours.cancel
        }
    },
},
    {
        tabBarOptions: {
            style: {            
                backgroundColor: Colours.backgroundLight,
                overflow: 'hidden'
            },
            activeTintColor: Colours.selected
        }
    });

export default createAppContainer(TabNavigator);