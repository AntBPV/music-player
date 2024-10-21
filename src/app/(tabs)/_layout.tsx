import { colors, fontSizes } from "@/constants/tokens"
import { BlurView } from "expo-blur"
import {Tabs} from "expo-router"
import { StyleSheet } from "react-native"
import { FontAwesome, MaterialCommunityIcons, Ionicons, FontAwesome6 } from '@expo/vector-icons';
import { FloatingPlayer } from "@/components/FloatingPlayer";


const TabsNavigation = () => {
    return (
        <>
            <Tabs
                screenOptions={{
                    tabBarActiveTintColor: colors.primary,
                    tabBarLabelStyle:{
                        fontSize: fontSizes.xs,
                        fontWeight: '500',
                    },
                    headerShown: false,
                    tabBarStyle: {
                        position: 'absolute',
                        backgroundColor: '#252525',
                        borderTopLeftRadius: 20,
                        borderTopRightRadius: 20,
                        borderTopWidth: 0,
                        paddingTop: 8
                    },
                }}>
                <Tabs.Screen name='favorites' options={{
                    title: 'Favorites',
                    tabBarIcon: ({color}) => <FontAwesome name="heart" size={20} color={color} />,
                }}
                
                />
                <Tabs.Screen name='playlists'options={{
                    title: 'Playlists',
                    tabBarIcon: ({color}) => <MaterialCommunityIcons name="playlist-music" size={28} color={color} />,
                }}/>    
                <Tabs.Screen name='(songs)' options={{
                    title: 'Songs',
                    tabBarIcon: ({color}) => <Ionicons name="musical-notes-sharp" size={24} color={color} />,
                }}/>    
                <Tabs.Screen name='artists'options={{
                    title: 'Artists',
                    tabBarIcon: ({color}) => <FontAwesome6 name="users-line" size={20} color={color} />,
                }}/>    
            </Tabs>

            <FloatingPlayer style={{
                    position: 'absolute',
                    left: 8,
                    right: 8,
                    bottom: 60
                }}
            />
        </>
    )
}

export default TabsNavigation