import { useState, useEffect } from "react";
import { ref, listAll, getDownloadURL } from "firebase/storage";
import { storage } from "../config/firebase";
import "../formating/pictures.css";

export const Listings = () => {
  const [imageList, setImageList] = useState<string[]>([]);

  const imageListRef = ref(storage, "images/");

  useEffect(() => {
    listAll(imageListRef).then((response) => {
      Promise.all(response.items.map((item) => getDownloadURL(item))).then(
        (urls) => {
          setImageList(urls);
        }
      );
    });
  }, []);

  return (
    <div className="Listing_Pictures">
      {imageList.map((url) => {
        return <span><img key={url} className="upload_img" src={url} alt="Listing" /></span>;
      })}
    </div>
  );
};
