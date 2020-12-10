import React, { useEffect } from 'react'
import {
  Link,
  useParams,
  useHistory,
  RouteComponentProps,
} from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import Message from '../components/Message'
import { listProducts } from '../redux/actions/product'
import { AppState, RouteParam, ProductProps} from '../types'

const ProductListScreen = ({ match }: RouteComponentProps<RouteParam>) => {
  const history = useHistory()

  const dispatch = useDispatch()

  const products = useSelector((state: AppState) => state.products)
  const { error, productList } = products
  
  const userLogin = useSelector((state: AppState) => state.userLogin)
  const { userInfo } = userLogin
  
  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listProducts())
    } else {
      history.push('/login')
    }
  }, [dispatch, history, userInfo])

  const {id}  = useParams<RouteParam>()

  const product = useSelector((state: AppState) =>
    state.products.productList.find((p) => p._id === id)
  )
  const {_id } = product as ProductProps

  const deleteHandler = () => {
    if (window.confirm('Are you sure')) {
      // DELETE PRODUCTS
    }
  }

  const createProductHandler = () => {
    //   CREATE PRODUCT
  }

  return (
    <>
      <Row className='align-items-center'>
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className='text-right'>
          <Button className='my-3' onClick={createProductHandler}>
            <i className='fas fa-plus'></i> Create Product
          </Button>
        </Col>
      </Row>
      {error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>PRICE</th>
              <th>CATEGORY</th>
              <th>BRAND</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {productList.map((product) => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>${product.price}</td>
                <td>{product.category}</td>
                <td>{product.brand}</td>
                <td>
                  <LinkContainer to={`/admin/product/${product._id}/edit`}>
                    <Button variant='light' className='btn-sm'>
                      <i className='fas fa-edit'></i>
                    </Button>
                  </LinkContainer>
                  <Button
                    variant='danger'
                    className='btn-sm'
                    onClick={() => deleteHandler()}
                  >
                    <i className='fas fa-trash'></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  )
}

export default ProductListScreen