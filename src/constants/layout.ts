import { NativeStackNavigationOptions } from "@react-navigation/native-stack";
import { colors } from "./tokens";
import { Platform } from 'react-native';

export const StackScreenWithSearchBar: NativeStackNavigationOptions = {
    headerStyle: {
        backgroundColor: colors.background,
    },
    headerTitleStyle: {
        color: colors.text,
        fontSize: 35,  
        fontWeight: 'bold',
    },
    headerTintColor: colors.text,
    headerTransparent: false,  
    headerShadowVisible: false, 
    headerTitleAlign: 'left',  
}
