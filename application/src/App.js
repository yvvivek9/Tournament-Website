import {useEffect, useState} from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import axios from 'axios'
import jwtDecode from 'jwt-decode';
import raze from './images/raze.mp4'
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
      var jsonData = await axios.post(`/findOrAdd?email=${userData.email}&name=${userData.given_name}`)
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
    setUser({})
    document.getElementById("loginButton").hidden = false
    document.getElementsByClassName("user-name")[0].hidden = true
    document.getElementsByClassName("logout")[0].hidden = true
  }

  const connectOAuth = async () => {
    /* global google */
    await google.accounts.id.initialize({
      client_id: "133396583135-1rar9q7nq2fotg5h6qk085i97s37hi5u.apps.googleusercontent.com",
      callback: handleCallBackResponse
    })
    await google.accounts.id.renderButton(document.getElementById("loginButton"), {theme: "outline", size: "large"})
    await google.accounts.id.prompt()
    return Promise.resolve()
  }

  const openInNewTab = (url) => {
    window.open(url, '_blank', 'noreferrer');
  }
  
  useEffect(() => {
    connectOAuth().then(
      ()=> setTimeout(() => {setLoading(false)}, 1000)
    );
  }, [])

  return (
    <>
      {loading && <div className='loading-screen'><div className='loader'></div></div>}
      <div className="background">
        <video src={raze} alt='Not Supported' className='jett-img' autoPlay loop muted />
        {/* <img src={jett} alt="Not Supported" className="jett-img" /> */}
        {/* <iframe src="https://www.youtube.com/embed/-mRMNC72Z6A?controls=0&autoplay=1&mute=1&playsinline=0&loop=1&playlist=-mRMNC72Z6A&vq=hd1080" className='jett-img' title='Background'></iframe> */}
      </div>
      <div className='floating-icons'>
        <div className='discord' onClick={() => {openInNewTab("https://discord.gg/4Tf4Ps6BBD")}} >
          <img src={discord} alt='Not Supported' />
        </div>
        <div className='youtube' onClick={() => {openInNewTab("https://www.youtube.com/@KohinoorESports")}} >
          <img src={youtube} alt='Not Supported' />
        </div>
        <div className='instagram' onClick={() => {openInNewTab("https://www.instagram.com/kohinoor_esports/")}} >
          <img src={instagram} alt='Not Supported' />
        </div>
        <div className='whatsapp' onClick={() => {openInNewTab("https://discord.gg/4Tf4Ps6BBD")}} >
          <img src={whatsapp} alt='Not Supported' />
        </div>
      </div>
      <div className='header-background'></div>
      <div className='header'>
        <div className='logo'>
          <div className='logo-name'>
            KOHIN&#9830;&#9830;R &nbsp;eSPORTS
          </div>
        </div>
        <div className='login-container'>
          <div id='loginButton'></div>
          <div className='user-name' hidden>Welcome, <br /> {user.name}</div>
          <div className='logout' hidden onClick={() => {handleLogout()}} >Logout</div>
        </div>
      </div>
      <div className='adjuster'></div>
      <BrowserRouter>
        <Routes>
          <Route exact index path='/' element={<Home user={user} setLoading={setLoading} loading={loading} />} ></Route>
          <Route exact path='/apply' element={<TournamentForm user={user} setLoading={setLoading} />} ></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

