import { FavouriteListings } from "../components/FavouriteListings";

export function Favourites() {
    const title = "Kedvencek"
    return (
        <div>
            <h1>{title}</h1>
            <FavouriteListings/>
        </div>
    );
}
