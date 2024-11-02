import { StyleSheet, Text, View} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const Index = () => {
    return (
        <View style={styles.container}>
            <Icon name="exclamation" size={130} color="#d60000" />
            <Text style={styles.title}>ALERJENLER:</Text>
            <Text style={styles.txt}>- Yulaf</Text>
            <Text style={styles.txt}>- Fındık</Text>
            <Text style={styles.txt}>- Badem</Text>
            <Text style={styles.txt}>- Ceviz</Text>
            <Text style={styles.txt}>- Fıstık</Text>
            <Text style={styles.txt}>- Penisilin</Text>
            <Text style={styles.title}>KRONİK HASTALIKLAR:</Text>
            <Text style={styles.txt}>- Diyabet</Text>
            <Text style={styles.txt}>- Hipertansiyon</Text>
            <Text style={styles.txt}>- Kalp Hastalıkları</Text>
            <Text style={styles.txt}>- 2 stent takıldı.</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    txt: {
        fontSize: 20,
    },
    title: {
        fontSize: 30,
        fontWeight: "bold",
        color:"#d60000",
        marginTop:20,
    },
});
export default Index;