import React, { useState } from 'react';
import firebase from 'firebase';
import { Alert, View, TextInput } from 'react-native';
import { useDispatch } from 'react-redux';
import { fireRef } from '../assets/helper/helper';
import Container from '../components/Container';
import DismissKeyboard from '../components/DismissKeyboard';
import { myStyles } from '../assets/helper/Styles';
import MyButton from '../components/MyButton';
import { ROUTES } from '../assets/constants/strings';

const Register = (props) => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const dispatch = useDispatch();//to update store

    const usernameInput = (input) => {
        setUsername(input);
    };

    const passwordInput = (input) => {
        setPassword(input);
    };

    const firstNameInput = (input) => {
        setFirstName(input);
    };

    const lastNameInput = (input) => {
        setLastName(input);
    };

    const createUser = (email, firstName, lastName, password) => {
        if (email.length > 0 &&
            firstName.length > 0 &&
            lastName.length > 0 &&
            password.length > 0) {

            firebase.auth().createUserWithEmailAndPassword(email, password).then(userInfo => {

                firebase.database().ref(fireRef + userInfo.user.uid).set(
                    {
                        firstName: firstName,
                        lastName: lastName
                    }
                ).then(() => {
                    console.log('Added new user to database', userInfo.user.uid);

                }).catch((error) => {
                    console.log(error);
                    Alert.alert('Error', error.message);
                });
                //success
                Alert.alert('Welcome to your new Deliveries Manager');
                props.navigation.navigate(ROUTES.LOGIN, { email: email, password: password });
                //error adding
            }).catch(error => Alert.alert(error.message));
        }
        //no data
        else Alert.alert('Provide data on all fields');
    };
    return (
        <Container>
            <DismissKeyboard>
                <View style={{ flex: 1, marginTop: 30 }}>
                    <TextInput
                        placeholder={'Email'}
                        placeholderTextColor={Colours.placeholder}
                        style={myStyles.login}
                        onChangeText={usernameInput}
                        value={username}
                        keyboardType='email-address'
                    />
                    <TextInput
                        placeholder={'First Name'}
                        placeholderTextColor={Colours.placeholder}
                        style={myStyles.login}
                        onChangeText={firstNameInput}
                        value={firstName}
                    />
                    <TextInput
                        placeholder={'Last Name'}
                        placeholderTextColor={Colours.placeholder}
                        style={myStyles.login}
                        onChangeText={lastNameInput}
                        value={lastName}
                    />
                    <TextInput
                        placeholder={'Password'}
                        placeholderTextColor={Colours.placeholder}
                        style={myStyles.login}
                        onChangeText={passwordInput}
                        value={password}
                        keyboardType='default'
                        secureTextEntry={true}
                    />
                    <MyButton
                        onPress={() => createUser(username, firstName, lastName, password)}
                        text='Register'
                        colour={Colours.success}
                        textColour={Colours.black} />
                </View>
            </DismissKeyboard>
        </Container>
    );
};

export default Register;