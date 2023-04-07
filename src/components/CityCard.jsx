import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

const TownCard = ({ town }) => {
  if (!town) {
    return null;
  }

  return (
    <Container>
      <Row>
        <Col>
          <Card className="mt-5 w-50 mx-auto text-center Town">
            <Card.Body>
              <Card.Title className="fs-1">{town.name}</Card.Title>
              <Card.Text>Conditions: {town.weather[0].main}</Card.Text>
              <Link to="/" className="nav-link">
                <Button className="bg-white text-primary px-4 border border-2 border-primary">
                  Go Back
                </Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default TownCard;