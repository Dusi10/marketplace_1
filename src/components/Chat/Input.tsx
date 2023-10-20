import React from "react"

const Input = () => {
    return (
        <div className={"input"}>
            <input className={"customChatInput"} type={"text"} placeholder={"Type something..."}/>
            <div className={"send"}>
                <img className={"sendImg"} src={"../../public/pictures/imgs/attach.png"} alt={""}/>
                <input type={"file"} style={{display:"none"}} id={"file"}/>
                <label htmlFor={"life"}>
                    <img className={"sendImg"} src={"../../public/pictures/imgs/img.png"} alt={""}/>
                </label>
                <button className={"sendButton"}>
                    Send
                </button>
            </div>

        </div>
    )
}

export default Input