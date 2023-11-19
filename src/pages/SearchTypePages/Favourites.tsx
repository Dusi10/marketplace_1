import { FavouriteListings } from "../../components/FavouriteListings";

export function Favourites() {
    const title = "Kedvencek"
    return (
        <div className="listingBackground">
            <FavouriteListings title={title}/>
        </div>
    );
}
