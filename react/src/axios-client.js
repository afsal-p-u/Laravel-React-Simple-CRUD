import axios from "axios"

const axiosClient = axios.create({
    baseURL: `import.meta.env.VITE_API_BASE_URL/api`
})


// it act as middleware of axios request
axiosClient.interceptors.request.use((config) => {
    const token = localStorage.getItem("ACCESS_TOKEN")
    config.headers.Authorization = `Bearer ${token}`
    return config;
})

// it act as middleware of axios response
axiosClient.interceptors.request.use((response) => {
    return response;
}, (error) => {
    const {response} = error
    if(response.status == 401){
        localStorage.removeItem("ACCESS_TOKEN")
    }

    throw error
})

export default axiosClient