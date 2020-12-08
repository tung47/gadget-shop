import React, { useState, useEffect } from 'react'
import { Redirect, useHistory, useParams } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import { AppState, UserParams, UserProps } from '../types'
import Message from '../components/Message'
import { getUserDetails, userDetailsResetAction, } from '../redux/actions/user'

const INITIAL_USER: UserProps = {
  _id: '',
  name: '',
  email: '',
  password: '',
}

const ProfileScreen = () => {
  const { userId } = useParams<UserParams>()
  
  const [user, setUser] = useState(INITIAL_USER)
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState('')

  const dispatch = useDispatch()
  const history = useHistory()

  const { user: userDetails, error } = useSelector((state: AppState) => state.userDetails)
  
  const userLogin = useSelector((state: AppState) => state.userLogin)
  const { userInfo: authedUser } = userLogin

  // const userUpdateProfile = useSelector(
  //   (state: AppState) => state.userUpdateProfile
  // )
  // const { success: updateSuccess } = userUpdateProfile

  useEffect(() => {
    if (
      (authedUser && authedUser._id !== userId) ||
      !userDetails ||
      userDetails._id !== userId
    ) {
      dispatch(getUserDetails(userId))
    }

    userDetails &&
      setUser({
        _id: userDetails._id,
        name: userDetails.name || '',
        email: userDetails.email,
        password: userDetails.password
      })

      // if (updateSuccess) {
      //   history.push('/account')
      //   //dispatch(userUpdateProfileResetAction())
      //   dispatch(userDetailsResetAction())
      // }  
  }, [dispatch, history, authedUser, user, userId])

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (user.password !== confirmPassword) {
      setMessage('Passwords do not match')
    } else {
      dispatch(updateUserProfile(user))
    }
  }

  if (!authedUser || authedUser._id !== userId) {
    return <Redirect to="/" />
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target

    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  return (
    <Row>
      <Col md={3}>
        <h2>User Profile</h2>
        {message && <Message variant="danger">{message}</Message>}
        {error && <Message variant="danger">{error}</Message>}
        {/* {updateSuccess && <Message variant="success">Profile Updated</Message>} */}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="name"
              placeholder="Enter name"
              value={user.name}
              onChange={handleChange}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="email">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={user.email}
              onChange={handleChange}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={user.password}
              onChange={handleChange}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="confirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={handleChange}
            ></Form.Control>
          </Form.Group>

          <Button type="submit" variant="primary">
            Update
          </Button>
        </Form>
      </Col>
      <Col md={9}>
        <h2>My Orders</h2>
      </Col>
    </Row>
  )
}

export default ProfileScreen
