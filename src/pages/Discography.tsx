import { Link, useParams } from "react-router-dom";
import AlbumCard from "../components/AlbumCard";
import NavbarArtist from "../components/NavbarArtist";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { albumType, fetchAlbumType } from "../Type";
import axios from "axios";

function Discography() {
    const { id_artist, artist } = useParams();
    const [album, setAlbum] = useState<albumType[]>([]);
    const [cookies, setCookie] = useCookies<string>([]);

    function Authorization() {
        let data = {
            'grant_type': 'client_credentials'
        };
        let config = {
            method: 'post',
            url: 'https://accounts.spotify.com/api/token',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic YzhkMDU3YjYxOGMyNDZkODhjNDZkNGE5YWVjNmMxYmI6NjkzNjY1N2NiNjQ4NGFmM2EwMjZiYzlhMmQxNTVmNDg='
            },
            data: data
        };
        axios.request(config)
            .then(function (response) {
                localStorage.setItem('token', response.data.access_token)
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
    }

    function fetch() {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `https://api.spotify.com/v1/artists/${id_artist}/albums`,
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        };
        axios.request(config)
            .then(function (response: { data: { items: fetchAlbumType[] } }) {
                console.log(response.data);
                setAlbum(response.data.items.map((x: fetchAlbumType) => {
                    const tempAlbum: albumType = {
                        name: x.name,
                        release_date: x.release_date,
                        id: x.id,
                        images: x.images[0].url,
                        id_artist: "",
                        artist: ""
                    };

                    if (cookies[tempAlbum.id] == undefined)
                        setCookie(tempAlbum.id, { data: false, type: "album" });
                    return tempAlbum
                }))


            })
            .catch(function (error) {
                Authorization();
            })
    }

    useEffect(() => {
        fetch()
    }
        , [])
    console.log(album);

    if (!album) return <div>loading</div>

    return (
        <div className="bg-base-100 h-screen w-screen">
            <NavbarArtist artistName={artist!}></NavbarArtist>
            <div className="pt-9 flex px-12 hd:px-24">
                <Link to="/" className="text-4xl text-neutral flex items-center w-1/3">
                    <span>{"<"}</span>
                    <span className="hidden hd:block">&nbsp;All Artist</span></Link>
                <h1 className="text-6xl font-bold text-center overflow-hidden min-w-[33.33%] whitespace-nowrap">DISCOGRAPHY</h1>
                <div className="w-1/3"></div>
            </div>
            <div className="px-24 py-9 grid m:grid-cols-2 l:grid-cols-3 hd:grid-cols-4 4k:grid-cols-5 place-items-center gap-y-9 gap-x-12 overflow-hidden">
                {album.map((x) => {
                    return <AlbumCard id={x.id} name={x.name} images={x.images} release_date={x.release_date} artist={artist!} id_artist={id_artist!}></AlbumCard>
                })}
            </div>
        </div>
    )
}

export default Discography;