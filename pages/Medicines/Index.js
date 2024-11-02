import {useState, useEffect} from "react";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import ConfirmationModal from "./ConfirmationModal";
import backend from "../../utils/Backend";
import Icon from "react-native-vector-icons/FontAwesome";
import AddMedicineModal from "./AddMedicineModal";
import { useTranslation } from "react-i18next";

const Index = () => {
    const {t} = useTranslation();

	const [medicines, setMedicines] = useState([]);
    const [addModalVisible, setAddModalVisible] = useState(false);

    useEffect(() => {
        const payload = {
            "senior_id": 1
        };
        backend.post("/medicines/today/", payload)
        .then((response) => {
            setMedicines(response.data.medicines);
        })
    }, []);

    const [modalVisible, setModalVisible] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(null);

    const handlePress = (index) => {
        setSelectedIndex(index);
        setModalVisible(true);
    };

    const toggleMedicine = () => {
        if (selectedIndex !== null) {
            setMedicines(medicines.map((medicine, i) => 
                i === selectedIndex ? {...medicine, taken: !medicine.taken} : medicine
            ));
            setModalVisible(false);
            const payload = {
                "medicine_id": medicines[selectedIndex].id,
                "taken": !medicines[selectedIndex].taken
            };
            backend.post("/medicines/toggle/", payload);
        }
    };

	return (
        <View style={styles.container}>
            {medicines.map((medicine, index) => (
                <TouchableOpacity key={index} style={[styles.item, {backgroundColor: medicine.taken ? "#3cc761" : "#d60000"}]} onPress={() => handlePress(index)}>
                    <View style={styles.header}>
                    	<Text style={styles.name}>{medicine.name}</Text>
                        <Text style={styles.time}>{medicine.time}</Text>
                    </View>
                    <Text style={styles.description}>{medicine.description}</Text>
                    <View style={styles.medicineInfo}>
                        <Text style={styles.dosage}>{medicine.dosage}</Text>
                        <View style={styles.stomachIndicator}>
                            <Icon 
                                name="cutlery" 
                                size={16} 
                                color="white" 
                            />
                            <Text style={styles.stomachText}>
                                {medicine.emptyStomach ? t("Take on empty stomach") : t("Must take after with meal")}
                            </Text>
                        </View>
                    </View>
                </TouchableOpacity>
            ))}
            <TouchableOpacity 
                style={styles.fab}
                onPress={() => setAddModalVisible(true)}
            >
                <Icon name="plus" size={24} color="white" />
            </TouchableOpacity>
            <ConfirmationModal
                modalVisible={modalVisible} setModalVisible={setModalVisible} onBackdropPress={() => setModalVisible(false)}
                onModalHide={() => setSelectedIndex(null)} taken={medicines[selectedIndex]?.taken}
                toggleMedicine={toggleMedicine}
            />
            <AddMedicineModal
                modalVisible={addModalVisible} setModalVisible={setAddModalVisible} onBackdropPress={() => setAddModalVisible(false)}
            />
        </View>
	);
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    item: {
        padding: 10,
        marginVertical: 8,
        borderRadius: 5,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
    },
    time: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
    },
    description: {
        fontSize: 14,
        color: '#fff',
    },
    dosage: {
        fontSize: 14,
        color: '#fff',
    },
    fab: {
        position: 'absolute',
        right: 20,
        bottom: 20,
        backgroundColor: '#06bae3',
        width: 56,
        height: 56,
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    medicineInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 8
    },
    stomachIndicator: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.2)',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12
    },
    stomachText: {
        color: 'white',
        marginLeft: 6,
        fontSize: 12
    }
});

export default Index;
