import { Link } from "react-router-dom";
import NavbarArtist from "../components/NavbarArtist";

function Track() {
    const artistName = "BTS"

    return (
        <div className="bg-base-100 h-screen w-screen hd:overflow-hidden">
            <NavbarArtist artistName={artistName}></NavbarArtist>
            <div className="pt-9 flex px-12 hd:px-24">
                <Link to="/discography" className="text-4xl text-neutral flex items-center w-1/3">
                    <span>{"<"}</span>
                    <span className="hidden hd:block">&nbsp;All Artist Album</span></Link>
                <h1 className="text-6xl font-bold text-center overflow-hidden min-w-[33.33%] whitespace-nowrap">TOMORROW X TOGETHERTOMORROWXTOGETHER</h1>
                <div className="w-1/3"></div>
            </div>
            <div className="flex flex-wrap py-9 px-12 hd:px-24 justify-center gap-x-12 hd:h-[80%] overflow-hidden w-full gap-y-10">
                <div className="flex flex-col w-[35%] min-w-[300px]">
                    <img src="https://i.scdn.co/image/ab67616d0000b27317db30ce3f081d6818a8ad49" alt="" className="rounded-lg" />
                    <h2 className="font-bold text-4xl text-center pt-4">
                        yyyy-mm-dd
                    </h2>
                </div>
                <div className="hd:min-w-[35%] hd:max-w-[50%] hd:overflow-y-scroll h-full w-full hd:w-fit">
                    <h2 className="text-5xl font-bold pb-3 text-center hd:text-start">TRACK</h2>
                    <div className="flex justify-center hd:justify-start">
                        <div className="text-4xl font-medium break-words max-w-full">
                            <p>1. Song Name</p>
                            <p>2. Song Name</p>
                            <p>3. Song Name</p>
                            <p>4. Song Name</p>
                            <p>5. Song Name</p>
                            <p>6. Song Name</p>
                            <p>7. Song Name</p>
                            <p>8. Song Name</p>
                            <p>9. Song Name</p>
                            <p>10. Song Name</p>
                            <p>11. Song Name</p>
                            <p>12. Song Name</p>
                            <p>13. Song Name</p>
                            <p>14. Song Name</p>
                            <p>15. Song Name</p>
                            <p>16. Song Name</p>
                            <p>17. Song Name</p>
                            <p>18. Song Name</p>
                            <p>19. Song Name</p>
                            <p>20. Song Name</p>
                            <p>21. Song Name</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Track;