import { useState } from "react"
import s from '../Styles/Loading.module.css'
import logo from '../../media/logo1.png'

export default function Loading({load,msgError,time}){
    const [msg,setMsg] = useState(load)

    const temp = setInterval(()=>{
        setMsg(msgError)
        clearInterval(temp)
    },time)

    return(
        <div className={s.loadContainer}>
            {
                msg === load?
                <>
                    <img src={logo} alt='logo'/>
                    <h1>{load}</h1>
                </>
                :
                <>
                    {/* <h1>Ups</h1> */}
                    <h2>{msgError}</h2>
                </>
            }
        </div>
    )
}