import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { useAppDispatch } from "src/config/config"
import { singOutUser } from "src/redux/actions"
import s from './Styles/NavButtons.module.css'

export default function NavButtons(){
    const dispatch =useAppDispatch()
    const user = useSelector((store:any)=> store.userDetails)

    function handleSingOut(){
        dispatch(singOutUser())
    }

    return(
        <section className={s.navButtons}>
            <div>
                <Link to='/fav'>
                    <button>❤</button>
                </Link>
                <Link to='/cart'>
                    <button>🦽</button>
                </Link>
            </div>
            <div>
                <Link to='/userdetail'>
                    <button>🙍‍♂️</button>
                </Link>
            </div>
            <div>
                {!user.name? <Link to='/user/register'><button>Register</button></Link> : <></>}
                {user.name? <button onClick={handleSingOut}>Sing Out</button> : <Link to='/user/login'><button>Login</button></Link>}
            </div>
        </section>
    )
}