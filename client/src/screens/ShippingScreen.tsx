import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { AppState, CartAddressProps } from '../types'
import FormContainer from '../components/FormContainer'
import { saveShippingAddress } from '../redux/actions/cart'

const ShippingScreen = () => {
  const history = useHistory()

  const cart = useSelector((state: AppState) => state.cart)
  const { shippingAddress } = cart
  const address: any = shippingAddress && shippingAddress.address
  const city: any = shippingAddress && shippingAddress.city
  const postalCode: any = shippingAddress && shippingAddress.postalCode
  const country: any = shippingAddress && shippingAddress.country

  const [userAddress, setUserAddress] = useState(address)
  const [userCity, setUserCity] = useState(city)
  const [userPostalCode, setUserPostalCode] = useState(postalCode)
  const [userCountry, setUserCountry] = useState(country)

  const dispatch = useDispatch()

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = {
      userAddress,
      userCity,
      userPostalCode,
      userCountry,
    } as CartAddressProps
    dispatch(saveShippingAddress(data))
    history.push('/payment')
  }

  return (
    <FormContainer>
      <h1>Shipping</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="userAddress">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter address"
            value={address}
            required
            onChange={(e) => setUserAddress(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="city">
          <Form.Label>City</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter city"
            value={userCity}
            required
            onChange={(e) => setUserCity(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="postalCode">
          <Form.Label>Postal Code</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter postal code"
            value={userPostalCode}
            required
            onChange={(e) => setUserPostalCode(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="country">
          <Form.Label>Country</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter country"
            value={userCountry}
            required
            onChange={(e) => setUserCountry(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type="submit" variant="primary">
          Continue
        </Button>
      </Form>
    </FormContainer>
  )
}

export default ShippingScreen
