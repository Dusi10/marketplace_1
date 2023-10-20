import { AllListings } from "../components/AllListings";

export function Items() {

    return (
        <div>
            <h1>Clothes</h1>
            <AllListings typeOfItem="Item" maxItemToShow={100}/>
        </div>
    );
}
