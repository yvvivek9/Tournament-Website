import React, { useEffect } from "react";
import '../styling/TournamentForm.css'

function Note(){
    return(
        <div className="note">
            <div className="note-title">NOTE</div>
            <div className="note-content">
                <ul>
                    <li>We will be providing only Internet and Seating facilities, 
                        we will <b><u>Not be Providing PC/Setup</u></b> including monitor,
                        keyboard, mouse. It is player's resposibility to get them.
                    </li>
                    <br />
                    <li>
                        Fill in the form and save it, then make the payement to 
                        get our discord link. Further instructions will be given later.
                    </li>
                </ul>
            </div>
        </div>
    )
}

function FillForm(){
    return(
        <div className="form-main">
            
        </div>
    )
}

export default function TournamentForm ({user, setLoading}){
    useEffect(() => {
        setLoading(false)
    }, [])

    return(
        <div className="form">
            <Note />
            <FillForm />
        </div>
    )
}