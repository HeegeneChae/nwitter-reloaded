//v6의 outlet component를 사용한다 
import { Outlet } from "react-router-dom";


//Outlet이 element: <Profile/>로...
export default function Layout(){   //페이지를 감쌀 수도 있고 추후 페이지 제작 후 navigation으로 바꿀거야: Home과 Profile은 모두 확실히 navigation에 rendering
    return (
        <>
        
        <Outlet />
        </>
    );
} 