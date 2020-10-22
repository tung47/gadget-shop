import React, { useState } from 'react'
import {
  Link,
  useParams,
  useHistory,
  RouteComponentProps,
} from 'react-router-dom'
import { useSelector } from 'react-redux'
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
  Breadcrumb,
} from 'react-bootstrap'

import { AppState, RouteParam } from '../../types'
import Rating from '../../components/Rating'
import Message from '../../components/Message'
import Loader from '../../components/Loader'

const ProductScreen = ({ match }: RouteComponentProps<RouteParam>) => {
  let history = useHistory()
  const [qty, setQty] = useState<number | any>(1)

  const error: string | null = useSelector(
    (state: AppState) => state.products.error
  )

  const { id } = useParams<RouteParam>()
  const product = useSelector((state: AppState) =>
    state.products.productList.find((p) => p._id === id)
  )

  if (!product) {
    return <p>No Products</p>
  }

  const updateQty = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQty({ qty: Number(e.target.value) })
  }

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`)
  }

  return (
    <>
      <Link className="btn btn-light my-3" to="/">
        Go back
      </Link>

      <Breadcrumb>
        <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
        <Breadcrumb.Item href="/">Products</Breadcrumb.Item>
        <Breadcrumb.Item active>{product.name}</Breadcrumb.Item>
      </Breadcrumb>

      {!product ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          <Col md={6}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Image src={product.image} alt="product.name" fluid />
              </ListGroup.Item>
              <ListGroup.Item>
                Description: {product.description}
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={3}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h3>{product.name}</h3>
              </ListGroup.Item>
              <ListGroup.Item>
                <Rating
                  value={product.rating}
                  text={`${product.numReviews} reviews`}
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
                      <strong>€{product.price}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Row>
                    <Col>
                      {product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}
                    </Col>
                  </Row>
                </ListGroup.Item>

                {product.countInStock > 0 && (
                  <ListGroup.Item>
                    <Row>
                      <Col>Quantity:</Col>
                      <Col>
                        <Form.Control
                          as="select"
                          value={qty}
                          onChange={updateQty}
                        >
                          {[...Array(product.countInStock).keys()].map((x) => (
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
                    disabled={product.countInStock === 0}
                  >
                    Add To Cart
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </>
  )
}

export default ProductScreen
