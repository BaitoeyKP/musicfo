import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from 'axios';
import ArtistCard from "../components/ArtistCard";
type artistType = {
    name: string;
    genre: string[];
    id: string;
    img: string;
}

type fetchType = {
    name: string;
    genres: string[];
    id: string;
    images: {
        height: number;
        url: string;
        width: number;
    }[];
}
const artislist = [

    "6YVMFz59CuY7ngCxTxjpxE",//aespa
    "5RmQ8k4l3HZ8JoPb4mNsML",//Agust D
    "0gvHPdYxlU94W7V5MSIlFe",//Bilkin
    "2cFrymmkijnjDg9SS92EPM",//Blackbean
    "41MozSoPIsD1dJM0CLPjZF",//BLACKPINK
    "3Nrfpe0tUJi4K4DXYWgMUX",//bts
]

function Home() {
    const [artists, setArtists] = useState<artistType[]>([])
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
                .then(function (response: { data: fetchType }) {
                    console.log(response.data);
                    const tempArtist: artistType = {
                        name: response.data.name,
                        genre: response.data.genres,
                        id: response.data.id,
                        img: response.data.images[0].url
                    };
                    setArtists((prevArtists) => {
                        for (let index = 0; index < prevArtists.length; index++) {
                            if(prevArtists[index].id==tempArtist.id)
                            return [...prevArtists]
                        }
                        return [...prevArtists, tempArtist]
                    });
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                })

        }
    }
    useEffect(() => {
        fetch()
    }
        , [])
    console.log(artists);
    if(!artists) return<div></div>;
    return (
        <div className="bg-base-100 h-screen w-screen">
            <Navbar></Navbar>
            <h1 className="text-center pt-9 text-6xl font-bold">ARTIST</h1>
            <div className="px-24 py-9 grid m:grid-cols-2 l:grid-cols-3 hd:grid-cols-4 4k:grid-cols-5 place-items-center gap-y-9 gap-x-12 overflow-hidden">
                {artists.map((x)=>{
                    return <ArtistCard id={x.id} name={x.name} img={x.img} genre={x.genre}></ArtistCard>
                })}
                {/* {artists.map((x)=><p >id={x.id} name={x.name} img={x.img} genre={x.genre}</p>)} */}
            </div>
        </div>
    )
}

export default Home;