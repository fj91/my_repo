import { CssBaseline } from "@mui/material";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MovieApolloClient } from "./config/apollo";
import { WishListProvider } from "./hooks/useWishList";
import { Home } from "./screens/Home";
import { Movie } from "./screens/Movie";
import { WishList } from "./screens/WishList";
function App() {
  return (
    <div>
      <CssBaseline />
      <MovieApolloClient>
        <WishListProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/pelicula/:slug/*" element={<Movie />} />
              <Route path="/pendientes" element={<WishList />} />
              <Route path="*" element={<h1>Not found</h1>} />
            </Routes>
          </BrowserRouter>
        </WishListProvider>
      </MovieApolloClient>
    </div>
  );
}

export default App;
