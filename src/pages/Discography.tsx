import NavbarArtist from "../components/NavbarArtist";

function Discography() {
    const artistName = "BTS"

    return (
        <div className="bg-base-100 h-screen w-screen">
            <NavbarArtist artistName={artistName}></NavbarArtist>
            <h1>Discography</h1>
        </div>
    )
}

export default Discography;