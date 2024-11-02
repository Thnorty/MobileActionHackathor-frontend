import { StyleSheet, Switch, Text, View, TouchableOpacity, TextInput } from "react-native";
import Modal from "../../components/Modal";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import backend from "../../utils/Backend";

const AddMedicineModal = ({ modalVisible, onBackdropPress, setModalVisible }) => {
    const {t} = useTranslation();

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [dosage, setDosage] = useState("");
    const [whenToTake, setWhenToTake] = useState("");
    const [frequencyInDays, setFrequencyInDays] = useState("");
    const [isEmptyStomach, setIsEmptyStomach] = useState(false);

    const handleAddMedicine = () => {
        const payload = {
            "senior_id": 1,
            "name": name,
            "description": description,
            "dosage": dosage,
            "when_to_take": whenToTake,
            "frequency_in_days": frequencyInDays,
            "is_empty_stomach": isEmptyStomach
        };
        backend.post("/medicines/add/", payload)
        .then((response) => {
            console.log(response.data);
        });
    }

    const clearInputs = () => {
        setName("");
        setDescription("");
        setDosage("");
        setWhenToTake("");
        setFrequencyInDays("");
        setIsEmptyStomach(false);
    }

    return (
        <Modal isVisible={modalVisible} onBackdropPress={onBackdropPress}>
            <View style={styles.modalView}>
                <Text style={styles.modalTitle}>{t("addMedicine")}</Text>

                <View style={styles.inputContainer}>
                    <Icon name="medkit" size={20} color="#06bae3" style={styles.inputIcon} />
                    <TextInput
                        style={styles.input}
                        onChangeText={setName}
                        value={name}
                        placeholder={t("medicineName")}
                        placeholderTextColor="#999"
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Icon name="file-text" size={20} color="#06bae3" style={styles.inputIcon} />
                    <TextInput
                        style={styles.input}
                        onChangeText={setDescription}
                        value={description}
                        placeholder={t("description")}
                        placeholderTextColor="#999"
                        multiline
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Icon name="hashtag" size={20} color="#06bae3" style={styles.inputIcon} />
                    <TextInput
                        style={styles.input}
                        onChangeText={setDosage}
                        value={dosage}
                        placeholder={t("dosage")}
                        placeholderTextColor="#999"
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Icon name="clock-o" size={20} color="#06bae3" style={styles.inputIcon} />
                    <TextInput
                        style={styles.input}
                        onChangeText={setWhenToTake}
                        value={whenToTake}
                        placeholder={t("whenToTake")}
                        placeholderTextColor="#999"
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Icon name="calendar" size={20} color="#06bae3" style={styles.inputIcon} />
                    <TextInput
                        style={styles.input}
                        onChangeText={setFrequencyInDays}
                        value={frequencyInDays.toString()}
                        placeholder={t("frequencyInDays")}
                        placeholderTextColor="#999"
                        keyboardType="numeric"
                    />
                </View>

                <View style={styles.switchContainer}>
                    <Icon name="cutlery" size={20} color="#06bae3" />
                    <Text style={styles.switchLabel}>{t("isEmptyStomach")}</Text>
                    <Switch
                        trackColor={{ false: "#ddd", true: "#06bae3" }}
                        thumbColor={isEmptyStomach ? "#fff" : "#f4f3f4"}
                        ios_backgroundColor="#ddd"
                        onValueChange={setIsEmptyStomach}
                        value={isEmptyStomach}
                        style={styles.switch}
                    />
                </View>
                <View style={styles.modalButtons}>
                    <TouchableOpacity
                        style={[styles.button, styles.buttonConfirm]}
                        onPress={() => {
                            handleAddMedicine();
                            setModalVisible(false);
                            clearInputs();
                        }}
                    >
                        <Text style={styles.textStyle}>{t("add")}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.button, styles.buttonCancel]}
                        onPress={() => {
                            setModalVisible(false);
                            clearInputs();
                        }}
                    >
                        <Text style={styles.textStyle}>{t("cancel")}</Text>
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
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 20,
        textAlign: 'center'
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        borderRadius: 10,
        marginBottom: 15,
        paddingHorizontal: 15,
        borderWidth: 1,
        borderColor: '#e0e0e0'
    },
    input: {
        flex: 1,
        paddingVertical: 12,
        paddingHorizontal: 10,
        color: '#333',
        fontSize: 16
    },
    inputIcon: {
        marginRight: 10
    },
    switchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        paddingHorizontal: 15,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#e0e0e0'
    },
    switchLabel: {
        flex: 1,
        marginLeft: 10,
        fontSize: 16,
        color: '#333'
    },
    switch: {
        transform: [{ scaleX: 1.1 }, { scaleY: 1.1 }]
    }
});

export default AddMedicineModal;