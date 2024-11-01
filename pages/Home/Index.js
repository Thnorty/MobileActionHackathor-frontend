import {Text, View, TouchableOpacity, StyleSheet, Linking} from "react-native";
import {useNavigation} from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";
import {useTranslation} from "react-i18next";
import {useState, useEffect} from "react";
import backend from "../../utils/Backend";

const Index = () => {
	const {t} = useTranslation();
	const navigation = useNavigation();
	const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());
	const [doctorPhone, setDoctorPhone] = useState("");
	const [emergencyPhone, setEmergencyPhone] = useState("");

	useEffect(() => {
		const payload = {
			"senior_id": 1
		};
		backend.post("/api/emergency_phone/", payload)
		.then((response) => {
			setEmergencyPhone(response.data.phone);
		});
		backend.post("/api/doctor_phone/", payload)
		.then((response) => {
			setDoctorPhone(response.data.phone);
		});
		const timer = setInterval(() => {
			setCurrentTime(new Date().toLocaleTimeString());
		}, 1000);
		return () => clearInterval(timer);
	}, []);

	const handleCallDoctor = () => {
		Linking.openURL("tel:" + doctorPhone);
	}

	const handleEmergencyCall = () => {
		Linking.openURL("tel:" + emergencyPhone);
	}

	return (
		<View style={styles.container}>
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
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		flexDirection: "column",
		paddingHorizontal: 20,
	},
	button: {
		padding: 20,
		margin: 10,
		borderRadius: 10,
		width: "100%",
		height: 100,
		justifyContent: "center",
		alignItems: "center",
	},
	buttonText: {
		color: "white",
		fontSize: 18,
		marginTop: 10,
	},
	timeText: {
		fontSize: 40,
		color: "black",	
		marginBottom:30,
		fontFamily:"monospace",

	},
});

export default Index;
