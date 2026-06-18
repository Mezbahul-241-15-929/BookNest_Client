import axios from 'axios';

const axiosSecure = axios.create({
    baseURL: 'https://book-nest-server-seven.vercel.app'
})

const useAxiosSecure = () => {

    return axiosSecure;
};

export default useAxiosSecure;