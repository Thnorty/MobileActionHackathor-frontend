import { StyleSheet, Text, View } from "react-native";
import Modal from "../../components/Modal";
import { TouchableOpacity } from "react-native";
import { useTranslation } from "react-i18next";

const ConfirmationModal = ({ modalVisible, onBackdropPress, toggleAppointment, attended, setModalVisible }) => {
    const {t} = useTranslation();

    console.log(attended);
    

    return (
        <Modal isVisible={modalVisible} onBackdropPress={onBackdropPress}>
            <View style={styles.modalView}>
                <Text style={styles.modalText}>
                    {attended ? t("confirmNotAttendingAppointment") : t("confirmAttendingAppointment")}
                </Text>
                <View style={styles.modalButtons}>
                    <TouchableOpacity
                        style={[styles.button, styles.buttonConfirm]}
                        onPress={toggleAppointment}
                    >
                        <Text style={styles.textStyle}>{t("yes")}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.button, styles.buttonCancel]}
                        onPress={() => setModalVisible(false)}
                    >
                        <Text style={styles.textStyle}>{t("no")}</Text>
                    </TouchableOpacity>
                </View>
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
    modalButtons: {
        flexDirection: 'row',
        marginTop: 20
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        marginHorizontal: 10,
        minWidth: 100
    },
    buttonConfirm: {
        backgroundColor: "#3cc761",
    },
    buttonCancel: {
        backgroundColor: "#d60000",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },
});

export default ConfirmationModal;