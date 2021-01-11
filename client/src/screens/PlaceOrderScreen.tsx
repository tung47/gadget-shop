import React, { useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import { AppState, OrderProps, UserLoginState } from '../types'
import Message from '../components/Message'
import CheckoutSteps from '../components/CheckoutSteps'
import { createOrder } from '../redux/actions'

const PlaceOrderScreen = () => {
  const history = useHistory()

  const dispatch = useDispatch()

  const userLogin = useSelector((state: AppState) => state.userLogin)
  const { userInfo } = userLogin as UserLoginState
  const userId = userInfo && userInfo._id

  const cart = useSelector((state: AppState) => state.cart)
  const { shippingAddress } = cart
  const address: any = shippingAddress && shippingAddress.address
  const city: any = shippingAddress && shippingAddress.city
  const postalCode: any = shippingAddress && shippingAddress.postalCode
  const country: any = shippingAddress && shippingAddress.country

  //   Calculate prices
  const addDecimals = (num: number) => {
    return Number((Math.round(num * 100) / 100).toFixed(2))
  }

  cart.itemsPrice = addDecimals(
    cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  )
  cart.shippingPrice = addDecimals(cart.itemsPrice > 100 ? 0 : 100)
  cart.taxPrice = addDecimals(Number((0.24 * cart.itemsPrice).toFixed(2)))
  cart.totalPrice = Number(
    (
      Number(cart.itemsPrice) +
      Number(cart.shippingPrice) +
      Number(cart.taxPrice)
    ).toFixed(2)
  )

  const orderItems = cart && cart.cartItems
  const orderShippingAddress = cart && cart.shippingAddress
  const orderPaymentMethod = cart && cart.paymentMethod
  const orderItemsPrice = cart && cart.itemsPrice
  const orderShippingPrice = cart && cart.shippingPrice
  const orderTaxPrice = cart && cart.taxPrice
  const orderTotalPrice = cart && cart.totalPrice

  const orderCreate = useSelector((state: AppState) => state.orderCreate)
  const { order, success, error } = orderCreate
  const orderId = order && order._id

  useEffect(() => {
    if (success) {
      history.push(`/order/${orderId}`)
    }
  }, [history, success, orderId])

  const placeOrderHandler = () => {
    const order = {
      user: userId,
      orderItems: orderItems,
      shippingAddress: orderShippingAddress,
      paymentMethod: orderPaymentMethod,
      itemsPrice: orderItemsPrice,
      shippingPrice: orderShippingPrice,
      taxPrice: orderTaxPrice,
      totalPrice: orderTotalPrice,
    } as OrderProps
    dispatch(createOrder(order))
  }

  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Address:</strong>
                {address}, {city} {postalCode}, {country}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <strong>Method: </strong>
              {cart.paymentMethod}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {cart.cartItems.length === 0 ? (
                <Message>Your cart is empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {cart.cartItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.productId}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x €{item.price} = €{item.qty * item.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>€{cart.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>€{cart.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>€{cart.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>€{cart.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                {error && <Message variant="danger">{error}</Message>}
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  type="button"
                  className="btn-block"
                  disabled={cart.cartItems.length === 0}
                  onClick={placeOrderHandler}
                >
                  Place Order
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default PlaceOrderScreen
