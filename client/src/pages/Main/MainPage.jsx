import React from 'react'
import "./MainPage.css"
import SelectByColors from './SelectByColors/SelectByColors'

function MainPage() {
    return (
        <>
            <main className="mainBox">
                <div className="image"></div>
                <p>Transforming Walls, Creating Attractive Spaces!</p>
                <h1>Rk FleX</h1>
                <div className="shopBtn">
                    <button>Shop Wallpaper</button>
                </div>
                <div className="overShade"></div>
            </main>

            <SelectByColors />

        </>
    )
}

export default MainPage
