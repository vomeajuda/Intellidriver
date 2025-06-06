import { Container , Col, Row} from 'react-bootstrap';

const MainPage = () => {
  return (
    <>
      <div className="bg-primary pt-5 vh-100">
        <Container>
          <Row className='justify-content-center'>
            <Col className='bg-light' md={6} xl={4}> <p>alo</p></Col>
            <Col className='bg-dark' md={6} xl={4}> <p>alo 2</p></Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export { MainPage };