import {Text, TouchableOpacity, StyleSheet, Linking, View, ScrollView} from "react-native";
import {useNavigation} from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";
import {useTranslation} from "react-i18next";
import {useState, useEffect, useRef} from "react";
import backend from "../../utils/Backend";
import FreeFallDetector from "../../utils/FreeFallDetector";

const Index = () => {
	const {t} = useTranslation();

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
		detector.setFreeFallDetectedCallback(() => {
			if (firstFallTriggerRef.current) {
				firstFallTriggerRef.current = false;
				return;
			}
			// alert('The phone is falling!');
			Linking.openURL("tel:" + emergencyPhoneRef.current);
		});
		detector.start();

		return () => {
			detector.stop();
		};
	}, []);

	return (
		<ScrollView style={styles.container}>
			<TouchableOpacity style={[styles.settingsButton, {backgroundColor: "#919191"}]} onPress={() => navigation.navigate("Settings")}>
				<Icon name="cog" size={24} color="white" />
			</TouchableOpacity>
			<Text style={styles.timeText}>{currentTime}</Text>
			<TouchableOpacity style={[styles.button, {backgroundColor: "#06bae3"}]} onPress={() => navigation.navigate("Medicines")}>
				<Icon name="medkit" size={30} color="white" />
				<Text style={styles.buttonText}>{t("Medicines")}</Text>
			</TouchableOpacity>
			<TouchableOpacity style={[styles.button, {backgroundColor: "#06e35e"}]} onPress={() => navigation.navigate("Appointments")}>
				<Icon name="calendar" size={30} color="white" />
				<Text style={styles.buttonText}>{t("Appointments")}</Text>
			</TouchableOpacity>
			<TouchableOpacity style={[styles.button, {backgroundColor: "#a134eb"}]} onPress={handleCallDoctor}>
				<Icon name="phone" size={30} color="white" />
				<Text style={styles.buttonText}>{t("ConsultDoctor")}</Text>
			</TouchableOpacity>
			<TouchableOpacity style={[styles.button, {backgroundColor: "#e30606"}]} onPress={handleEmergencyCall}>
				<Icon name="phone" size={30} color="white" />
				<Text style={styles.buttonText}>{t("Emergency")}</Text>
			</TouchableOpacity>
			<TouchableOpacity style={[styles.button, {backgroundColor: "#f0ad4e"}]} onPress={() => navigation.navigate("Chat")}>
				<Icon name="file-text" size={30} color="white" />
				<Text style={styles.buttonText}>{t("Chat")}</Text>
			</TouchableOpacity>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
    contentContainer: {
		flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
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
		textAlign: "center",
		marginVertical: 30,
		fontSize: 50,
		color: "black",	
		marginBottom:30,
		fontFamily:"monospace",
	},
    settingsButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        width: 45,
        height: 45,
        borderRadius: 23,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 3,
        zIndex: 1,
    },
	row: {
		flexDirection: "row",
		justifyContent: "space-between",
	},
	halfButton: {
		margin: 16,
		borderRadius: 10,
		height: 150,
		width: "40%",
		justifyContent: "center",
		alignItems: "center",
	},
});

export default Index;
