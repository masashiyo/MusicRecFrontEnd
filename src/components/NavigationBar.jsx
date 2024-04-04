import { Link } from "react-router-dom";

export default function NavigationBar() {


    return (
        <div className="bg-white">
            <div>
                <Link to="/home">Home</Link>
            </div>
            <div>
                <Link to="/songRecommendation">Song Recommendations</Link>
            </div>
            <div>
                <Link to="/topSongsAndArtists">Top Tracks and Artists</Link>
            </div>
        </div>
    )

}