import React, { useState, useEffect } from 'react'
import { Link, useHistory, RouteComponentProps } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { AppState, UserProps, RouteParam, USER_EDIT_RESET } from '../types'
import { getUserDetails, editUser } from '../redux/actions/user'

// const INITIAL_USER: UserProps = {
//   _id: '',
//   name: '',
//   email: '',
//   isAdmin: false,
//   isBanned: false,
// }

const UserEditScreen = ({ match }: RouteComponentProps<RouteParam>) => {
  const userId = match.params.id

  const [email] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)
  const [isBanned, setIsBanned] = useState(false)

  const history = useHistory()
  const dispatch = useDispatch()

  const userDetails = useSelector((state: AppState) => state.userDetails)
  const { loading, error, user: detailsUser } = userDetails
  const {
    _id,
    name,
    isAdmin: detailsIsAdmin,
    isBanned: detailsIsBanned,
  } = detailsUser as UserProps

  const userEdit = useSelector((state: AppState) => state.userEdit)
  const {
    loading: loadingEdit,
    error: errorEdit,
    success: successEdit,
  } = userEdit

  useEffect(() => {
    if (successEdit) {
      dispatch({ type: USER_EDIT_RESET })
      history.push('/admin/userlist')
    } else {
      if (!name || _id !== userId) {
        dispatch(getUserDetails(userId))
      } else {
        setIsAdmin(detailsIsAdmin)
        setIsBanned(detailsIsBanned)
      }
    }
  }, [
    dispatch,
    history,
    userId,
    successEdit,
    _id,
    name,
    detailsIsAdmin,
    detailsIsBanned,
  ])

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(
      editUser({
        _id: userId,
        email,
        isAdmin,
        isBanned,
      })
    )
  }

  return (
    <>
      <Link to="/admin/userlist" className="btn btn-light my-3">
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit User</h1>
        {loadingEdit && <Loader />}
        {errorEdit && <Message variant="danger">{errorEdit}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="isAdmin">
              <Form.Check
                type="checkbox"
                label="Is Admin"
                checked={isAdmin}
                onChange={(e: any) => setIsAdmin(e.target.checked)}
              ></Form.Check>
            </Form.Group>

            <Form.Group controlId="isBanned">
              <Form.Check
                type="checkbox"
                label="Is Banned"
                checked={isBanned}
                onChange={(e: any) => setIsBanned(e.target.checked)}
              ></Form.Check>
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

export default UserEditScreen
