import { unknownTrackUri } from "@/constants/images"
import { playlistNameFilter } from "@/helpers/filter"
import { Playlist } from "@/helpers/types"
import { useNavigationSearch } from "@/hooks/useNavigationSearch"
import { utilsStyles } from "@/styles"
import { useMemo } from "react"
import { FlatList, FlatListProps, View, Text } from "react-native"
import FastImage from "react-native-fast-image"
import { PlaylistListItem } from "@/components/PlaylistListItem"


type PlaylistsListProps = {
    playlists: Playlist[],
    onPlaylistPress: (playlist: Playlist) => void
} & Partial<FlatListProps<Playlist>>

const ItemDivider = () => (
    <View
        style={{
            ...utilsStyles.itemSeparator,
            marginLeft: 80,
            marginVertical: 12
        }}
    />
)

export const PlaylistsList = ({playlists, onPlaylistPress: handlePlayListPress, ...flatListProps}: PlaylistsListProps) => {
    const search = useNavigationSearch({
        searchBarOptions: {
            placeholder: 'Find in playlist'
        }
    })

    const filteredPlaylist = useMemo(() => {
        return playlists.filter(playlistNameFilter(search))
    }, [playlists, search])

    return (
        <FlatList 
            contentContainerStyle={{paddingTop:10, paddingBottom: 128}}
            ItemSeparatorComponent={ItemDivider}
            ListFooterComponent={ItemDivider}
            ListEmptyComponent={
                <View>
					<Text style={utilsStyles.emptyContentText}>No playlist found</Text>

					<FastImage
						source={{ uri: unknownTrackUri, priority: FastImage.priority.normal }}
						style={utilsStyles.emptyContentImage}
					/>
				</View>
            }
            data={filteredPlaylist}
            renderItem={({item:playlist}) => 
                <PlaylistListItem playlist={playlist} onPress={() => handlePlayListPress(playlist)} />
            }
            {...flatListProps}
        />
    )
}