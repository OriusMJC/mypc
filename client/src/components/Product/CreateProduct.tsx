import { useEffect, useState} from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../config/config';
import { createProduct, getUsersById} from '../../redux/actions/index';
import s from '../Styles/CreateProduct.module.css'
import swal from 'sweetalert';

 interface Product {
    title: string
    photo: string
    description: string 
    status: string 
   }
  
//   function validate(product){
//     let errors: Product = {
//         title: "",
//         photo: "",       
//         description: "",
//         status: "",
//     }     
//     if(!product.title){
//         errors.title ="*Title"
//     }else if(!product.photo){
//         errors.photo ="*Image"
//     }else if(!product.description){
//         errors.description ="*Description " 
//     }else if(!product.status){
//         errors.status ="*status"
//         }  
//     return errors;
// }
  

function CreateProduct() {
    const spanish = useSelector((state: any) => state.spanish);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const user = useSelector((state:any) => state.userDetails);
    const types = useSelector((state:any) => state.types);
    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState("hola")
    const id = user && user.id;
    const [product, setProduct] = useState({
        title: "",
        photo: [],
        price: 1,
        type: "",
        description: "",
        likes: 0,
        comments: [],
        stockInitial: 1,
        status: "",
        sell: false,
    });
    
    function validate(product){
        let errors: Product = {
            title: "",
            photo: "",       
            description: "",
            status: "",
        }     
        if(!product.title){
            errors.title =spanish ? "*Título" : "*Title"
        }else if(!product.photo){
            errors.photo =spanish ? "*Imagen" : "*Image"
        }else if(!product.description){
            errors.description =spanish ? "*Descripción " : "*Description " 
        }else if(!product.status){
            errors.status =spanish ? "*Estado" : "*State"
            }  
        return errors;
    }

    const [error, setError] = useState<Product>({
        title: "",
        photo: "",      
        description: "", 
        status: "",           
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
        if(product.title && product.photo && product.type && product.description.length >=5 && product.description.length <= 500 &&(product.status === "nuevo" || product.status === "usado")){
            e.preventDefault();
            swal({
                title: spanish ? "Felicidades" : "Congratulations",
                text: spanish ? "Tu producto fue creado" : "Your product was created",
                icon: "success",
              });                
            dispatch(createProduct(id, product));
            navigate("/")
        }else {
          //  alert("no puedes creer")
            e.preventDefault();
            swal({
                title: "Error",
                text: spanish ? "Te faltan datos para completar el formulario" : "Missing data to complete the form",
                icon: "error",
              });
            }
    }
    function handleDot(e){

        if(e.key === "."){
            e.preventDefault();
        }
    }
   


 

    function handleDeleteImage(e){
        let deletedPhotos = product.photo.filter((photo:any) => photo !== e.target.value)
        setProduct({
            ...product,
            photo: deletedPhotos
        })
    }

    //Drag n drop
    const uploadImage = async (e) => {
        const files = e.target.files;
        const data = new FormData();
  
        data.append('file', files[0]);
        data.append('upload_preset', 'chropyis');
      
        const res = await fetch("https://api.cloudinary.com/v1_1/mypc/image/upload", { method: "POST", body: data })
        const file = await res.json();
      
        if(product.photo.length <= 3){
           if(!file.error){
            setProduct({
                ...product,
                photo: [...product.photo, file.secure_url]
            });
           }else console.log(file.error)
        }else{
            swal({
                title: "Error",
                text: spanish ? "No puedes subir mas de cuatro fotos!" : "You cannot upload more than four photos!",
                icon: "error",
              }); 
        }
    }

    useEffect(() => {    
        dispatch(getUsersById(user.id))
        console.log(user);
        if (!user.seller) {
            swal({
                title: "No eres vendedor",
                text: "Necesitas activar tu cuenta con tu ibucacion para poder vender!",
                icon: "warning",
                buttons: [
                  'No, cancelar!',
                  'Quiero ser vendedor!'
                ],
                dangerMode: true,
            }).then(function(isConfirm) {
                if (isConfirm) {
                    navigate('/user/direction')
                //   swal({
                //     title: 'Shortlisted!',
                //     text: 'Candidates are successfully shortlisted!',
                //     icon: 'success'
                //   })
                } else {
                    navigate('/')
                }
            })
        }
    }, [])

  return (
    <div>
         <div className={s.errorCode}>
             {error.description  && (<p className={s.error}> {error.description}</p>)}                 
             {error.title && (<p className={s.error}> {error.title}</p>)} 
             {error.photo && (<p className={s.error}> {error.photo}</p>)}
             {error.status && (<p className={s.error}> {error.status}</p>)}
           </div>
     <div className = {s.container}> 
        <form onSubmit={handleSubmit} className = {s.form}>
            <h1>{spanish ? "Crear Producto" : "Create Product"}</h1>
            <label>{spanish ? "Imagen" : "Image"} </label>
            <input type="file" name="photo" onChange={uploadImage} className ={s.inputImg}></input>

            <label>{spanish ? "Título " : "Title "}</label>
            <input type="text" name="title" value={product.title} onChange={handleChange}></input>
            
            <label>{spanish ? "Precio " : "Price "}</label>
                <input type="number" onKeyDown={handleDot} min="1"  name="price" value={product.price || 1}  onChange={handleChange} className = {s.inputNumber}></input>

            <label>{spanish ? "Tipo " : "Type "}</label>
            <select onChange={handleType} className={s.selectType}>
                <option hidden>{spanish ? "Seleccionar Tipo" : "Select Type"}</option>
                {types?.map((t) => (
                    <option key={t} value={t}>
                        {t}
                    </option>
                ))}
            </select>

            <label>{spanish ? "Estado: " : "State: "}</label>
            <select onChange={handleStatus} required>
                <option hidden>{spanish ? "Seleccionar Estado" : "Select State"}</option>
                <option value="nuevo">{spanish ? "nuevo" : "new"}</option>
                <option value="usado">{spanish ? "usado" : "used"}</option>
            </select>   
            <label>Stock </label>
                <input type="number"  onKeyDown={handleDot} min="1" name="stockInitial" value={product.stockInitial || 1} onChange={handleChange} className = {s.inputNumber}></input>
            <label>{spanish ? "Descripción " : "Description "}</label>
            <textarea name="description" value={product.description} onChange={handleChange} className={s.descriptionInput} required/>
        <div className = {s.button}>
            <button type="submit">{spanish ? "Crear Producto" : "Create Product"}</button>
        </div>
        </form>
        <div className = {s.products}>
            <div className = {s.imgPContainer}>
            <div className = {s.containerr}>
            {typeof product.photo[0] === 'string' && <button value={product.photo[0]} onClick = {handleDeleteImage} className = {s.buttonPrincipal}>X</button>}
            <img src={typeof product.photo[0] === 'string' && product.photo[0]} className={s.pImage}></img>
            </div>
            <div className = {s.ultraContainer}>
            {product.photo.length > 1 && 
                product.photo.map((photo, i) => {
                    if(i > 0) {
                        return(
                        <div className = {s.photoDiv}>
                            <img src={typeof photo[i] === 'string' && photo}></img>
                            <button value={photo} onClick = {handleDeleteImage}>X</button>
                        </div>
                            )
                        }
                })
            }
            </div>
            </div>
            <div className = {s.ultramegaContainer}>
                <div className = {s.productInfo}>
                    <h1>{product.title}</h1>
                    <h3>{product.price != 0 && product.price}</h3>
                    <h3>{product.type}</h3>
                    <h3>{product.status}</h3>
                    <h3>{product.stockInitial != 0 && product.stockInitial}</h3>
                </div>
                <div className = {s.description}>
                    <p>{product.description}</p>
                </div>
            </div>
        </div>      
     </div>
    </div>
  )
  
  
}

export default CreateProduct