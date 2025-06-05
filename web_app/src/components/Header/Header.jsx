import { Container, Nav, Navbar, Offcanvas } from 'react-bootstrap';

import { logo } from '../../assets';

const Header = () => {
  return (
    <Navbar key={'md'} expand={'md'} fixed='top' className='bg-secondary text-primary'>
      <Container className='d-flex flex-wrap justify-content-center align-items-end'>
          <Navbar.Brand className='d-flex align-items-center me-auto me-md-0 me-lg-auto'>
            <img className='me-3 ms-md-3' height={150} src={logo} alt='Logo do IncluMove' />
          </Navbar.Brand>

        <Navbar.Toggle aria-controls='offcanvasNavbar-expand-md' />
        <Navbar.Offcanvas
          className='bg-secondary text-primary d-md-none'
          id='offcanvasNavbar-expand-md'
          aria-labelledby='offcanvasNavbarLabel-expand-md'
          placement="end"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id='offcanvasNavbarLabel-expand-md'>
              IntelliDriver
            </Offcanvas.Title>
          </Offcanvas.Header>
        </Navbar.Offcanvas>

        <Nav defaultActiveKey='/' className='text-primary fs-3 fw-semibold montserrat gap-xl-4 d-none d-md-flex'>

          <Nav.Link>Início</Nav.Link>
          <Nav.Link>Ranking</Nav.Link>
          <Nav.Link>Objetivo</Nav.Link>
          <Nav.Link>Sobre Nós</Nav.Link>
          <Nav.Link>Contato</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export { Header };

