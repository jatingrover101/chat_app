import MessageForm from './MessageForm';
import MyMessage from './MyMessage';
import TheirMessage from './TheirMessage';
import { useState } from 'react';

const ChatFeed = (props) => {
	const { chats, activeChat, userName, messages } = props;
	const [setError] = useState('');
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			localStorage.setItem('username', '');
			localStorage.setItem('password', '');

			window.location.reload();
		} catch (error) {
			setError('Oops, cannot logout.')
		}
	}

	const chat = chats && chats[activeChat];
	const renderReadReceipts = (message, isMyMessage) => {
	return chat.people.map((person, index) => person.last_read === message.id && (
		<div 
			key={`read_${index}`}
			className="read-receipt"
			style={{
				float: isMyMessage ? 'right' : 'left',
				backgroundImage: `url(${person.person.avatar})`
			}}
		/>
	))
	}

	const renderMessages = () => {
		const keys = Object.keys(messages);
		return keys.map((key, index) => {
		const message = messages[key];
		const lastMessageKey = index === 0 ? null : keys[index-1];
		const isMyMessage = userName === message.sender.username;

		return (
			<div key={`msg_${index}`} style={{ width: '100%' }}>
				<div className="message-block">
				{
					isMyMessage
					? <MyMessage message={message}/>
					: <TheirMessage message={message} lastMessage={messages[lastMessageKey]}/>

				}
				</div>
				<div className="read-receipts" style={{ marginRight: isMyMessage ? '18px' : '0px', marginLeft: isMyMessage ? '0px' : '68px'}}>
					{renderReadReceipts(message, isMyMessage)}
				</div>
			</div>
		)
		})

	}
	
	if (!chat) return (<div><h3>Loading!!! Start a new chat...</h3></div>)
	return (
		<div className="chat-feed">
			<div className="chat-title-container">
				<div className="chat-title">{chat?.title}</div>
				<div className="chat-subtitle">
					{chat.people.map((person) => ` ${person.person.first_name} ${person.person.last_name} ${(",")}`)}
				</div>
				<div>
				<form onSubmit={handleSubmit}>
					<button type="submit" className="button1">LogOut</button>
				</form>
				</div>	
				
			</div>
			{renderMessages()}
			<div style={{height: '100px'}}/>
			<div className="message-form-container">
				<MessageForm {...props} chatId={activeChat} />
			</div>
			
		</div>
	)
}

export default ChatFeed;