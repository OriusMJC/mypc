interface Comments {
    comment: {
        name: string,
        avatar: string,
        comment: string
    }
    seller: {
        id: any,
        name: string,
        email: string,
        avatar: string,
    }
}

export default function ProductsCards({key, title, photo, price, type, description, likes, comments, status, sellerInfo}){

return  (
    <div>
        <h2>{title}</h2>
        <img src={photo} ></img>
        <h3>Price: ${price}</h3>
        {/* <h3>VER RENDER TIPO</h3> */}
        <p>Description: {description}</p>
        <h4>Likes: {likes}</h4>
        {comments && comments.map((c: Comments["comment"]) => {
            <ul>
                <li>
                    Name: {c.name}
                </li>
                <li>
                    {c.avatar}
                </li>
                <li>
                    Comments: {c.comment}
                </li>
            </ul>
        })}
        <h4>Status: {status}</h4>
        {sellerInfo && sellerInfo.map((s: Comments["seller"]) => {
            <ul>
                <li>
                    Name: {s.name}
                </li>
                <li>
                    Email: {s.email}
                </li>
                <li>
                    Avatar: {s.avatar}
                </li>
            </ul>
        })}
    </div>
)
}