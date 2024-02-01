import ArtistCard from "../components/ArtistCard";
import Navbar from "../components/Navbar";

function Home() {
    return (
        <div className="bg-base-100 h-screen w-screen">
            <Navbar></Navbar>
            <h1 className="text-center pt-9 text-6xl font-bold">ARTIST</h1>
            <div className="px-24 py-9 grid m:grid-cols-2 l:grid-cols-3 hd:grid-cols-4 4k:grid-cols-5 place-items-center gap-y-9 gap-x-12 overflow-hidden">
                <ArtistCard></ArtistCard>
                <ArtistCard></ArtistCard>
                <ArtistCard></ArtistCard>
                <ArtistCard></ArtistCard>
                <ArtistCard></ArtistCard>
                <ArtistCard></ArtistCard>
                <ArtistCard></ArtistCard>
                <ArtistCard></ArtistCard>
                <ArtistCard></ArtistCard>
                <ArtistCard></ArtistCard>
                <ArtistCard></ArtistCard>
                <ArtistCard></ArtistCard>
                <ArtistCard></ArtistCard>
                <ArtistCard></ArtistCard>
            </div>
        </div>)
}

export default Home;