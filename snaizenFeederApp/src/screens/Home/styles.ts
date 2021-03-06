import { StyleSheet } from "react-native";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import { theme } from "../../global/styles/theme";

export const styles = StyleSheet.create({
    container:{
        flex: 1,
    },

    header:{
        width: '100%',
        paddingHorizontal: 24,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: getStatusBarHeight() + 26,
        marginBottom: 42,
    },

    status:{
        fontFamily: theme.fonts.title500,
        fontSize: 24,
        marginRight: 6,
    },

    content: {
        marginTop: 42,
    },

    schedules: {
        marginTop: 24,
        marginLeft: 24,
    },

});