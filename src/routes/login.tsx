//REQ: account관련 route들은 layout에 포함 안되게 해주세요 
import { useState } from "react";
import { styled } from "styled-components";
import { Link, useNavigate,  } from "react-router-dom";
import { Switcher } from "react-dom"
import { FirebaseError } from "firebase/app";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

// const errors = {
//     "auth/email-already-in-use": "That email already exists."
// }

const Wrapper = styled.div`
    height:100%;
    display: felx;
    flex-direction: coulumn;
    align-items: center;
    width: 420px; 
    padding: 50px 0px;
    `;

const Title = styled.h1`
    font-size:42px; 
    `;

const Form = styled.form`
    margin-top: 50px;
    margin-bottom: 10px;
    display: flex; 
    flex-direction: column; 
    gap: 10px; 
    width: 100%;
    `; 

const Input = styled.input`
    padding: 10px 20px; 
    border-radius: 50px; 
    border: none;
    font-size: 16px; 
    &[type="submit"]{
        cursor: pointer;
        &:hober {
            opacity: 0.8;
        }
    }
    
    ;

`;
const Error = styled.span`
        font-weight: 600;
        color: tomato;
    `;
//바뀌는 값에 대해서 알 수 있다
export default function Login() {
    const navigate  = useNavigate();
    const [isLoading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
        const {target: {name, value }
    } = e; 
        if(name ==="email"){
            setEmail(value)
        }
            else if(name ==="password"){
            setPassword(value)
            }

    };
    const onSubmit = async (e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        setError("");
        if(isLoading ||  email === ""  || password ===""  )
            return; //종료 
        try{
            setLoading(true);
            await signInWithEmailAndPassword(auth, email, password); //not in the cordova
            navigate("/");  //성공하면 
        } catch(e){ 
            //set error 
            console.log(e);
            if (e instanceof FirebaseError ){
                console.log(e.code, e.message);
                setError(e.message);

            }
        } finally{
            setLoading(false);
        }
        console.log(name, email, password);
    };
    
    

    return (
     <Wrapper>
        <Title>Login into 𝕏</Title>
        <Form onSubmit={onSubmit}>
            <Input 
            onChange={onChange}
            name = "email" value={email}  placeholder="Email" type="email" required/>
            <Input
                onChange={onChange}
                name="password"
                value={password}
                placeholder="Password"
                type="password"
                required
                />
            <Input 
                type="submit" 
                value={ isLoading ? "Loading...  " : " Log in "}
            />
        </Form>

        {error !== "" ? <Error>{error}</Error> : null}
        
        <Switcher>
            Don't have an account? {" "}
            <Link to="/create-account">Create one &rarr</Link>
        </Switcher>

        </Wrapper>
       );
}