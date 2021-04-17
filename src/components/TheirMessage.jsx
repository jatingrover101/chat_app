const ThierMessage = ({lastMessage, message }) => {
	const isFirstMessageByUser = !lastMessage || lastMessage.sender.username !== message.sender.username; 
	return (
		<div className="message-row">
		{isFirstMessageByUser && (
				<div className="message-avatar"
			style={{ backgroundImage: `url(${message.sender.avatar})` }}
				/>
		)}
		{message?.attachments?.length > 0 ?
		(
			<img 
				src={message.attachments[0].file}
				alt="messsage-attachment"
				className="message-image"	
				style={{ marginLeft: isFirstMessageByUser ? '4px' : '48px'}}
				/>
				) : <div className="message" style={{ float: 'left', backgroundColor: '#CABCDC', marginLeft: isFirstMessageByUser ? '4px' : '48px' }}>
					<div className="firstname">{message.sender.first_name}</div><div>{message.text}</div>
		</div>

	}
		</div>
	);
}

export default ThierMessage;