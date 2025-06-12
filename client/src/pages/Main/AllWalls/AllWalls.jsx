import React, { useState } from 'react'
import "./AllWalls.css"
import { useEffect } from 'react';
import { useWallsStore } from '../../../store/useAllWallpapers.js';

function AllWalls() {

    const [selectDesign, setSelectDesign] = useState(false)

    const { allWall, allAllWalls, selectByDesign, selectedWallByDesign } = useWallsStore();

    useEffect(() => {
        allAllWalls();
        selectByDesign()
    }, [allAllWalls, selectByDesign]);

    const selectedDesign = (design) => {
        if (design) {
            if (!selectDesign) {
                setSelectDesign(false);
                console.log("Selected Design : ", design);
                selectByDesign(design);
            } else {
                setSelectDesign(false);
            }
            console.log(selectDesign);
        }
    }

    return (
        <>
            <h1 style={{ textAlign: "center" }}>Special design Wallpapers</h1>
            <div className="ourAllWalls">

                <div className="sideFilterBar" style={{ fontWeight: "300" }}>
                    <div className="filterByText"><h3>Choose wallpaper</h3></div>

                    <div className="byPrice">
                        <div className="byPriceText"><h4 style={{ fontWeight: "400" }}>By Price</h4></div>

                        <label htmlFor="priceRange"></label>
                        <br />
                        <input type="range" id="priceRange" min={0} max={1000} />

                    </div>
                    <hr />

                    <div className="byDesign">
                        <div className="byDesignText"><h4 style={{ fontWeight: "400" }}>By Design</h4></div>

                        <ul className='selectByDesignList'>
                            <li className='selectByDesignListItem' style={{cursor:"pointer"}}>
                                <input
                                    type="checkbox"
                                    id="Botanical"
                                    onChange={(e) => selectedDesign(e.target.checked && "Botanical")}
                                />
                                <label htmlFor="Botanical">Botanical</label>
                            </li>

                            <li className='selectByDesignListItem'>
                                <input
                                    type="checkbox"
                                    id="Solid"
                                    onChange={(e) => selectedDesign(e.target.checked && "Solid")}
                                />
                                <label htmlFor="Solid">Solid</label>
                            </li>

                            <li className='selectByDesignListItem'>
                                <input
                                    type="checkbox"
                                    id="Damask"
                                    onChange={(e) => selectedDesign(e.target.checked && "Damask")}
                                />
                                <label htmlFor="Damask">Damask</label>
                            </li>

                            <li className='selectByDesignListItem'>
                                <input
                                    type="checkbox"
                                    id="Texture"
                                    onChange={(e) => selectedDesign(e.target.checked && "Texture")}
                                />
                                <label htmlFor="Texture">Texture</label>
                            </li>

                            <li className='selectByDesignListItem'>
                                <input
                                    type="checkbox"
                                    id="Stripes"
                                    onChange={(e) => selectedDesign(e.target.checked && "Stripes")}
                                />
                                <label htmlFor="Stripes">Stripes</label>
                            </li>

                            <li className='selectByDesignListItem'>
                                <input
                                    type="checkbox"
                                    id="Metallic"
                                    onChange={(e) => selectedDesign(e.target.checked && "Metallic")}
                                />
                                <label htmlFor="Metallic">Metallic</label>
                            </li>

                            <li className='selectByDesignListItem'>
                                <input
                                    type="checkbox"
                                    id="Minimal"
                                    onChange={(e) => selectedDesign(e.target.checked && "Minimal")}
                                />
                                <label htmlFor="Minimal">Minimal</label>
                            </li>

                            <li className='selectByDesignListItem'>
                                <input
                                    type="checkbox"
                                    id="Gradient"
                                    onChange={(e) => selectedDesign(e.target.checked && "Gradient")}
                                />
                                <label htmlFor="Gradient">Gradient</label>
                            </li>

                            <li className='selectByDesignListItem'>
                                <input
                                    type="checkbox"
                                    id="Marble"
                                    onChange={(e) => selectedDesign(e.target.checked && "Marble")}
                                />
                                <label htmlFor="Marble">Marble</label>
                            </li>

                            <li className='selectByDesignListItem'>
                                <input
                                    type="checkbox"
                                    id="Floral"
                                    onChange={(e) => selectedDesign(e.target.checked && "Floral")}
                                />
                                <label htmlFor="Floral">Floral</label>
                            </li>

                            <li className='selectByDesignListItem'>
                                <input
                                    type="checkbox"
                                    id="Wood"
                                    checked={selectedDesign}
                                    onChange={(e) => selectedDesign(e.target.checked && "Wood")}
                                />
                                <label htmlFor="Wood">Wood</label>
                            </li>
                        </ul>
                    </div>
                    <hr />

                </div>

                <div className="walls">
                    {selectedWallByDesign && selectedWallByDesign.length > 0 &&
                        selectedWallByDesign.map((wall) => (
                            <div className="wallCard" key={wall._id} style={{boxShadow:"rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0.55) 0px 10px 8px -5px"}}>
                                <div className="wallImage">
                                    <img
                                        src={wall.wallImages[1].url}
                                        alt={wall.wallImages[1].altText}
                                    />
                                </div>

                                <div className="moreInfo">
                                    <div className="wallName"><b>{wall.wallName}</b></div>
                                    <div className="wallDiscription">{wall.wallDiscription}</div>
                                    <div className="wallPrice">Rs. {wall.wallPrice}</div>
                                    <div className="wallDesign">{wall.wallDesignType}</div>

                                    <div className="buyOrAddCart">
                                        <button className='buyWall'>Buy</button>
                                        <button className='addOnCartWall'>Add on Cart</button>
                                    </div>
                                </div>

                            </div>
                        ))}


                    {allWall && allWall.length > 0 ?
                        allWall.map((wall) => (

                            <div className="wallCard" key={wall._id}>
                                <div className="wallImage">
                                    <img
                                        src={wall.wallImages[1].url}
                                        alt={wall.wallImages[1].altText}
                                    />
                                </div>

                                <div className="moreInfo">
                                    <div className="wallName"><b>{wall.wallName}</b></div>
                                    <div className="wallDiscription">{wall.wallDiscription}</div>
                                    <div className="wallPrice">Rs. {wall.wallPrice}</div>
                                    <div className="wallDesign">{wall.wallDesignType}</div>

                                    <div className="buyOrAddCart">
                                        <button className='buyWall'>Buy</button>
                                        <button className='addOnCartWall'>Add on Cart</button>
                                    </div>
                                </div>

                            </div>
                        ))
                        : <h2>Loading ....</h2>
                    }

                </div>

            </div >
        </>
    )
}

export default AllWalls
