import { useNavigate } from "react-router-dom";
import { auth, db, storage } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import "../formating/user.css";
import { Button, Modal } from "react-bootstrap";
import { useState, useEffect } from "react";
import {
  ref,
  uploadBytes,
  listAll,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";
import { v4 } from "uuid";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
} from "firebase/firestore";



export const SellItem = () => {
  //User auth
  const [user] = useAuthState(auth);
  // Image Upload

  // Data Upload
  const [newItemTitle, setNewItemTitle] = useState("");
  const [newItemPrice, setNewItemPrice] = useState("number");
  const [newItemDescription, setNewItemDescription] = useState("");

  const itemsCollectionRef = collection(db, "Item");
  //Pop up
  const [show, setShow] = useState(false);

  //useeffect
  const [itemList, setItemList] = useState<any>([]);

  // New Image upload method

  const [file, setFile] = useState<any>("");
  const [newFile, setNewFile] = useState([])

  useEffect(() => {
    const uploadFile = () => {
      const name = new Date().getTime() + file.name;

      const storageRef = ref(storage, name);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
              default:
              break
          }
        },
        (error) => {
          console.log(error)
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setNewFile(downloadURL);
          });
        }
      );
    };
    file && uploadFile()
  },[file]);


  //data effect
  useEffect(() => {
    const getItemList = async () => {
      //Read the data
      //See the item list
      try {
        const data = await getDocs(itemsCollectionRef);
        const filteredItems = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setItemList(filteredItems);
      } catch (err) {
        console.log(err);
      }
    };
    getItemList();
  }, []);
  //Data Upload
  const onSubmitData = async () => {
    try {
      await addDoc(itemsCollectionRef, {
        title: newItemTitle,
        price: newItemPrice,
        description: newItemDescription,
        images: newFile,
        userId: auth?.currentUser?.uid, //needed for knowing which user is who
      });
      setShow(true);
    } catch (err) {
      console.error(err);
    }
  };
  const handleUpload = () => {
    // uploadImage(imageUpload, setImageList);
    onSubmitData();
    setShow(true);
  };

  const handleFileInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files ? event.target.files[0] : null;
    setFile(file);
    const fileLabel = document.querySelector("#fileLabel");
    if (fileLabel && file) {
      fileLabel.textContent = file.name;
    }
  };

  return (
    <>
      <div className="user-container">
        <img
          className="user-image mb-2"
          src={user?.photoURL || ""}
          alt="User profile"
        />
        <p className="user-name mb-3">{user?.displayName}</p>
        <div className="listing_data mb-4">
          <input
            id="fileInput"
            className="mb-4"
            type="file"
            onChange={handleFileInputChange}
          />
          <label htmlFor="fileInput" id="fileLabel">
            Choose a Photo
          </label>
          <div className="mb-4">
            <input
              type={"string"}
              className="input-title"
              placeholder="Title"
              onChange={(e) => setNewItemTitle(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <input
              type={"number"}
              className="input-price"
              placeholder="Price"
              onChange={(e) => setNewItemPrice(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <textarea
              className="input-description"
              placeholder="Description"
              onChange={(e) => setNewItemDescription(e.target.value)}
            />
          </div>
          <Button onClick={handleUpload} variant="outline-primary">
            Upload
          </Button>

          <Modal show={show} onHide={() => setShow(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Upload complete!</Modal.Title>
            </Modal.Header>
            <Modal.Body>Your file has been uploaded successfully.</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShow(false)}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </>
  );
};
