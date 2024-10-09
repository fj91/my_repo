import { Typography } from "@mui/material";
import React from "react";
import { Row, TabPanel } from "./styled";
import data from "../../../data.json";

export const MovieInfo = (props) => {
  const { movie } = props;
  return (
    <TabPanel>
      <Row>
        <Typography sx={{ fontWeight: 700 }}>Puntaje IMDB: </Typography>
        <Typography>{movie.imdbScore}</Typography>
      </Row>
      <Row>
        <Typography sx={{ fontWeight: 700 }}>Duración: </Typography>
        <Typography>
          {new Date(movie.runtime * 60 * 1000).toISOString().substring(11, 16)}{" "}
          horas
        </Typography>
      </Row>
    </TabPanel>
  );
};
