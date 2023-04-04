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
  //User auth for authentication purpoise
  const [user] = useAuthState(auth);

  // these states are representing the datas which uploading to the firebase
  const [newItemTitle, setNewItemTitle] = useState("");
  const [newItemPrice, setNewItemPrice] = useState("number");
  const [newItemDescription, setNewItemDescription] = useState("");
  //firebase database
  const itemsCollectionRef = collection(db, "Item");
  //Pop up after the post has been made
  const [show, setShow] = useState(false);

  //for keeping track of the items that are beeing uploaded to the firebase database also I added all of the target values as properties for this state (the values whicha re given to this state are stored in the firebase)
  const [itemList, setItemList] = useState<any>([]);

  // New Image upload method, the file representing the current chosen file and the new files url is stored in the newFile state so it can be easily used

  const [file, setFile] = useState<any>("");
  const [newFile, setNewFile] = useState([]);

  // Image useeffect, this one gives a new name for the file case if there are multiple files with the same name it will refresh the picture to the newest one so I added a date and time which refreshes before the files name so there wont be two same file names.
  //I also keep track of the files uploading state so later on I can make adjustmants to disable the submit button in case the file hasnt been uploaded yet
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
              break;
          }
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setNewFile(downloadURL);
          });
        }
      );
    };
    file && uploadFile();
  }, [file]);

  //data useEffect
  useEffect(() => {
    const getItemList = async () => {
      //maps the datas to the docs and sets the itemlist with the new value
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

  //When the button is pressed the values are set with the fields current value and uploades it to the firebase database and also the setShow is getting a truthy value case in case it gets a truthy value it shows up and after it we can close it, it's just a nice way to show that the upload is done
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
  //Resets the fields value after pushing it
  const resetFields = () => {
    setNewItemDescription("");
    setNewItemPrice("");
    setNewItemTitle("");
  };

  //When we have multiple functions which we want to trigger when pressing the button we need to make a new function which triggers the functions
  const handleUpload = () => {
    onSubmitData();
    setShow(true);
    resetFields();
  };

  //We want to display the chosen files name so I added a fileLabel to the on change event but we also want to set the current files value with the chosen file so we need to make a function which can trigger both function at the same time when the onChange event triggers.
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
        <div className="listing_data mb-3">
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
              value={newItemTitle}
            />
          </div>
          <div className="mb-4">
            <input
              type={"number"}
              className="input-price"
              placeholder="Price"
              onChange={(e) => setNewItemPrice(e.target.value)}
              value={newItemPrice}
            />
          </div>
          <div className="mb-4">
            <textarea
              className="input-description"
              placeholder="Description"
              onChange={(e) => setNewItemDescription(e.target.value)}
              value={newItemDescription}
            />
          </div>
          <Button onClick={handleUpload} variant="outline-primary">
            Upload
          </Button>
          {/*Pop up for when the upload is complete*/}
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
