import {useEffect, useState} from "react";
import queryString from 'query-string';
import io from 'socket.io-client';
import InfoBar from "../InfoBar/InfoBar";
import Input from "../Input/Input";
import Messages from "../Messages/Messages";
import './Chat.css'
import Users from "../Users/Users";


let socket;

const Chat = ({location}) => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [users, setUsers] = useState([]);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const ENDPOINT = 'https://chat-app-238284.herokuapp.com/'


    useEffect(() => {
        console.log('join');
        const {name, room} = queryString.parse(location.search)
        setName(name);
        setRoom(room);

        socket = io(ENDPOINT, {transports: ['websocket', 'polling', 'flashsocket']});

        socket.emit('join', {name, room}, () => {});

        return () => {
            socket.off();
        }
    }, [location.search, ENDPOINT])


    useEffect(() => {
        socket.on('message', message => {
            setMessages(messages => [ ...messages, message ]);
        });

        socket.on("users", ({ users }) => {
            setUsers(users);
        });
    }, []);

    const sendMessage = (e) => {
        e.preventDefault();

        if (message) {
            socket.emit('sendMessage', {message}, () => setMessage(''));
        }
    }

    return (
        <div className="outerContainer">
            <div className="container">
                <InfoBar room={room}/>
                <Messages messages={messages} name={name}/>
                <Input message={message} setMessage={setMessage} sendMessage={sendMessage}/>
            </div>
            <Users users={users}/>
        </div>
    )
}

export default Chat;