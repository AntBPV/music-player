import { useNavigationSearch } from "@/hooks/useNavigationSearch"
import { TracksList } from "./TracksList"
import { useMemo } from "react"
import { Playlist } from "@/helpers/types"
import { trackTitleFilter } from "@/helpers/filter"
import { generateTracksListId } from "@/helpers/miscellaneous"
import { StyleSheet, Text, View } from "react-native"
import { defaultStyles } from "@/styles"
import { fontSizes } from "@/constants/tokens"
import FastImage from "react-native-fast-image"
import { QueueControls } from "./QueueControls"

export const PlaylistTracksList = ({playlist}: {playlist:Playlist}) => {
    const search = useNavigationSearch({
        searchBarOptions:{
            hideWhenScrolling: true,
            placeholder: 'Find in playlist'
        }
    })
    
    const filteredPlaylistTracks = useMemo(() => {
        return playlist.tracks.filter(trackTitleFilter(search))
    }, [playlist.tracks, search])

    return (
        <TracksList 
            id={generateTracksListId(playlist.name,search)} 
            scrollEnabled={false}
            hideQueueControls={true}
            ListHeaderComponentStyle={styles.playlistHeaderContainer}
            ListHeaderComponent={
                <View>
                    <View style={styles.artworkImageContainer} >
                        <FastImage 
                            source={{
                                uri: playlist.artworkPreview,
                                priority: FastImage.priority.high
                            }}
                            style={styles.artworkImage}
                        />
                    </View>
                    <Text numberOfLines={1}
                        style={styles.playlistNameText}
                    >
                        {playlist.name}
                    </Text>

                    {search.length === 0 && (
                        <QueueControls 
                            style={{paddingTop: 24}}
                            tracks={playlist.tracks}/>
                    )}
                </View>
            }
            tracks={filteredPlaylistTracks} 
        />
    )
}

const styles = StyleSheet.create({
    playlistHeaderContainer:{
        flex: 1,
        marginBottom: 32,
    },
    artworkImageContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        height: 300,
    },
    artworkImage: {
        width: '80%',
        height: '100%',
        resizeMode: 'cover',
        borderRadius: 12
    },
    playlistNameText: {
        ...defaultStyles.text,
        marginTop: 22,
        textAlign: 'center',
        fontSize: fontSizes.lg,
        fontWeight: '800'
    }
})