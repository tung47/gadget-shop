import React from 'react'
import { Row, Col } from 'react-bootstrap'

import ProductCard from '../../components/ProductCard'
import products from '../../products'

const HomeScreen = () => {
  return (
    <>
      <h1>Lastest Products</h1>
      <Row>
        {products.map((product) => (
          <Col sm={12} md={6} lg={4} xl={3}>
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>
    </>
  )
}

export default HomeScreen
