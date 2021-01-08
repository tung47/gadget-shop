import React, { useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import { AppState, ItemProps } from '../types'
import Message from '../components/Message'
import CheckoutSteps from '../components/CheckoutSteps'

const PlaceOrderScreen = () => {
  const history = useHistory()

  const dispatch = useDispatch()

  const cart = useSelector((state: AppState) => state.cart)
  const { shippingAddress } = cart
  const address: any = shippingAddress && shippingAddress.address
  const city: any = shippingAddress && shippingAddress.city
  const postalCode: any = shippingAddress && shippingAddress.postalCode
  const country: any = shippingAddress && shippingAddress.country

  //   Calculate prices
  const addDecimals = (num: number) => {
    return (Math.round(num * 100) / 100).toFixed(2)
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
      </Row>
    </>
  )
}

export default PlaceOrderScreen
