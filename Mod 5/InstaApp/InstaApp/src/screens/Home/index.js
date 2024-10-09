import styled from "@emotion/native";
import { View, RefreshControl } from "react-native";
import { useState, useEffect } from "react";
import { Title, Button, ActivityIndicator } from "react-native-paper";
import { auth } from "../../services/firebase";
import { FAB, List, Divider, Card } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import { FlatList } from "react-native-gesture-handler";
import {
  collection,
  getDocs,
  query,
  where,
  onSnapshot,
  orderBy,
} from "firebase/firestore";
import { firestore, storage } from "../../services/firebase";
import { renderPostItem } from "./components/renderPostItem";

const CenterBody = styled(View)`
  justify-content: center;
  align-items: center;
  padding: 10px 10px;
`;

const StyledTitle = styled(Title)`
  justify-content: center;
  align-self: center;
`;

const StyledButton = styled(Button)`
  justify-content: center;
  align-self: center;
`;

const StyledFlatList = styled(FlatList)`
  padding: 5px 20px;
`;

export function Home({ navigation }) {
  const [image, setImage] = useState(null);
  const [posts, setPosts] = useState([]);
  const [refreshing, setRefreshing] = useState(true);
  //console.log(auth.currentUser)

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadUserData();
    });   
    return () => {
      unsubscribe();
    };
  }, [navigation]);

  /*useEffect(() => {
    loadUserData();
  }, []);*/

  const loadUserData = async () => {
    //obtain list of followed by the authenticated user
    const query1 = await getDocs(
      query(collection(firestore, "users", auth.currentUser?.uid, "followed"))
    );

    const list = query1.docs.map((doc) => {
      const data = doc.data();
      const userID = data.userID;
      return {
        userID: userID,
      };
    });
    //console.log(list);
    //transform into value array for later use
    const arr = list.map((object) => object.userID);
    arr.push(auth.currentUser?.uid);
    //use the value arrau of userID to search for followed users posts
    const query2 = await getDocs(
      query(
        collection(firestore, "posts"),
        where("userID", "in", arr),
        orderBy("date", "desc")
      )
    );
    const posts = query2.docs.map((doc) => {
      const data = doc.data();
      const image = data.image;
      const caption = data.description;
      return {
        id: doc.id,
        image: image,
        caption: caption,
      };
    });
    //console.log(posts);
    setPosts(posts);
    setRefreshing(false);

    return [];
  };  

  const handleLogout = async () => {
    auth
      .signOut()
      .then(() => {
        // Sign-out successful.
        navigation.replace("Login");
        console.log("Signed out successfully");
      })
      .catch((error) => {
        // An error happened.
      });
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      aspect: [4, 3],
      quality: 1,
    });

    //console.log(result);

    if (!result.canceled || result.assets !== null) {
      setImage(result.assets[0].uri);
      const imageURI = result.assets[0].uri;
      //console.log("state", imageURI);
      // Upload image to firebase storage
      navigation.navigate("Add", { imageURI });
    }

    // Persist in firestore
  };

  return (
    <>
      <CenterBody>
        <View style={{ flexDirection: "row" }}>
          <StyledTitle>Hola {auth.currentUser?.email}</StyledTitle>
          <StyledButton
            mode="text"
            icon="logout"
            onPress={handleLogout}
          ></StyledButton>
        </View>
      </CenterBody>
      {refreshing ? <ActivityIndicator /> : null}
      <StyledFlatList
        data={posts}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={loadUserData} />
        }
        keyExtractor={(item) => item.id}
        renderItem={renderPostItem}
      />
      <FAB
        icon="camera"
        style={{ position: "absolute", bottom: 30, right: 30 }}
        onPress={pickImage}
      />
    </>
  );
}
