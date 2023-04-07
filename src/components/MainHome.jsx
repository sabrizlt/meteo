import Card from "react-bootstrap/Card";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function HomeCard() {
  return (
    <Container>
      <Row>
        <Col className="col-12 ">
          <Link to="/your-cities" id="home-link">
            <Button className="m-5 mt-2">Favourite CompanyList</Button>
          </Link>
        </Col>
        <Col>
          <Card className="mx-auto mt-3 w-50">
            <Card.Body>
              <Card.Title>City Title</Card.Title>
              <Card.Text> Gradi Centigradi </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default HomeCard;