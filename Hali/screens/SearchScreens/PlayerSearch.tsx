import * as React from 'react';
import { StyleSheet, Image, View } from 'react-native';
import { Searchbar } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SearchBar } from 'react-native-elements';
import { Text } from '../../components/Themed';


export interface PlayerSearchProps {
    navigation: any;
}

const PlayerSearch = ({ navigation }: PlayerSearchProps) => {
    const [searchQuery, setSearchQuery] = React.useState('');
    const updateSearch = (search: string) => {
        setSearchQuery(search);
    };
    return (
        <SafeAreaView style={styles.container}>
            <Image
                style={styles.backgroundimage}
                source={require("../../assets/images/football.jpeg")}
            />
            <View style={styles.itemscontainer}>
                <SearchBar
                    placeholder="Search a player..."
                    onChangeText={updateSearch}
                    value={searchQuery}
                    platform={"ios" || "android"}
                    inputContainerStyle={styles.searchcontainer}
                    containerStyle={styles.searchcontainerbackground}
                />
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
    subtext: {
        textAlign: "center",
        marginTop: 20,
        fontSize: 16,
        fontWeight: "500",
        color: "white",
        marginBottom: 20,
    },
    searchcontainer: {
        backgroundColor: "rgba(135, 211, 124, 1)"
    },
    searchcontainerbackground: {
        backgroundColor: "rgba(135, 211, 124, 1)"
    }
});

export default PlayerSearch;