import { Card, CardMedia } from "@mui/material";
import { styled } from "@mui/system";
import React from "react";
import { Body } from "../../components/Body";
import { NavBar } from "../../components/NavBar";
import { useWishList } from "../../hooks/useWishList";

const Container = styled("div")``;
const Row = styled("div")`
  display: flex;
  flex-direction: row;
`;
export function WishList() {
  const { movies } = useWishList();
  return (
    <Body>
      <NavBar></NavBar>
      <h1>Lista de peliculas</h1>
      <Container>
        {movies.map((movie) => (
          <Card key={movie.id}>
            <Row>
              <CardMedia
                src={movie.posterUrl}
                component="img"
                sx={{ width: "50%", height: "200px", objectFit: "contain" }}
              ></CardMedia>
              <h1>{movie.title}</h1>
            </Row>
          </Card>
        ))}
      </Container>
    </Body>
  );
}
