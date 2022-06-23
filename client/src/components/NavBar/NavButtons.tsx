import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { useAppDispatch } from "src/config/config"
import { singOutUser } from "src/redux/actions"
import s from '../Styles/NavButtons.module.css'
import favIcon from '../icons/fav.png'
import cartIcon from '../icons/cartIcon.png'
import userDefaultIcon from '../icons/userDefaultIcon.png'

export default function NavButtons(){
    const dispatch =useAppDispatch()
    const user = useSelector((store:any)=> store.userDetails)

    function handleSingOut(){
        dispatch(singOutUser())
    }

    return(
        <section className={s.navButtons}>
            <div className = {s.userButtons}>
                <Link to='/fav'>
                    <button>
                        <img src={favIcon}/>
                    </button>
                </Link>
                <Link to='/cart'>
                    <button>
                        <img src={cartIcon}/>
                    </button>
                </Link>
                <Link to='/userdetail'>
                    <button>
                        <img src={userDefaultIcon}/>
                    </button>
                </Link>
            </div>
            <div id={s.buttonsLogins}>
                {!user?.name? <Link to='/user/register'><button>Register</button></Link> : <></>}
                {user?.name? <button onClick={handleSingOut}>Sing Out</button> : <Link to='/user/login'><button>Login</button></Link>}
            </div>
        </section>
    )
}