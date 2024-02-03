type artistType = {
    name: string;
    genre: string[];
    id: string;
    images: string;
}
type albumType = {
    name: string;
    id: string;
    images: string;
    release_date: string;
    id_artist: string
    artist: string
}
type fetchArtistType = {
    name: string;
    genres: string[];
    id: string;
    images: {
        height: number;
        url: string;
        width: number;
    }[];
}
type fetchAlbumType = {
    [x: string]: any;

    name: string;
    id: string;
    images: {
        height: number;
        url: string;
        width: number;
    }[]
    release_date: string;

}
type fetchTackType = {
    id: string;
    images: {
        height: number;
        url: string;
        width: number;
    }[]
    release_date: string;
    name: string;
    tracks: {
        items:
        {
            name: string;
        }[]
    }
}
type favoriteType = {
    type: string;
    id: string;
    images: string
    release_date: string;
    artist: string;
    album: string;
    genre: string[];
    id_artist: string
}
export type { artistType, fetchArtistType, albumType, fetchAlbumType, fetchTackType, favoriteType }