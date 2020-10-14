import React, { useState, useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import axios from 'axios'

import {ProductsProps, ProductProps} from '../../types'
import Product from '../../components/Product'

const HomeScreen = () => {
  const [products, setProducts] = useState<ProductsProps>([])

  useEffect(() => {
    const fetchProducts = async () => {
      const {data}= await axios.get('/api/v1/products')

      setProducts(data)
    }

    fetchProducts()
  }, [])

  return (
    <>
      <h1>Lastest Products</h1>
      <Row>
        {products.map((product: ProductProps) => (
          <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
            <Product {...product} />
          </Col>
        ))}
      </Row>
    </>
  )
}

export default HomeScreen
