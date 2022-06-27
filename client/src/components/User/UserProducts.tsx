import { useEffect } from 'react';
import {useSelector} from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteProduct, getAllComponents } from '../../redux/actions/index'
import { useAppDispatch } from '../../config/config'

function UserProducts() {
  const dispatch = useAppDispatch();
  const products = useSelector((state:any) => state.allComponents);
  const user = useSelector((state:any) => state.userDetails);
  let productsCreated = [];

  products.map((prod:any) =>{
    if(prod.sellerInfo.id.includes(user.id)){
      productsCreated.push(prod)
    }
    })
  console.log(productsCreated);

  function handleDelete(e){
    dispatch(deleteProduct(e.target.value))
  }

  useEffect(() => {
    dispatch(getAllComponents())
  }, [])


  return (
    <div>
      <Link to ='/userdetail'>
        <button>
          Go Back
        </button>
      </Link>
      {
        !productsCreated.length 
        ?
        <h1>No hay productos creados</h1>
        :
        productsCreated.map(prod => {
          return (
            <div>
              <h2>{prod.title}</h2>
              <img src={prod.photo} alt={prod.title} width = "100px" height = "100px"></img>
              <h3>{prod.price}</h3>
              <h3>{prod.type}</h3>
              <h4>{prod.status}</h4>
              <p>{prod.description}</p>
              <div>
                <button onClick = {handleDelete} value={prod.id}>X</button>
                <button>EDIT</button>
              </div>
            </div>
          )
        })

      }
    </div>
  )
}

export default UserProducts;