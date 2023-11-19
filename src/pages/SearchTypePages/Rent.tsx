import { AllListings } from "../../components/AllListings";

export function Rent() {
  const title = "Könyvek"
  return (
    <div className="listingBackground">
      <AllListings typeOfItem="Book" maxItemToShow={100} title={title}/>
    </div>
  );
}
