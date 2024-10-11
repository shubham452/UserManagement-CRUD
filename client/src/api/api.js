import axios from 'axios';
const url = "http://localhost:3000/user";

export const registerUser = async(data)=>{
    try{
        const res = await axios.post(`${url}/register`, data)

        return res;
    }catch(error)
    {
        return error
    }
}

export const getUsers = async(search, gender, sort, status,page) =>{
    try {
        console.log("details", search , gender, sort, status,page)
        const res = await axios.get(`${url}/details`,{ params:{search,gender,status,sort,page},})
        console.log("api res", res)
        return res
    } catch (error) {
        return error
    }
}

export const singleUserGet = async(id)=>{
    try {
        const res = await axios.get(`${url}/${id}`)
        console.log("Fetched user data: ", res.data);
        console.log("api id: "+id)
        return res
    } catch (error) {
        return error
    }
}

export const editUser = async(id,data)=>{
    try {
        const res = await axios.put(`${url}/edit/${id}`,data)
        console.log(res);
        return res;
    } catch (error) {
        console.error("Error editing user: ", error);
        return error
    }
}
export const statusChange = async(id,status)=>{
    try {
        const res = await axios.put(`${url}/status/${id}`,{status})

        return res
    } catch (error) {
        return error.response.status
    }
}
export const deleteUser = async(id)=>{
    try {
        const res = await axios.delete(`${url}/delete/${id}`)
        console.error("deleted user ");
        return res;
    } catch (error) {
        console.error("Error deleting user: ", error);
        return error
    }
}

export const exporttocsvfunc = async () => {
    try {
        const response = await axios.get(`http://localhost:3000/files/export/user_data.csv`, {
            responseType: 'blob',
        });
        return response;
    } catch (error) {
        console.error("Export error:", error);
        throw error;
    }
};



