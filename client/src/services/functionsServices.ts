export const getCartLH = async ()=>{
    let cart = await JSON.parse(window.localStorage.getItem('cart'))
    return cart? cart : []
}
export const addCartLH = async (obj:any)=>{
    let cart = await getCartLH()
    if(cart){
        cart.push(obj)
        window.localStorage.setItem('cart', JSON.stringify(cart))
    }else{
        cart = [obj]
        window.localStorage.setItem('cart', JSON.stringify(cart))
    }
    return cart
}
export const removeCartLH = async (id)=>{
    let cart = await getCartLH()
    let newCart = cart.filter((obj:any)=> obj.id !== id)
    window.localStorage.setItem('cart', JSON.stringify(newCart))
    return newCart
}