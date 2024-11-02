import { CommonActions, useNavigation } from "@react-navigation/native";
import { Button, ScrollView } from "react-native";
import { Text, View, Image,  StyleSheet, TextInput, KeyboardAvoidingView, Platform } from "react-native";
import logo from '../../assets/logo.png';
import brand from '../../assets/yeni-yanındayim.png';
import { useState } from "react";
import { TouchableOpacity } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';

const Index = () => {
    const navigation = useNavigation();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigateToHome = () => {
        navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [{ name: "Home", params: { screen: "Index" } }],
            })
        );
    };

    const handleLogin = () => {
        // Add your login logic here
        console.log('Username:', username);
        console.log('Password:', password);
        navigateToHome();
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={"padding"}
        >
            <ScrollView style={styles.bigContainer} contentContainerStyle={{flexGrow: 1,
                alignItems: 'center',}}>
                <View style={styles.logoContainer}>
                    <Image source={logo} style={styles.logo} />
                    <Image source={brand} style={styles.brand} />
                    <Text style={{fontSize:16, marginBottom:20, color:"darkred",fontWeight:'900', opacity:0.8}}>Her Zaman, Her Yerde Desteğe Hazırım!</Text>
                </View>
                <TextInput
                    style={styles.input}
                    placeholder="Username"
                    value={username}
                    onChangeText={setUsername}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />
                <TouchableOpacity style={[styles.button, {backgroundColor: "darkgreen"}]} onPress={handleLogin}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
                <Text style={{color: '#d60000',opacity:0.7, fontSize: 16, marginTop: 20}}>Do not have an account?</Text> 
                <TouchableOpacity style={[styles.buttonSignUp, {backgroundColor: "darkblue"}]} onPress={() => navigation.navigate("Register")}>
                    <Text style={styles.buttonText}> SIGN UP</Text>
                </TouchableOpacity> 
                
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex:1
    },
    bigContainer: {
        flexDirection: 'column',
        backgroundColor: 'white',
        paddingBottom: 100,
    },
    logoContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 60,

    },
    logo: {
        width: 300,
        height: 300,
        borderRadius: 150,
        borderColor:'red',
        borderWidth: 10,
    },

    brand: {
        width: 350,
        height: 150,
    },
    input: {
        width: '80%',
        padding: 10,
        marginVertical: 10,
        borderWidth: 2,
        borderColor: '#d60000',
        borderRadius: 20,
        color:"darkblue",
        fontWeight: "bold",
        fontSize: 14,
    },
    button: {
        padding: 15,
        borderRadius: 10,
        marginTop: 10,
        alignItems: 'center',
        width: '80%',
    },
    buttonSignUp: {
        padding: 10,
        marginBottom: 30,
        borderRadius: 10,
        marginTop: 10,
        alignItems: 'center',
        width: '50%',
    },
    
    buttonText: {
        color: 'white',
        fontSize: 18,
    },


});
export default Index;