import { Container } from "react-bootstrap";
import Searchbar from "./Searchbar";
import FavTowns from "./FavCity";
import Carosello from "./Carosello";

const MyHome = () => {
  return (
    <Container fluid>
          <Searchbar />
          <Carosello />
          <FavTowns />         
    </Container>
  );
};

export default MyHome;
