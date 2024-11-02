import {useState, useEffect} from "react";
import {Alert, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import ConfirmationModal from "./ConfirmationModal";
import backend from "../../utils/Backend";
import Icon from "react-native-vector-icons/FontAwesome";
import AddMedicineModal from "./AddMedicineModal";
import { useTranslation } from "react-i18next";
import { FlashList } from "@shopify/flash-list";
import TimeHasNotComeModal from "./TimeHasNotComeModal";

const Index = () => {
    const {t} = useTranslation();

	const [medicines, setMedicines] = useState([]);
    const [addModalVisible, setAddModalVisible] = useState(false);
    const [confirmationModalVisible, setConfirmationModalVisible] = useState(false);
    const [timeHasNotComeModalVisible, setTimeHasNotComeModalVisible] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(null);

    useEffect(() => {
        const payload = {
            "senior_id": 1
        };
        backend.post("/medicines/today/", payload)
        .then((response) => {
            setMedicines(response.data.medicines);
        })
    }, []);

    const handlePress = (index) => {
        const currentTime = new Date();
        const medicineTime = new Date();
        const [hours, minutes] = medicines[index].when_to_take.split(':');
        medicineTime.setHours(parseInt(hours), parseInt(minutes), 0);
        setSelectedIndex(index);
    
        if (currentTime < medicineTime) {
            setTimeHasNotComeModalVisible(true);
            return;
        }
        setConfirmationModalVisible(true);
    };

    const toggleMedicine = () => {
        if (selectedIndex !== null) {
            setMedicines(medicines.map((medicine, i) => 
                i === selectedIndex ? {...medicine, taken: !medicine.taken} : medicine
            ));
            setConfirmationModalVisible(false);
            const payload = {
                "medicine_id": medicines[selectedIndex].id,
                "taken": !medicines[selectedIndex].taken
            };
            backend.post("/medicines/toggle/", payload);
        }
    };

	return (
        <View style={styles.container}>
            <FlashList
                contentContainerStyle={{paddingBottom: 80, paddingHorizontal: 10}}
                data={medicines}
                estimatedItemSize={120}
                renderItem={({item, index}) => (
                    <TouchableOpacity key={index} style={[styles.item, {backgroundColor: item.taken ? "#3cc761" : "#d60000"}]} onPress={() => handlePress(index)}>
                        <View style={styles.header}>
                            <Text style={styles.name}>{item.name}</Text>
                            <Text style={styles.when_to_take}>{item.when_to_take}</Text>
                        </View>
                        <Text style={styles.description}>{item.description}</Text>
                        <View style={styles.medicineInfo}>
                            <Text style={styles.dosage}>{item.dosage}</Text>
                            <View style={styles.stomachIndicator}>
                                <Icon 
                                    name="cutlery" 
                                    size={16} 
                                    color="white"
                                />
                                <Text style={styles.stomachText}>
                                    {item.is_empty_stomach ? t("Take on empty stomach") : t("Must take after with meal")}
                                </Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                )}
            />
            <TouchableOpacity
                style={styles.fab}
                onPress={() => setAddModalVisible(true)}
            >
                <Icon name="plus" size={24} color="white" />
            </TouchableOpacity>
            <ConfirmationModal
                modalVisible={confirmationModalVisible} setModalVisible={setConfirmationModalVisible} onBackdropPress={() => setConfirmationModalVisible(false)}
                onModalHide={() => setSelectedIndex(null)} taken={medicines[selectedIndex]?.taken}
                toggleMedicine={toggleMedicine}
            />
            <AddMedicineModal
                modalVisible={addModalVisible} setModalVisible={setAddModalVisible} onBackdropPress={() => setAddModalVisible(false)}
                setMedicines={setMedicines}
            />
            <TimeHasNotComeModal
                modalVisible={timeHasNotComeModalVisible} setModalVisible={setTimeHasNotComeModalVisible} onBackdropPress={() => setTimeHasNotComeModalVisible(false)}
                medicineTime={medicines[selectedIndex]?.when_to_take}
            />
        </View>
	);
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
    when_to_take: {
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
