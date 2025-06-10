import React from 'react'
import "./SelectByColors.css"

function SelectByColors() {
    return (
        <section className="SelectByColors">
            <h1 className="animate__animated animate__slideInRight">Select Wallpaper by colors</h1>

            <div className="wallpaperColors">
                <div className="redColor">
                    <h1>red</h1>
                    <div className="overFade"></div>
                    <button>View</button>
                </div>
                <div className="blueColor">
                    <h1>blue</h1>
                    <div className="overFade"></div>
                    <button>View</button>

                </div>
                <div className="greenColor">
                    <h1>green</h1>
                    <div className="overFade"></div>
                    <button>View</button>

                </div>
                <div className="blackColor">
                    <h1>black</h1>
                    <div className="overFade"></div>
                    <button>View</button>

                </div>
                <div className="orangeColor">
                    <h1>orange</h1>
                    <div className="overFade"></div>
                    <button>View</button>

                </div>
                <div className="goldenColor">
                    <h1>golden</h1>
                    <div className="overFade"></div>
                    <button>View</button>

                </div>
                <div className="whiteColor">
                    <h1>white</h1>
                    <div className="overFade"></div>
                    <button>View</button>

                </div>
                <div className="yellowColor">
                    <h1>yellow</h1>
                    <div className="overFade"></div>
                    <button>View</button>

                </div>
                <div className="skyBlueColor">
                    <h1>skyblue</h1>
                    <div className="overFade"></div>
                    <button>View</button>

                </div>
            </div>
        </section>
    )
}

export default SelectByColors
