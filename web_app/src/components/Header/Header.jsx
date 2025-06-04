import { Container, Nav, Navbar } from 'react-bootstrap';

import { logo } from '../../assets';

const Header = () => {
  return (
    <Navbar fixed='top' className='bg-secondary text-primary'>
      <Container>
        <header className='d-flex flex-wrap justify-content-center align-items-end w-100'>
          <a className='d-flex align-items-center mb-3 mb-md-0 me-0 me-lg-auto' href="/">
            <img className='me-3 ms-md-3' height={150} src={logo} alt='Logo do IncluMove' />
          </a>

          <Nav defaultActiveKey='/' as='ul' className='text-primary fs-3 fw-semibold montserrat gap-xl-4'>
            <Nav.Item as='li'>
              <Nav.Link>Início</Nav.Link>
            </Nav.Item>
            <Nav.Item as='li'>
              <Nav.Link>Ranking</Nav.Link>
            </Nav.Item>
            <Nav.Item as='li'>
              <Nav.Link>Objetivo</Nav.Link>
            </Nav.Item>
            <Nav.Item as='li'>
              <Nav.Link>Sobre Nós</Nav.Link>
            </Nav.Item>
            <Nav.Item as='li'>
              <Nav.Link>Contato</Nav.Link>
            </Nav.Item>
          </Nav>
        </header>
      </Container>
    </Navbar>
  );
}

export { Header };
