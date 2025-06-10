import React, { useEffect } from 'react';
import { useWallsStore } from "../../store/useAllWallpapers.js";
import { userAuthStore } from '../../store/useAuthUser.js';

function AllWallpapers() {
    const { allWall, allAllWalls } = useWallsStore();
    const { logOut, authUser } = userAuthStore()

    useEffect(() => {
        allAllWalls();
    }, [allAllWalls]);

    return (
        <>
            <h1>{authUser.userName}</h1>
            <button onClick={logOut}>Logout</button>
            {allWall && allWall.length > 0 ? (
                allWall.map((wall) => (
                    <div key={wall._id} style={{ border: "2px solid", margin: "10px", padding: "5px" }}>
                        <p><span style={{ color: "gray" }}>wallName : </span>{wall.wallName}</p>
                        <p><span style={{ color: "gray" }}>wallPrice : </span>{wall.wallPrice}</p>
                        <p><span style={{ color: "gray" }}>wallRating : </span>{wall.wallRating}</p>
                        <p><span style={{ color: "gray" }}>wallDiscription : </span>{wall.wallDiscription}</p>
                        <p><span style={{ color: "gray" }}>wallColorType : </span>{wall.wallColorType}</p>
                        <p><span style={{ color: "gray" }}>wallDesignType : </span>{wall.wallDesignType}</p>
                        <p><span style={{ color: "gray" }}>wallRoomType : </span>{wall.wallRoomType}</p>

                        <div>
                            {wall.wallImages.map((image) => (
                                <img src={image.url} alt={image.altText} style={{ margin: "5px", width: "200px" }} key={image._id} />
                            ))}
                        </div>
                    </div>
                ))
            ) :
                <h2>Loading ....</h2>
            }
        </>
    );
}

export default AllWallpapers;