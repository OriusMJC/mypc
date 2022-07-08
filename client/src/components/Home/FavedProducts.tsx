import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import s from '../Styles/MostFaved.module.css'

function FavedProducts() {
    const allComponents = useSelector ((state:any) => state.allComponents)
    const filteredComponents = allComponents?.map((obj:any) => {
        return {
            id: obj.id,
            photo: obj.photo[0],
            title: obj.title,
            price: obj.price,
            status: obj.status,
            likes: obj.likes,
            type: obj.type,
            cant: obj.cant,
            description: obj.description.slice(0, 25),
        }
    }).sort((a, b) => {
        if(a.likes < b.likes) return 1;
        if(a.likes > b.likes) return -1;
        return 0
    }).slice(0, 5)

 return (
    <div className = {s.container}>
        <h1>Productos mas likeados</h1>
        <div className = {s.container2}>
        {filteredComponents.length && 
         filteredComponents.map((comp:any) => {
            return(
            <Link to = {`/detail/${comp.id}`} className = {s.link}>
            <div className = {s.containerDiv}>
                <div className = {s.containerImg}>
                    <img src={comp.photo && comp.photo} className = {s.img}></img>
                </div>
                <div className = {s.containerDetails}>
                    <h3>$ {comp.price}</h3>
                    <p>{comp.description}</p>
                </div>
            </div>
            </Link>
         )})
        }
        </div>
    </div>
  )
}

export default FavedProducts;