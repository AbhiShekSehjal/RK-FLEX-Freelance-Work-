import React from 'react'
import "./MainPage.css"
import SelectByColors from './SelectByColors/SelectByColors'
import SelectByRoom from './SelectByRoom/SelectByRoom'
import AllWalls from './AllWalls/AllWalls'
import { useNavigate } from 'react-router-dom'

function MainPage() {

    const navigate = useNavigate();

    const handleShopWallsBtn = () => {
        navigate(`/shopWalls`)
    }

    return (
        <>
            <main className="mainBox">
                <div className="image"></div>
                <p className='mainBoxPera'>Transforming Walls, Creating Attractive Spaces!</p>
                <h1 className='mainBoxHeading'>Rk FleX</h1>
                <div className="shopBtn">
                    <button onClick={() => handleShopWallsBtn()}>Shop Wallpaper</button>
                </div>
                <div className="overShade"></div>
            </main>

            <SelectByColors />

            <SelectByRoom />

            <AllWalls />

        </>
    )
}

export default MainPage
