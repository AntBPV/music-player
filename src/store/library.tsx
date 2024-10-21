import { Artist, Playlist, TrackWithPlaylist } from "@/helpers/types"
import { Track } from "react-native-track-player"
import { create } from "zustand"
import library from "@/assets/data/library.json"
import { useMemo } from "react"
import { unknownTrackUri } from "@/constants/images"

interface LibraryState {
    tracks: TrackWithPlaylist[]
    toggleTrackFavorite: (track: Track) => void
    addToPlaylist: (trak: Track, playlistName: string) => void

}

export const useLibraryStore = create<LibraryState>()((set) => ({
    tracks: library,
    toggleTrackFavorite: () => {},
    addToPlaylist: () => {},
}))

export const useTracks = () => useLibraryStore(state => state.tracks)

export const useFavorites = () => {
	const favorites = useLibraryStore((state) => state.tracks)
    const filteredFavorites = useMemo(() => {
        return favorites.filter((track) => track.rating === 1)
    }, [favorites])
	const toggleTrackFavorite = useLibraryStore((state) => state.toggleTrackFavorite)

	return {
		filteredFavorites,
		toggleTrackFavorite,
	}
}

export const useArtists = () => {
    const tracks = useLibraryStore((state) => state.tracks)
    
    const artists = useMemo(() => {
        return tracks.reduce((acc, track) => {
            const existingArtist = acc.find((artist) => artist.name === track.artist)

            if (existingArtist) {
                existingArtist.tracks.push(track)
            } else {
                acc.push({
                    name: track.artist ?? 'Unknown',
                    tracks: [track],
                })
            }

            return acc
        }, [] as Artist[])
    }, [tracks])

    return artists
}

export const usePlaylists = () => {
    const tracks = useLibraryStore((state) => state.tracks)

    const playlists = useMemo(() => {
        return tracks.reduce((acc, track) => {
            track.playlist?.forEach((playlistName) => {
                const existingPlaylist = acc.find((playlist) => playlist.name === playlistName)

                if (existingPlaylist) {
                    existingPlaylist.tracks.push(track)
                } else {
                    acc.push({
                        name: playlistName,
                        tracks: [track],
                        artworkPreview: track.artwork ?? unknownTrackUri,
                    })
                }
            })

            return acc
        }, [] as Playlist[])
    }, [tracks])

    const addToPlaylist = useLibraryStore((state) => state.addToPlaylist)

    return { playlists, addToPlaylist }
}
