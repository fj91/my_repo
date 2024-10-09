import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Text, View, TextInput, Button, Alert } from "react-native";


export function Task() {
  const [task, setTask] = useState("");
  const [description, setDescription] = useState("");  
  
  const handlePress = async () => {
    if (task.trim().length === 0) {
      setTask("");
      setDescription("");
      return alert("Ingrese la tarea....");
    } else {
      const newTask = { task: task, description: description };
      const existingTasks = await AsyncStorage.getItem("taskList");     
      if (existingTasks) {
        var newT = JSON.parse(existingTasks);
        if (!newT) {
          newT = [];
        }
      }else{
        var newT = [];        
      }
      newT.push(newTask);
      await AsyncStorage.setItem("taskList", JSON.stringify(newT))
        .then(() => {
            Alert.alert("Se ha guardado tu tarea") 
        })
        .catch(() => {
            Alert.alert("Ha ocurrido un error")  
        });
      setTask("");
      setDescription(""); 
    }
  };

  return (
    <View
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
      }}
    >
      <View
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <StatusBar style="auto" />
        <Text>Tarea:</Text>
        <TextInput
          style={{
            width: 150,
            borderColor: "black",
            borderWidth: 1,
            margin: 10,
          }}
          value={task}
          onChangeText={setTask}
        ></TextInput>
      </View>
      <View
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <Text>Descripción:</Text>
        <TextInput
          style={{
            width: 150,
            borderColor: "black",
            borderWidth: 1,
            margin: 10,
          }}
          value={description}
          onChangeText={setDescription}
        ></TextInput>
      </View>

      <Button title="Añadir" onPress={handlePress}></Button>
    </View>
  );
}
