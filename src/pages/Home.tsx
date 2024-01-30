import ArtistCard from "../components/ArtistCard";
import Navbar from "../components/Navbar";

function Home() {
    return (
        <div className="bg-base-100 h-screen w-screen">
            <Navbar></Navbar>
            <h1 className="text-center pt-9 text-6xl font-bold">ARTIST</h1>
            <div className="px-24 py-9 grid sm:grid-cols-2 md:grid-cols-3 tablet:grid-cols-2 hd:grid-cols-3 fhd:grid-cols-4 place-items-center gap-y-9">
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