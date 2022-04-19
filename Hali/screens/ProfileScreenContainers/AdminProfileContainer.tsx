import React from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native'
import ProfileImageUpload from '../../components/ProfileImageUpload';
import { MonoText } from '../../components/StyledText';


const AdminProfileContainer = () => {
    return (
        <ScrollView style={styles.container}>
            <View style={styles.photoUpload}>
                <ProfileImageUpload />
            </View>
            <View style={{ flexDirection: "row" }}>
                <View style={styles.keyRow}>
                    <MonoText style={styles.value}>Name</MonoText>
                    <MonoText style={styles.value}>Surname</MonoText>
                    <MonoText style={styles.value}>Telephone No</MonoText>
                    <MonoText style={styles.value}>Pitch</MonoText>
                    <MonoText style={styles.value}>Pitch Address</MonoText>
                </View>
                <View style={styles.valueRow}>
                    <MonoText style={styles.value}>nazyuksek</MonoText>
                    <MonoText style={styles.value}>Naz</MonoText>
                    <MonoText style={styles.value}>Yuksek</MonoText>
                    <MonoText style={styles.value}>01.01.2000</MonoText>
                    <MonoText style={styles.value}>Expert</MonoText>
                </View>
            </View>
        </ScrollView >
    )
}

export default AdminProfileContainer

const styles = StyleSheet.create({
    photoUpload: {
        paddingVertical: 24,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    container: {
        flexDirection: 'column',
        backgroundColor: "rgba(135, 211, 124, 1)",
    },
    keyRow: {
        flexDirection: 'column',
        paddingHorizontal: 36,
    },
    valueRow: {
        flexDirection: 'column',
        paddingHorizontal: 24,
    },
    value: {
        paddingVertical: 24,
    }
})