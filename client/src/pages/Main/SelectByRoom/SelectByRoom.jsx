import "./SelectByRoom.css"
import { useWallsStore } from '../../../store/useAllWallpapers.js';
import { useNavigate } from 'react-router-dom';

function SelectByRoom() {

    const navigate = useNavigate();

    const { selectedByRoom, selectedRoom } = useWallsStore();


    const SelectByRomm = (room) => {
        // console.log(room);
        selectedByRoom(room);
        if (selectedRoom) {
            navigate(`/walls/room/${room}`);
        }
    }

    return (
        <section className="selectByRoom">
            <div className="haedingText">Select Wallpaper by Rooms</div>
             <small className="littleDiscription">A clean and intuitive section that lets users pick wallpapers by room type, making it simple to find the perfect design for any space—from kids' rooms to kitchens.</small>
            <br />
            <br />
            <br />

            <div className="typeOfRooms">
                <div className="kidsRoom" onClick={() => SelectByRomm("Kids Room")}>
                    <h1>For Kids Room</h1>
                </div>

                <div className="boysRoom" onClick={() => SelectByRomm("Office")}>
                    <h1>For Office</h1>
                </div>

                <div className="girlsRoom" onClick={() => SelectByRomm("Hall")}>
                    <h1>For Hall</h1>
                </div>

                <div className="pujaRoom" onClick={() => SelectByRomm("Bathroom")}>
                    <h1>For Bathroom</h1>
                </div>

                <div className="drawingRoom" onClick={() => SelectByRomm("Bedroom")}>
                    <h1>For Bedroom</h1>
                </div>

                <div className="kitchenroom" onClick={() => SelectByRomm("Kitchen")}>
                    <h1>For Kitchen</h1>
                </div>

                <div className="livingRoom" onClick={() => SelectByRomm("Living Room")}>
                    <h1>For living room</h1>
                </div>

                <div className="library" onClick={() => SelectByRomm("kidsRoom")}>
                    <h1>For library</h1>
                </div>

                <div className="diningRoom" onClick={() => SelectByRomm("kidsRoom")}>
                    <h1>For dining room</h1>
                </div>
            </div>
        </section>
    )
}

export default SelectByRoom
