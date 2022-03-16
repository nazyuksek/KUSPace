import { StyleSheet, Text, View, Pressable } from 'react-native';
import * as React from 'react';
import { TouchableOpacity } from 'react-native';
import Button from '../components/Button';
import { SafeAreaView } from 'react-native-safe-area-context';
import TextField from '../components/TextField';
import Login from '../components/Login';


export interface SignUpProps {
}

const SignUpChoices = ({ }: SignUpProps) => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.itemscontainer}>
                <Text style={styles.text}>HALI</Text>
                <Button onPress={() => { }} buttonText="Login as Manager" style={{ marginTop: 40, backgroundColor: 'white' }} ></Button>
                <Button onPress={() => { }} buttonText="Sign Up" style={{ marginTop: 30, backgroundColor: 'white' }} ></Button>
            </View>
        </SafeAreaView >

    );
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flex: 1,
        backgroundColor: 'rgba(135, 211, 124, 1)',
        justifyContent: 'center',
    },
    text: {
        color: 'white',
        fontSize: 48,
        fontWeight: '900'
    },
    itemscontainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    subtext: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 16,
        fontWeight: '500',
        color: 'white',
        marginBottom: 20
    },


});

export default SignUpChoices;
