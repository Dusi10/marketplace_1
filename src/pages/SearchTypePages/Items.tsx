import { AllListings } from "../../components/AllListings";

export function Items() {
    const title= "Tárgyak"
    return (
        <div className="listingBackground">
            <AllListings typeOfItem="Item" maxItemToShow={100} title={title}/>
        </div>
    );
}
