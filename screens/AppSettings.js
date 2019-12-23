import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Colours from '../constants/colours';
import Container from '../components/Container';
import LargeText from '../components/LargeText';

const AppSettings = () => {
    return (
        <Container dark={true}>
            <LargeText>App Settings Screen</LargeText>
        </Container>
    );

};

const styles = StyleSheet.create({

});

export default AppSettings;