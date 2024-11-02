import { StyleSheet, Text, View } from "react-native";
import Modal from "../../components/Modal";
import { TouchableOpacity } from "react-native";
import { useTranslation } from "react-i18next";
import Icon from "react-native-vector-icons/FontAwesome";

const TimeHasNotComeModal = ({ modalVisible, onBackdropPress, setModalVisible, medicineTime }) => {
    const {t} = useTranslation();

    return (
        <Modal isVisible={modalVisible} onBackdropPress={onBackdropPress}>
            <View style={styles.modalView}>
                <Icon name="clock-o" size={50} color="#e30606" />
                <Text style={styles.warningText}>
                    {t("cannotTakeYet")}
                </Text>
                <Text style={styles.timeText}>
                    {t("pleaseWaitUntil")} {medicineTime}
                </Text>
                <TouchableOpacity 
                    style={styles.button}
                    onPress={() => setModalVisible(false)}
                >
                    <Text style={styles.buttonText}>{t("ok")}</Text>
                </TouchableOpacity>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalView: {
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        elevation: 5
    },
    warningText: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#e30606",
        marginTop: 15,
        marginBottom: 10,
        textAlign: "center"
    },
    timeText: {
        fontSize: 16,
        color: "#333",
        marginBottom: 20,
        textAlign: "center"
    },
    button: {
        backgroundColor: "#06bae3",
        borderRadius: 20,
        padding: 10,
        paddingHorizontal: 30,
        elevation: 2
    },
    buttonText: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 16
    }
});

export default TimeHasNotComeModal;