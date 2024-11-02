import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { Calendar } from 'react-native-calendars';
import { useEffect, useState } from 'react';
import backend from "../../utils/Backend";
import { FlashList } from "@shopify/flash-list";
import Icon from 'react-native-vector-icons/FontAwesome';
import { useTranslation } from "react-i18next";
import AddAppointmentModal from "./AddAppointmentModal";
import ConfirmationModal from "./ConfirmationModal";

const Index = () => {
	const {t} = useTranslation();

    const today = new Date().toISOString().split('T')[0];
    const [selectedDate, setSelectedDate] = useState(today);
    const [currentYearMonth, setCurrentYearMonth] = useState(today.substring(0, 7)); // YYYY-MM format
	const [appointments, setAppointments] = useState([]);
	const [monthAppointments, setMonthAppointments] = useState([]);
	const [addModalVisible, setAddModalVisible] = useState(false);
	const [confirmationModalVisible, setConfirmationModalVisible] = useState(false);
	const [selectedIndex, setSelectedIndex] = useState(null);

	useEffect(() => {
		const payload = {
			"senior_id": 1,
			"date": selectedDate
		};
		backend.post("/appointments/date_appointments/", payload)
		.then((response) => {
			setAppointments(response.data.appointments);
		});
	}, [selectedDate]);
	
    useEffect(() => {
        const payload = {
            "senior_id": 1,
            "year_month": currentYearMonth
        };
        backend.post("/appointments/month_appointments/", payload)
        .then((response) => {
            setMonthAppointments(response.data.appointments);
        });
    }, [currentYearMonth]);
	
    const getMarkedDates = () => {
        const marked = {};
        
        // Mark all days with appointments
		monthAppointments.forEach(appointment => {
			const date = appointment.date_time.split(' ')[0];
			marked[date] = {
				selected: true,
				selectedColor: appointment.color,
				selectedTextColor: 'white',
				customStyles: {
					container: {
						borderWidth: 2,
						borderColor: appointment.color
					}
				}
			};
		});

        // Mark selected date
        marked[selectedDate] = {
            ...marked[selectedDate],
            selected: true,
            selectedColor: '#06bae3'
        };

        return marked;
    };

	const handlePress = (id) => {
		const index = appointments.findIndex(appointment => appointment.id === id);
		setSelectedIndex(index);
		setConfirmationModalVisible(true);
	};

	const toggleAppointment = () => {
		if (selectedIndex !== null) {
			setConfirmationModalVisible(false);
			const payload = {
                "appointment_id": appointments[selectedIndex].id,
			};
			backend.post("/appointments/toggle/", payload)
			.then(() => {
				backend.post("/appointments/date_appointments/", {"senior_id": 1, "date": selectedDate})
				.then((response) => {
					setAppointments(response.data.appointments);
				});
				backend.post("/appointments/month_appointments/", {"senior_id": 1, "year_month": currentYearMonth})
				.then((response) => {
					setMonthAppointments(response.data.appointments);
				});
			});
		}
	}

    return (
        <View style={styles.container}>
            <Calendar
				markingType="custom"
                style={styles.calendar}
                onDayPress={(day) => {
                    setSelectedDate(day.dateString);
                }}
				onMonthChange={(month) => {
					setCurrentYearMonth(month.dateString.substring(0, 7));
				}}
                markedDates={getMarkedDates()}
                theme={{
                    todayTextColor: '#06bae3',
                    selectedDayBackgroundColor: '#06bae3',
                    arrowColor: '#06bae3',
                }}
            />
            {selectedDate ? (
				<FlashList
					data={appointments}
					estimatedItemSize={125}
					contentContainerStyle={styles.appointmentsList}
					renderItem={({item, index}) => (
						<TouchableOpacity key={index} style={styles.appointmentCard} onPress={() => handlePress(item.id)}>
							<View style={styles.headerRow}>
								<Text style={styles.title}>{item.title}</Text>
								<View style={[
									styles.statusBadge, 
									{ backgroundColor: item.color }
								]}>
									<Text style={styles.statusText}>
										{item.has_not_happened_yet ? t('hasNotHappenedYet') : item.attended ? t('attended') : t('notAttended')}
									</Text>
								</View>
							</View>
							
							<View style={styles.detailRow}>
								<Icon name="clock-o" size={16} color="#666" />
								<Text style={styles.detailText}>
									{new Date(item.date_time).toLocaleTimeString('en-US', {
										hour: '2-digit',
										minute: '2-digit',
										hour12: false
									})}
								</Text>
							</View>
							
							<View style={styles.detailRow}>
								<Icon name="map-marker" size={16} color="#666" />
								<Text style={styles.detailText}>{item.place}</Text>
							</View>
							
							{item.description && (
								<Text style={styles.description}>{item.description}</Text>
							)}
						</TouchableOpacity>
					)}
				/>
            ) : null}
            <TouchableOpacity
                style={styles.fab}
                onPress={() => setAddModalVisible(true)}
            >
                <Icon name="plus" size={24} color="white" />
            </TouchableOpacity>
			<AddAppointmentModal
				modalVisible={addModalVisible} setModalVisible={setAddModalVisible} onBackdropPress={() => setAddModalVisible(false)}
				selectedDate={selectedDate} setAppointments={setAppointments} setMonthAppointments={setMonthAppointments}
			/>
			<ConfirmationModal
				modalVisible={confirmationModalVisible} setModalVisible={setConfirmationModalVisible} toggleAppointment={toggleAppointment}
				onBackdropPress={() => setConfirmationModalVisible(false)} attended={appointments[selectedIndex]?.attended}
			/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
		padding: 10
    },
    calendar: {
        borderRadius: 10,
        elevation: 4,
		marginBottom: 10
    },
    appointmentsList: {
		paddingHorizontal: 10
    },
    appointmentCard: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 15,
        marginBottom: 10,
        elevation: 2
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        flex: 1
    },
    statusBadge: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12
    },
    statusText: {
        color: 'white',
        fontSize: 12,
        fontWeight: 'bold'
    },
    detailRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5
    },
    detailText: {
        marginLeft: 8,
        color: '#666',
        fontSize: 14
    },
    description: {
        marginTop: 8,
        color: '#666',
        fontSize: 14
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
});

export default Index;