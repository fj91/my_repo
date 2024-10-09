import { Button, Card, CardContent, Tab, Tabs } from "@mui/material";
import React, { useCallback } from "react";
import { Route, Routes, useNavigate, useParams } from "react-router-dom";
import { Body } from "../../components/Body";
import { NavBar } from "../../components/NavBar";
import { useFetch } from "../../hooks/useFetch";
import { useWishList } from "../../hooks/useWishList";
import { Credits } from "./components/Credits";
import { MovieInfo } from "./components/MovieInfo";
import { Platforms } from "./components/Platforms";
import {
  Container,
  MovieDetail,
  Poster,
  PosterContainer,
} from "./components/styled";

export function Movie() {
  const params = useParams();
  const navigate = useNavigate();
  const { handleAddMovie } = useWishList();

  const { data: movie, loading } = useFetch(
    "https://ddam-2022-react-api.onrender.com/movies/" + params.slug
  );

  const handleChange = useCallback(
    (event, newIndex) => {
      navigate(`/pelicula/${params.slug}/${newIndex}`);
    },
    [navigate, params.slug]
  );
  console.log({ movie });
  if (loading || !movie) {
    return (
      <Body>
        <NavBar />
      </Body>
    );
  }
  return (
    <Body>
      <NavBar />
      <Container>
        <PosterContainer>
          <Poster src={movie.posterUrl} alt="poster" />
        </PosterContainer>
        <MovieDetail>
          <Card>
            <CardContent>
              <span>{params.slug}</span>
              <h1>{movie.title}</h1>
              <p>{movie.shortDescription}</p>
              <Button
                onClick={() => {
                  handleAddMovie(movie);
                }}
              >
                Guardar para ver
              </Button>
            </CardContent>
          </Card>
        </MovieDetail>
      </Container>
      <div>
        <Tabs value={params["*"]} onChange={handleChange}>
          <Tab value="plataformas" label="Plataformas" />
          <Tab value="creditos" label="Creditos" />
          <Tab value="informacion" label="Información" />
        </Tabs>
        <Routes>
          <Route path="/plataformas" element={<Platforms />}></Route>
          <Route path="/creditos" element={<Credits />}></Route>
          <Route
            path="/informacion"
            element={<MovieInfo movie={movie} />}
          ></Route>
        </Routes>
      </div>
    </Body>
  );
}
