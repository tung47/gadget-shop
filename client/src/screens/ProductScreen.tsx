import React from 'react'
import {
  Link,
  useParams,
  useHistory,
  RouteComponentProps,
} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Breadcrumb,
} from 'react-bootstrap'

import { AppState, RouteParam } from '../types'
import Rating from '../components/Rating'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { addToCart } from '../redux/actions/cart'

const ProductScreen = ({ match }: RouteComponentProps<RouteParam>) => {
  const dispatch = useDispatch()
  const history = useHistory()
  
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

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}`)
    dispatch(addToCart(product))
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
