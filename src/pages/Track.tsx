import { Link, useParams } from "react-router-dom";
import NavbarArtist from "../components/NavbarArtist";
import { useEffect, useState } from "react";
import { fetchTackType } from "../Type";
import axios from "axios";

function Track() {
    const { id_artist, id_album, artist } = useParams();
    const [tacks, setTacks] = useState<fetchTackType>();

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
            url: `https://api.spotify.com/v1/albums/${id_album}`,
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        };
        axios.request(config)
            .then(function (response: { data: fetchTackType }) {
                console.log(response.data);
                setTacks(response.data)
            })
            .catch(function (error) {
                Authorization();
            })
    }

    useEffect(() => {
        fetch()
    }, [])
    console.log(tacks);
    if (!tacks) return <div>loading</div>

    return (
        <div className="bg-base-100 h-screen w-screen hd:overflow-hidden">
            <NavbarArtist artistName={artist!}></NavbarArtist>
            <div className="pt-9 flex px-12 hd:px-24">
                <Link to={`/discography/${artist}/${id_artist}`} className="text-4xl text-neutral flex items-center w-1/3">
                    <span>{"<"}</span>
                    <span className="hidden hd:block">&nbsp;All Artist Album</span></Link>
                <h1 className="text-6xl font-bold text-center overflow-hidden min-w-[33.33%] whitespace-nowrap">{tacks.name}</h1>
                <div className="w-1/3"></div>
            </div>
            <div className="flex flex-wrap py-9 px-12 hd:px-24 justify-center gap-x-12 hd:h-[80%] overflow-hidden w-full gap-y-10">
                <div className="flex flex-col w-[35%] min-w-[300px]">
                    <img src={tacks.images[0].url} alt="" className="rounded-lg" />
                    <h2 className="font-bold text-4xl text-center pt-4">
                        yyyy-mm-dd
                    </h2>
                </div>
                <div className="hd:min-w-[35%] hd:max-w-[50%] hd:overflow-y-scroll h-full w-full hd:w-fit">
                    <h2 className="text-5xl font-bold pb-3 text-center hd:text-start">TRACK</h2>
                    <div className="flex justify-center hd:justify-start">
                        <div className="text-4xl font-medium break-words max-w-full">
                            {tacks.tracks.items.map((x: { name: string }, i) => <p>{`${i}. ${x.name}`}</p>)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Track;