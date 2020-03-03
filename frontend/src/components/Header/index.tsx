import React from "react";
import {
  NavbarBrand,
  Navbar, Nav,
  NavDropdown,
  Form,
  FormControl,
  InputGroup,
} from "react-bootstrap";
import {
  FaUser,
  FaSearch,
  FaConciergeBell,
  FaServicestack,
  FaHistory,
  FaEdit,
  FaQuestionCircle,
  FaShieldAlt,
  FaSignOutAlt,
} from "react-icons/fa";

import Logo from "@assets/img/logo.png";

const Header: React.FC = () => (
  <>
    <Navbar expand="sm" style={{ backgroundColor: "#93B1BE" }}>
      <NavbarBrand>
        <a href="/">
          <img src={Logo} alt="Kepler" width="205px" height="37px" />
        </a>
      </NavbarBrand>

      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto" style={{ fontSize: "18px" }}>
          <Form inline className="mr-sm-5 ml-sm-5">
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text id="text-search">
                  <FaSearch />
                </InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                style={{
                  width: "400px",
                  height: "40px",
                  backgroundColor: "#E8E8E8",
                  borderRadius: "3px",
                }}
                type="text"
                placeholder="Pesquise por Serviço ou Categoria"
                aria-describedby="text-search"
                className="mr-sm-2"
              />
            </InputGroup>
          </Form>
          <Nav.Link>
            <FaUser className="d-none d-sm-block" />
          </Nav.Link>
          <NavDropdown className="mr-5" title="Perfil" id="basic-nav-dropdown">
            <NavDropdown.Item href="/">
              <FaConciergeBell className="mr-2" />
              Serviços
            </NavDropdown.Item>
            <NavDropdown.Item href="/">
              <FaServicestack className="mr-2" />
              Meus Serviços
            </NavDropdown.Item>
            <NavDropdown.Item href="/">
              <FaHistory className="mr-2" />
              Histórico de Serviços
            </NavDropdown.Item>
            <NavDropdown.Item href="/">
              <FaEdit className="mr-2" />
              Editar Perfil
            </NavDropdown.Item>
            <NavDropdown.Item href="/">
              <FaQuestionCircle className="mr-2" />
              Ajuda
            </NavDropdown.Item>
            <NavDropdown.Item href="/">
              <FaShieldAlt className="mr-2" />
              Proteção
            </NavDropdown.Item>
            <NavDropdown.Item href="/">
              <FaSignOutAlt className="mr-2" />
              Sair
            </NavDropdown.Item>
          </NavDropdown>
          <Nav.Link className="mr-5" href="/" style={{ color: "inherits" }}>Serviços</Nav.Link>
          <Nav.Link className="mr-5" href="/">Categorias</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  </>
);

export default Header;
