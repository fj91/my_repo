import React, { useState,useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";


export function useTaskList() {
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    (async () => {
        AsyncStorage.getItem("taskList").then(async (data) => {
            if (data.length > 0) {        
              setTasks(JSON.parse(data));
              console.log(data)
            }     
          });
      })();
    }, []);

  return tasks;
}
