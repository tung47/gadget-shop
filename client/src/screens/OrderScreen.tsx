import React, { useEffect } from 'react'
import { Link, RouteComponentProps } from 'react-router-dom'
import { Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import {
  AppState,
  UserLoginState,
  ItemProps,
  RouteParam,
} from '../types'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getOrderDetails } from '../redux/actions/order'

const OrderScreen = ({ match }: RouteComponentProps<RouteParam>) => {
  const orderId = match.params.id

  const dispatch = useDispatch()

  const userLogin = useSelector((state: AppState) => state.userLogin)
  const { userInfo } = userLogin as UserLoginState
  const name = userInfo && userInfo.name
  const email = userInfo && userInfo.email
  
  const orderDetails = useSelector((state: AppState) => state.orderDetails)
  const { loading, error } = orderDetails
  const order: any = orderDetails && orderDetails.order
  
  const itemsPrice: any = order && order.itemsPrice
  const orderItems: any = order && order.orderItems
  const id: any = order && order._id
  
  const shippingAddress: any = order && order.shippingAddress
  const address: any = shippingAddress && shippingAddress.address
  const city: any = shippingAddress && shippingAddress.city
  const postalCode: any = shippingAddress && shippingAddress.postalCode
  const country: any = shippingAddress && shippingAddress.country

  const isDelivered: any = order && order.isDelivered
  const deliveredAt: any = order && order.deliveredAt
  const isPaid: any = order && order.isPaid
  const paymentMethod: any = order && order.paymentMethod
  const paidAt: any = order && order.paidAt
  const shippingPrice: any = order && order.shippingPrice
  const taxPrice: any = order && order.taxPrice
  const totalPrice: any = order && order.totalPrice
  
  useEffect(() => {
    dispatch(getOrderDetails(orderId))
  }, [dispatch, orderId])

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <>
      <h1>Order {id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Name: </strong> {name}
              </p>
              <p>
                <strong>Email: </strong> <a href={`mailto:${email}`}>{email}</a>
              </p>
              <p>
                <strong>Address:</strong>
                {address}, {city}{' '}
                {postalCode}, {country}
              </p>
              {isDelivered ? (
                <Message variant="success">Delivered on {deliveredAt}</Message>
              ) : (
                <Message variant="danger">Not Delivered</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method: </strong>
                {paymentMethod}
              </p>
              {isPaid ? (
                <Message variant="success">Paid on {paidAt}</Message>
              ) : (
                <Message variant="danger">Not Paid</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {orderItems.length === 0 ? (
                <Message>Order is empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {orderItems.map((item: ItemProps, index: number) => (
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
                          {item.qty} x ${item.price} = ${item.qty * item.price}
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
                  <Col>€{itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>€{shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>€{taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>€{totalPrice}</Col>
                </Row>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default OrderScreen