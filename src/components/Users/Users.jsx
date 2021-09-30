import './Users.scss'

const Users = ({users}) => (
    <div className='users'>
        <div className="users__label">Realtime chat 👍</div>
        <div className="users__label">Using Express.js, Socket.io and React 📡</div>
        <div className="users__title">Users in a room:</div>
        <ul className="users__list">
            {users.map(user => <li>{user.name}</li>)}
        </ul>
    </div>
)

export default Users;