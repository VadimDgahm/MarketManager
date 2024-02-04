import { LoginForm } from "@/components/auth/sign-in"
import { SingUpForm } from "@/components/auth/sign-up"
import { useCheckAuthQuery, useLoginMutation, useLogoutMutation, useRegistrationMutation } from "@/services/auth/auth.services"
import { LoginData } from "@/services/auth/authServicesType"
import { useLayoutEffect } from "react"
import { useNavigate } from "react-router-dom"

export const Login = () => {
    const [login] = useLoginMutation()
    const [registration] = useRegistrationMutation()
    const [logout] = useLogoutMutation()
    const navigate = useNavigate()
    const onSubmitLogin = async ({email, password} : LoginData) => {
        try{
            let res = await login({email,password})
            if(res.data){
                localStorage.setItem('token', res.data?.accessToken)
                navigate('/')
            }
        } catch (e) {
            console.log(e.response.data?.message)
        }
        
    }
    const onSubmitRegistration = async ({email, password} : LoginData) => {
        try{
            let res = await registration({email,password})
            localStorage.setItem('token', res.data?.accessToken)
            console.log(res)
        } catch (e) {
            console.log(e.response.data?.message)
        }
        
    }
    const onSubmitLOGOUT = async () => {
        try{
            let res = await logout()
            localStorage.setItem('token', '')
            console.log(res)
        } catch (e) {
            console.log(e.response.data?.message)
        }
        
    }
    return <div>
        <button onClick={onSubmitLOGOUT}>LOGOUT</button>
        <LoginForm onSubmit={onSubmitLogin}/>
        <SingUpForm onSubmit={onSubmitRegistration}/>

    </div>
}