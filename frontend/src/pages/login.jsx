import { useState } from 'react';
import {useSelector,useDispatch} from 'react-redux';
import { toast } from "react-toastify";
import { useLoginMutation } from '../redux/api/userSlice';
import React from 'react';
import { setCredentials } from '../redux/features/authSlice';

const Login = ()=>{
const [email,setEmail] = useState('')
const [password,setPassword] = useState('')

const {userInfo} = useSelector(state=>state.auth)
const dispatch = useDispatch()

const [login,{isLoading,isSuccess, isError, error}] = useLoginMutation();

const handlesubmit = async (e) => {
    e.preventDefault();

   
      try {
        const res = await login({ email, password }).unwrap();
        console.log('hey',res);
        dispatch(setCredentials({ ...res }));
        toast.success("Login Successful");
      } catch (err) {
        console.log(err);
        toast.error(err.data.message);
      }
    
  };


return(
    <form onSubmit={handlesubmit}>
     
        <div>
        <label>Email</label>
        <input
                type="email"
                id="email"
                className="mt-1 p-2 border rounded w-full"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
        </div>
        <div>
        <label>Password</label>
        <input
                type="password"
                id="password"
                className="mt-1 p-2 border rounded w-full"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
        </div>
        <button
            
            type="submit"
            className="bg-teal-500 text-white px-4 py-2 rounded cursor-pointer my-[1rem]"
          >
          {isLoading ? 'Logging...' : 'Login'}
          </button>
          {isError && <p>Error: {error.message}</p>}
          {isSuccess && <p>Login successful!</p>}
    </form>
)
}
export default Login;