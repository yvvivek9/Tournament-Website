import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import anime from 'animejs/lib/anime.es.js';
import Typed from 'typed.js'
import AOS from 'aos';
import 'aos/dist/aos.css';
import '../styling/Home.css'

import rog from "../images/rog.png"
import marsMeat from "../images/mars meat.png"

function Title ({loading}){
    const viewApply = () => {
        anime({
            targets: '.apply-button',
            opacity: 1,
            easing: 'linear',
            duration: 1000
        })
    }

    useEffect(() => {
        if(!loading){
            anime({
                targets: '.title-1',
                translateX: 1920, // -> from '28px' to '100%',
                easing: 'easeInOutQuad',
                duration: 1500
            });
            anime({
                targets: '.title-2',
                translateX: 1920, // -> from '28px' to '100%',
                easing: 'easeInOutQuad',
                delay: 500,
                duration: 2000,
            });
            setTimeout(() => {
                const typed = new Typed("#typed-text", {
                    strings: ['FIRST EVER LAN EVENT IN HUBBALLI - DHARWAD'],
                    typeSpeed: 20,
                    showCursor: false,
                    onComplete: viewApply
                  });
            }, 3000)
        }
    }, [loading])

    return(
        <div className="title">
            <div className="title-1">VALORANT</div>
            <div className="title-2">LAN-CHAMPIONSHIP</div>
            <span id="typed-text"></span>
        </div>
    )
}

function ApplyButton ({user, setLoading}) {
    const navigate = useNavigate()
    const handleClick = () => {
        if(Object.keys(user).length === 0){
            alert("Please login to apply")
        }
        else{    
            setLoading(true)
            navigate("/apply")
        }
    }

    return(
        <div className="apply-container">
            <div className="apply-button" onClick={() => {handleClick()}}>
                {user.applied ? <span>View Application</span> : <span>APPLY</span>}
            </div>
        </div>
    )
}

function Venue() {
    const [venue, showVenue] = useState(false)

    const handleClick = async () => {
        showVenue(true)
        return Promise.resolve()
    }

    const animate = () => {
        anime({
            targets: '.venue-details-hidden',
            opacity: 1,
            easing: 'linear',
            duration: 1000
        })
    }

    return(
        <div className="venue" onClick={() => {handleClick().then(() => {animate()})}} data-aos="flip-up" data-aos-duration="1000" data-aos-once >
            <div className="venue-title">Venue</div>
            <div className="venue-details">
            {venue ? 
                <span className="venue-details-hidden">
                    <span><b>Date:</b> &nbsp;To Be Announced... </span><br />
                    <span><b>Location:</b> &nbsp; Swarna Paradise, Hubballi</span><br /><br />
                    <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15389.85275250851!2d75.1463053!3d15.3513811!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bb8d75c53c77bc7%3A0x3c33ea4e64b161d8!2sHotel%20Swarnaa%20Paradise!5e0!3m2!1sen!2sin!4v1681147218590!5m2!1sen!2sin" width="60%" height="450" loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="google-maps"></iframe>
                </span>:
                <span style={{fontWeight: "500", fontSize: '30px'}}>Click to view</span>
            }
            </div>
        </div>
    )
}

function Details() {
    const [details, showDetails] = useState(false)

    const handleClick = async () => {
        showDetails(true)
        return Promise.resolve()
    }

    const animate = () => {
        anime({
            targets: '.details-details-hidden',
            opacity: 1,
            easing: 'linear',
            duration: 1000
        })
    }

    return(
        <div className="details" onClick={() => {handleClick().then(() => {animate()})}} data-aos="flip-up" data-aos-duration="1000" data-aos-once >
            <div className="details-title">Details</div>
            <div className="details-details">
            {details ? 
                <span className="details-details-hidden">
                    <ul>
                        <li>Tournament will be conducted in hybrid mode i.e,
                            <ul style={{listStyleType: "circle"}}>
                                <li>Eliminations will be conducted in Online mode to select top 20 teams</li>
                                <li>Top 20 teams will be having Playoff's as an Offline LAN Event</li>
                            </ul>
                        </li>
                        <li>Registration Fee is <b>Rs. 1500</b> per team (non-refundable)</li>
                        <li>Game will be played on "Mumbai Server" and "Latest Patch Note"</li>
                        <li>Veto based map selection is done among the current 7 map pool to select 1 map (in elim's) and best of 3 (in playoff's)</li>
                        <li>Technical & Tactical Timeout will be provided, In-case of any failure of equipment notify us immediately</li>
                        <li>Further details for play-offs will be provided by mail and discord</li>
                    </ul>
                </span>:
                <span style={{fontWeight: "500", fontSize: '30px'}}>Click to view</span>
            }
            </div>
        </div>
    )
}

function Rules() {
    const [rules, showRules] = useState(false)

    const handleClick = async () => {
        showRules(true)
        return Promise.resolve()
    }

    const animate = () => {
        anime({
            targets: '.rules-rules-hidden',
            opacity: 1,
            easing: 'linear',
            duration: 1000
        })
    }

    return(
        <div className="rules" onClick={() => {handleClick().then(() => {animate()})}} data-aos="flip-up" data-aos-duration="1000" data-aos-once >
            <div className="rules-title">Rules</div>
            <div className="rules-rules">
            {rules ? 
                <span className="rules-rules-hidden">
                    <ul>
                        <li>Cheating of any kind is strictly prohibited</li>
                        <li>Physical and Verbal Abuse will not be entertained</li>
                        <li>Consumable Restrictions:<br />
                            &emsp;Allowed: Water bottles, soft drinks, chewing gum<br />
                            &emsp;Not Allowed: Hot drinks, eatables, Tobacco, spitting.
                        </li>
                        <li>All the team members should be present at the venue sharp at the mentioned reporting time</li>
                        <li>If a player has represented a team, he/she won’t be able to play for any other team(s).</li>
                    </ul>
                </span>:
                <span style={{fontWeight: "500", fontSize: '30px'}}>Click to view</span>
            }
            </div>
        </div>
    )
}

function Sponsers(){
    return(
        <div className="sponsers-container">
            <div className="sponsers-title">SPONSERED BY</div>
            <div className="sponsers">
                <div className="main-sponser" data-aos="zoom-in" data-aos-duration="1000" data-aos-once>
                    <p>Powered BY</p><br />
                    <img src={rog} alt="Not supported" />
                </div>
                <div className="co-sponser" data-aos="zoom-in" data-aos-duration="1000" data-aos-once>
                    <p>Co-Sponsered BY</p><br />
                    <div className="co-sponser-container">
                        <img src={marsMeat} alt="Not supported" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default function Home ({user, setLoading, loading}){
    useEffect(() => {
        AOS.init()
    }, [])

    return(
        <div className="homepage">
            <Title loading={loading} />
            <ApplyButton user={user} setLoading={setLoading} />
            <Venue />
            <Details />
            <Rules />
            <Sponsers />
        </div>
    )
}