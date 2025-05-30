import { Container, Nav, Navbar } from 'react-bootstrap';

import { logo } from '../../assets';

const Header = () => {
  return (
    <Navbar fixed='top' className='bg-secondary text-primary'>
      <Container>
        <header className='d-flex flex-wrap justify-content-center align-items-end w-100'>
          <a className='d-flex align-items-center mb-3 mb-md-0 me-2 me-md-auto' href="/">
            <img className='me-3 ms-md-3' height={150} src={logo} alt='Logo do IncluMove' />
          </a>

          <Nav defaultActiveKey='/' as='ul'>
            <Nav.Item as='li'>
              <Nav.Link className='fs-3 montserrat' href='/'>Página Inicial</Nav.Link>
            </Nav.Item>
            <Nav.Item as='li'>
              <Nav.Link className='fs-3 montserrat' href='/about' eventKey='link-1'>Sobre</Nav.Link>
            </Nav.Item>
          </Nav>
        </header>
      </Container>
    </Navbar>
  );
}

export { Header };
