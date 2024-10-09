import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React from "react";
import { TabPanel } from "./styled";
import data from "../../../data.json";
import { PlatformIcon } from "./PlatformIcon";
import { useParams } from "react-router-dom";
import { useFetch } from "../../../hooks/useFetch";

export const Platforms = () => {
  const params = useParams();
  const { data, loading } = useFetch(
    `https://ddam-2022-react-api.onrender.com/movies/${params.slug}/platforms`
  );
  if (!data || loading) return <h1>Loading</h1>;
  return (
    <TabPanel>
      <List>
        {data.map((platform) => {
          return (
            <ListItem key={platform.url}>
              <ListItemButton href={platform.url} target="_blank">
                <ListItemIcon>
                  <PlatformIcon name={platform.name} />
                </ListItemIcon>
                <ListItemText>{platform.name}</ListItemText>
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </TabPanel>
  );
};
