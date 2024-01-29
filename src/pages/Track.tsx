import NavbarArtist from "../components/NavbarArtist";

function Track() {
    const artistName = "BTS"

    return (
        <div className="bg-base-100 h-screen w-screen">
            <NavbarArtist artistName={artistName}></NavbarArtist>
            <h1>Track</h1>
        </div>
    )
}

export default Track;