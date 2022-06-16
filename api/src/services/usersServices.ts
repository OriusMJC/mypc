import * as types from '../types'
const { Product, User } = require('../db');

//Aqui van las funciones para todo sobre los users

export const getAllUsers = async(): Promise<types.User[]> => {
    let allUsers = User.findAll({
        include: {
            model: Product,
            as: 'sell',
            attributes: {
                exclude: ['sellerinfo']
            },
            through:{
                attributes: []
            } 
        }
    })
    return allUsers
}

export const getUserById = async(id:string): Promise<types.User | string>=> {
    let userData = await User.findByPk(id)
    if(userData){
        let products = await userData.getProducts().dataValues
        return {...userData, sell: products}
    }
    return 'No se ha encontrado ningun usuario registrado con esa id: ' + id
}

export const addNewUser = async(user: types.User): Promise<string> => {
    await User.create(user)
    return 'Usuario guardado con éxito'
}

export const updateDataUser = async(newUserData: types.User): Promise<string> => {
    // let userOldData = await User.findByPk(newUserData.id)
    // await userOldData.update(newUserData, {where: {id: newUserData.id}})
    await User.update(newUserData, {where: {id: newUserData.id}})
    return 'Cambios hechos correctamente'
}

export const userBuyProduct = async(idUser:string,productSelled:types.basicProductInfo):Promise<string>=>{
    let user = User.findByPk(idUser)
    user.buy = [...user.buy,productSelled]
    await user.save()
    return 'Producto comprado con éxito'
}