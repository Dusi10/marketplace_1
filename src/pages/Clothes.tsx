import { AllListings } from "../components/AllListings";

export function Clothes() {
  
  return (
    <div>
      <h1>Clothes</h1>
      <AllListings typeOfItem="Clothes" maxItemToShow={100}/>
    </div>
  );
}
