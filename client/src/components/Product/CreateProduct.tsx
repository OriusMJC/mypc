import { useState} from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../config/config';
import { createProduct} from '../../redux/actions/index';
import s from '../Styles/CreateProduct.module.css'
import swal from 'sweetalert';


 interface Product {
    title: string
    photo: string
    description: string  
   }
  
  function validate(product){
    let errors: Product = {
        title: "",
        photo: "",       
        description: "",        
    }     
    if(!product.title){
        errors.title ="*Title"
    }else if(!product.photo){
        errors.photo ="*Image"
    }else if(!product.description){
        errors.description ="*Description "
    }  
    return errors;
}
  

function CreateProduct() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const user = useSelector((state:any) => state.userDetails);
    const types = useSelector((state:any) => state.types);
    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState("hola")
    const id = user.id;
    const [product, setProduct] = useState({
        title: "",
        photo: "",
        price: 1,
        type: "",
        description: "",
        likes: 0,
        comments: [],
        stockInitial: 1,
        status: "",
        sell: false,
    });
    

    const [error, setError] = useState<Product>({
        title: "",
        photo: "",      
        description: "",            
      })

    function handleChange(e){         
        setProduct({
            ...product,
            [e.target.name]: e.target.value
        })
        setError(validate({
            ...product,
            [e.target.name] : e.target.value
        }))
    }

    function handleType(e){
        setProduct({
            ...product,
            type: e.target.value
        });
    }

    function handleStatus(e){
        setProduct({
            ...product,
            status: e.target.value
        });
    }

    function handleSubmit(e){
        if(product.title && product.photo && product.type && product.description.length >=5 && product.description.length <= 500){
            e.preventDefault();
            swal({
                title: "Felicidades",
                text: "Tu producto fue creado",
                icon: "success",
              });                
            dispatch(createProduct(id, product));
            navigate("/")
        }else {
          //  alert("no puedes creer")
            e.preventDefault();
            swal({
                title: "Error",
                text: "Te faltan datos para completar el formulario",
                icon: "error",
              });
            }
    }
    function handleDot(e){

        if(e.key === "."){
            e.preventDefault();
        }
    }


    //Drag n drop
    const uploadImage = async (e) => {
        const files = e.target.files;
        const data = new FormData();
  
        data.append('file', files[0]);
        data.append('upload_preset', 'chropyis');
      
        setLoading(true);
        const res = await fetch("https://api.cloudinary.com/v1_1/mypc/image/upload", { method: "POST", body: data })
        const file = await res.json();
      
        setProduct({
            ...product,
            photo: file.secure_url
        });
        setLoading(false) 
    }

  return (
    <div>
         <div className={s.errorCode}>
             {error.description  && (<p className={s.error}> {error.description}</p>)}                 
             {error.title && (<p className={s.error}> {error.title}</p>)} 
             {error.photo && (<p className={s.error}> {error.photo}</p>)}
           </div>
     <div className = {s.container}>
           
        <form onSubmit={handleSubmit} className = {s.form}>
            <h1>Crear Producto</h1>
            <label>Imagen: </label>
            <input type="file" name="photo" onChange={uploadImage}></input>

            <label>Título: </label>
            <input type="text" name="title" value={product.title} onChange={handleChange}></input>
            
            <label>Precio: </label>
                <input type="number" onKeyDown={handleDot} min="1"  name="price" value={product.price || 1}  onChange={handleChange}></input>

            <label>Tipo: </label>
            <select onChange={handleType}>
                <option hidden>Seleccionar Tipo</option>
                {types?.map((t) => (
                    <option key={t} value={t}>
                        {t}
                    </option>
                ))}
            </select>

            <label>Estado: </label>
            <select onChange={handleStatus}>
                <option hidden>Seleccionar Estado</option>
                <option value="nuevo">nuevo</option>
                <option value="usado">usado</option>
            </select>        
            <label>Stock: </label>
                <input type="number"  onKeyDown={handleDot} min="1" name="stockInitial" value={product.stockInitial || 1} onChange={handleChange}></input>
            <label>Descripción: </label>
            <textarea name="description" value={product.description} onChange={handleChange} className={s.descriptionInput} required/>

        <div className = {s.button}>
            <button type="submit">Crear Producto</button>
        </div>
        </form>
        <div className = {s.products}>
            <h1>{product.title}</h1>
            <div className = {s.img}>
            <img src={product.photo && product.photo} alt=""></img>
            </div>
            <div className = {s.productInfo}>
            <h3>{product.price != 0 && product.price}</h3>
            <h3>{product.type}</h3>
            <h3>{product.status}</h3>
            <h3>{product.stockInitial != 0 && product.stockInitial}</h3>
            <p>{product.description}</p>
            </div>
        </div>      
     </div>
    </div>
  )
  
  
}

export default CreateProduct