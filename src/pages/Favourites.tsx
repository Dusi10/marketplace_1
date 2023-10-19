import { AllListings } from "../components/AllListings";

export function Favourites() {

    return (
        <div>
            <h1>Clothes</h1>
            <AllListings typeOfItem="Clothes" maxItemToShow={100}/>
        </div>
    );
}
