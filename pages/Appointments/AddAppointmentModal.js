import { StyleSheet, Switch, Text, View, TouchableOpacity, TextInput } from "react-native";
import Modal from "../../components/Modal";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import backend from "../../utils/Backend";

const AddAppointmentModal = ({ modalVisible, onBackdropPress, setModalVisible, selectedDate, setAppointments, setMonthAppointments }) => {
    const {t} = useTranslation();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [place, setPlace] = useState("");
    const [time, setTime] = useState("");

    const handleAddAppointment = () => {
        const payload = {
            "senior_id": 1,
            "title": title,
            "description": description,
            "place": place,
            "date_time": selectedDate + " " + time,
        };
        backend.post("/appointments/add/", payload)
        .then((response) => {
            backend.post("/appointments/date_appointments/", {"senior_id": 1, "date": selectedDate})
            .then((response) => {
                setAppointments(response.data.appointments);
            });
            backend.post("/appointments/month_appointments/", {"senior_id": 1, "year_month": selectedDate.substring(0, 7)})
            .then((response) => {
                setMonthAppointments(response.data.appointments);
            });
        });
    }

    const clearInputs = () => {
        setTitle("");
        setDescription("");
        setPlace("");
        setTime("");
    }

    return (
        <Modal isVisible={modalVisible} onBackdropPress={onBackdropPress}>
            <View style={styles.modalView}>
                <Text style={styles.modalTitle}>{t("addAppointment")} {selectedDate}</Text>

                <View style={styles.inputContainer}>
                    <Icon name="calendar" size={20} color="#06bae3" style={styles.inputIcon} />
                    <TextInput
                        style={styles.input}
                        onChangeText={setTitle}
                        value={title}
                        placeholder={t("title")}
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
                    <Icon name="map-marker" size={28} color="#06bae3" style={styles.inputIcon} />
                    <TextInput
                        style={styles.input}
                        onChangeText={setPlace}
                        value={place}
                        placeholder={t("place")}
                        placeholderTextColor="#999"
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Icon name="clock-o" size={20} color="#06bae3" style={styles.inputIcon} />
                    <TextInput
                        style={styles.input}
                        onChangeText={setTime}
                        value={time}
                        placeholder={t("when")}
                        placeholderTextColor="#999"
                    />
                </View>
                <View style={styles.modalButtons}>
                    <TouchableOpacity
                        style={[styles.button, styles.buttonConfirm]}
                        onPress={() => {
                            handleAddAppointment();
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

export default AddAppointmentModal;