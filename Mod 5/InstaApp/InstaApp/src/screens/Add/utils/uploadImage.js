import { addDoc, collection, getDoc, getDocs } from "firebase/firestore";
import { firestore, storage } from "../../../services/firebase";
import { ref, uploadBytes } from "firebase/storage";
import { auth } from "../../../services/firebase";

export async function uploadImageAsync(uri, caption) {
    // Why are we using XMLHttpRequest? See:
    // https://github.com/expo/expo/issues/2402#issuecomment-443726662
    const extension = uri.split(".").slice(-1)[0];
    const path = "instagram-clone-posts-image/" + auth.currentUser?.uid + "/" + new Date().toISOString() + "." + extension;
    const imageRef = ref(storage, path);
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.log(e);
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", uri, true);
      xhr.send(null);
    });
    await uploadBytes(imageRef, blob);    

    addDoc(collection(firestore, "posts"), {
        date: new Date(),
        description: caption,
        image: path,        
        userID: auth.currentUser?.uid,        
      });    
  }