import { styled } from "@mui/system";

export const Container = styled("div")`
  display: flex;
  margin: auto;
  padding-top: 15px;
  flex-wrap: no-wrap;
  ${({ theme }) => theme.breakpoints.down("sm")} {
    flex-wrap: wrap;
  }
`;
export const Row = styled("div")`
  display: flex;
`;
export const PosterContainer = styled("div")`
  flex: 0 1 50%;
  width: 50%;

  min-width: 300px;
  ${({ theme }) => theme.breakpoints.down("sm")} {
    width: 100%;
    flex: 1;
    justify-content: center;
    display: flex;
  }
`;
export const Poster = styled("img")`
  width: 95%;
  object-fit: cover;
`;
export const MovieDetail = styled("div")`
  flex: 0 1 50%;
  min-width: 300px;
  ${({ theme }) => theme.breakpoints.down("sm")} {
    width: 100%;
    flex: 1;
  }
`;

export const TabPanel = styled("div")`
  padding: 16px 8px;
`;
export const Icon = styled("img")`
  width: 48px;
`;
