import * as types from '../types'
const { Product} = require('../db');

export const getAllProducts = async(): Promise<types.Products[]> => {
    let allProducts = await Product.findAll()
    return allProducts
}

export const getProductById = async(idProduct:string):Promise<types.Products | string> => {
    let product = await Product.findByPk(idProduct)
    if(!product.dataValues) return 'No se ha encontrado ningun producto'
    return {...product.dataValues}
}
export const getProductByName = async(productTitle:string):Promise<types.Products[] | string> => {
    let allProduct = await getAllProducts() 
    let productsFinds = allProduct.filter(product => 
        product.title.toLowerCase().includes(productTitle.toLowerCase())
        )
    if(!productsFinds.length) return 'No se ha encontrado ningun producto'
    return productsFinds
}


export const addNewProduct = async(userData:types.NonSensitiveUserInfo,newProduct:types.Products):Promise<string> => {
    let productToCreate = {...newProduct, sellerInfo: userData}
    await Product.create(productToCreate)
    // await addSellProduct(userData.id, newProduct.id)
    return 'Producto creado con éxito'
}
// export const addSellProduct = async(idUser:string,idProduct:string):Promise<string>=>{
//     let userFind = await User.findByPk(idUser)
//     console.log('user a: ', userFind)
//     await userFind.addProduct(idProduct)
//     return 'Producto en venta agregado con éxito'
// }

export const updateDataProduct = async(idProduct:string, newProductData:types.Products):Promise<string> => {
    // let productOldData = await Product.findByPk(newProductData.id)
    // await productOldData.update(newProductData, {where: {id}})
    await Product.update(newProductData, {where: {id: idProduct}})
    return 'Cambios en el producto realizados correctamente'
}

export const addComment = async(idProduct:string,comment:any):Promise<string>=>{
    const product = await Product.findByPk(idProduct)
    let newCommentArr = [comment,...product?.dataValues.comments]
    await Product.update({comments: newCommentArr},{where: {id: idProduct}})
    return 'Comentario agregado con éxito'
}

export const deleteComment = async(idProduct: string, idComment:any):Promise<string>=>{
    const product = await Product.findByPk(idProduct);
    let deletedComment:any = [] 
    product.comments.forEach((c:any)=>{
        if(c.id != idComment) deletedComment.push(c)
    })
    await Product.update({comments: deletedComment}, {where: {id: idProduct}})
    return 'Comentario eliminado con exito';
}

export const addSellerResp = async(idProduct: string, sellerResp:any):Promise<string>=>{
    const product = await Product.findByPk(idProduct);
    let newArr = product.comments.map((c:any) => {
        if(c.id === sellerResp.id) {
            c.sellerResponse = sellerResp
        }
        return c
    })
    await Product.update({comments: newArr}, {where: {id: idProduct}})
    return 'Comentario actualizado';
}

export const productSelled = async(idProduct:string):Promise<string>=>{
    await Product.update({sell: true},{where: {id: idProduct}})
    return 'Producto vendido con éxito'
}

export const deleteProduct = async(idProduct:string):Promise<string> =>{
    await Product.destroy({where: {id: idProduct}});
    return idProduct;
}