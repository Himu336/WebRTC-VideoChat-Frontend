import SocketIoClient from "socket.io-client";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Peer from "peerjs";
import { v4 as uuidV4 } from "uuid";

const WS_Server =  "http://localhost:7000";

// eslint-disable-next-line react-refresh/only-export-components, @typescript-eslint/no-explicit-any
export const SocketContext = createContext<any | null>(null);

const socket = SocketIoClient(WS_Server);

interface Props {
    children: React.ReactNode
};

export const SocketProvider: React.FC<Props> = ({ children }) => {
    
    const navigate = useNavigate(); // Hook to programmatically navigate
    
    // state variable to store the user id
    const [user, setUser] = useState<Peer>();

    useEffect(() => {

        // create a new peer instance with a unique id
        const userId = uuidV4();
        const newPeer = new Peer(userId);

        setUser(newPeer);
        const enterRoom = ({roomId} : { roomId: string}) => {
            navigate(`/room/${roomId}`);
        }

        socket.on("room-created", enterRoom);

    }, []);

    return (
        <SocketContext.Provider value={{socket, user}}>
            {children}
        </SocketContext.Provider>
    )
}

