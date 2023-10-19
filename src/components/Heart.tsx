import { useState } from "react";
import filledRedHeart from "../pictures/filledredheart.png";
import unfilledRedHeart from "../pictures/unfilledredheart.png";

export function HeartComponent() {
    const [isLiked, setIsLiked] = useState(false);

    return (
        <img
            onClick={() => setIsLiked(!isLiked)}
            src={isLiked ? filledRedHeart : unfilledRedHeart}
            style={{
                width: "8%",
                height: "auto",
                objectFit: "cover",
                maxHeight: "50px",
                cursor: "pointer"
            }}
        />
    );
}
