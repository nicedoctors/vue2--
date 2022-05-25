import { v4 as uuidv4 } from 'uuid'
// 生成一个随机字符串，且每次执行不能发生变化,游客身份持久存储
export const getUUID = () => {
    // 1.从本地存储获取uuid
    let uuid_token = localStorage.getItem('UUIDTOKEN')

    if (!uuid_token) {
        // 2.若获取不到，生成一个新的uuid
        uuid_token = uuidv4()
        // 并进行本地存储
        localStorage.setItem('UUIDTOKEN',uuid_token)
    }
    return uuid_token
}