import { Text, StyleSheet, TextInput, View, Touchable,Image,TouchableOpacity} from "react-native";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { CommonActions } from "@react-navigation/native";
const Index = () => {

    const navigation = useNavigation();
    const [name, setName] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [gender, setGender] = useState('');

    const navigateFunction = () => {
        // Add your login logic here

        navigateToIntro();
    };

    const chooseGender = (selectedGender) => {
        setGender(selectedGender);
    };

    const navigateToIntro = () => {
        navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [{ name: "IntroPage", params: { screen: "Index" } }]
,
            })
        );
    };
    return (
        <View style={styles.container}>
            <View style={styles.inputBox}>
                <Text style={styles.txt}>Can you please share your name?</Text>
                <TextInput
                        style={styles.input}
                        placeholder="Julia Roberts"
                        value={name}
                        onChangeText={setName}
                /> 
            </View>
            <View style={styles.inputBox}>
                <Text style={styles.txt}>May I ask when your birthday is?</Text>
                <TextInput
                        style={styles.input}
                        placeholder="17.09.1948"
                        value={dateOfBirth}
                        onChangeText={setDateOfBirth}
                /> 
            </View>
            <View style={styles.inputBox}>
                <Text style={styles.txt}>What gender do you identify with? (optional)</Text>
                <View style={styles.genderContainer}>
                    <TouchableOpacity
                        style={[styles.genderButton, gender === 'woman' && styles.selectedGender]}
                        onPress={() => chooseGender('woman')}
                    >
                        <Image source={require('../../assets/old-woman.png')} style={styles.buttonImage} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.genderButton, gender === 'man' && styles.selectedGender]}
                        onPress={() => chooseGender('man')}
                    >
                        <Image source={require('../../assets/old-man.png')} style={styles.buttonImage} />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.button} onPress={navigateFunction}>
                    <Text style={styles.buttonText}>Save</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    inputBox: {
        margin: 10,
    },
    txt: {
        fontSize: 20,
        textAlign: "center",
        color:"black",
        fontWeight: "400",
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 2,
        borderColor: "#06bae3",
        color: "darkblue",
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 20,
    },
    genderContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 20,
    },
    genderButton: {
        padding: 10,
    },
    selectedGender: {
        borderWidth: 2,
        borderColor: '#06bae3',
        borderRadius: 10,
    },
    button: {
        padding: 15,
        borderRadius: 10,
        marginTop: 10,
        alignItems: 'center',
        width: '80%',
        alignSelf: 'center',
        backgroundColor: 'darkgreen',
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
    },
    buttonImage: {
        width: 50,
        width: 100,
        height: 100,
    },
    });

export default Index;
