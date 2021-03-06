import { ChatEngine } from 'react-chat-engine';
import ChatFeed from './components/ChatFeed';
import LoginForm from './components/LoginForm';

import './App.css';

const App = () => {
	if (!localStorage.getItem('username')) return <LoginForm />
	return (
		<ChatEngine 
			height="100vh"
			projectID="bedf3d45-59b4-49dd-a056-dd44c1770f17"
			userName={localStorage.getItem('username')}
			userSecret={localStorage.getItem('password')}
			renderChatFeed={(chatAppProps) => <ChatFeed {...chatAppProps} />}

		/>
		)

}

export default App;