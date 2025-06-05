import { Container, Nav, Navbar } from 'react-bootstrap';

import { logo } from '../../assets';

const Header = () => {
  return (
    <Navbar key={'md'} expand={'md'} sticky='top' className='bg-secondary text-primary'>
      <Container className='d-flex flex-wrap justify-content-center align-items-center align-items-md-end'>
        <Navbar.Brand className='d-flex align-items-center me-auto me-md-0'>
          <img className='me-3 ms-md-3' height={150} src={logo} alt='Logo do IncluMove' />
        </Navbar.Brand>

        <Navbar.Toggle className='py-2 me-3' aria-controls='collapseNavbar-expand-md' />

        <Navbar.Collapse
          className='bg-secondary text-primary d-md-none justify-content-center justify-content-lg-end'
          id='collapseNavbar-expand-md'
          aria-labelledby='collapseNavbarLabel-expand-md'
        >
          <Nav defaultActiveKey='/' className='gap-xl-4 d-md-flex text-primary fs-3 fw-semibold montserrat ps-3 ps-md-0'>
            <Nav.Link>Início</Nav.Link>
            <Nav.Link>Ranking</Nav.Link>
            <Nav.Link>Objetivo</Nav.Link>
            <Nav.Link>Sobre Nós</Nav.Link>
            <Nav.Link>Contato</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export { Header };

