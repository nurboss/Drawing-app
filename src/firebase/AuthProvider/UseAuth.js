import { useContext } from "react"
import { AuthContext } from "./AuthPorver";

const UseAuth = () => {
    return useContext(AuthContext)
};

export default UseAuth;

