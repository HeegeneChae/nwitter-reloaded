//REQ: account관련 route들은 layout에 포함 안되게 해주세요 
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useState } from "react";
import { styled } from "styled-components";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

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
//바뀌는 값에 대해서 알 수 있다
export default function CreateAccount() {
    const navigate  = useNavigate();
    const [isLoading, setLoading] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
        const {target: {name, value }
    } = e; 
        if(name==="name"){
            setName(value)
        }   else if(name ==="email"){
            setEmail(value)
        }
            else if(name ==="password"){
            setPassword(value)
            }

    };
    const onSubmit = async (e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        if(isLoading || name=== "" || email === ""  || password ===""  )
            return;
        try{
            setLoading(true);
        //create an account 
        //Creates a new user account associated with the specified email address and password
        //be signed in to your application immediately 
        const credentials =  await createUserWithEmailAndPassword(
            auth, 
            email, 
            password
        );
        console.log(credentials.user);
        //set the name of the user 
        await updateProfile(credentials.user, {
            displayName: name,
        }); 
        //redirect to the home page
            navigate("/");
        } catch(e){
            //set error 



        } finally{
            setLoading(false);
        }
        console.log(name, email, password);
    };
    const Error = styled.span`
        font-weight: 600;
        color: tomato;
    `;

    return (
     <Wrapper>
        <Title>Join 𝕏</Title>
        <Form onSubmit={onSubmit}>
            <Input 
               onChange={onChange}
                 name = "name" 
                value={name} 
                placeholder="Name" 
                type="text" 
                required
            />
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
                value={ isLoading ? "Loading...  " : "Create Account"}
            />
        </Form>

        {error !== "" ? <Error>{error}</Error> : null}
        </Wrapper>
       );
}