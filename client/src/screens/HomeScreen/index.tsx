import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'

import { ProductsProps,ProductProps, AppState } from '../../types'
import Product from '../../components/Product'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import { listProducts } from '../../redux/actions/product'

const HomeScreen = () => {
  const dispatch = useDispatch()
  const loading: boolean = useSelector(
    (state: AppState) => state.products.loading
  )
  const error: string | null = useSelector(
    (state: AppState) => state.products.error
  )
  const products: ProductsProps = useSelector((state: AppState) => state.products.productList)

  useEffect(() => {
    dispatch(listProducts())
  }, [dispatch])

  return (
    <>
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
