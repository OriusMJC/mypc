import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import s from '../Styles/MostFaved.module.css'

function RelationatedProducts() {
  const spanish = useSelector((state: any) => state.spanish);
  const user = useSelector((store:any) => store.userDetails);
  const allComponents = useSelector((state:any) => state.allComponents);
  const visitedProducts = user && user.visited && user.visited.slice(-10);

  const busqueda = (array) => {
    let variable = 0;
    let contador = 0;
    let cuenta = 0;
    if(array){
      array.map((prod) => {
        cuenta = 0;
        array.map((prod2) => {
          if(prod.type === prod2.type) {cuenta ++}
        })
        if(cuenta > contador){
          contador = cuenta;
          variable = prod.type
        }
      });
    }
    return variable;
  }
  const repeatedProduct = busqueda(visitedProducts);
  const arr = []
  allComponents.map((prod) => {
    if(prod.type === repeatedProduct){
      arr.push(prod)
    }
  });
  const relationated = arr.slice(0, 5)  

  if(user?.id && visitedProducts?.length > 3){
    return (
      <div className = {s.container}>
      <h1>{spanish ? "En base a tus ultimas visitas" : "Based on your last visits"}</h1>
      <div className = {s.container2}>
        {relationated.length && 
          relationated.map((prod:any) => (
            <Link to = {`/detail/${prod.id}`} className = {s.link}>
              <div className = {s.containerDiv}>
                <div className = {s.containerImg}>
                  <img src = {prod.photo && prod.photo[0]}className = {s.img}></img>
                </div>
                <div className = {s.containerDetails}>
                  <h3>$ {prod.price}</h3>
                  <p>{prod.description.slice(0, 30)}</p>
                </div>
              </div>
            </Link>
          ))
        }
      </div>
      </div>
    )
  }
}

export default RelationatedProducts