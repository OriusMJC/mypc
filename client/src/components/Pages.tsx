type pages = {
    pageNumbers: Array<number>
}

function Pages({productsPerPage, allComponents, paginado}) {
    const pageNumbers: pages["pageNumbers"] = [];
    const rounded = Math.ceil(allComponents / productsPerPage);

    for (let i = 1; i <= rounded; i++){
        pageNumbers.push(i);
    }

    return(
        <div>
        <ul>
        {pageNumbers && pageNumbers.map((n) => (
            <li key = {n}>
                <a onClick = {() => paginado(n)}>{n}</a>
            </li>
        ))}
        </ul>
        </div>
    )

}

export default Pages;

