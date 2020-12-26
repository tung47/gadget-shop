import React, { useEffect } from 'react'
import {
  Link,
  useHistory,
  useLocation,
  RouteComponentProps,
} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, ListGroup, Image, Button, Card, Form } from 'react-bootstrap'

import { AppState, RouteParam, ProductProps, ItemsProps } from '../types'
import Message from '../components/Message'
import { addToCart, removeFromCart } from '../redux/actions'

const CartScreen = ({ match }: RouteComponentProps<RouteParam>) => {
  const location = useLocation()
  const history = useHistory()
  const dispatch = useDispatch()

  const productDetails = useSelector((state: AppState) => state.productDetails)
  const { product: detailsProduct } = productDetails
  const { name, image, price, countInStock } = detailsProduct as ProductProps

  const productId = match.params.id

  const qty = location.search ? Number(location.search.split('=')[1]) : 1

  const cart = useSelector((state: AppState) => state.cart)
  const { cartItems } = cart as ItemsProps
  
  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty))
    }
  }, [dispatch, productId, qty])

  const removeFromCartHandler = (product: ProductProps) => {
    dispatch(removeFromCart(product))
  }

  const checkoutHandler = () => {
    history.push('/login?redirect=shipping')
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
            {cartItems.map((item: ProductProps) => (
              <ListGroup.Item key={productId}>
                <Row>
                  <Col md={2}>
                    <Image src={image} alt={name} fluid rounded />
                  </Col>
                  <Col md={3}>
                    <Link to={`/product/${productId}`}>{name}</Link>
                  </Col>
                  <Col md={2}>€{price}</Col>
                  <Col md={2}>
                    <Form.Control
                      as="select"
                      value={qty}
                      onChange={(e) =>
                        dispatch(addToCart(productId, Number(e.target.value)))
                      }
                    >
                      {[...Array(countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col md={2}>
                    <Button
                      type="button"
                      variant="light"
                      onClick={() => removeFromCartHandler(item)}
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
              <h2>
                Subtotal ({cartItems.reduce((acc: number) => acc + qty, 0)})
                items
              </h2>
              $
              {cartItems
                .reduce((acc: number) => acc + qty * price, 0)
                .toFixed(2)}
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                type="button"
                className="btn-block"
                disabled={cartItems.length === 0}
                onClick={checkoutHandler}
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
