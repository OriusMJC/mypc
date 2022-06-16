export default function Pages({videogamesPerPage, videogame, paginado}) {
    const pageNumbers = [];    
        for (let i = 1; i <= Math.ceil(videogame/videogamesPerPage) ; i++) {
            pageNumbers.push(i)            
        }

    return (
        <nav >
            <ul>
                {
                    pageNumbers &&
                    pageNumbers.map(num => (
                      <li key={num}>
                        <a  onClick={()=> paginado(num)}>{num}</a>
                      </li>
                     ))
                }
            </ul>
        </nav>
    )
}

 