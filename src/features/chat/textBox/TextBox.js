import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTextAi, addTextHuman, selectChat } from '../chatSlice';
import axios from 'axios';

export const TextBox = () => {

    const [text, setText] = useState("");

    const dispatch = useDispatch();

    const chat = useSelector(selectChat)

    const handleTextChange = (event) => {
        setText(event.target.value);
    }

    const convo = document.getElementById("conversation");

    const handleClick = () => {

        if (text.length > 0) {

            dispatch(addTextHuman(text));

            const temp = text;

            setText("");

            axios.post('http://localhost:4001/apiTest', {message: chat + "\n\n" + "Human: " + temp + "\n\nLana:"})
            .then(res => {
                dispatch(addTextAi(res.data.responseOut));
                convo.scrollTop = convo.scrollHeight
            })
            .catch(err => {
                console.log(err)
            });

        }
    }

    const handleEnter = (event) => {

        if (text.length > 0) {
            if (event.key === "Enter") {


                dispatch(addTextHuman(text));

                const temp = text;

                setText("");

                axios.post('http://localhost:4001/apiTest', {message: chat + "\n\n" + "Human: " + temp + "\n\nLana:"})
                .then(res => {
                    dispatch(addTextAi(res.data.responseOut));
                    convo.scrollTop = convo.scrollHeight
                })
                .catch(err => {
                    console.log(err)
                });


            }
        }
    }

    

    return (
        <div className="container">
            <div className="row">
                <div className="col-8 m-auto">
                    <input
                        onKeyDown={handleEnter}
                        onChange={handleTextChange}
                        style={{height: 50, fontSize: 15}}
                        enterKeyHint="send" 
                        type="text" 
                        autoFocus
                        className="w-100 pl-3"
                        placeholder="Type your message..."
                        value={text}
                    />
                </div>
                <button onClick={handleClick} className="col-4 btn btn-primary">
                    Send
                </button>
            </div>
        </div>
    )

}