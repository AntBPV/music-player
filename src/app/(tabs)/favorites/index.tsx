import { defaultStyles } from "@/styles"
import { ScrollView, Text, View } from "react-native"
import { TracksList } from "@/components/TracksList"
import { screenPadding } from "@/constants/tokens"
import { useMemo } from "react"
import { useNavigationSearch } from "@/hooks/useNavigationSearch"
import { useFavorites } from "@/store/library"
import { trackTitleFilter } from "@/helpers/filter"
import { generateTracksListId } from "@/helpers/miscellaneous"


const FavoritesScreen = () => {
    // FIXME: Search bar doesn't work
    const search = useNavigationSearch({
        searchBarOptions:{
            placeholder: 'Find in favorites',
        }
    })

    const favoritesTracks = useFavorites().filteredFavorites

    const filteredFavoritesTracks = useMemo(() => {
        if(!search) return favoritesTracks

        return favoritesTracks.filter(trackTitleFilter(search))
    },[search, favoritesTracks])

    return (
        <View style={defaultStyles.container}>
            <ScrollView style={{ paddingHorizontal: screenPadding.horizontal}}
                contentInsetAdjustmentBehavior="automatic"
            >
                <TracksList id={generateTracksListId('favorites',search)} scrollEnabled={false} tracks={filteredFavoritesTracks}/>

            </ScrollView>
        </View>
    )
}

export default FavoritesScreen