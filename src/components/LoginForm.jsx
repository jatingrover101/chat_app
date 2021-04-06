import {useState} from 'react';
import axios from 'axios';

const LoginForm = () => {
	const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
	const [first_name, setFirstname] = useState('');
	const [last_name, setLastname] = useState('');
    const [error, setError] = useState('');
    const [error1, setError1] = useState('');

	const handleSubmit = async (e) => {
		e.preventDefault();

		const authObject = { 'Project-ID': "bedf3d45-59b4-49dd-a056-dd44c1770f17",'User-Name':  username, 'User-Secret': password}

		try{
			await axios.get('https://api.chatengine.io/chats', { headers: authObject });
			localStorage.setItem('username', username);
			localStorage.setItem('password', password);

			window.location.reload();
		}catch (error) {
			setError('Oops, incorrect credentials.')
		}
	}
	const handleSignup = async (e) => {

        try {
            axios.post(
                'https://api.chatengine.io/projects/people/',
                { 'username': username, 'secret': password, 'first_name': first_name, 'last_name': last_name },
                { headers: { "Private-Key": '3f68c86d-5534-4b20-b3f3-113fbfff0038' } }
            )
            window.alert("New user created kindly Log In to start chatting!!!");
        } catch (error1) {
            setError1('Oops, User already exist');
        }
	}

	return (
        <>
        <div className="wrapper1">
			<h1 className="title1">Web Chat Application</h1>
        </div>
            <div className="wrapper">

                <div className="form1">
                    <h1 className="title">Log In</h1>
                    <form onSubmit={handleSubmit}>
                        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="input" placeholder="Username" required />
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="input" placeholder="Password" required />
                        <div align="center">
                            <button type="submit" className="button">
                                <span>Start Chatting</span>
                            </button>
                        </div>
                        <h2 className="error">{error}</h2>
                    </form>
                </div>
                <div className="form2">
                    <h2 className="title">New user? Do SignUp!</h2>
                    <form onSubmit={handleSignup}>
                        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="input" placeholder="Username" required />
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="input" placeholder="Password" required />
                        <input type="text" value={first_name} onChange={(e) => setFirstname(e.target.value)} className="input" placeholder="First Name" />
                        <input type="text" value={last_name} onChange={(e) => setLastname(e.target.value)} className="input" placeholder="Last Name" />
                        <div align="center">
                            <button type="submit" className="button">
                                <span>Create a new user</span>
                            </button>
                        </div>
                        <h2 className="error">{error1}</h2>
                    </form>
                </div>
            </div></>
		

	);
}

export default LoginForm;