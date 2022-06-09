import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as React from 'react';
import { StyleSheet, Image, View } from 'react-native';
import { Text } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { addPlayerToMatchAnnounce, readMatchAnnounce, saveMatchAnnounce } from '../App';
import { MatchAnnounce } from '../src/models';
import Button from '../components/Button';


export interface EventsScreenProps {
    navigation: any;
}

const EventsScreen = ({ navigation }: EventsScreenProps) => {
    const [events, setEvents] = React.useState<MatchAnnounce[] | undefined>();
    const [step, setStep] = React.useState<Number>(1);
    const [hour, setHour] = React.useState<string>('');
    const [pitch_name, setPitchName] = React.useState<string>('');
    const [number_of_attendees, hetNumberOfAttendees] = React.useState(0);
    const [total_capacity, setTotalCapacity] = React.useState(0);
    const [attendees_list, setAttendeesList] = React.useState([]);
    const [announcement_name, setAnnouncementName] = React.useState<string>('');
    React.useEffect(() => {
        const fetchData = async () => {
            const data = await readMatchAnnounce();
            setEvents(data);
        }
        fetchData();
    }, [events]);

    const handlePlusIconClick = async (
        announcement_name: string,
        player_name: string
    ) => {
        const res = await addPlayerToMatchAnnounce(announcement_name, player_name);
    }
    const handleAddEventButtonClick = async () => {
        const result = await saveMatchAnnounce(hour, pitch_name, number_of_attendees, total_capacity, attendees_list, announcement_name);
        setStep(2);
    }
    return (
        <SafeAreaView style={styles.container}>
            <Image
                style={styles.backgroundimage}
                source={require("../assets/images/football.jpeg")}
            />
            <View style={styles.eventsView}>
                {events?.map((el, i) => {
                    return (
                        <View key={i} style={styles.eventContainer}>
                            <Text style={styles.resultText} key={i}>{el.announcement_name}</Text>
                            <TouchableOpacity onPress={() => handlePlusIconClick(el.announcement_name, 'eldksşfjd')}>
                                <Text style={styles.plusIcon}>+</Text>
                            </TouchableOpacity>
                        </View>
                    )
                })}
            </View>
            <View style={styles.buttonContainer}>
                <Button buttonText='Add a New Event' onPress={handleAddEventButtonClick} style={styles.addEventButton}></Button>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    backgroundimage: {
        flex: 1,
        position: "absolute",
        display: "flex",
        alignSelf: "center",
        width: "100%",
        height: "120%",
        opacity: 0.05,
    },
    text: {
        color: "white",
        fontSize: 48,
        fontWeight: "900",
    },
    container: {
        display: "flex",
        flex: 1,
        backgroundColor: "rgba(135, 211, 124, 1)",
        justifyContent: "flex-start",
    },
    itemscontainer: {
        display: "flex",
        alignItems: "center",
    },
    players: {

    },
    resultText: {
        color: "#eeeeee",
        fontWeight: "600",
        marginTop: 8,
        alignSelf: "flex-start",
        fontSize: 20,
    },
    eventsView: {
        padding: "5%"
    },
    eventContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 8

    },
    plusIcon: {
        color: "#eeeeee",
        fontWeight: "600",
        fontSize: 24
    },
    buttonContainer: {
        display: "flex",
        alignContent: "center",
        padding: "5%"
    },
    addEventButton: {
        backgroundColor: "#ffffff",

    }
});

export default EventsScreen;