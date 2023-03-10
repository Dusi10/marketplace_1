import { auth } from "../config/firebase";
import "../formating/pictures.css";

export function Home() {
  return (
    <div className="pictures-container">
      <img
        className="picture"
        src="src\pictures\generic book open.jpg"
        alt="Book"
      />
      <img
        className="picture"
        src="src\pictures\generic book open.jpg"
        alt="Book"
      />
      <img
        className="picture"
        src="src\pictures\generic book open.jpg"
        alt="Book"
      />
      <img
        className="picture"
        src="src\pictures\generic book open.jpg"
        alt="Book"
      />
      <img
        className="picture"
        src="src\pictures\generic book open.jpg"
        alt="Book"
      />
      <img
        className="picture"
        src="src\pictures\generic book open.jpg"
        alt="Book"
      />
    </div>
  );
}
