import axios from 'axios'
import { useState, useEffect } from 'react'

import './App.css'
import UsersForm from './components/UsersForm'
import UsersList from './components/UsersList'

function App() {
  const [users, setUsers] = useState([])
  const [userSelected, setUserSelected] = useState(null)

  useEffect(() => {
    axios.get("https://users-crud1.herokuapp.com/users/")
      .then((res) => setUsers(res.data))
  }, [])

  const getUsers = () => {
    axios.get("https://users-crud1.herokuapp.com/users/")
      .then((res) => setUsers(res.data))
  }

  const selectUser = (user) => {

    setUserSelected(user)
  }

  const deselectUser = () => {
    setUserSelected(null)
  }

  const deleteUser = (id) => {
    axios.delete(`https://users-crud1.herokuapp.com/users/${id}/ `)
      .then((res) => getUsers())
  }


  console.log(users)

  return (
    <div className="container">
      <UsersForm getUsers={getUsers} userSelected={userSelected} deselectUser={deselectUser} />
      <UsersList users={users} selectUser={selectUser} deleteUser={deleteUser} />
    </div>
  )
}

export default App
