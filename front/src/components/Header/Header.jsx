import './Header.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Button } from 'react-bootstrap';

export default function Header() {
    return (
        <Container fluid className="p-5 bg-light">
            <Row>
                <Col>
                    <h1>Hello, world!</h1>
                    <p>
                        This is a simple hero unit, a simple jumbotron-style component for calling
                        extra attention to featured content or information.
                    </p>
                    <br />
                    <p>
                        <Button className='button--signup' variant="primary" href="/login">Sign Up</Button>{'   '}
                        <Button className='button--login' variant="secondary" href="/login">Login</Button>
                    </p>
                </Col>
                <Col>
                    <img src="https://via.placeholder.com/500" alt="placeholder" />
                </Col>
            </Row>
        </Container>
    );
}
