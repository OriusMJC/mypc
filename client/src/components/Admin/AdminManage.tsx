import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { useAppDispatch } from "src/config/config"
import { deleteProduct, getAllComponents, getAllUsers, getName } from "src/redux/actions"
import NavFilter from "../NavFilter"
import s from '../Styles/AdminManage.module.css'

export default function AdminManage (){
    const dispatch = useAppDispatch()
    const userAdmin = useSelector((store:any)=>store.userDetails)
    const allUsers = useSelector((store:any)=>store.allUsers)
    const allComponents = useSelector((store:any)=>store.components)
    const [btnView, setBtnView ] = useState('products')
    const [refresh,setRefresh] = useState(1)

    useEffect(()=>{
        dispatch(getAllUsers())
        dispatch(getAllComponents())
    },[])
    
    function handleDelete(id){
        dispatch(deleteProduct(id))
    }
    return (
        <div id={s.adminManageContainer}>
            {
                userAdmin && userAdmin.admin && userAdmin.email === 'mypcecommerce@gmail.com'?
                <div id={s.adminContainer}>
                    <NavFilter refresh={refresh} setRefresh={setRefresh} setProductsPerPage={setRefresh} products={false}/>
                        {/* {
                            btnView === 'products'?
                            <NavFilter refresh={refresh} setRefresh={setRefresh} setProductsPerPage={setRefresh} products={false}/>
                            :
                            <></>
                        } */}
                        <div>
                            <button onClick={()=>setBtnView('products')}>Productos</button>
                            <button onClick={()=>dispatch(getName(''))}>Refresh</button>
                            <button onClick={()=>setBtnView('user')}>Usuarios</button>
                        </div>
                        <table>
                        {
                            btnView === 'products'?
                                <>
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Imagen</th>
                                            <th>Titulo</th>
                                            <th>Stock</th>
                                            <th>Editar</th>
                                            <th>Eliminar</th>
                                            <th>Ver</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        allComponents.length && allComponents?.map((prod)=>{
                                            return (
                                            <tr key={prod.id} className={s.listProd}>
                                                <td>{prod.id}</td>
                                                <td><img src={prod.photo}/></td>
                                                <td>{prod.title}</td>
                                                <td>{prod.cant}</td>
                                                <td><button>✔</button></td>
                                                <td><button onClick={()=>handleDelete(prod.id)}>❌</button></td>
                                                <td><Link to={`/detail/${prod.id}`}>Visitar</Link></td>
                                            </tr>)
                                        }) 
                                    }
                                    </tbody>
                                </>
                                :
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
                                        {
                                            allUsers?.map((user)=>{
                                                return (
                                                <tr key={user.id} className={s.listUsers}>
                                                    <td>{user.id}</td>
                                                    <td><img src={user.avatar}/></td>
                                                    <td>{user.name}</td>
                                                    <td>{user.email}</td>
                                                    {!user.admin?
                                                        user.active?
                                                            <td><button>🚫</button></td>
                                                            :
                                                            <td><button>✔</button></td>
                                                        :
                                                        <></>
                                                    }
                                                    {!user.admin ? <td><button>❌</button></td> : <></>}
                                                </tr>)
                                            }) 
                                        }
                                    </tbody>
                                </>
                        }
                        </table>
                    </div>
                    :
                    <h1>No sos admin, tomatela</h1>
            }
        </div>
    )
}