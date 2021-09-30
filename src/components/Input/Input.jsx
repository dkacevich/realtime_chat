import './Input.css'

const Input = ({message,  setMessage,  sendMessage}) => (
    <form onSubmit={e => sendMessage(e)} className="form">
        <input
            className="input"
            type="text"
            placeholder="Type a message..."
            value={message}
            onChange={e => setMessage(e.target.value)}
            onKeyPress={e => e.key === 'Enter' ? sendMessage(e) : null}
        />
        <button className="sendButton">Send</button>
    </form>
)

export default Input