import styled from "@emotion/native";
import { useState, useEffect } from "react";
import { Text, View, Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FlatList } from "react-native-gesture-handler";
import { useNavigation, useIsFocused } from "@react-navigation/native";


const CenterBody = styled(View)`
  justify-content: center;
  align-items: center;
  padding: 30px 30px;
`;

const StyledButton = styled(Button)`
  width: 60%;
  margin-top: 20px;
`;
const StyledItem = styled(Text)`
  font-size: 20px;
  padding: 5px;
`;

export function TaskList() {
  //const tasks = useTaskList();
  const [tasks, setTasks] = useState([]);
  const navigation = useNavigation();

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      getInitialData();
    }
  }, [isFocused]);

  const getInitialData = async () => {
    AsyncStorage.getItem("taskList").then((data) => {
      if (data.length > 0) {
        setTasks(JSON.parse(data));
        //console.log(data);
      }
    });
  };

  return (
    <>
      <CenterBody>
        <StyledButton
          title="Agregar tarea"
          onPress={() => navigation.navigate("Task")}
        />
      </CenterBody>
      <View>
        <FlatList
          data={tasks}
          renderItem={({ item }) => {
            return (
              <>
                <View key={item.id}>
                  <StyledItem
                    onPress={() => {                    
                      navigation.navigate("Detail", {
                        task: item.task,
                        description: item.description,
                      });
                    }}
                  >
                    - {item.task}
                  </StyledItem>
                </View>
              </>
            );
          }}
        />
      </View>
    </>
  );
}
