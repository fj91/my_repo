import styled from "@emotion/native";
import { getDownloadURL, ref } from "firebase/storage";
import { useEffect, useState } from "react";
import { ActivityIndicator, Button, Card, Text, Avatar  } from "react-native-paper";
import { storage } from "../../../services/firebase";
import { useNavigation } from "@react-navigation/native";

const StyledCard = styled(Card)`
  margin-top: 20px;
`;

const PostImageItem = (props) => {
    const [postImage, setPostImage] = useState(null);
    const { id, image, caption } = props;
    const navigation = useNavigation();
    
    useEffect(
      function () {
        async function loadImageFromStorage() {      
          const imageRef = ref(storage, image);       
          const url = await getDownloadURL(imageRef);        
          setPostImage(url);
        }
        loadImageFromStorage();
      },
      [image]
    );

    const handleComments = () => {
      console.log("handleComments")
      navigation.navigate("Comments", {id});
    };
    
    return (
      <StyledCard mode="outlined">
        <Card.Title title="Nombre Usuario" left={(props) => <Avatar.Text size={30} label="NU" />}/>
        {postImage ? (
          <Card.Cover source={{ uri: postImage }} />
        ) : (
          <ActivityIndicator />
        )}
        <Card.Content>
          <Text variant="bodyMedium">{caption}</Text>
        </Card.Content>
        <Card.Actions>
          <Button mode="text" icon="heart" onPress={() => console.log("pressed")}></Button>
          <Button mode="text" icon="comment-outline" onPress={handleComments}></Button>
        </Card.Actions>
      </StyledCard>
    );
  };
  
 export const renderPostItem = (row) => {  
    const { index, item } = row;  
    return <PostImageItem {...item} />;  
  };