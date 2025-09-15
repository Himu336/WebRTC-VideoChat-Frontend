import SocketIoClient from "socket.io-client";
import { createContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const WS_Server =  "http://localhost:7000";

// eslint-disable-next-line react-refresh/only-export-components, @typescript-eslint/no-explicit-any
export const SocketContext = createContext<any | null>(null);

const socket = SocketIoClient(WS_Server);

interface Props {
    children: React.ReactNode
};

export const SocketProvider: React.FC<Props> = ({ children }) => {

    const navigate = useNavigate(); // Hook to programmatically navigate
    useEffect(() => {
            const enterRoom = ({roomId} : { roomId: string}) => {
                navigate(`/room/${roomId}`);
            }

            socket.on("room-created", enterRoom);
    }, []);

    return (
        <SocketContext.Provider value={{socket}}>
            {children}
        </SocketContext.Provider>
    )
}

