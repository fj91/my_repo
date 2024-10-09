import { addDoc, collection } from "firebase/firestore";
import { firestore, storage } from "../../../services/firebase";
import { ref, uploadBytes } from "firebase/storage";

export async function uploadImageAsync(uri, chatId, auth) {
    // Why are we using XMLHttpRequest? See:
    // https://github.com/expo/expo/issues/2402#issuecomment-443726662
    const extension = uri.split(".").slice(-1)[0];
    const path = "messaging_project_chats/" + chatId + "/" + new Date().toISOString() + "." + extension;
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

    addDoc(collection(firestore, "chats", chatId, "messages"), {
        content: path,
        createdAt: new Date(),
        phone: auth,
        type: "image",
      });    
  }