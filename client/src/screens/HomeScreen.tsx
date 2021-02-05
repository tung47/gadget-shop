import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import { RouteComponentProps } from 'react-router-dom'

import { ProductProps, AppState, RouteParam } from '../types'
import Product from '../components/Product'
import ProductCarousel from '../components/ProductCarousel'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Meta from '../components/Meta'
import { listProducts } from '../redux/actions/product'

const HomeScreen = ({ match }: RouteComponentProps<RouteParam>) => {
  const keyword = match.params.keyword

  const dispatch = useDispatch()

  const productList = useSelector((state: AppState) => state.productList)
  const { loading, error, products } = productList

  useEffect(() => {
    dispatch(listProducts(keyword))
  }, [dispatch, keyword])

  return (
    <>
      <Meta />
      <ProductCarousel />
      <h1>Lastest Products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          {products.map((product: ProductProps) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product {...product} />
            </Col>
          ))}
        </Row>
      )}
    </>
  )
}

export default HomeScreen
