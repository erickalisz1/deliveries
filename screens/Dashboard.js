import React, { useState } from 'react';
import { View, Text, StyleSheet, Picker, Platform } from 'react-native';
import Container from '../components/Container';
import Colours from '../assets/constants/darkTheme';
import Card from '../components/Card';
import { weekDays } from '../assets/helper/helper';

const Dashboard = () => {
    //list.map value.title, average, max

    

    return (
        <Container dark={true}>
            <Card title='Uber' average={87.35} max={283.34} />
            <Card title='Deliveroo' average={158.09} max={521.04} />
            <Card title='Hours' average={6.03} max={13} />
            <Card title='Total' average={220.7} max={521.04} />
            <Card title='Per Hour' average={39.05} max={64.89} />
        </Container>
    );
};

const styles = StyleSheet.create({
    
});

export default Dashboard;