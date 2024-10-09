import { Snackbar } from "@mui/material";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const WishListContext = createContext({
  movies: [],
  handleAddMovie: () => {},
});

export function useWishList() {
  const data = useContext(WishListContext);
  return data;
}

export function WishListProvider(props) {
  const [movies, setMovies] = useState([]);
  const [open, setOpen] = useState(false);
  const handleAddMovie = useCallback((newMovie) => {
    setMovies((currentMovies) => {
      if (currentMovies.some((movie) => movie.id === newMovie.id)) {
        setOpen(true);
        return currentMovies;
      }
      return [...currentMovies, newMovie];
    });
  }, []);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  const value = useMemo(() => {
    return {
      movies,
      handleAddMovie,
    };
  }, [movies, handleAddMovie]);

  useEffect(function syncFromLocalStorage() {
    const persistedMovies = localStorage.getItem("movies");
    if (persistedMovies) {
      setMovies(JSON.parse(persistedMovies));
    }
  }, []);
  useEffect(
    function syncToLocalStorage() {
      if (movies.length > 0) {
        localStorage.setItem("movies", JSON.stringify(movies));
      }
    },
    [movies]
  );

  return (
    <WishListContext.Provider value={value} {...props}>
      {props.children}
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Pelicula ya agregada"
      ></Snackbar>
    </WishListContext.Provider>
  );
}
