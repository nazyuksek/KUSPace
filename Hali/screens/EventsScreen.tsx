import { DataStore } from 'aws-amplify';
import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    FlatList,
    ScrollView,
    StyleSheet,
    TouchableWithoutFeedback,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { MatchAnnounce } from '../src/models';
import { readMatchAnnounce } from '../store';
export interface EventsScreenProps {
    navigation: any;
    route: any;
}

const EventsScreen = ({ navigation, route }: EventsScreenProps) => {
    const username = route?.params.username;
    const [data, setData] = useState<MatchAnnounce[] | undefined>();


    useEffect(() => {
        async function getEvents() {
            const result = await readMatchAnnounce();
            setData(result);
        }
        getEvents();
    }, [data]);
    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>EVENTS</Text>
            </View>
            <ScrollView contentContainerStyle={styles.scroll}>
                {data?.map((x, i) => (
                    <TouchableWithoutFeedback
                        key={i}
                        onPress={() => {
                            navigation.navigate('Event Details', { x, username, data, i });
                        }}
                    >
                        <View style={styles.eventCard}>
                            <View style={styles.left}>
                                <View style={styles.round} />
                                <Text style={styles.text}>{x.announcement_name}</Text>
                            </View>
                            <View style={styles.right}>
                                <MaterialCommunityIcons
                                    name={'information-outline'}
                                    style={styles.info}
                                    size={30}
                                />
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    eventCard: {
        width: '90%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
        height: '12%',
        backgroundColor: 'lightgreen',
        marginTop: 10,
        borderRadius: 10,
    },
    scroll: {
        height: '100%',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
    },
    text: {
        color: 'white',
        textAlign: 'left',
        width: 100,
        height: 30
    },
    round: {
        width: 20,
        height: 20,
        borderRadius: 30,
        backgroundColor: 'white',
        marginLeft: '10%',
    },
    left: {
        width: '70%',
        height: '100%',
        alignSelf: 'flex-start',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10%',
    },
    right: {
        height: '100%',
        width: '30%',
        alignSelf: 'flex-end',
        display: 'flex',
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
    },
    info: {
        color: 'darkgreen',
    },
    title: {
        fontWeight: 'bold',
        fontSize: 30,
    },
    container: {
        paddingTop: 0,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    titleContainer: {
        width: '100%',
        height: '10%',
        alignItems: 'flex-start',
        justifyContent: 'center',
        display: 'flex',
        padding: 10,
    },
});

export default EventsScreen;