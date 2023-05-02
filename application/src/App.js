import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import axios from 'axios'
import jwtDecode from 'jwt-decode';
import neon from './images/neon.mp4'
import dp from './images/dp.png'
import instagram from './images/instagram.svg'
import whatsapp from './images/whatsapp.svg'
import discord from './images/discord.svg'
import youtube from './images/youtube.svg'
import './App.css';
import Home from './components/Home'
import TournamentForm from './components/TournamentForm'

function App() {
	const [user, setUser] = useState({})
	const [loading, setLoading] = useState(true)

	const handleCallBackResponse = async (response) => {
		setLoading(true)
		var userData = await jwtDecode(response.credential)
		try {
			var jsonData = await axios.post('/findOrAdd', userData)
			setUser(jsonData.data)
			document.getElementById("loginButton").hidden = true
			document.getElementsByClassName("user-name")[0].hidden = false
			document.getElementsByClassName("logout")[0].hidden = false
		} catch (error) {
			alert("Error occured: ", error)
		} finally {
			setLoading(false)
		}
	}

	const handleLogout = () => {
		// setUser({})
		// document.getElementById("loginButton").hidden = false
		// document.getElementsByClassName("user-name")[0].hidden = true
		// document.getElementsByClassName("logout")[0].hidden = true
		window.location.replace("/")
	}

	const openInNewTab = (url) => {
		window.open(url, '_blank', 'noreferrer');
	}

	useEffect(() => {
		const connectOAuth = async () => {
			/* global google */
			await google.accounts.id.initialize({
				client_id: "133396583135-1rar9q7nq2fotg5h6qk085i97s37hi5u.apps.googleusercontent.com",
				callback: handleCallBackResponse
			})
			await google.accounts.id.renderButton(document.getElementById("loginButton"), { theme: "outline", size: "large" })
			await google.accounts.id.prompt()
			return Promise.resolve()
		}

		connectOAuth().then(
			() => { setLoading(false) }
		);
	}, [])

	return (
		<>
			<div className='mobile-display'>
				<div className='mobile-display-container'>
					This Website is being optimised for Mobile Browsing, Please use this website on desktop for now. Inconvinience is regretted.
				</div>
			</div>
			{loading && <div className='loading-screen'><div className='loader'></div></div>}
			<div className="background">
				<video src={neon} alt='Not Supported' className='jett-img' autoPlay loop muted />
				{/* <img src={jett} alt="Not Supported" className='jett-img' /> */}
			</div>
			<div className='floating-icons'>
				<div className='discord' onClick={() => { openInNewTab("https://discord.gg/4Tf4Ps6BBD") }} >
					<img src={discord} alt='Not Supported' />
				</div>
				<div className='youtube' onClick={() => { openInNewTab("https://www.youtube.com/@KohinoorESports") }} >
					<img src={youtube} alt='Not Supported' />
				</div>
				<div className='instagram' onClick={() => { openInNewTab("https://www.instagram.com/kohinoor_esports/") }} >
					<img src={instagram} alt='Not Supported' />
				</div>
				<div className='whatsapp' onClick={() => { openInNewTab("https://discord.gg/4Tf4Ps6BBD") }} >
					<img src={whatsapp} alt='Not Supported' />
				</div>
			</div>
			<div className='header-background'></div>
			<div className='header'>
				<div className='logo'>
					<img src={dp} className='logo-img' alt="Not supported" />
					<div className='logo-name'>
						KohiNooR &nbsp;eSPORTS
					</div>
				</div>
				<div className='login-container'>
					<div id='loginButton'></div>
					<div className='user-name' hidden>Welcome, <br /> {user.name}</div>
					<div className='logout' hidden onClick={() => { handleLogout() }} >Logout</div>
				</div>
			</div>
			<div className='adjuster'></div>
			<BrowserRouter>
				<Routes>
					<Route exact index path='/' element={<Home user={user} setLoading={setLoading} loading={loading} />} ></Route>
					<Route exact path='/apply' element={<TournamentForm user={user} setUser={setUser} setLoading={setLoading} />} ></Route>
				</Routes>
			</BrowserRouter>
			<div className='policies'>
				<span>&#169; Kohinoor eSports</span> &nbsp;&nbsp;&nbsp;
				<a href='/privacy-policy' target="_blank" >Privacy Policy</a> &nbsp;&nbsp;&nbsp;
				<a href='/terms-and-conditions' target="_blank" >Terms and Conditions</a> &nbsp;&nbsp;&nbsp;
				<a href='/return-policy' target="_blank" >Return Policy</a>
			</div>
		</>
	);
}

export default App;

