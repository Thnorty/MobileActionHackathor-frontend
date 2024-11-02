import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { useTranslation } from "react-i18next";
import { languages, changeLanguage } from "../../utils/i18n";

const Index = () => {
    const { t, i18n } = useTranslation();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{t('Settings')}</Text>
            <View style={styles.languageButtons}>
                {languages.map((lang) => (
                    <TouchableOpacity
                        key={lang.code}
                        style={[
                            styles.button,
                            i18n.language === lang.code && styles.activeButton
                        ]}
                        onPress={() => changeLanguage(lang.code)}
                    >
                        <Text style={[
                            styles.buttonText,
                            i18n.language === lang.code && styles.activeButtonText
                        ]}>
                            {lang.code.toUpperCase()}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: 'black'
    },
    languageButtons: {
        flexDirection: 'row',
        gap: 10
    },
    button: {
        padding: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#06bae3',
        backgroundColor: 'white'
    },
    activeButton: {
        backgroundColor: '#06bae3',
    },
    buttonText: {
        color: '#06bae3',
        fontSize: 16,
        fontWeight: 'bold'
    },
    activeButtonText: {
        color: 'white'
    }
});

export default Index;