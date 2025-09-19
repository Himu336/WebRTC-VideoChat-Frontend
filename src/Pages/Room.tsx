import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { SocketContext } from "../Context/SocketContext";
import UserFeedPlayer from "../Components/UserFeedPlayer";

const Room: React.FC = () => {

    const { id } = useParams();
    const { socket, user, stream } = useContext(SocketContext);

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
        <div>
            room: {id}
            <UserFeedPlayer stream={stream} />
        </div>
    )
};

export default Room;