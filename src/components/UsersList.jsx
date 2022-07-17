import React from 'react';

const UsersList = ({ users, selectUser, deleteUser }) => {



    return (
        <ul className='user-container'>
            {users.map((user) => (
                <li className='user-card' key={user.id}>
                    <h2>{user.first_name} {user.last_name}</h2>
                    <span><i class="fa-solid fa-envelope"></i> {user.email}</span>
                    <p><b><i class="fa-solid fa-cake-candles"></i> {user.birthday}</b></p>
                    <div className='containerButton-card'>

                        <button className='button-card' onClick={() => deleteUser(user.id)}><i class="fa-solid fa-trash"></i></button>
                        <button className='button-card' onClick={() => selectUser(user)}><i class="fa-solid fa-pencil"></i></button>
                    </div>
                </li>
            ))}
        </ul>
    );
};

export default UsersList;