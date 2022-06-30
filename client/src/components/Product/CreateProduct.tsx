import { useState} from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../config/config';
import { createProduct} from '../../redux/actions/index';
import s from '../Styles/CreateProduct.module.css'

function CreateProduct() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const user = useSelector((state:any) => state.userDetails);
    const types = useSelector((state:any) => state.types);
    const id = user.id;
    const [product, setProduct] = useState({
        title: "",
        photo: "",
        price: 0,
        type: "",
        description: "",
        likes: 0,
        comments: [],
        cant: 0,
        status: "",
        sell: false,
    });

    function handleChange(e){
        setProduct({
            ...product,
            [e.target.name]: e.target.value
        });
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
        console.log(product)
        if(product.title && product.photo && product.type && product.description.length > 50 && product.description.length < 500){
            console.log('entro')
            e.preventDefault();
            dispatch(createProduct(id, product));
            alert("Product created");
            navigate("/")
        }else {
            e.preventDefault();
            alert("Product not created, please complete the form")
        } 
    }

  return (
    <div className = {s.container}>
        <form onSubmit={handleSubmit} className = {s.form}>
            <h1>Create Product</h1>

            <label>Image: </label>
            <input 
            type="url" 
            name="photo"
            value={product.photo}
            onChange={handleChange}/>

            <label>Title: </label>
            <input type="text" name="title" value={product.title} onChange={handleChange}></input>
            
            <label>Price: </label>
            <input type="number" name="price" value={product.price} onChange={handleChange}></input>

            <label>Type: </label>
            <select name="type" onChange={handleType}>
                <option hidden>Select Type</option>
                {types?.map((t) => (
                    <option key={t} value={t}>
                        {t}
                    </option>
                ))}
            </select>

            <label>Status: </label>
            <select name="status" onChange={handleStatus}>
                <option hidden>Select Status</option>
                <option value="nuevo">nuevo</option>
                <option value="usado">usado</option>
            </select>
            
            <label>Stock: </label>
            <input type="number" name="cant" value={product.cant} onChange={handleChange}></input>

            <label>Description: (min: 50 - max: 500)</label>
            <input type="text" name="description" value={product.description} onChange={handleChange} className={s.descriptionInput}></input>

        <div className = {s.button}>
            <button type="submit">Create Product</button>
        </div>
        </form>
        <div className = {s.products}>
            <h1>{product.title}</h1>
            <div className = {s.img}>
            <img src={product.photo.length && product.photo}></img>
            </div>
            <div className = {s.productInfo}>
            <h3>{product.price != 0 && product.price}</h3>
            <h3>{product.type}</h3>
            <h3>{product.status}</h3>
            <h3>{product.cant != 0 && product.cant}</h3>
            <p>{product.description}</p>
            </div>
        </div>
    </div>
  )
}

export default CreateProduct