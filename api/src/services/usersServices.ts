import * as types from '../types'
const { User } = require('../db');

//Aqui van las funciones para todo sobre los users

export const getAllUsers = async(): Promise<types.User[]> => {
    let allUsers = await User.findAll()
    return allUsers
}

export const getUserById = async(id:string): Promise<types.User | string>=> {
    if(id){
        let user = User.findByPk(id)
        return user
    }
    return 'No se ha encontrado ningun usuario registrado con esa id: ' + id
}

export const getBasicUserInfo = async(id:string): Promise<types.NonSensitiveUserInfo | string>=> {
    let userData = await User.findByPk(id)
    const user = {
        id: userData.dataValues.id,
        name: userData.dataValues.name,
        email: userData.dataValues.email,
        avatar: userData.dataValues.avatar,
        phone: userData.dataValues.phone
    }
    return user
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
    await User.update({buy: [user.buy,productSelled]},{where:{id: idUser}})
    return 'Producto comprado con éxito'
}