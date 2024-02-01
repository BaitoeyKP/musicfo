import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

function Favorite() {
    return (
        <div className="bg-base-100 h-screen w-screen">
            <Navbar></Navbar>
            <div className="pt-9 flex px-24">
                <Link to="/" className="text-4xl text-neutral flex items-center w-1/3">{"<"} Home</Link>
                <h1 className="text-6xl font-bold text-center overflow-hidden min-w-[33.33%] whitespace-nowrap">FAVORITE</h1>
                <div className="w-1/3"></div>
            </div>
            <div>
                
            </div>
        </div>
    )
}

export default Favorite;