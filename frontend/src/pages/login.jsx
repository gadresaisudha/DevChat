import { useState } from 'react';
import {useSelector,useDispatch} from 'react-redux';

const Login = ()=>{
const [email,setEmail] = useState('')
const [password,setPassword] = useState('')

const {userInfo} = useSelector(state=>state.auth)
const dispatch = useDispatch()

return(
    <form>
        <label>
            Email
        </label>
        <label>
            Password
        </label>
    </form>
)
}
export default Login;