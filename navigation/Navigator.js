import React from 'react';
import { Platform, Dimensions } from 'react-native';

import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';

import MainList from '../screens/MainList';
import AppHelp from '../screens/AppHelp';
import Colours from '../assets/constants/darkTheme';
import WeeksList from '../screens/WeeksList';
import Dashboard from '../screens/Dashboard';
import Login from '../screens/Login';

// let UserName = useSelector(state => state.user.username);

const defaultStackNavOptions =
{
    headerStyle: {
        backgroundColor: Colours.background,
    },
    headerTintColor: Colours.primaryText
};



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
                height: Platform.OS === 'ios' ? (Dimensions.get('window').height < 700 ? 70 : 55) : 65,
            },
            activeTintColor: Colours.selected
        }
    });

const StackNavigator = createStackNavigator({
    Login: {
        screen: Login,
        navigationOptions:{
            headerTitle: 'Login'
        }
    },
    Tabs:{ 
        screen: TabNavigator,
        navigationOptions:{
            headerTitle: 'Your Deliveries'
        }
    },
},
    {
        defaultNavigationOptions: defaultStackNavOptions
    }

);
export default createAppContainer(StackNavigator);