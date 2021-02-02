import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Carousel, Image, Col, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import { AppState } from '../types'
import Loader from './Loader'
import Message from './Message'
import { listTopProducts } from '../redux/actions/product'

const ProductCarousel = () => {
  const dispatch = useDispatch()

  const productTopRated = useSelector((state: AppState) => state.productTop)
  const { loading, error, products } = productTopRated

  useEffect(() => {
    dispatch(listTopProducts())
  }, [dispatch])

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <Carousel pause="hover" className="bg-light">
      {products.map((product) => (
        <Carousel.Item key={product._id}>
          <Link to={`/product/${product._id}`}>
            <Row>
              <Col md={6}>
                <Image src={product.image} alt={product.name} fluid />
              </Col>

              <Col md={6}>
                <Carousel.Caption className="carousel-caption">
                  <h2>{product.name}</h2>
                  <h2>with {product.rating} star(s)</h2>
                  <h2>€{product.price}</h2>
                </Carousel.Caption>
              </Col>
            </Row>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  )
}

export default ProductCarousel
