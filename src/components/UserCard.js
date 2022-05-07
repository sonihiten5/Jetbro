import React, { useState } from 'react'
import "./UserCard.scss"

function UserCard({ src, name, status, species, lastSeen, firstSeen }) {

    return (
        <div className="user-container">
            <div className="imgWrapper">
                <img src={src} alt="" />
            </div>
            <div className="contentWrapper">
                <h2>{name}</h2>
                <div className="status">
                    <div className={`icon ${status === "Alive" ? "color-green" : status === "Dead" ? "color-red" : "icon" }`}></div>
                    <p>{status} - {species}</p>
                </div>
                <div className="detail-con">
                    <p className='muted-text'>Last known location:</p>
                    <p>{lastSeen}</p>
                </div>
                <div className="detail-con">
                    <p className='muted-text'>First seen in:</p>
                    <p>{firstSeen}</p>
                </div>
            </div>
        </div>
    )
}

export default UserCard