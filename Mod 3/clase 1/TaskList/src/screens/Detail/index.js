import { Text, View, TextInput, Button } from "react-native";
import styled from "@emotion/native";

const CenterBody = styled(View)`
  justify-content: center;
  align-items: center;
  padding: 30px 30px;
`;

export function Detail({ route }) {  
    const { task } = route.params;
    const { description } = route.params;
  return (
    <CenterBody>
      <Text>Tarea: {JSON.stringify(task)}</Text>
      <Text>Descripción: {JSON.stringify(description)}</Text>
    </CenterBody>
  );
}
