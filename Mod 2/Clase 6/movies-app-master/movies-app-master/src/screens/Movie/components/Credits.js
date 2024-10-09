import React from "react";
import { Row, TabPanel } from "./styled";
import dataJSON from "../../../data.json";
import { styled, Typography } from "@mui/material";
import { useFetch } from "../../../hooks/useFetch";
import { useParams } from "react-router-dom";
const CreditRow = styled(Row)`
  gap: 16px;
  width: 100%;
  overflow-x: auto;
`;
const CreditColumn = styled("div")``;
export const Credits = () => {
  const params = useParams();
  const { data, loading } = useFetch(
    `https://ddam-2022-react-api.onrender.com/movies/${params.slug}/credits`
  );
  if (!data || loading) return <h1>Loading</h1>;
  return (
    <TabPanel>
      <CreditRow>
        {data.map((credit, index) => {
          return (
            <CreditColumn key={index}>
              <Typography noWrap>{credit.name}</Typography>
              <Typography variant="subtitle2" sx={{ color: "text.secondary" }}>
                {credit.characterName}
              </Typography>
            </CreditColumn>
          );
        })}
      </CreditRow>
    </TabPanel>
  );
};
