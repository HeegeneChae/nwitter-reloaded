import { createBrowserRouter, RouterProvider } from "react-router-dom"; 
import Layout from "./components/layout";
import Home from "./routes/home";
import Profile from "./routes/profile";
import Login from "./routes/create-account";
import CreateAccount from "./routes/create-account";
import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const router = createBrowserRouter([
  {
    path:"/",
    element: <Layout  />,
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
function App() {
  return (
  <> 
  <GlobalStyles />
  <RouterProvider router={router} />
  </>
  );
}

export default App;
