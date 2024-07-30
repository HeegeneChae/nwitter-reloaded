import { Navigate } from "react-router-dom";
import { auth } from "../firebase";

//This component is for give us  an user infomation
export default function ProtectedRoute( {
    children,   //ask to children : meaning anything inside of the component 
}:{
    children:React.ReactNode;
}) {
    const user = auth.currentUser;
    console.log(user);
    
    if(!user === null) {
        return <Navigate to ="/login"/>;
    }
    return children;
}