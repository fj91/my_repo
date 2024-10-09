import * as React from "react";
import { NavBar } from "../../components/NavBar";
import { MovieCard } from "./components/MovieCard";
import { styled } from "@mui/material/styles";
import data from "../../data.json";
import { Body } from "../../components/Body";
import { useLocation } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import { useQuery, gql } from "@apollo/client";

const MovieRow = styled("div")`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 3px;
  max-width: 1024px;
  margin: auto;
`;

const GET_MOVIES = gql`
  query GetMoviesQuery($params: MoviesParams) {
    movies(params: $params) {
      id
      slug
      title
      posterUrl
    }
  }
`;

export function Home() {
  const location = useLocation();
  const { data, loading } = useQuery(GET_MOVIES, {
    variables: {
      params: {
        query: new URLSearchParams(location.search).get("q") ?? "",
        page: +new URLSearchParams(location.search).get("page") ?? 1,
      },
    },
  });
  console.log("graphql", { data, loading });
  if (loading || !data.movies)
    return (
      <Body>
        <NavBar />
      </Body>
    );
  return (
    <Body>
      <NavBar />
      <h1>Home</h1>
      <MovieRow>
        {data.movies.map((row) => {
          return (
            <MovieCard
              key={row}
              posterUrl={row.posterUrl}
              title={row.title}
              slug={row.slug}
            />
          );
        })}
      </MovieRow>
    </Body>
  );
}
