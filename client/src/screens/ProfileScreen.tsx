import React, { useState, useEffect } from 'react'
import { Redirect, useHistory, useLocation, useParams } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import { AppState, UserParams, UserProps } from '../types'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {
  getUserDetails,
  updateUser,
  userDetailsResetAction,
  userUpdateResetAction,
} from '../redux/actions/user'
import { userInfo } from 'os'

const INITIAL_USER: UserProps = {
  _id: '',
  name: '',
  email: '',
  password: '',
}

const ProfileScreen = () => {
  // const location = useLocation()
  // const history = useHistory()

  // const [id, setId] = useState('')
  // const [name, setName] = useState('')
  // const [email, setEmail] = useState('')
  // const [password, setPassword] = useState('')
  // const [confirmPassword, setConfirmPassword] = useState('')
  // const [message, setMessage] = useState(null)

  // const dispatch = useDispatch()

  // const userDetails = useSelector((state: AppState) => state.userDetails)
  // const { loading, error, user: detailsUser } = userDetails

  // const userLogin = useSelector((state: AppState) => state.userLogin)
  // const { userInfo } = userLogin

  // const userUpdate = useSelector((state: AppState) => state.userUpdate)
  // const { success } = userUpdate

  // useEffect(() => {
  //   if (!userInfo) {
  //     history.push('/login')
  //   } else {
  //     if (!detailsUser || !detailsUser.name) {
  //       dispatch(getUserDetails('profile'))
  //     } else {
  //       setId(userInfo._id)
  //       setName(detailsUser.name)
  //       setEmail(detailsUser.email)
  //     }
  //   }
  // }, [dispatch, history, userInfo, detailsUser])

  // const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault()
  //   if (detailsUser.password !== confirmPassword) {
  //     setMessage('Passwords do not match')
  //   } else {
  //     const id = user._id
  //     dispatch(updateUser( id, name, email, password ))
  //   }
  // }


  const { userId } = useParams<UserParams>()

  const [user, setUser] = useState(INITIAL_USER)
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState('')

  const dispatch = useDispatch()
  const history = useHistory()

  const userLogin = useSelector((state: AppState) => state.userLogin)
  const { userInfo: loginUser } = userLogin
  
  const userDetails = useSelector((state: AppState) => state.userDetails)
  const { loading, error, user: detailsUser } = userDetails
  
  const userUpdate = useSelector((state: AppState) => state.userUpdate)
  const { success: updateSuccess } = userUpdate

  useEffect(() => {
    if (
      (loginUser && loginUser._id !== userId) ||
      !detailsUser ||
      detailsUser._id !== userId
    ) {
      dispatch(getUserDetails(userId))
    }

    detailsUser &&
      setUser({
        _id: detailsUser._id,
        name: detailsUser.name,
        email: detailsUser.email,
        password: detailsUser.password,
      })

    if (updateSuccess) {
      history.push('/account')
      dispatch(userUpdateResetAction())
      dispatch(userDetailsResetAction())
    }
  }, [dispatch, history, detailsUser, loginUser ])

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (user.password !== confirmPassword) {
      setMessage('Passwords do not match')
    } else {
      dispatch(updateUser(user))
    }
  }

  if (!loginUser || loginUser._id !== userId) {
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
        )}
      </Col>
      <Col md={9}>
        <h2>My Orders</h2>
      </Col>
    </Row>
  )
}

export default ProfileScreen
