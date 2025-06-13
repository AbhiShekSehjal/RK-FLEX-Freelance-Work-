import "./BottomNav.css"

function BottomNav() {

    const handleShowMoreWall = (wall) => {

        // let showMore = document.querySelector(".showMore > div");

        // showMore.style.display = "flex";

        console.log(wall);

    }

    return (
        <>
            <div className='bottomNav'>
                <div className="showMore" onMouseOver={() => handleShowMoreWall("Colors")}>
                    Colors
                    <div className="more">
                        <ul>
                            <li>red</li>
                            <li>red</li>
                        </ul>
                    </div>
                </div>

                <div className="showMore" onMouseOver={() => handleShowMoreWall("Designs")}>
                    Designs
                    <div className="more">
                        <ul>
                            <li>red</li>
                            <li>red</li>
                        </ul>
                    </div>
                </div>

                <div className="showMore" onMouseOver={() => handleShowMoreWall("Rooms")}>
                    Rooms
                    <div className="more">
                        <ul>
                            <li>red</li>
                            <li>red</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="forShowMore"></div>
        </>
    )
}

export default BottomNav
