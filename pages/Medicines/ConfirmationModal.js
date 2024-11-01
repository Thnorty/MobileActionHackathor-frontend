import { StyleSheet, Text, View } from "react-native";
import Modal from "../../components/Modal";
import { TouchableOpacity } from "react-native";

const ConfirmationModal = ({ modalVisible, onBackdropPress, onModalHide, toggleMedicine, done, setModalVisible }) => {
    return (
        <Modal isVisible={modalVisible} onBackdropPress={onBackdropPress} onModalHide={onModalHide}>
            <View>
                <View style={styles.modalView}>
                    <Text style={styles.modalText}>
                        {done ? "İlacı almadığınızı onaylıyor musunuz?" : "İlacı aldığınızı onaylıyor musunuz?"}
                    </Text>
                    <View style={styles.modalButtons}>
                        <TouchableOpacity
                            style={[styles.button, styles.buttonConfirm]}
                            onPress={toggleMedicine}
                        >
                            <Text style={styles.textStyle}>Evet</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.button, styles.buttonCancel]}
                            onPress={() => setModalVisible(false)}
                        >
                            <Text style={styles.textStyle}>Hayır</Text>
                        </TouchableOpacity>
                    </View>
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