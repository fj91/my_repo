import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/system";
import { Link } from "react-router-dom";

const MovieCardContainer = styled(Card)`
  flex: 0 1 24%;
  ${({ theme }) => theme.breakpoints.down("md")} {
    flex: 0 1 33%;
  }
  ${({ theme }) => theme.breakpoints.down("sm")} {
    flex: 0 1 49%;
  }
`;

export function MovieCard(props) {
  const { posterUrl, title, slug } = props;
  return (
    <MovieCardContainer>
      <CardMedia component="img" alt="green iguana" image={posterUrl} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
      </CardContent>
      <CardActions>
        <Link to={"/pelicula/" + slug}>
          <Button size="small">Ver</Button>
        </Link>
      </CardActions>
    </MovieCardContainer>
  );
}
