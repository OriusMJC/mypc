import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useAppDispatch} from '../../config/config';
import { updateProduct, getAllComponents } from '../../redux/actions/index';
import s from '../Styles/UserEditProduct.module.css'
import swal from 'sweetalert';
import Loading from '../Loading/Loading';

function UserEditProduct() {
    const spanish = useSelector((state: any) => state.spanish);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const {idProduct} = useParams();
    const products = useSelector((state:any) => state.allComponents);
    const types = useSelector((state:any) => state.types);
    const filteredProduct = products.filter(prod => prod.id === idProduct);
    const [prod, setProd] = useState({
        title: filteredProduct[0]?.title,
        photo: filteredProduct[0]?.photo,
        price: filteredProduct[0]?.price,
        type: filteredProduct[0]?.type,
        description: filteredProduct[0]?.description,
        likes: filteredProduct[0]?.likes,
        comments: filteredProduct[0]?.comments,
        cant: filteredProduct[0]?.cant,
        status: filteredProduct[0]?.status,
        sell: false,
    })

    function handleChange(e){
        setProd({
            ...prod,
            [e.target.name]: e.target.value
        })
    }

    function handleType(e){
        setProd({
            ...prod,
            type: e.target.value
        })
    }

    function handleStatus(e){
        setProd({
            ...prod,
            status: e.target.value
        })
    }

    function handleSubmit(e){
        e.preventDefault();
        swal({            
            text: spanish ? "Estas seguro de actualizar tu producto?" : "Are you sure to update your product?",
            icon: "warning",
            buttons: ["No", spanish ? "Si" : "Yes"]
          }).then(response=>{
            if(response){
                swal({text: spanish ? "producto actualizado" : "updated product", icon: "success"})
                dispatch(updateProduct(idProduct, prod));
                navigate('/user/userProducts');
            }
          })
        // alert('Producto actualizado');
    }
    function handleDot(e){
        if(e.key === "."){
            e.preventDefault()
        }
    }

  return (
    <div className={s.containerBtn}>
        {
            filteredProduct.length?
            <>
                <div>
                    <Link to= '/user/userProducts'>
                    <button  className={s.btnBack}>
                        {spanish ? "Regresar" : "Return"}
                    </button>
                    </Link>
                    </div>
                    <div className={s.container}>
                    <form className={s.form} onSubmit = {handleSubmit}>
                    <h1>{spanish ? "Editar producto" : "Edit product"}</h1>

                    <label>{spanish ? "Imagen: " : "Image: "}</label>
                    <input
                    type = 'url'
                    name = 'photo'
                    value = {prod.photo}
                    onChange = {handleChange}
                    />

                    <label>{spanish ? "Título: " : "Title: "}</label>
                    <input
                    type = 'text'
                    name = 'title'
                    value = {prod.title}
                    onChange = {handleChange}
                    />

                    <label>{spanish ? "Precio: " : "Price: "}</label>
                    <input 
                    type = 'number'
                    name = 'price'
                    value = {prod.price}
                    min="1"
                    onChange = {handleChange}	
                    />

                    <label>{spanish ? "Tipo: " : "Type: "}</label>
                    <select name="type" onChange={handleType}>
                        {types?.map(t => (
                            <option key={t} value={t}>
                                {t}
                            </option>
                        ))}
                    </select>

                    <label>{spanish ? "Estado: " : "State: "}</label>
                    <select name="status" onChange = {handleStatus}>
                        <option value="nuevo">{spanish ? "nuevo" : "new"}</option>
                        <option value="usado">{spanish ? "usado" : "used"}</option>
                    </select>

                    <label>Stock: </label>
                    <input
                    onKeyDown={handleDot}
                    type = 'number'
                    name = 'cant'
                    value = {prod.cant || 1}
                    min="1"
                    onChange = {handleChange}	
                    />

                    <label>{spanish ? "Descripción: " : "Description: "}</label>
                    <textarea
                    className={s.descriptionInput}
                    name = 'description'
                    value = {prod.description}
                    onChange = {handleChange}
                    />
                    <div className={s.button}>
                    <button type = 'submit'>
                        {spanish ? "Editar producto" : "Edit product"}
                    </button>
                    </div>
                    </form>
                    <div className={s.view}>
                    <h1>{prod.title}</h1>
                    <div className={s.viewImg}>
                    <img src={prod.photo.length && prod.photo}></img>
                    </div>
                    <div className={s.viewInfo}>
                    <h3>{prod.price != 0 && prod.price}</h3>
                    <h3>{prod.type}</h3>
                    <h3>{prod.status}</h3>
                    <h3>{prod.cant != 0 && prod.cant}</h3>
                    <p>{prod.description}</p>
                    </div>
                    </div>
                </div>
            </>
            :
            <Loading load={spanish ? 'Buscando producto para editar' : "Searching product to edit"} msgError={spanish ? 'No se ha encontrado el producto' : "Product not found"} time={3000}/>
        }
    </div>
  )
}

export default UserEditProduct