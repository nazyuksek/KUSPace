import { DataStore } from "aws-amplify";
import { Pitch2 } from "../src/models"
import { Reservation } from "../src/models";
import { Player } from "../src/models";
import { MatchAnnounce } from "../src/models";


export const getNearPitchesByDistance = async (
    dist: number,
    user_city: string
) => {
    var pitch_dists = new Map<string, number>();
    var returned_pitch_dists = new Map<[string, string], number>();
    var dist1 = getDistanceByCity(user_city);
    var pitches = await readPitches();
    var dist_threshold = 500;

    for (var p of pitches!) {
        var dist2 = getDistanceByCity(p.district!); // prints values: 10, 20, 30, 40
        console.log(
            "Is p.district as a key exists: ",
            !pitch_dists.has(p.district!)
        );
        if (!pitch_dists.has(p.district!)) {
            console.log("No district exists, go!");
            var diff = Math.abs(dist1 - dist2);
            if (diff < dist_threshold) {
                let pitch_tuple: [string, string] = [p.pitch_name, p.district!];
                pitch_dists.set(p.district!, dist2);
                returned_pitch_dists.set(pitch_tuple, diff);
            } else {
                console.log("Duplicate key!");
            }
        }
    }

    for (let value of returned_pitch_dists.keys()) {
        console.log("Map Keys = " + value);
    }

    return returned_pitch_dists;
};

export const readPitches = async (): Promise<Pitch2[] | undefined> => {
    try {
        const posts = await DataStore.query(Pitch2);
        return posts;
    } catch (error) {
        console.log("Error retrieving pitches", error);
    }
};


const savePlayerDataStore = async () => {
    try {
        await DataStore.save(
            new Player({
                username: "dummy2",
                skill: 2,
                district: "Beylikduzu",
                birthdate: "28.07.1998",
                reservations: ["B1 Stadyumu", "B2 Stadyumu"],
                email: "dummy2@gmail.com",
                pitches_played: ["B1 Stadyumu", "B2 Stadyumu"],
                realname: "Mehmet Yilmaz",
            })
        );
        return console.log("Player2 saved successfully!");
    } catch (error) {
        return console.log("Error saving", error);
    }
};

const readData = async () => {
    try {
        const posts = await DataStore.query(Pitch2);
        console.log("Post: ", posts[0].district);
    } catch (error) {
        console.log("Error retrieving posts", error);
    }
};

export const readDistrictQuery = async (district: string) => {
    try {
        const sariyer_players = await DataStore.query(Player, (p) =>
            p.district("eq", district)
        );
        //const sariyer_players = await DataStore.query(Player);
        return sariyer_players;
    } catch (error) {
        console.log(district);
        console.log("Error retrieving player", error);
    }
};

export const readPitchDistrictQuery = async (district: string) => {
    try {
        const pitches = await DataStore.query(Pitch2, (p) =>
            p.district("eq", district)
        );
        return pitches;
    } catch (error) {
        console.log(district);
        console.log("Error retrieving player", error);
    }
};

export const readPitchDistanceQuery = async (distance: number) => {
    try {
        const pitches = await readPitches();
        for (var p of pitches!) {
            if (
                p.district == "Beylikduzu" ||
                p.district == "Ataşehir" ||
                p.district == "Arnavutköy" ||
                p.district == "Bağcılar" ||
                p.district == "Bakirköy" ||
                p.district == "Beşiktaş"
            ) {
                var dist2: number = getDistanceByCity(p.district);
                console.log("District: ", p.district);
                console.log("Dist2: ", dist2);
                // let dist2  = 100;
                if (dist2 < distance) {
                    console.log("ALOHA! city by distance is: ", p.pitch_name);
                } else {
                    console.log("NEIN");
                }
            }
        }
        // filter the pitches equal to the distance whose distance is loweerr than 500
        return pitches;
    } catch (error) {
        console.log("Error retrieving distance", error);
    }
};

export const readUsernameQuery = async (
    username: string
): Promise<Player[] | undefined> => {
    try {
        const sariyer_players = await DataStore.query(Player, (p) =>
            p.username("eq", username)
        );
        return sariyer_players;
        //const sariyer_players = await DataStore.query(Player);
        //console.log(" players:", JSON.stringify(sariyer_players, null, 2));
    } catch (error) {
        console.log("Error retrieving player", error);
    }
};

// predicate can be 'gt', 'eq', lt : >, <, =
const readPlayerSkillQuery = async (pred: any, skillno: number) => {
    try {
        console.log("pred is:" + pred);
        const players = await DataStore.query(Player, (p) =>
            p.skill(pred, skillno)
        );
        console.log("Skillno: " + skillno);
        console.log("players:", JSON.stringify(players, null, 2));
    } catch (error) {
        console.log("Error retrieving player skillno", error);
    }
};

export const saveReservation = async (
    pitch_id: string,
    reserver_username: string,
    reservation_date: string
) => {
    try {
        await DataStore.save(
            new Reservation({
                pitch_id: pitch_id,
                reserver_username: reserver_username,
                reservation_date: reservation_date,
            })
        );

        return console.log("Reservation saved successfully!");
    } catch (error) {
        return console.log("Error saving", error);
    }
};
export const readReservation = async () => {
    try {
        const posts = await DataStore.query(Reservation);
        console.log(
            "Posts retrieved successfully!",
            JSON.stringify(posts, null, 2)
        );
    } catch (error) {
        console.log("Error retrieving posts", error);
    }
};

export const saveMatchAnnounce = async (hour: string, pitch_name: string, number_of_attendees: number, total_capacity: number, attendees_list: string[], announcement_name: string) => {
    try {
        await DataStore.save(
            new MatchAnnounce({
                hour: hour,
                pitch_name: pitch_name,
                number_of_attendees: number_of_attendees,
                total_capacity: total_capacity,
                attendees_list: attendees_list,
                announcement_name: announcement_name,
            })
        );
        return console.log("Match Announce saved successfully!");
    } catch (error) {
        return console.log("Error saving Match Announce", error);
    }
};

export const deleteEvent = async (announcement_name: string) => {
    try {
        DataStore.delete(MatchAnnounce, (p) => p.announcement_name("eq", announcement_name));
    } catch (error) {
        return console.log("Error saving Match Announce", error);
    }
}

export const readMatchAnnounce = async () => {
    try {
        const match_announce = await DataStore.query(MatchAnnounce);
        return match_announce;
        console.log(
            "MatchAnnounce retrieved successfully!",
            JSON.stringify(match_announce, null, 2)
        );
    } catch (error) {
        console.log("Error retrieving MatchAnnounce", error);
    }
};

// This method pushes the current playername to the Match announce
// Note updating attendees_list is not complete
export const addPlayerToMatchAnnounce = async (
    announcement_name: string,
    player_name: string
) => {
    try {
        const original = await DataStore.query(MatchAnnounce, (m) =>
            m.announcement_name("eq", announcement_name)
        );

        // fix adding player to attendees_list
        let updated_list = original[0]?.attendees_list!;
        updated_list = updated_list.concat(player_name);
        let attendee_count: number;
        if (original[0]?.number_of_attendees) {
            attendee_count = original[0]?.number_of_attendees + 1;
        }
        await DataStore.save(
            MatchAnnounce.copyOf(original[0], (updated) => {
                updated.number_of_attendees = attendee_count;
            })
        );
        await DataStore.save(
            MatchAnnounce.copyOf(original[0], (updated) => {
                updated.attendees_list = updated_list;
            })
        );
        console.log("MatchAnnounce updated successfully!");
        // update chosen announcement
    } catch (error) {
        console.log("Error updating MatchAnnounce", error);
    }
};


export const deletePlayers = async (username: string) => {
    try {
        // realnames: "Mehmet Yilmaz", "Ahmet Yilmaz", "Yilmaz Yilmaz"
        // usernames: dummy1, dummy2, dummy3
        await DataStore.delete(Player, (p) => p.username("eq", username));


        console.log("Players deleted successfully!");
    } catch (error) {
        console.log("Error deleting players ", error);
    }
};

export const readDataPlayer = async () => {
    try {
        const posts = await DataStore.query(Player);
        return posts;
    } catch (error) {
        console.log("Error retrieving players", error);
    }
};

export const savePitchAdmin = async (
    pitch_name: string,
    pitchowner_name: string,
    hourly_price: number,
    opening_hour: string,
    closing_hour: string,
    username: string,
    city: string,
    district: string,
    province: string,
    address: string
) => {
    try {
        await DataStore.save(
            new Pitch2({
                pitch_name: pitch_name,
                pitchowner_name: pitchowner_name,
                hourly_price: hourly_price,
                opening_hour: opening_hour,
                closing_hour: closing_hour,
                username: username,
                city: city,
                district: district,
                province: province,
                address: address,
            })
        );
        return console.log("Pitch saved successfully!");
    } catch (error) {
        return console.log("Error saving", error);
    }
};

export function getDistanceByCity(city: string): number {
    var dist_list = new Map<string, number>();

    dist_list.set("Beylikduzu", 450);
    dist_list.set("Beşiktaş", 600);
    dist_list.set("Ataşehir", 200);
    dist_list.set("Bakırköy", 100);
    dist_list.set("Arnavutköy", 50);
    dist_list.set("Bağcılar", 600);
    return dist_list.get(city)!;
}
