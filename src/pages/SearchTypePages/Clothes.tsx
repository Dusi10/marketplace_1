import { Container } from "react-bootstrap";
import { AllListings } from "../../components/AllListings";

export function Clothes() {
  const title = "Ruhák";
  return (
    <div className="listingBackground">
        <AllListings typeOfItem="Clothes" maxItemToShow={100} title={title} />
    </div>
  );
}
