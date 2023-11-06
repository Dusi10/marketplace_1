import { AllListings } from "../components/AllListings";

export function Clothes() {
  const title = "Clothes"
  return (
    <div>
      <h1>{title}</h1>
      <AllListings typeOfItem="Clothes" maxItemToShow={100}/>
    </div>
  );
}
