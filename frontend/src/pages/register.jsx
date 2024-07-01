import { useState } from 'react';
import {useSelector,useDispatch} from 'react-redux';
import { toast } from "react-toastify";
import { useRegisterMutation } from '../redux/api/userSlice';
import React from 'react';
import { setCredentials } from '../redux/features/authSlice';

const Register = ()=>{
const [email,setEmail] = useState('')
const [password,setPassword] = useState('')
const [username,setUsername] = useState('')
const [confirmPassword,setConfirmPassword] = useState('')

const {userInfo} = useSelector(state=>state.auth)
const dispatch = useDispatch()

const [register,{isLoading,isSuccess, isError, error}] = useRegisterMutation();

const handlesubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      try {
        const res = await register({ username, email, password }).unwrap();
        console.log(res);
        dispatch(setCredentials({ ...res }));
        toast.success("User successfully registered");
      } catch (err) {
        console.log(err);
        toast.error(err.data.message);
      }
    }
  };


return(
    <form onSubmit={handlesubmit}>
        <div>
        <label>Username</label>
        <input
                type="text"
                id="username"
                className="mt-1 p-2 border rounded w-full"
                placeholder="Enter name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
        </div>
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
        <div>
        <label>Confirm Password</label>
        <input
                type="password"
                id="confirmpassword"
                className="mt-1 p-2 border rounded w-full"
                placeholder="ReEnter Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
        </div>
        <button
            
            type="submit"
            className="bg-teal-500 text-white px-4 py-2 rounded cursor-pointer my-[1rem]"
          >
          {isLoading ? 'Registering...' : 'Register'}
          </button>
          {isError && <p>Error: {error.message}</p>}
          {isSuccess && <p>Registration successful!</p>}
    </form>
)
}
export default Register;