import { useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Context from '../context';
import { toast } from 'react-toastify';

function LoginSuccess() {

    const navigate = useNavigate()
    const { fetchUserDetails, fetchUserAddToCart } = useContext(Context)
    const id = useParams();

    console.log(id);

    const callApi = async () => {

        try {
            const dataResponse = await fetch('http://localhost:8080/api/login-success', {
                method: "post",
                credentials: 'include',
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(id)
            })

            const dataApi = await dataResponse.json()
            console.log('dataApi', dataApi);

            if (dataApi.success) {
                toast.success(dataApi.message)
                navigate('/')
                fetchUserDetails()
                fetchUserAddToCart()
            }

            if (dataApi.error) {
                toast.error(dataApi.message)
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        callApi();
    }, []);

    return (
        <></>
    )
}

export default LoginSuccess;