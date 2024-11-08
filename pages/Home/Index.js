import {Text, TouchableOpacity, StyleSheet, Linking, View, ScrollView} from "react-native";
import {useNavigation} from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";
import {useTranslation} from "react-i18next";
import {useState, useEffect, useRef} from "react";
import backend from "../../utils/Backend";
import FreeFallDetector from "../../utils/FreeFallDetector";
import { useUser } from "../../utils/UserContext";
import * as Location from 'expo-location';

const Index = () => {
	const {t} = useTranslation();
	const {userRole, setUserRole} = useUser();

	const navigation = useNavigation();
	const firstFallTriggerRef = useRef(true);
	const [currentTime, setCurrentTime] = useState(
		new Date()
			.toLocaleTimeString('en-US', {
				hour: '2-digit',
				minute: '2-digit',
				second: '2-digit',
				hour12: false
			}
		)
	);
	const [doctorPhone, setDoctorPhone] = useState("");
	const [emergencyPhone, setEmergencyPhone] = useState("");
	const emergencyPhoneRef = useRef("");

	useEffect(() => {
		const payload = {
			"senior_id": 1
		};
		backend.post("/api/emergency_phone/", payload)
		.then((response) => {
			setEmergencyPhone(response.data.phone);
			emergencyPhoneRef.current = response.data.phone;
		});
		backend.post("/api/doctor_phone/", payload)
		.then((response) => {
			setDoctorPhone(response.data.phone);
		});
		const timer = setInterval(() => {
			setCurrentTime(
				new Date()
					.toLocaleTimeString('en-US', {
						hour: '2-digit',
						minute: '2-digit',
						second: '2-digit',
						hour12: false
					}
				)
			);
		}, 1000);
		return () => clearInterval(timer);
	}, []);

	const handleCallDoctor = () => {
		Linking.openURL("tel:" + doctorPhone);
	}

	const handleEmergencyCall = () => {
		Linking.openURL("tel:" + emergencyPhone);
	}

	useEffect(() => {
		const detector = new FreeFallDetector();
		detector.setFreeFallDetectedCallback(async () => {
			if (firstFallTriggerRef.current) {
				firstFallTriggerRef.current = false;
				return;
			}
			// alert('The phone is falling!');
			const location = await Location.getCurrentPositionAsync({});
			backend.post("/api/senior_fall_detection/", {
				senior_id: 1,
				location_lat: location.coords.latitude,
				location_lon: location.coords.longitude
			});
			Linking.openURL("tel:" + emergencyPhoneRef.current);
		});
		detector.start();

		return () => {
			detector.stop();
		};
	}, []);

	return (
		<ScrollView style={styles.container}>
			<View style={styles.topContainer}>
				<Text style={styles.timeText}>{currentTime}</Text>
				<View style={styles.contentContainer}>
					<TouchableOpacity style={[styles.settingsButton, {backgroundColor: "#919191"}]} onPress={() => navigation.navigate("Settings")}>
						<Icon name="cog" size={24} color="white" />
					</TouchableOpacity>
					<TouchableOpacity style={[styles.profileButton, {backgroundColor: "#919191"}]} onPress={() => navigation.navigate("Profile")}>
						<Icon name="user" size={24} color="white" />
					</TouchableOpacity>
				</View>
			</View>
			<TouchableOpacity style={[styles.button, {backgroundColor: "#06bae3"}]} onPress={() => navigation.navigate("Medicines")}>
				<Icon name="medkit" size={30} color="white" />
				<Text style={styles.buttonText}>{t("Medicines")}</Text>
			</TouchableOpacity>
			<TouchableOpacity style={[styles.button, {backgroundColor: "#06e35e"}]} onPress={() => navigation.navigate("Appointments")}>
				<Icon name="calendar" size={30} color="white" />
				<Text style={styles.buttonText}>{t("Appointments")}</Text>
			</TouchableOpacity>
			{userRole !== "caregiver" &&
				<TouchableOpacity style={[styles.button, {backgroundColor: "#a134eb"}]} onPress={handleCallDoctor}>
					<Icon name="phone" size={30} color="white" />
					<Text style={styles.buttonText}>{t("ConsultDoctor")}</Text>
				</TouchableOpacity>
			}
			{userRole !== "caregiver" &&
				<TouchableOpacity style={[styles.button, {backgroundColor: "#e30606"}]} onPress={handleEmergencyCall}>
					<Icon name="phone" size={30} color="white" />
					<Text style={styles.buttonText}>{t("Emergency")}</Text>
				</TouchableOpacity>
			}
			<TouchableOpacity style={[styles.button, {backgroundColor: "#f0ad4e"}]} onPress={() => navigation.navigate("Chat")}>
				<Icon name="file-text" size={30} color="white" />
				<Text style={styles.buttonText}>{userRole === "caregiver" ? t("statusReport") : t("Chat")}</Text>
			</TouchableOpacity>
			<TouchableOpacity style={[styles.button, {backgroundColor: "#f542da"}]} onPress={() => navigation.navigate("LocationTracking")}>
				<Icon name="map-marker" size={30} color="white" />
				<Text style={styles.buttonText}>{t("LocationTracking")}</Text>
			</TouchableOpacity>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	topContainer: {
		flexDirection: "row",
		justifyContent: "space-evenly",
	},
	container: {
		flex: 1,
	},
    contentContainer: {

    },
	button: {
		margin: 16,
		borderRadius: 10,
		height: 150,
		justifyContent: "center",
		alignItems: "center",
	},
	buttonText: {
		color: "white",
		fontSize: 26,
		marginTop: 10,
	},
	timeText: {
		fontSize: 40,
		marginVertical: 30,
		fontSize: 50,
		color: "black",	
		marginBottom:30,
		fontFamily:"monospace",
		marginLeft: 20,
		fontWeight: "bold",
	},
    settingsButton: {
        width: 45,
        height: 45,
        borderRadius: 23,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 3,
		marginTop: 30,
	},
	profileButton: {
		width: 45,
		height: 45,
		borderRadius: 23,
		justifyContent: 'center',
		alignItems: 'center',
		elevation: 3,
		marginTop:10,
	},
});

export default Index;
