import React from "react"

const Message = () => {
    return (
        <div className={"message owner"}>
            <div className={"messageInfo"}>
                <img className={"messageImg"} src={"../../public/pictures/imgs/img.png"} alt={""}/>
                <span>Just now</span>
            </div>
            <div className={"messageContent"}>
                <p className={"messageP"}>Hello</p>
                {/*<img className={"messageImg"} src={"../../public/pictures/imgs/img.png"} alt={""}/>*/}
            </div>
        </div>
    )
}

export default Message