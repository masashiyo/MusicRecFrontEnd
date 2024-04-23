import { Link } from "react-router-dom";

export default function NavigationBar() {


    return (
        <nav className="fixed font-semibold text-xl flex bg-[#121212] p-4 w-[100%] z-50">
            <div className="text-sm">
                <Link className="block mt-4 lg:mt-0 text-white hover:text-green-100 mr-4" to="/home">Home</Link>
            </div>
            <div className="text-sm">
                <Link className="block mt-4 lg:mt-0 text-white hover:text-green-100 mr-4" to="/songRecommendation">Song Recommendations</Link>
            </div>
            <div className="text-sm">
                <Link className="block mt-4 lg:mt-0 text-white hover:text-green-100 mr-4" to="/topSongsAndArtists">Top Tracks and Artists</Link>
            </div>
            <div className="text-sm">
                <Link className="block mt-4 lg:mt-0 text-white hover:text-green-100 mr-4" to="/heardle">Heardle</Link>
            </div>
        </nav>
    )

}