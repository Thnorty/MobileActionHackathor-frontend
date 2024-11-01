import {useState, useEffect} from "react";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import ConfirmationModal from "./ConfirmationModal";
import backend from "../../utils/Backend";

const Index = () => {
	const [medicines, setMedicines] = useState([
		{
			name: "Ağrı Kesici", description: "Parol", time: "10:00", taken: true, dosage: "2 tablet",
		},
		{
			name: "Tansiyon hapı", description: "Pradaxa", time: "12:00", taken: false, dosage: "1 tablet",
		},
		{
			name: "Kan sulandırıcı", description: "Kaptoril", time: "14:00", taken: false, dosage: "1 tablet",
		}
	]);

    useEffect(() => {
        const payload = {
            "senior_id": 1
        }
        backend.post("/medicines/today/", payload)
        .then((response) => {
          setMedicines(response.data)
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
                    <Text style={styles.dosage}>{medicine.dosage}</Text>
                </TouchableOpacity>
            ))}
            <ConfirmationModal
                modalVisible={modalVisible} setModalVisible={setModalVisible} onBackdropPress={() => setModalVisible(false)}
                onModalHide={() => setSelectedIndex(null)} taken={medicines[selectedIndex]?.taken}
                toggleMedicine={toggleMedicine}
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
});

export default Index;
