import authlist from '../styles/auth.module.css'
import React, { useState } from "react";
import { authService, firebaseInstance } from '../src/fbase';

const Auth = () =>{
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(true);
    const [error, setError] = useState("");
    const onChange =(event) => {
        const {
            target:{name,value}
        } = event;
        if(name === "email"){
            setEmail(value);
        } else if(name==="password"){
            setPassword(value);
        }
    };

    const onSubmit = async (event) => {
        event.preventDefault();
        try{
            let data;
            if(newAccount){
                data = await authService.createUserWithEmailAndPassword(
                    email, password
                );
            } else{
                data = await authService.signInWithEmailAndPassword(email,password);
            }
            console.log(data);
        } catch (error){
            console.log(error.message);
        } 

    };

    const toggleAccount = () => setNewAccount((prev) => !prev);
    const onSocialClick = async (event) =>{
        const {
            target:{name},
        } =event;
        let provider;
        if(name === "google"){
            provider = new firebaseInstance.auth.GoogleAuthProvider();
        } 
        const data = authService.signInWithPopup(provider);
        console.log(data);
        };
    return  (
        <div className={authlist.authback}>
            <form onSubmit={onSubmit}  className={authlist.authsub}>
                <input name="email" 
                type ="email" 
                placeholder="Email"
                required 
                value={email}
                onChange={onChange}
                className={authlist.email}/>
                <input 
                name ="password" 
                type="password" 
                placeholder="Password" 
                required 
                value={password}
                onChange={onChange}
                className={authlist.pass}
                />
                <input 
                type="submit"
                className={authlist.but}
                 value={newAccount 
                 ? "Create Count" : "Log in"}/>
                 {error}
            </form>
            <span onClick={toggleAccount}>{
            newAccount ? "Sign in": "Create Account"}</span>
            <div>
                <button onClick={onSocialClick} className={authlist.but} name="google">Continue with Google</button>
            </div>
        </div>
        );
}
export default Auth;