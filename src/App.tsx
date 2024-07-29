import { createBrowserRouter, RouterProvider } from "react-router-dom"; 
import Layout from "./components/layout";
import Home from "./routes/home";
import Profile from "./routes/profile";
import Login from "./routes/create-account";
import CreateAccount from "./routes/create-account";
import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import { useEffect, useState } from "react";
import LoadingScreen from "./components/loading-screen";
import { auth } from "./firebase";
import { styled } from "styled-components";



const router = createBrowserRouter([
  {
    path:"/",
    element: <Layout  />, //layout component 내부에서 render中
    children: [
      {
        path: "",
        element: <Home/>,
      },
      {
        path: "profile",
        element: <Profile/>,
      }
      ],
    },
    //회원으로 통과되지 않았기에 childeren안에 넣지 않는다 
    {
      path: "/create-account", 
      element: <CreateAccount/>
    },
    {
      path: "/login",
      element: <Login/>,
    },
    
  ]);

const GlobalStyles = createGlobalStyle`
  ${reset};
  *{
    box-sizing: border-box;
  }
  body {
    background-color: black; 
    color: white; 
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  
  }
`;

const Wrapper = styled.div`
  height: 100vh; 
  display:flex; 
  justify-content: center;

`;





//firebase의 동작 방식: Firebase SDK와 Firebase server--> authentication(cookie, token ... check with the server)
function App() {
  const [isLoading, setIsLoading] = useState(true);
  const init = async() => {
    //wait for firebase: almost never see loading but we have to put there 
    //setTimeout(() => setIsLoading(false), 2000);
    await auth.authStateReady();  //when the initial auth state is settled
    setIsLoading(false);
  };
  useEffect(() =>{
    init();
  },  []);

  return (
  <Wrapper> 
  <GlobalStyles />
  {isLoading ? <LoadingScreen/> : <RouterProvider router={router} />}
  </Wrapper>
  );
}

export default App;
