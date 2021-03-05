import React, { useState, useEffect } from 'react'
import { Link, useHistory, RouteComponentProps } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  Form,
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Breadcrumb,
} from 'react-bootstrap'

import {
  AppState,
  RouteParam,
  ProductProps,
  ReviewProps,
  UserLoginState,
} from '../types'
import Rating from '../components/Rating'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Meta from '../components/Meta'
import {
  listProductDetails,
  reviewProduct,
  ProductReviewResetAction,
} from '../redux/actions/product'
import { addToCart } from '../redux/actions/cart'

const ProductScreen = ({ match }: RouteComponentProps<RouteParam>) => {
  const dispatch = useDispatch()
  const history = useHistory()

  const [qty, setQty] = useState(1)
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')

  const productDetails = useSelector((state: AppState) => state.productDetails)
  const { loading, error, product: detailsProduct } = productDetails
  const {
    name: detailsName,
    image,
    description,
    rating: detailsRating,
    numReviews,
    reviews,
    price,
    countInStock,
  } = detailsProduct as any

  const userLogin = useSelector((state: AppState) => state.userLogin)
  const { userInfo } = userLogin as UserLoginState
  const _id = userInfo && userInfo._id
  const name = userInfo && userInfo.name

  const productReview = useSelector((state: AppState) => state.productReview)
  const { success: successReview, error: errorReview } = productReview

  useEffect(() => {
    if (successReview) {
      // alert('Review Submitted!')
      setRating(0)
      setComment('')
      dispatch(ProductReviewResetAction())
    }
    dispatch(listProductDetails(match.params.id))
  }, [dispatch, match, successReview])

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`)
    dispatch(addToCart(match.params.id, qty))
  }

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const review = { name: name, rating, comment, user: _id } as ReviewProps
    dispatch(reviewProduct(match.params.id, review))
  }

  return (
    <>
      <Link className="btn btn-light my-3" to="/">
        Go back
      </Link>

      <Breadcrumb>
        <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
        <Breadcrumb.Item href="/">Products</Breadcrumb.Item>
        <Breadcrumb.Item active>{detailsName}</Breadcrumb.Item>
      </Breadcrumb>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Meta title={detailsName} />
          <Row>
            <Col md={6}>
              <Image src={image} alt={detailsName} fluid />
            </Col>
            <Col md={3}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>{detailsName}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    value={detailsRating}
                    text={`${numReviews} reviews`}
                  />
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col>Price:</Col>
                      <Col>
                        <strong>€{price}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row>
                      <Col>
                        {countInStock > 0 ? 'In Stock' : 'Out Of Stock'}
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  {countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Qty</Col>
                        <Col>
                          <Form.Control
                            as="select"
                            value={qty}
                            onChange={(e: any) => setQty(e.target.value)}
                          >
                            {[...Array(countInStock).keys()].map((x) => (
                              <option key={x + 1} value={x + 1}>
                                {x + 1}
                              </option>
                            ))}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}

                  <ListGroup.Item>
                    <Button
                      onClick={addToCartHandler}
                      className="btn btn-dark"
                      type="button"
                      disabled={countInStock === 0}
                    >
                      Add To Cart
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>

          <br></br>
          <Row>
            <Col md={12}>
              <h2>Description</h2>
              <ListGroup.Item>{description}</ListGroup.Item>
            </Col>
          </Row>

          <br></br>
          <Row>
            <Col md={12}>
              <h2>Reviews</h2>
              {reviews.length === 0 && <Message>No Reviews</Message>}
              <ListGroup variant="flush">
                {reviews.map((review: any) => (
                  <ListGroup.Item key={review._id}>
                    <Rating value={review.rating} text={``} />
                    <p>
                      {review.createdAt.substring(0, 10)} by {review.name}{' '}
                    </p>
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                ))}
                <ListGroup.Item>
                  <h2>Write a review</h2>
                  {errorReview && (
                    <Message variant="danger">{errorReview}</Message>
                  )}
                  {userInfo ? (
                    <Form onSubmit={submitHandler}>
                      <Form.Group controlId="rating">
                        <Form.Label>Rating</Form.Label>
                        <Form.Control
                          as="select"
                          value={rating}
                          onChange={(e) => setRating(Number(e.target.value))}
                        >
                          <option value="">Select...</option>
                          <option value="1">1 - Poor</option>
                          <option value="2">2 - Fair</option>
                          <option value="3">3 - Good</option>
                          <option value="4">4 - Very Good</option>
                          <option value="5">5 - Excellent</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group controlId="comment">
                        <Form.Label>Comment</Form.Label>
                        <Form.Control
                          as="textarea"
                          // row='3'
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                      <Button type="submit" variant="primary">
                        Submit
                      </Button>
                    </Form>
                  ) : (
                    <Message>
                      Please <Link to="/login">sign in</Link> to write a review{' '}
                    </Message>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </>
  )
}

export default ProductScreen
