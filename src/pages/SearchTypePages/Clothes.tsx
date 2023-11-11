import { AllListings } from "../../components/AllListings";

export function Clothes() {
  const title = "Ruhák"
  return (
    <div className="listingBackground">
      <h1>{title}</h1>
      <AllListings typeOfItem="Clothes" maxItemToShow={100}/>
    </div>
  );
}
