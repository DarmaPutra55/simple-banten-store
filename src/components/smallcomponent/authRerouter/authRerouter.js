import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../../context/userContext";

export default function AuthRerouter({ children }) {
    const { user } = useContext(UserContext);
    return (
        <>
            {
                user?.id ?
                    <Navigate to={"/"} replace={true} />
                    :
                    children
            }
        </>
    )
}