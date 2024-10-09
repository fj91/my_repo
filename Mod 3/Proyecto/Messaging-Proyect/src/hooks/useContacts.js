import React, { useState,useEffect } from "react";
import * as Contacts from "expo-contacts";

export function useContacts() {
  const [contacts, setContacts] = useState([]);
  useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === "granted") {
        const { data } = await Contacts.getContactsAsync({
          fields: [
            Contacts.Fields.FirstName,
            Contacts.Fields.LastName,
            Contacts.Fields.PhoneNumbers,
            Contacts.Fields.Image,
          ],
        });

        if (data.length > 0) {
          setContacts(data);
          //console.log(data);
        }
      }
    })();
  }, []);

  return contacts;
}
