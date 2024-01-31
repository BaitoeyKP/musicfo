import { Link } from "react-router-dom";
import NavbarArtist from "../components/NavbarArtist";

function Track() {
    const artistName = "BTS"

    return (
        <div className="bg-base-100 h-screen w-screen">
            <NavbarArtist artistName={artistName}></NavbarArtist>
            <div className="px-24">
                <div className="pt-9 flex">
                    <Link to="/discography" className="text-4xl text-neutral flex items-center w-1/3">{"<"} All Artist Album</Link>
                    <h1 className="text-6xl font-bold text-center overflow-hidden min-w-[33.33%] whitespace-nowrap">TOMORROW X TOGETHERTOMORROWXTOGETHER</h1>
                    <div className="w-1/3"></div>
                </div>
                <div>
                    <div className="flex flex-col w-[320px] fhd:w-[640px]">
                        <picture className="rounded-lg">
                            <source
                                media="(min-width: 1920px)"
                                srcSet="https://i.scdn.co/image/ab6761610000e5ebd642648235ebf3460d2d1f6a"
                            />
                            <img
                                src="https://i.scdn.co/image/ab67616100005174d642648235ebf3460d2d1f6a"
                                className="rounded-lg"
                                alt=""
                            />
                        </picture>
                        <h2 className="font-bold text-4xl text-center pt-4">
                            yyyy-mm-dd
                        </h2>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Track;