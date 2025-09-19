import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { SocketContext } from "../Context/SocketContext";

const Room: React.FC = () => {

    const { id } = useParams();
    const { socket, user } = useContext(SocketContext);

    const fetchParticipantList = ({ roomId, participants } : { roomId: string, participants: string[]}) => {
        console.log(roomId, participants);
    };

    useEffect(() => {

        if(user)  {
            socket.emit("joined-room", { roomId: id, peerId: user._id });
            socket.on("get-users", fetchParticipantList);
        };
        
    }, [id, user, socket]);
    return (
        <div>Room Page</div>
    )
};

export default Room;