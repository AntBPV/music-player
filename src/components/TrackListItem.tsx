import { unknownTrackUri } from "@/constants/images";
import { colors, fontSizes } from "@/constants/tokens";
import { defaultStyles } from "@/styles";
import { StyleSheet, Text, TouchableHighlight, View } from "react-native"
import FastImage from 'react-native-fast-image'
import { Track, useActiveTrack, useIsPlaying } from "react-native-track-player";
import { Entypo, Ionicons } from '@expo/vector-icons';
import LoaderKit from 'react-native-loader-kit'

export type TrackListItemProps = {
    track: Track
    onTrackSelect: (track: Track) => void
}

export const TrackListItem = ({track, onTrackSelect: handleTrackSelect}: TrackListItemProps) => {
    const {playing} = useIsPlaying()

    const isActiveTrack = useActiveTrack()?.url === track.url

    return (
        <TouchableHighlight onPress={() => handleTrackSelect(track)}>
            <View style={styles.trackItemContainer}>
                <View>
                    <FastImage source={{
                            uri: track.artwork ?? unknownTrackUri,
                            priority: FastImage.priority.normal
                        }}
                        style={{
                            ...styles.trackArtworkImage,
                            opacity: isActiveTrack ? 0.6 : 1
                        }}
                    />

                    {isActiveTrack && 
                        (playing ? (<LoaderKit style={styles.trackPlayingIconIndicator} name='LineScaleParty' color={colors.icon} />) :
                        (<Ionicons style={styles.trackPausedIndicator} name='play' size={24} color={colors.icon} />

                        ))}
                </View>
                
                <View 
                    style={{
                        flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}>
                    {/* Track title + artist */}
                    <View style={{width: '100%'}} >
                        <Text numberOfLines={1}
                            style={{
                                ...styles.trackTitleText,
                                color: isActiveTrack ? colors.primary : colors.text
                            }}
                        >
                            {track.title}</Text>

                        { track.artist && (
                            <Text numberOfLines={1}
                                style={styles.trackArtistText}
                            >{track.artist}</Text>
                        )}
                    </View>
                    
                    <Entypo name="dots-three-horizontal" size={18} color={colors.icon} />
                </View>
                
            </View>
        </TouchableHighlight>
    )
}

const styles = StyleSheet.create({
    trackItemContainer: {
        flexDirection: 'row',
        columnGap: 14,
        alignItems: 'center',
        paddingRight: 20,
    },
    trackPlayingIconIndicator: {
        position: 'absolute',
        top: 18,
        right: 16,
        left: 18,
        height: 16  
    },
    trackPausedIndicator: {
        position: 'absolute',
        top: 14,
        left: 14
    },
    trackArtworkImage:{
        borderRadius: 8,
        width: 50,
        height: 50
    },
    trackTitleText: {
        ...defaultStyles.text,
        fontSize: fontSizes.sm,
        fontWeight: '600',
        maxWidth: '90%'
    },
    trackArtistText: {
        ...defaultStyles.text,
        fontSize: 14,
        marginTop: 4,
        color: colors.textMuted
    }
})