import { auth, db, storage } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import "../formating/user.css";
import "../formating/format.css"
import picture from "../../public/pictures/imgs/cool_pic.jpg"
import { Button, Modal } from "react-bootstrap";
import { useState, useEffect , useRef} from "react";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { itemSchema } from "../components/ItemValidation";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {useImmer} from "use-immer"

export const SellItem = () => {
  const [newItem, setNewItem] = useState(
      {
        description: "",
        image: "",
        itemType: "",
        price : "",
        title : "",
        userId: "",
      }
  )
  //User auth for authentication purpoise
  const [user] = useAuthState(auth);

  //firebase database
  const itemsCollectionRef = collection(db, "Item");
  //Pop up after the post has been made
  const [show, setShow] = useState(false);

  //for keeping track of the items that are beeing uploaded to the firebase database also I added all of the target values as properties for this state (the values whicha re given to this state are stored in the firebase)
  const [itemList, setItemList] = useState<any>([]);

  // New Image upload method, the file representing the current chosen file and the new files url is stored in the newFile state so it can be easily used

  const [file, setFile] = useState<any>("");
  const [newFile, setNewFile] = useState<string>("");

  const resetSelect = () => {
    setNewItem((prevItem) => {
      return {
        ...prevItem,
        itemType: "Válassz egy típust"
      };
    });
  };

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
  const seller = user?.displayName;
  const onSubmitData = async (formData: any) => {
    try {
      await addDoc(itemsCollectionRef, {
        title: newItem.title,
        price: newItem.price,
        description: newItem.description,
        itemType: newItem.itemType,
        images: newFile,
        userId: auth?.currentUser?.uid, //needed for knowing which user is who
        seller: seller,
      });
      setShow(true);
    } catch (err) {
      console.error(err);
    }
  };
  //Resets the fields value after pushing it
  const resetFields = () => {
    setNewItem({
      ...newItem,
      description: "",
      image: "",
      itemType: "",
      price: "",
      title: ""
    })


  };


  //We want to display the chosen files name so I added a fileLabel to the on change event but we also want to set the current files value with the chosen file so we need to make a function which can trigger both function at the same time when the onChange event triggers.
  const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
   // setNewItem({
   //       ...newItem,
   //       image: event.target.files
   //      }
   // )
    setFile(file);
    const fileLabel = document.querySelector("#fileLabel");
  };

  const resolver = yupResolver(itemSchema);

    //When we have multiple functions which we want to trigger when pressing the button we need to make a new function which triggers the functions
  const handleUpload = async () => {
    try {
      // Manually validate the form data using the resolver
      const formData = await resolver;

      // If validation is successful, proceed with onSubmitData
      await onSubmitData(formData);

      // Then, setShow and resetFields as needed
      setShow(true);
      resetFields();
      setFile("")
      resetSelect()
    } catch (validationErrors) {
      // Handle validation errors, if any
      console.error(validationErrors);
    }
  };

  function handleDescriptionChange(e:any) {
    setNewItem((prevState)=> {
      return { ...prevState, description: e.target.value }
    })
  }
  function handleItemTypeChange(e:any) {
    setNewItem((prevState) =>{
      return { ...newItem, itemType: e.target.value }
    })
  }
  function handlePriceChange(e:any) {
    setNewItem((prevState) => {
      return { ...newItem, price: e.target.value }
    })
  }
  function handleItemTitleChange(e:any) {
    setNewItem((prevState) => {
      return { ...prevState, title: e.target.value}
    })
  }

  const inputChangeHandler = (identifier:string, value:any) => {
    if (identifier === "description") {
      setNewItem((prevState) => {
        return { ...prevState, description: value}
      })
    } else if (identifier === "itemType") {
      setNewItem((prevState) => {
        return { ...prevState, itemType: value}
      })
    } else if (identifier === "price") {
      setNewItem((prevState) => {
        return { ...prevState, price: value}
      })
    } else if (identifier === "title") {
      setNewItem((prevState) => {
        return { ...prevState, title: value}
      })
    }
  }

  return (

    <div style={{justifyContent:"center",
    alignItems:"center",
    display:"flex",
    backgroundColor: "#29465B",
    borderRadius:"20px",
    
  }}
    >
    <div className="listing_data m-5">
      <input
        id="fileInput"
        className="mb-4 form-control file-input"
        type="file"
        onChange={handleFileInputChange}
      />
      <label htmlFor="fileInput" className="custom-button fill-button" style={{marginBottom: "20px",marginLeft: "30%"}} >
        {file === "" ? "Válassz egy képet" : "Válassz másik képet"}
      </label>
      {file &&      
      <img src={URL.createObjectURL(file)} alt="kiválasztott kép" style={{maxHeight:"250px",width:"250px",objectFit: "cover", margin: "20px", borderRadius:"20px",marginLeft: "22%"}}/>}

      <div className="mb-4">
        <label style={{marginBottom:"10px", fontWeight:"Bold", marginLeft:"5px"}}>Adj meg egy címet</label>
        <input
          type="text"
          className="form-control"
          placeholder="Cím"
          onChange={(e) => inputChangeHandler("title", e.target.value)}
          value={newItem.title}
          required={true}
        />
      </div>
      <div className="mb-4">
      <label style={{marginBottom:"10px", fontWeight:"Bold", marginLeft:"5px"}}>Válassz egy típust</label>
        <select
          className="form-select"
          onChange={(e) => inputChangeHandler("itemType", e.target.value)}
        >
          <option value="Choose one">Válassz egy típust</option>
          <option value="Clothes">Ruha</option>
          <option value="Item">Tárgy</option>
          <option value="Food">Étel</option>
          <option value="Book">Könyv</option>
          <option value="Other">Egyéb</option>
        </select>
      </div>
      <div className="mb-4">
      <label style={{marginBottom:"10px", fontWeight:"Bold", marginLeft:"5px"}}>Határozz meg egy árat</label>
        <input
          type="number"
          className="form-control"
          placeholder="Ár"
          onChange={(e) => inputChangeHandler("price", e.target.value)}
          value={newItem.price}
          required={true}
        />
      </div>
      <div className="mb-4">
      <label style={{marginBottom:"10px", fontWeight:"Bold", marginLeft:"5px"}}>Írj egy leírást</label>
        <textarea
          className="form-control"
          placeholder="Leírás"
          onChange={(e) => inputChangeHandler("description", e.target.value)}
          value={newItem.description}
        />
      </div>
      <button
        className="custom-button fill-button"
        style={{marginLeft: "40%"}}
        disabled={
          newItem.title.length < 2 ||
          newItem.price.length < 1 ||
          !newFile ||  // Check if newFile (image URL) is empty
          newItem.itemType === "Válassz egy típust"
        }
        onClick={handleUpload}
      >
        Létrehozás
      </button>
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Sikeres feltőltés!</Modal.Title>
        </Modal.Header>
        <Modal.Body>A hirdetésedet sikeresen létrehoztad.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Bezár
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  </div>
)}  
