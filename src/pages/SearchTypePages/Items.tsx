import { AllListings } from "../../components/AllListings";

export function Items() {
    const title= "Tárgyak"
    return (
        <div className="listingBackground">
            <h1>{title} </h1>
            <AllListings typeOfItem="Item" maxItemToShow={100}/>
        </div>
    );
}
