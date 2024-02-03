import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from 'axios';
import ArtistCard from "../components/ArtistCard";
import { artistType, fetchArtistType } from "../Type";
import { useCookies } from "react-cookie";

const artislist = [
    "6YVMFz59CuY7ngCxTxjpxE",   //aespa
    "5RmQ8k4l3HZ8JoPb4mNsML",   //Agust D
    "41MozSoPIsD1dJM0CLPjZF",   //BLACKPINK
    "3Nrfpe0tUJi4K4DXYWgMUX",   //BTS
    "0b1sIQumIAsNbqAoIClSpy",   //j-hope
    "1oSPZhvZMIrWW5I41kPkkY",   //Jimin
    "5vV3bFXnN6D6N3Nj4xRvaV",   //JIN
    "6HaGTQPmzraVmaVxvz6EUc",   //Jung Kook
    "2auC28zjQyVTsiZKNgPRGs",   //RM
    "0ebNdVaOfp6N0oZ1guIxM8",   //SUGA
    "3JsHnjpbhX4SnySpvpa9DK",   //V
    "",   //
    "",   //
    "",   //
    "",   //
    "",   //
    "",   //
]

function Home() {
    const [artists, setArtists] = useState<artistType[]>([])
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
        for (let index = 0; index < artislist.length; index++) {
            let config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: `https://api.spotify.com/v1/artists/${artislist[index]}`,
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            };
            axios.request(config)
                .then(function (response: { data: fetchArtistType }) {
                    console.log(response.data);
                    const tempArtist: artistType = {
                        name: response.data.name,
                        genre: response.data.genres,
                        id: response.data.id,
                        images: response.data.images[0].url
                    };
                    if (cookies[tempArtist.id] == undefined)
                        setCookie(tempArtist.id, { data: false, type: "artist" });
                    setArtists((prevArtists) => {
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
    }

    useEffect(() => {
        fetch()
    }, [])
    console.log(artists);
    if (!artists) return <div>loading</div>;

    return (
        <div className="bg-base-100 h-screen w-screen">
            <Navbar></Navbar>
            <h1 className="text-center pt-9 text-6xl font-bold">ARTIST</h1>
            <div className="px-24 py-9 grid m:grid-cols-2 l:grid-cols-3 hd:grid-cols-4 4k:grid-cols-5 place-items-center gap-y-9 gap-x-12 overflow-hidden">
                {artists.map((x) => {
                    return <ArtistCard id={x.id} name={x.name} images={x.images} genre={x.genre}></ArtistCard>
                })}
            </div>
        </div>
    )
}

export default Home;