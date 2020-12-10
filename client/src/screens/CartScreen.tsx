import React, { useEffect } from 'react'
import {
  Link,
  RouteComponentProps,
  useHistory,
  useParams,
  useRouteMatch,
} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'

import { RouteParam, AppState, ProductProps } from '../types'
import Message from '../components/Message'
import { addToCart, removeFromCart } from '../redux/actions'

const CartScreen = ({ match }: RouteComponentProps<RouteParam>) => {
  const history = useHistory()
  const dispatch = useDispatch()

  const { cartItems } = useSelector((state: AppState) => state.cart)

  const removeFromCartHandler = (product: ProductProps) => {
    dispatch(removeFromCart(product))
  }

  return (
    <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        <Link className="btn btn-light my-3" to="/">
          Go back
        </Link>
        {cartItems.length === 0 ? (
          <Col>
            <Message>Your cart is empty.</Message>
            <Link to="/">Shop more products</Link>
          </Col>
        ) : (
          <ListGroup variant="flush">
            {cartItems.map((product) => (
              <ListGroup.Item key={product._id}>
                <Row>
                  <Col md={2}>
                    <Image
                      src={product.image}
                      alt={product.name}
                      fluid
                      rounded
                    />
                  </Col>
                  <Col md={3}>
                    <Link to={`/product/${product._id}`}>{product.name}</Link>
                  </Col>
                  <Col md={2}>€{product.price}</Col>
                  <Col md={2}>
                    <Button
                      type="button"
                      variant="light"
                      onClick={() => removeFromCartHandler(product)}
                    >
                      <i className="far fa-trash-alt"></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Your subtotal:</h2>€
              {cartItems
                .map((product) => product.price)
                .reduce((sum: number, price) => {
                  return sum + price
                }, 0)}
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                type="button"
                className="btn-block"
                disabled={cartItems.length === 0}
                // onClick={checkoutHandler}
              >
                Proceed To Checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  )
}

export default CartScreen
