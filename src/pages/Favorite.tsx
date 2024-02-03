import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import {
    Tabs,
    TabsHeader,
    Tab,
} from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { favoriteType, fetchAlbumType, fetchArtistType } from "../Type";
import axios from "axios";
import ArtistCard from "../components/ArtistCard";
import AlbumCard from "../components/AlbumCard";

function Favorite() {
    const [activeTab, setActiveTab] = useState("all");
    const [Cookies, setCookie] = useCookies<string>([]);
    const [all, setAll] = useState<favoriteType[]>([]);
    const [artists, setArtists] = useState<favoriteType[]>([]);
    const [albums, setAlbums] = useState<favoriteType[]>([]);

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

    const data = [
        {
            label: "ALL",
            value: "all",
        },
        {
            label: "ARTIST",
            value: "artist",
        },
        {
            label: "DISCROGRAPHY",
            value: "discrography",
        },
    ];

    const cookies = document.cookie.split(';');
    useEffect(() => {
        cookies.forEach(cookie => {
            const [name, value] = cookie.split('=').map(item => item.trim());
            if (Cookies[name].data == false) return
            if (Cookies[name].type == "artist") {
                let config = {
                    method: 'get',
                    maxBodyLength: Infinity,
                    url: `https://api.spotify.com/v1/artists/${name}`,
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                };
                axios.request(config)
                    .then(function (response: { data: fetchArtistType }) {
                        const tempArtist: favoriteType = {
                            artist: response.data.name,
                            genre: response.data.genres,
                            id: response.data.id,
                            images: response.data.images[0].url,
                            type: "artist",
                            release_date: "",
                            album: "",
                            id_artist: ""
                        };

                        setArtists((prevArtists) => {
                            for (let index = 0; index < prevArtists.length; index++) {
                                if (prevArtists[index].id == tempArtist.id)
                                    return [...prevArtists]
                            }
                            return [...prevArtists, tempArtist]
                        });
                        setAll((prevArtists) => {
                            for (let index = 0; index < prevArtists.length; index++) {
                                if (prevArtists[index].id == tempArtist.id)
                                    return [...prevArtists]
                            }
                            return [...prevArtists, tempArtist]
                        });
                    })
                    .catch(function (error) {
                        Authorization()
                    })
            }
            else if (Cookies[name].type == "album") {
                let config = {
                    method: 'get',
                    maxBodyLength: Infinity,
                    url: `https://api.spotify.com/v1/albums/${name}`,
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                };
                axios.request(config)
                    .then(function (response: { data: fetchAlbumType }) {
                        const tempAlbum: favoriteType = {
                            album: response.data.name,
                            genre: [],
                            id: response.data.id,
                            images: response.data.images[0].url,
                            type: "album",
                            release_date: response.data.release_date,
                            artist: response.data.artists[0].name,
                            id_artist: response.data.artists[0].id
                        };

                        setAlbums((prevArtists) => {
                            for (let index = 0; index < prevArtists.length; index++) {
                                if (prevArtists[index].id == tempAlbum.id)
                                    return [...prevArtists]
                            }
                            return [...prevArtists, tempAlbum]
                        });
                        setAll((prevArtists) => {
                            for (let index = 0; index < prevArtists.length; index++) {
                                if (prevArtists[index].id == tempAlbum.id)
                                    return [...prevArtists]
                            }
                            return [...prevArtists, tempAlbum]
                        });
                    })
                    .catch(function (error) {
                        Authorization()
                    })
            }
        });
    }, [])

    return (
        <div className="bg-base-100 h-screen w-screen">
            <Navbar></Navbar>
            <div className="pt-9 flex px-12 hd:px-24">
                <Link to="/" className="text-4xl text-neutral flex items-center w-1/3">
                    <span>{"<"}</span>
                    <span className="hidden hd:block">&nbsp;Home</span>
                </Link>
                <h1 className="text-6xl font-bold text-center overflow-hidden min-w-[33.33%] whitespace-nowrap cursor-context-menu">FAVORITE</h1>
                <div className="w-1/3"></div>
            </div>
            <div className="w-full flex justify-center">
                <Tabs value={activeTab}>
                    <TabsHeader
                        className="text-4xl w-1/2 gap-x-5 pt-4 cursor-pointer"
                        placeholder={undefined}
                    >
                        {data.map(({ label, value }) => (
                            <Tab
                                key={value}
                                value={value}
                                onClick={() => setActiveTab(value)}
                                className={`w-fit ${activeTab === value ? "text-info border-b-2 border-info" : "text-neutral opacity-50 hover:border-b-2 hover:border-info"}`}
                                placeholder={undefined}
                            >
                                {label}
                            </Tab>
                        ))}
                    </TabsHeader>
                </Tabs>
            </div>
            <div className="px-24 py-9 grid m:grid-cols-2 l:grid-cols-3 hd:grid-cols-4 4k:grid-cols-5 place-items-center gap-y-9 gap-x-12 overflow-hidden">
                {
                    activeTab == "all" ?
                        all.map((x, i) => {
                            if (x.type == "artist")
                                return <ArtistCard name={x.artist} genre={x.genre} id={x.id} images={x.images}></ArtistCard>
                            else
                                return <AlbumCard name={x.album} id={x.id} images={x.images} release_date={x.release_date} id_artist={x.id_artist} artist={x.artist}></AlbumCard>
                        })
                        : activeTab == "artist" ?
                            artists.map((x, i) => <ArtistCard name={x.artist} genre={x.genre} id={x.id} images={x.images}></ArtistCard>)
                            :
                            albums.map((x, i) => <AlbumCard name={x.album} id={x.id} images={x.images} release_date={x.release_date} id_artist={x.id_artist} artist={x.artist}></AlbumCard>)
                }
            </div>
        </div>
    )
}

export default Favorite;