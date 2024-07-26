import { Outlet } from "react-router-dom";

//Outlet이 element: <Profile/>
export default function Layout(){
    return (
        <>
        <h2>Layout</h2>
        <Outlet />
        </>
    );
}