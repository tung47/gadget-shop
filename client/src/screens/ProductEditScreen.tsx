import React, { useState, useEffect } from 'react'
import { Link, useHistory, useParams } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { updateProduct } from '../redux/actions/product'
import { AppState, ParamsType, ProductProps } from '../types'

const ProductEditScreen = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { id } = useParams<ParamsType>()

  const { productList } = useSelector((state: AppState) => state.products)
  const { error } = useSelector((state: AppState) => state.products)

  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  const [image, setImage] = useState('')
  const [brand, setBrand] = useState('')
  const [category, setCategory] = useState('')
  const [countInStock, setCountInStock] = useState(0)
  const [description, setDescription] = useState('')
  const [uploading, setUploading] = useState(false)

  const [message, setMessage] = useState('')

  const [productToUpdate] = productList.filter((product) => product._id === id)
  const _id = productToUpdate._id

  useEffect(() => {
    if (productToUpdate.name) setName(productToUpdate.name)
    if (productToUpdate.price) setPrice(productToUpdate.price)
    if (productToUpdate.image) setImage(productToUpdate.image)
    if (productToUpdate.brand) setBrand(productToUpdate.brand)
    if (productToUpdate.category) setCategory(productToUpdate.category)
    if (productToUpdate.countInStock)
      setCountInStock(productToUpdate.countInStock)
    if (productToUpdate.description) setDescription(productToUpdate.description)
    if (productToUpdate.uploading) setUploading(productToUpdate.uploading)
  }, [dispatch, id, productToUpdate, history])

  const submitHandler = (e: any) => {
    e.preventDefault()
    setMessage('Product is updated')
    const {
      _id,
      name,
      price,
      image,
      brand,
      category,
      countInStock,
      description,
      uploading,
    } = productToUpdate

    const payload: any = {
      _id,
      name,
      price: Number(price),
      image,
      brand,
      category,
      countInStock,
      description,
      uploading,
    }

    dispatch(
      updateProduct(payload)
    )
  }

  return (
    <>
      <Link to="/admin/productlist" className="btn btn-light my-3">
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Product</h1>
        {error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>
            
            <Form.Group controlId="price">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter price"
                value={price}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="image">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter image url"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></Form.Control>
              <Form.File
                id="image-file"
                label="Choose File"
                custom
              ></Form.File>
            </Form.Group>

            <Form.Group controlId="brand">
              <Form.Label>Brand</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter brand"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="countInStock">
              <Form.Label>Count In Stock</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter countInStock"
                value={countInStock}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="category">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type="submit" variant="primary">
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  )
}

export default ProductEditScreen
