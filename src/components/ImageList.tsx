import { useState, useEffect } from "react";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import { storage } from "../config/firebase";

//Image uploading from firebase storage
export const ImageList = () => {
  const [imageList, setImageList] = useState<string[]>([]);

  const imageListRef = ref(storage, "images/");

  const uploadImage = (imageUpload: File) => {
    const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImageList((prev) => [...prev, url]);
      });
    });
  };

  useEffect(() => {
    listAll(imageListRef).then((response) => {
      Promise.all(response.items.map((item) => getDownloadURL(item))).then(
        (urls) => {
          setImageList(urls);
        }
      );
    });
  }, []);

  return imageList;
};
