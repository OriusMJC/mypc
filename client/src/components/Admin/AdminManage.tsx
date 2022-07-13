import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useAppDispatch } from "src/config/config";
import {
	deleteProduct,
	deleteUser,
	filterUser,
	getAllComponents,
	getAllUsers,
	getName,
} from "src/redux/actions";
import swal from "sweetalert";
import Loading from "../Loading/Loading";
import NavFilter from "../NavFilter";
import s from "../Styles/AdminManage.module.css";
import SearchbarAdmin from "./SearchbarAdmin";

export default function AdminManage() {
	const dispatch = useAppDispatch();
	const userAdmin = useSelector((store: any) => store.userDetails);
	const allUsers = useSelector((store: any) => store.users);
	const allComponents = useSelector((store: any) => store.components);
	const [btnView, setBtnView] = useState("products");
	const [refresh, setRefresh] = useState(1);
	const spanish = useSelector((state: any) => state.spanish);
	useEffect(() => {
		dispatch(getAllUsers());
		dispatch(getAllComponents());
	}, []);

	function handleDelete(id) {
		swal({
			text: "Estas seguro de eliminar el producto?",
			icon: "warning",
			buttons: ["No", "Si"],
		}).then((respuesta) => {
			if (respuesta) {
				swal({ text: "Producto eliminado correctamente", icon: "success" });
				dispatch(deleteProduct(id));
			}
		});
	}
	function handleRefresh() {
		dispatch(getName(""));
		dispatch(filterUser(""));
	}
	async function handleDeleteUser(id) {
		await deleteUser(id)
		dispatch(getAllUsers())
		dispatch(getAllComponents())
	}


	let locals = allUsers.filter((local) => local.latitude && local.longitude);

	return (
		<div id={s.adminManageContainer}>
			{userAdmin && userAdmin.admin && userAdmin.email === "mypcecommerce@gmail.com" ? (
				<div id={s.adminContainer}>
					<NavFilter
						refresh={refresh}
						setRefresh={setRefresh}
						setProductsPerPage={setRefresh}
						products={false}
						lengthAll={allComponents?.length}
					/>
					<div>
						<button onClick={() => setBtnView("products")}>Productos</button>
						<button onClick={() => handleRefresh()}>Refresh</button>
						<button onClick={() => setBtnView("user")}>Usuarios</button>
						<Link
							to={"/user/admin/map"}
							state={{
								locals,
							}}
						>
							<button>Locales</button>
						</Link>
					</div>
					<SearchbarAdmin btnView={btnView} />
					<b>
						Cant:{" "}
						{btnView === "products" ? allComponents.length : allUsers.length}
					</b>
					<table>
						{btnView === "products" ? (
							<>
								<thead>
									<tr>
										<th>ID Product</th>
										<th>ID Seller</th>
										<th>Imagen</th>
										<th>Titulo</th>
										<th>Stock</th>
										<th>Editar</th>
										<th>Eliminar</th>
										<th>Ver</th>
									</tr>
								</thead>
								<tbody>
									{typeof allComponents[0] === "object" &&
										allComponents.length &&
										allComponents?.map((prod) => {
											return (
												<tr key={prod.id} className={s.listProd}>
													<td>{prod.id}</td>
													<td>{prod.sellerInfo.id}</td>
													<td>
														<img src={prod.photo} />
													</td>
													<td>{prod.title}</td>
													<td>{prod.cant}</td>
													<td>
														<Link to={`/user/userEditProduct/${prod.id}`}>
															Editar
														</Link>
													</td>
													<td>
														<button onClick={() => handleDelete(prod.id)}>
															❌
														</button>
													</td>
													<td>
														<Link to={`/detail/${prod.id}`}>Visitar</Link>
													</td>
												</tr>
											);
										})}
								</tbody>
							</>
						) : (
							<>
								<thead>
									<tr>
										<th>ID</th>
										<th>Avatar</th>
										<th>Nombre</th>
										<th>Email</th>
										<th>Desactivar/Activar</th>
										<th>Eliminar</th>
									</tr>
								</thead>
								<tbody>
									{allUsers?.map((user) => {
										return (
											<tr key={user.id} className={s.listUsers}>
												<td>{user.id}</td>
												<td>
													<img src={user.avatar} />
												</td>
												<td>{user.name}</td>
												<td>{user.email}</td>
												{!user.admin ? (
													user.active ? (
														<td>
															<button>🚫</button>
														</td>
													) : (
														<td>
															<button>✔</button>
														</td>
													)
												) : (
													<></>
												)}
												{!user.admin ? (
													<td>
														<button onClick={event => handleDeleteUser(user.id)}>❌</button>
													</td>
												) : (
													<></>
												)}
											</tr>
										);
									})}
								</tbody>
							</>
						)}
					</table>
				</div>
			) : (
				<Loading
					load={spanish ? "Verificando que seas Admin" : "Verifying that you are an Admin"}
					msgError={spanish ? "No eres admin, no debes de estar aca" : "You're not an admin, you shouldn't be here"}
					time={3000}
				/>
			)}
		</div>
	);
}
