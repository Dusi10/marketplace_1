import { FavouriteListings } from "../../components/FavouriteListings";

export function Favourites() {
    const title = "Kedvencek"
    return (
        <div className="listingBackground">
            <h1>{title}</h1>
            <FavouriteListings/>
        </div>
    );
}
