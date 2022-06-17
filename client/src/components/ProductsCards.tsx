import {Link} from 'react-router-dom'


export default function ProductsCards({key, id,title, photo, price, type, description, likes, comments, status, sellerInfo}){

return  (
    <div key={key}>
        <Link to={`detail/${id}`}>
            <h2>{title}</h2>
            <img src={photo} ></img>
            <h3>Price: ${price}</h3>
            <h4>Likes: {likes}</h4>
            <h4>Status: {status}</h4>
        </Link>
        <button>
            ❤
        </button>
        <button>
            🦽
        </button>
    </div>
)
}