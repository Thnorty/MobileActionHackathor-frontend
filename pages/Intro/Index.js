import { CommonActions, useNavigation } from "@react-navigation/native";
import { Button } from "react-native";
import { Text, View, Image,  StyleSheet } from "react-native";
import logo from '../../assets/logo.png';
import brand from '../../assets/yeni-yanındayim.png';
const Index = () => {
    const navigation = useNavigation();

    const navigateToHome = () => {
        navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [{ name: "Home", params: { screen: "Index" } }],
            })
        );
    };

    return (
        <View style={styles.container}>
            
            <Image source={logo} style={styles.logo} />
            <Image source={brand} style={styles.brand} />
            {/* navigate to home index then reset navigation history*/}
            <Button title="Go to Home" onPress={() => navigateToHome()} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',

    },
    logo: {
        width: 300,
        height: 300,
        marginBottom: 20,
        borderRadius: 150,
        borderColor:'red',
        borderWidth: 10,
    },
    brand: {
        width: 300,
        height: 100,
        marginBottom: 20,
    },
});
export default Index;