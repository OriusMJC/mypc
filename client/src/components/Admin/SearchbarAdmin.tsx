import { useState } from "react";
import { useAppDispatch } from "src/config/config";
import { filterUser, getName, getProductsUser } from "src/redux/actions";
import s from '../Styles/SearchbarAdmin.module.css'

export default function SearchbarAdmin({btnView}){
    const dispatch = useAppDispatch();
    // const navigate = useNavigate();
    const [input, setInput] = useState("");

    function handleInputChange(e) {
        e.preventDefault();
        setInput(e.target.value);
    }
    
    function handleSubmit(e) {
        e.preventDefault();
        if(btnView === 'products'){
            if(input.length === 28 && input.split(' ').length === 1 && input.split('-').length === 1){
                dispatch(getProductsUser(input))
            }else{
                dispatch(getName(input));
            }
        }else if(btnView === 'user'){
            dispatch(filterUser(input))
        }
        setInput("");
    }
    return(
        <div>
            <form onSubmit={(e) => handleSubmit(e)} className={s.searchBarAdmin}>
                <input
                    value={input}
                    type="text"
                    placeholder={`Search ${btnView}`}
                    onChange={(e) => handleInputChange(e)}
                />
                <button type="submit">
                    <i className="fa-solid fa-magnifying-glass"></i>
                </button>
            </form>
        </div>
    )
}