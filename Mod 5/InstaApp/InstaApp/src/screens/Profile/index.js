import styled from "@emotion/native";
import { View } from "react-native";
import { useState, useEffect } from "react";
import {
  Title,
  Button,
  TextInput,
  Avatar,
  Text,
  Divider,
} from "react-native-paper";
import { auth, firestore } from "../../services/firebase";
import {
  addDoc,
  collection,
  doc,
  query,
  where,
  onSnapshot,
  orderBy,
  getDownloadURL,
  ref,
  or,
  and,
  FieldPath,
  deleteDoc,
} from "firebase/firestore";

const CenterBody = styled(View)`
  justify-content: center;
  padding: 20px 30px;
`;

const StyledTitle = styled(Title)`
  justifyContent: "flex-start"
  
  padding: 5px 5px;
`;

const StyledInfo = styled(Text)`
  justifyContent: "flex-start"    
  padding-left: 10px
`;

const StyledImage = styled.Image`
  width: 300px;
  height: 300px;
  resize-mode: contain;
`;

const StyledButton = styled(Button)`
  margin-top: 20px;
`;

export function Profile(props) {
  const [followed, setFollowed] = useState(false);
  const [item, setItem] = useState("");

  useEffect(() => {
    const unsuscribe = onSnapshot(
      query(collection(firestore, "users", auth.currentUser?.uid, "followed")),
      (snapshot) => {
        const followedList = snapshot.docs.map((doc) => {
          const data = doc.data();
          //console.log("data", data);
          return {
            id: doc.id,
            ...doc.data(),
          };
        });
        //console.log("data", followedList);       
        followedList.some((element) => {
          if (element.userID === props.route.params.item.id) {
            setFollowed(true);
            setItem(element.id);            
          }
        });        
      }
    );
    return () => {
      unsuscribe();
    };
  }, []);

  //console.log("Seguido", followed);  

  const handleFollow = async (followedID) => {
    //console.log("user", auth.currentUser?.uid);
    //console.log("followed", followedID);   
    if (!followed) {
      //console.log("Seguir");
      addDoc(
        collection(firestore, "users", auth.currentUser?.uid, "followed"),
        {
          date: new Date(),
          userID: followedID,
        }
      );
      setFollowed(true);
    } else {
        //console.log("No seguir");
        await deleteDoc(doc(firestore, "users",  auth.currentUser?.uid, "followed", item));
        setFollowed(false);
    }
  };

  return (
    <>
      <CenterBody>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
          }}
        >
          <Avatar.Text
            size={100}
            label={props.route.params.item.name
              .split(" ")
              .slice(0, 2)
              .map((e) => e[0])
              .join("")}
            color="white"
          />
          <View
            style={{
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "flex-start",
            }}
          >
            <StyledInfo>17</StyledInfo>
            <StyledInfo>Publicaciones</StyledInfo>
          </View>
          <View
            style={{
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "flex-start",
            }}
          >
            <StyledInfo>10</StyledInfo>
            <StyledInfo>Seguidos</StyledInfo>
          </View>
          <View
            style={{
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "flex-start",
            }}
          >
            <StyledInfo>8</StyledInfo>
            <StyledInfo>Seguidores</StyledInfo>
          </View>
        </View>
        <Divider style={{ height: 2, marginTop: 10 }} />
        <StyledTitle>
          {props.route.params.item.name +
            " " +
            props.route.params.item.lastname}{" "}
        </StyledTitle>
        <StyledTitle>{props.route.params.item.email} </StyledTitle>
        <StyledButton mode="contained" onPress={() => handleFollow(props.route.params.item.id)}>
          {followed ? "Dejar de seguir" : "Seguir"}
        </StyledButton>
      </CenterBody>
    </>
  );
}
