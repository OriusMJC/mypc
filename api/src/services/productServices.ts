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

export const updateDataProduct = async(newProductData:types.Products):Promise<string> => {
    // let productOldData = await Product.findByPk(newProductData.id)
    // await productOldData.update(newProductData, {where: {id}})
    await Product.update(newProductData, {where: {id: newProductData.id}})
    return 'Cambios en el producto realizados correctamente'
}

export const productSelled = async(idProduct:string):Promise<string>=>{
    await Product.update({sell: true},{where: {id: idProduct}})
    return 'Producto vendido con éxito'
}