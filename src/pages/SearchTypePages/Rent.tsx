import { AllListings } from "../../components/AllListings";

export function Rent() {
  const title = "Könyvek"
  return (
    <div className="listingBackground">
      <h1>{title} </h1>
      <AllListings typeOfItem="Book" maxItemToShow={100}/>
    </div>
  );
}
