import { Link } from "react-router-dom";
import AlbumCard from "../components/AlbumCard";
import NavbarArtist from "../components/NavbarArtist";

function Discography() {
    const artistName = "BTS"

    return (
        <div className="bg-base-100 h-screen w-screen">
            <NavbarArtist artistName={artistName}></NavbarArtist>
            <div className="pt-9 flex px-12 hd:px-24">
                <Link to="/" className="text-4xl text-neutral flex items-center w-1/3">
                    <span>{"<"}</span>
                    <span className="hidden hd:block">&nbsp;All Artist</span></Link>
                <h1 className="text-6xl font-bold text-center overflow-hidden min-w-[33.33%] whitespace-nowrap">TOMORROW X TOGETHERTOMORROWXTOGETHER</h1>
                <div className="w-1/3"></div>
            </div>
            <div className="px-24 py-9 grid m:grid-cols-2 l:grid-cols-3 hd:grid-cols-4 4k:grid-cols-5 place-items-center gap-y-9 gap-x-12 overflow-hidden">
                <AlbumCard></AlbumCard>
                <AlbumCard></AlbumCard>
                <AlbumCard></AlbumCard>
                <AlbumCard></AlbumCard>
                <AlbumCard></AlbumCard>
                <AlbumCard></AlbumCard>
                <AlbumCard></AlbumCard>
                <AlbumCard></AlbumCard>
                <AlbumCard></AlbumCard>
                <AlbumCard></AlbumCard>
            </div>
        </div>
    )
}

export default Discography;