import {Text, View, TouchableOpacity, StyleSheet, Linking} from "react-native";
import {useNavigation} from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";
import {useTranslation} from "react-i18next";

const Index = () => {
	const {t} = useTranslation();
	const navigation = useNavigation();

	const handleEmergencyCall = () => {
		Linking.openURL("tel:+905422311304")
	}

	return (
		<View style={styles.container}>
			<TouchableOpacity style={[styles.button, {backgroundColor: "#06bae3"}]} onPress={() => navigation.navigate("Medicines")}>
				<Icon name="medkit" size={30} color="white" />
				<Text style={styles.buttonText}>{t("Medicines")}</Text>
			</TouchableOpacity>
			<TouchableOpacity style={[styles.button, {backgroundColor: "#06e35e"}]} onPress={() => navigation.navigate("Appointments")}>
				<Icon name="calendar" size={30} color="white" />
				<Text style={styles.buttonText}>{t("Appointments")}</Text>
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
		flexDirection: "row",
		flexWrap: "wrap",
	},
	button: {
		padding: 20,
		margin: 10,
		borderRadius: 10,
		width: "40%",
		height: 100,
		justifyContent: "center",
		alignItems: "center",
	},
	buttonText: {
		color: "white",
		fontSize: 18,
		marginTop: 10,
	},
});

export default Index;
