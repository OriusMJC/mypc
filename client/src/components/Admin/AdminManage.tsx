import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { useAppDispatch } from "src/config/config"
import { getAllComponents, getAllUsers } from "src/redux/actions"
import s from '../Styles/AdminManage.module.css'

export default function AdminManage (){
    const dispatch = useAppDispatch()
    const userAdmin = useSelector((store:any)=>store.userDetails)
    const allUsers = useSelector((store:any)=>store.allUsers)
    const allComponents = useSelector((store:any)=>store.allComponents)
    const [btnView,setBtnView ]= useState('products')

    useEffect(()=>{
        dispatch(getAllUsers())
        dispatch(getAllComponents())
    },[])
    return (
        <div id={s.adminManageContainer}>
            {
                userAdmin && userAdmin.admin && userAdmin.email === 'mypcecommerce@gmail.com'?
                    <div id={s.adminContainer}>
                        <div>
                            <button onClick={()=>setBtnView('user')}>Usuarios</button>
                            <button onClick={()=>setBtnView('products')}>Productos</button>
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
                                            <th>Likes</th>
                                            <th>Desactivar/Activar</th>
                                            <th>Eliminar</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        allComponents?.map((prod)=>{
                                            return (
                                            <tr key={prod.id} className={s.listProd}>
                                                <td>{prod.id}</td>
                                                <td><img src={prod.photo}/></td>
                                                <td>{prod.title}</td>
                                                <td>{prod.likes}</td>
                                                <td><button>✔</button></td>
                                                <td><button>❌</button></td>
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
                                                    <td><button>✔</button></td>
                                                    <td><button>❌</button></td>
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