import axios from 'axios';
import React, { useEffect, useState } from 'react';

const UsersForm = ({ getUsers, userSelected, deselectUser }) => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [birthday, setBirthday] = useState("")

    const [isbutton, setIsButton] = useState(false)

    //     Nombre (“first_name”).
    // Apellido (“last_name”).
    // Email (“email”).
    // Contraseña (“password”).
    // Fecha de nacimiento (“birthday”).
    useEffect(() => {
        if (userSelected !== null) {
            setFirstName(userSelected.first_name)
            setLastName(userSelected.last_name)
            setEmail(userSelected.email)
            setPassword(userSelected.password)
            setBirthday(userSelected.birthday)
        }
    }, [userSelected])


    const submit = e => {
        e.preventDefault()
        const userForm = {
            first_name: firstName,
            last_name: lastName,
            email: email,
            password: password,
            birthday: birthday
        }
        if (userSelected !== null) {
            axios.put(`https://users-crud1.herokuapp.com/users/${userSelected.id}/`, userForm)
                .then((res) => {
                    getUsers()
                    reset()
                    deselectUser()
                })
        } else {

            axios.post('https://users-crud1.herokuapp.com/users/', userForm)
                .then((res) => {
                    getUsers()
                    reset()
                })
                .catch((error) => console.log(error.response))
        }

    }



    const reset = () => {
        setFirstName("")
        setLastName("")
        setEmail("")
        setPassword("")
        setBirthday("")
    }

    const clear = () => {
        reset()
        deselectUser()
    }


    return (
        <form className='form-container' onSubmit={submit}>
            <p className='title'><b>{userSelected !== null ? "Update User" : "Create User"}
            </b>
            </p>
            <div className='inputName-container'>


                <label htmlFor="firstName lastName"><i class="fa-solid fa-user"></i></label>
                <input placeholder='first name' className='input-name' type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />

                {/* <label htmlFor="lastName"></label> */}
                <input placeholder='last name' className='input-name' type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />


            </div>
            <div className='inputInfo-container'>

                <div className='input-info'>
                    <label htmlFor="email"><i class="fa-solid fa-envelope"></i></label>
                    <input placeholder='email' className='input-info' type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>

                <div className='input-info'>
                    <label htmlFor="password"><i class="fa-solid fa-lock"></i></label>
                    <input placeholder='password' className='input-info' type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>

                <div className='input-info'>
                    <label htmlFor="birthday"><i class="fa-solid fa-cake-candles"></i></label>
                    <input className='input-info input-birthday' type="date" value={birthday} onChange={(e) => setBirthday(e.target.value)} />
                </div>

            </div>

            <div className='button-info'>

                <button className='button-form'>{userSelected !== null ? "Update" : "Create"}</button>
                <button className='button-form' type='button' onClick={() => clear()}>clear</button>
            </div>
        </form >
    );
};

export default UsersForm;