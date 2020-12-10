import React, { useState, useEffect } from 'react'
import { Redirect, useHistory } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import { AppState, UserProps } from '../types'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {
  getUserDetails,
  updateUser,
} from '../redux/actions/user'
import { userInfo } from 'os'

const INITIAL_USER: UserProps = {
  _id: '',
  name: '',
  email: '',
  password: '',
}

const ProfileScreen = () => {
  const history = useHistory()

  const [user, setUser] = useState(INITIAL_USER)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState('')

  const dispatch = useDispatch()

  const userDetails = useSelector((state: AppState) => state.userDetails)
  const { loading, error, user: detailsUser } = userDetails
  const {_id: id} = user
  
  const userLogin = useSelector((state: AppState) => state.userLogin)
  const { userInfo: loginUser } = userLogin

  const userUpdate = useSelector((state: AppState) => state.userUpdate)
  const { success: updateSuccess } = userUpdate

  useEffect(() => {
    if (!loginUser) {
      history.push('/login')
    } else {
      if (!detailsUser || !detailsUser.name) {
        dispatch(getUserDetails('profile'))
      } else {
        setName(detailsUser.name)
        setEmail(detailsUser.email)
      }
    }
  }, [dispatch, history, userInfo, user])

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setMessage('Passwords do not match')
    } else {
      const updateData = { id, name, email, password }
      dispatch(updateUser(updateData))
    }
  }

  if (!loginUser) {
    return <Redirect to="/" />
  }

  return (
    <Row>
      <Col md={3}>
        <h2>User Profile</h2>
        {message && <Message variant="danger">{message}</Message>}
        {}
        {updateSuccess && <Message variant="success">Profile Updated</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
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

            <Form.Group controlId="email">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="confirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type="submit" variant="primary">
              Update
            </Button>
          </Form>
        )}
      </Col>
      <Col md={9}>
        <h2>My Orders</h2>
      </Col>
    </Row>
  )
}

export default ProfileScreen
