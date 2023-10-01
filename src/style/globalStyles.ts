import { StyleSheet } from 'react-native';

const globalStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ADB5BD', // Soft Gray as the background color
    },
    header: {
        backgroundColor: '#001F3F', // Navy Blue for headers
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ADB5BD',
    },
    headerText: {
        color: '#FFF', // White color for the header text
        fontSize: 20,
        fontWeight: 'bold',
    },
    button: {
        backgroundColor: '#FF6B6B', // Coral Red for buttons
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: '#FFF', // White color for button text
        fontSize: 16,
        textAlign: 'center',
    },
    bodyText: {
        color: '#001F3F', // Navy Blue for general body text
        fontSize: 16,
    },
    // ... Add other styles as needed
});

export default globalStyles;
