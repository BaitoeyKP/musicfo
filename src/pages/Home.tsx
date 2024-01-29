import ArtistCard from "../components/ArtistCard";
import Navbar from "../components/Navbar";

function Home() {
    return (
        <div className="bg-base-100 h-screen w-screen">
            <Navbar></Navbar>
            <h1 className="text-center pt-[2%] font-bold text-2xl hd:text-4xl fhd:text-6xl 4k:text-8xl">ARTIST</h1>
            <div className="px-[5%] py-[2%] grid grid-cols-2 hd:grid-cols-3 fhd:grid-cols-4 4k:grid-cols-5 place-items-center gap-y-[2%]">
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