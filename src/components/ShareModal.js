import React, { useState } from 'react';
import './css/ShareModal.css';
import store from '../app/store';
import Axios from 'axios';

export const ShareModal = ({closeModal}) => {

    const [title, setTitle] = useState("")

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    }


    const handleShare = () => {
        let titleUrl = title;
        titleUrl = titleUrl.replace(/[^a-zA-Z ]/g, "")
        titleUrl = titleUrl.toLocaleLowerCase()
        titleUrl = titleUrl.split(" ")
        titleUrl = titleUrl.join('-')

        Axios.post("http://localhost:4001/shareConversation", {title: title, titleUrl: titleUrl, chat: store.getState().chat.chat})
    }

    return (
        <div className="modalBackground">
            <div className="modalContainer">
                <div className="titleCloseBtn">
                    <button onClick={() => closeModal(false)}> X </button>
                </div>
                <div className="title">
                    <h1>Share with our community?</h1>
                </div>
                <div className="body">
                    <p>Would you like to help others by sharing this tutoring conversation to the public?</p>
                </div>
                <div className="textBox">
                    <input onChange={handleTitleChange} value={title} className="rounded" type="text" placeholder="Type your title..." />
                </div>
                <div className="footer">
                    <button id="cancelBtn" onClick={() => closeModal(false)}>No</button>
                    <button onClick={handleShare}>Yes</button>
                </div>
            </div>
        </div>
    )
}