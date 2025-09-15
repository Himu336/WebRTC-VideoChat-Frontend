import { useContext } from "react";
import { SocketContext } from "../Context/SocketContext";

const CreateRoom: React.FC = () => {

    const { socket} = useContext(SocketContext);
    const initRoom = () => {
        console.log("Initiating room creation...", socket);
        socket.emit("create-room");
    };

    return (
        <button 
            onClick={initRoom}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
            Start a new meeting room
        </button>
    );
};

export default CreateRoom;