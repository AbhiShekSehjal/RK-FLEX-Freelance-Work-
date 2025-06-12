import "./SelectByColors.css"
import { useWallsStore } from '../../../store/useAllWallpapers.js';

function SelectByColors() {

    const { selectedColor } = useWallsStore()

    const SelectByColor = (color) => {
        console.log("BTn clicked", color);
        selectedColor(color);
    }

    return (
        <section className="SelectByColors">
            <h1>Select Wallpaper by colors</h1>

            <div className="wallpaperColors">
                <div className="redColor">
                    <h1>red</h1>
                    <div className="overFade"></div>
                    <button onClick={() => SelectByColor("Red")}>View</button>
                </div>
                <div className="blueColor">
                    <h1>blue</h1>
                    <div className="overFade"></div>
                    <button onClick={() => SelectByColor("Blue")}>View</button>

                </div>
                <div className="greenColor">
                    <h1>green</h1>
                    <div className="overFade"></div>
                    <button onClick={() => SelectByColor("Green")}>View</button>

                </div>
                <div className="blackColor">
                    <h1>black</h1>
                    <div className="overFade"></div>
                    <button onClick={() => SelectByColor("Black")}>View</button>

                </div>
                <div className="orangeColor">
                    <h1>orange</h1>
                    <div className="overFade"></div>
                    <button onClick={() => SelectByColor("Orange")}>View</button>

                </div>
                <div className="goldenColor">
                    <h1>golden</h1>
                    <div className="overFade"></div>
                    <button onClick={() => SelectByColor("Golden")}>View</button>

                </div>
                <div className="whiteColor">
                    <h1>white</h1>
                    <div className="overFade"></div>
                    <button onClick={() => SelectByColor("White")}>View</button>

                </div>
                <div className="yellowColor">
                    <h1>yellow</h1>
                    <div className="overFade"></div>
                    <button onClick={() => SelectByColor("Yellow")}>View</button>

                </div>
                <div className="skyBlueColor">
                    <h1>skyblue</h1>
                    <div className="overFade"></div>
                    <button onClick={() => SelectByColor("Skyblue")}>View</button>

                </div>
            </div>
        </section>
    )
}

export default SelectByColors
