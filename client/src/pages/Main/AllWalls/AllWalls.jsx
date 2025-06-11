import React from 'react'
// import "./AllWalls.css"
import { useEffect } from 'react';
import { useWallsStore } from '../../../store/useAllWallpapers.js';

function AllWalls() {

    const { allWall, allAllWalls } = useWallsStore();

    useEffect(() => {
        allAllWalls();
    }, [allAllWalls]);

    return (
        <section className="ourSpecialWallpapers">
            <h1>Our Special Wallpapers</h1>

            <div className="specials">
                {allWall && allWall.length > 0 ?
                    allWall.map((wall) => (
                        <div className="product-card" key={wall._id} style={{ border: "2px solid", margin: "10px", padding: "5px" }}>
                            {/* <img src={wall.image.url} alt={wall.image.alter} /> */}
                            <h3>{wall.wallName}</h3>
                            <button className="btn">Add to cart</button>
                        </div>
                    ))
                    : <h2>Loading ....</h2>
                }
            </div>



        </section>
    )
}

export default AllWalls
