import React, { useState } from 'react';
import {
    View,
    Text,
    FlatList,
    ScrollView,
    StyleSheet,
    SafeAreaView,
    Dimensions,
    TouchableWithoutFeedback,
    Pressable,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import IonIcon from 'react-native-vector-icons/Ionicons';
import { Modal } from 'react-native';
import SimpleModal from '../components/SimpleModal';
import { addPlayerToMatchAnnounce } from '../store';
const width = Dimensions.get('screen').width;

export interface EventDetailsProps {
    navigation: any;
    route: any;
}


const EventDetails = ({ navigation, route }: EventDetailsProps) => {
    const pitch_name = route.params.x.pitch_name;
    const time = route.params.x.time;
    const place = route.params.x.place;
    const data = route.params.data[route.params.i];

    const [isModalOpen, setModalOpen] = useState(false);

    async function handleConfirm() {
        try {
            const result = await addPlayerToMatchAnnounce(route.params.x.name, route.params.username);
            setModalOpen(false);
        } catch (e: any) {
            setModalOpen(false);
            alert("Player couldn't be added.")
        }
    }
    function handleCancel() {
        setModalOpen(false);
    }

    const handleAddPlayer = async () => {
        console.log('clicked')
        setModalOpen(true);
    }


    return (
        <View style={styles.container}>
            <View style={styles.top}>
                <Text style={styles.title}>{data?.announcement_name}</Text>
            </View>
            <View style={styles.middle}>
                <View style={styles.row}>
                    <View style={{ padding: 8, justifyContent: 'center', alignItems: 'center', width: 60, height: 60 }}>
                        <MaterialCommunityIcons
                            name={'soccer-field'}
                            size={40}
                            style={styles.field}
                        />
                    </View>
                    <Text style={styles.title}>{data?.pitch_name}</Text>
                </View>
                <View style={styles.row}>
                    <View style={{ padding: 8, justifyContent: 'center', alignItems: 'center', width: 60, height: 60 }}>
                        <MaterialIcon name={'format-list-numbered-rtl'} size={40} style={styles.place} />
                    </View>
                    <Text style={styles.title}>{data?.number_of_attendees}</Text>
                </View>
                <View style={styles.row}>
                    <View style={{ padding: 8, justifyContent: 'center', alignItems: 'center', width: 60, height: 60 }}>
                        <MaterialCommunityIcons
                            name={'clock-outline'}
                            size={40}
                            style={styles.clock}
                        />
                    </View>

                    <Text style={styles.title}>{data?.hour}</Text>
                </View>
            </View>
            <Pressable onPress={handleAddPlayer} style={styles.bottom}>
                <View style={styles.buttonContainer}>
                    <TouchableWithoutFeedback style={styles.button} >
                        <>
                            <Text style={styles.title}>Join</Text>
                            <IonIcon name={'add-circle-outline'} size={30} />
                        </>
                    </TouchableWithoutFeedback>
                </View>
            </Pressable>
            <View>
                <Modal
                    style={{}}
                    visible={isModalOpen}
                    animationType={"fade"}
                    transparent={true}
                    onRequestClose={() => {
                        setModalOpen(false);
                    }}
                >
                    <SimpleModal
                        handleCancel={handleCancel}
                        handleConfirm={handleConfirm}
                        Headertext={"Add Player"}
                        text={'Are you sure you want to add yourself to this event?'}
                    ></SimpleModal>
                </Modal>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        backgroundColor: 'lightgreen',
        paddingVertical: '10%',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
    },
    top: {
        width: '90%',
        height: '15%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        alignContent: 'center',
        padding: 20,
        borderBottomWidth: 3,
        borderBottomColor: 'white',
    },
    middle: {
        width: '90%',
        height: '45%',
        flexDirection: 'column',
        display: 'flex',
        justifyContent: 'space-evenly',
        padding: '4%',
        borderBottomWidth: 3,
        borderBottomColor: 'white',
    },
    bottom: {
        width: '90%',
        height: '45%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        padding: '4%',
    },
    title: {
        fontWeight: 'bold',
        fontSize: 20,
    },
    field: {
        transform: [{ rotate: '90deg' }],
        color: 'white',
        paddingRight: '2%',
    },
    place: {
        color: 'white',
        paddingRight: '2%',
    },
    clock: {
        color: 'white',
        paddingRight: '2%',
    },
    row: {
        backgroundColor: 'green',
        borderRadius: 30,
        opacity: 0.7,
        display: 'flex',
        flexDirection: 'row',
        width: '90%',
        height: '20%',
        alignContent: 'center',
        alignItems: 'center',
    },
    button: {
        display: 'flex',
        flexDirection: 'row',
    },
    buttonContainer: {
        marginTop: '50%',
        display: 'flex',
        borderRadius: 30,
        opacity: 0.7,
        flexDirection: 'row',
        width: '90%',
        height: '20%',
        backgroundColor: 'green',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
});

export default EventDetails;