import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { firestore } from "../../../services/firebase";

export function listenToChats(chatId, callback) {
  return onSnapshot(
    query(
      collection(firestore, "chats", chatId, "messages"),
      orderBy("createdAt", "desc")
    ),
    (snapshot) => {
      const firestoreMsgs = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      callback(firestoreMsgs);
    }
  );
}
