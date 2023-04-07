import { Container } from "react-bootstrap";
import Searchbar from "./Searchbar";
import FavTowns from "./FavTowns";

const MyHome = () => {
  return (
    <Container fluid>
          <Searchbar />
          <FavTowns />         
    </Container>
  );
};

export default MyHome;
