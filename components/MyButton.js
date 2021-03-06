import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const MyButton = (props) => {
    

    const styles = StyleSheet.create({
        container: {
            marginTop: 25,
            padding: 10,
            borderRadius: 15,
            backgroundColor: props.colour,
            minWidth:70
        },
        text: {
            fontSize: 20,
            color: props.textColour,
            textAlign: 'center',
        }
    
    });

    return (
        <TouchableOpacity style={{ ...styles.container, ...props.style }} onPress={props.onPress}>
            <Text style={styles.text}>{props.text}</Text>
        </TouchableOpacity>
    );
};



export default MyButton;