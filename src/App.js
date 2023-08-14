import "./styles.css";
import image from "./portrait.jpg";
import faceLandmarker from "./facelandmarks.json";
import { useState } from "react";

export default function App() {

    const [glasses, setGlasses] = useState(false)

    const wearEyewear = () => {
        const eyewearElement = document.createElement("img");
        eyewearElement.id = "eyewear-image";
        eyewearElement.src =
            "https://mirrar.s3.ap-south-1.amazonaws.com/3d-demo/RAYBAN_ANDYFull_Rim_SquareSunglasses/RAYBAN_ANDYFull_Rim_SquareSunglasses.png";
        document.querySelector(".detectOnClick").appendChild(eyewearElement);
        const landmarksArray = faceLandmarker.faceLandmarks[0];
        const relativeShape = (dimensions) => {
            const { x, y } = dimensions;
            return {
                x: x * 695,
                y: y * 868
            };
        };

        const eyeLeft = relativeShape(landmarksArray[33]);
        const eyeRight = relativeShape(landmarksArray[263]);

        const calulateEarHeight = () => {
            const width = (landmarksArray[177].y - landmarksArray[139].y) * 868;
            return width;
        };

        const calulateWidth = () => {
            return (
                Math.sqrt(
                    (landmarksArray[33].x - landmarksArray[263].x) ** 2 +
                    (landmarksArray[33].x - landmarksArray[263].x) ** 2
                ) * 868
            );
        };

        const eyesCenterX = (eyeLeft.x + eyeRight.x) / 2;
        const eyesCenterY = (eyeLeft.y + eyeRight.y) / 2;

        const eyewearWidth = calulateWidth();
        const eyewearHeight = calulateEarHeight();
        const eyewearX = eyesCenterX - eyewearWidth / 2;
        const eyewearY = eyesCenterY - eyewearHeight / 2;

        eyewearElement.style.left = eyewearX + "px";
        eyewearElement.style.top = eyewearY + "px";
        eyewearElement.style.width = eyewearWidth + "px";
        eyewearElement.style.height = eyewearHeight + "px";
        setGlasses(true)
    }

    const handleClick = (event) => {
        if (document.getElementById("eyewear-image") || glasses) {
            console.log(typeof document);
            document
                .querySelector(".detectOnClick")
                .removeChild(document.getElementById("eyewear-image"));
            setGlasses(false)
        } else
            wearEyewear()

    };

    return (
        <div className="App">
            <button className="button" onClick={(e) => handleClick(e.target)}> {!glasses ? 'Show with Glasses' : 'Remove Glasses'} </button>
            <div className="detectOnClick">
                <img src={image} alt="profile" id="image" />
            </div>
        </div>
    );
}
