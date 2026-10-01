
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import Presentacion from '../Molecules/Presentacion'; 

const Encabezado = ({ logo, titulo }) => (

  <header className="bg-light py-3 border-bottom shadow-sm">
    <Container>
      <Row className="justify-content-center">
        <Col xs={12} md={10} lg={8}>
          <Presentacion logo={logo} titulo={titulo} />
        </Col>
      </Row>
    </Container>
  </header>
);

export default Encabezado;