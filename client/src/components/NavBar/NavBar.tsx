import { useState } from "react";
import { getName, getAllComponents, changeLanguage} from "../../redux/actions/index";
import { useAppDispatch } from "../../config/config";
import { Link, useNavigate } from "react-router-dom";
import s from "../Styles/NavBar.module.css";
import NavButtons from "./NavButtons";
import { useSelector } from "react-redux";

export default function NavBar() {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const [title, setTitle] = useState("");
	const suggestions = useSelector((state: any) => state.suggestions);
	const spanish = useSelector((state: any) => state.spanish);

	function handleInputChange(e) {
		e.preventDefault();
		setTitle(e.target.value);
	}

	function handleSubmit(e) {
		navigate('/')
		e.preventDefault();
		dispatch(getName(title));
		// setTitle("");
	}

	function handleRefresh(e) {
		dispatch(getAllComponents());
		navigate("/");
	}

	function handleClick(e){
		e.preventDefault();
		dispatch(changeLanguage())
	}

	return (
		<nav className={s.searchBarContainer}>
			<div className={s.contain}>
				<div className={s.contLogo}>
					<button onClick={handleRefresh} className={s.logo}>
						MyPC
					</button>
				</div>
				<form onSubmit={(e) => handleSubmit(e)} className={s.searchBar}>
					<div className={s.input}>
						<input
							value={title}
							type="text"
							placeholder={spanish ? "Buscar..." : "Search..."}
							onChange={(e) => handleInputChange(e)}
						/>
						<div className={s.dropdown}>
							{suggestions.titles ?
								suggestions.titles
									.filter((item) => {
										const searchSug = title.toLowerCase();
										const titleProduc = item.toLowerCase();
										return (
											searchSug &&
											titleProduc.startsWith(searchSug) &&
											titleProduc !== searchSug
										);
									})
									.slice(0, 10)
									.map((item) => {
										return (
											<div
												onClick={() => setTitle(item)}
												className={s.dropdownRow}
												key={item}
											>
												<p>{item}</p>
												<img className={s.imgSearch} src={suggestions.img[item][0]} alt="" />
											</div>
										);
									}) : null
							}
						</div>
					</div>
					<button type="submit">
						<i className="fa-solid fa-magnifying-glass"></i>
					</button>
				</form>
				<NavButtons />
				<button id={s.buttonLang} value={spanish} onClick={handleClick}>
					{spanish? 'EN' : 'ES'}
				</button>
			</div>
		</nav>
	);
}
