import React, { useEffect, useState } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import Message from '../components/Message'
import Loader from '../components/Loader'
import {
  listUsers,
  deleteUser,
  banUser,
  unbanUser,
} from '../redux/actions/user'
import { AppState } from '../types'

const UserListScreen = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const [message, setMessage] = useState('')

  const userList = useSelector((state: AppState) => state.userList)
  const { loading, error, users } = userList

  const userLogin = useSelector((state: AppState) => state.userLogin)
  const { userInfo } = userLogin

  const userDelete = useSelector((state: AppState) => state.userDelete)
  const { success: successDelete } = userDelete

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listUsers())
    } else {
      history.push('/login')
    }
  }, [dispatch, history, userInfo, successDelete])

  const deleteHandler = (userId: string) => {
    if (window.confirm('Are you sure?')) {
      dispatch(deleteUser(userId))
    }
  }

  const banHandler = (userId: string) => {
    const user = users.find((user) => user._id === userId)

    if (user) {
      user.isBanned && dispatch(unbanUser(user._id))
      !user.isBanned && dispatch(banUser(user._id))
    } else {
      setMessage('Could not find user')
    }
  }

  return (
    <>
      <h1>Users</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : message ? (
        <Message variant="danger">{message}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th>BAN STATUS</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>
                  <a href={`mailto:${user.email}`}>{user.email}</a>
                </td>
                <td>
                  {user.isAdmin ? (
                    <i className="fas fa-check" style={{ color: 'green' }}></i>
                  ) : (
                    <i className="fas fa-times" style={{ color: 'red' }}></i>
                  )}
                </td>
                <td>
                  {user.isBanned ? (
                    <i className="fas fa-check" style={{ color: 'green' }}></i>
                  ) : (
                    <i className="fas fa-times" style={{ color: 'red' }}></i>
                  )}
                </td>
                <td>
                  <Button
                    variant="danger"
                    className="btn-sm"
                    onClick={() => deleteHandler(user._id)}
                  >
                    <i className="fas fa-trash"></i>
                  </Button>
                  <Button
                    variant="danger"
                    className="btn-sm"
                    onClick={() => banHandler(user._id)}
                  >
                    <i className="fas fa-ban"></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  )
}

export default UserListScreen
