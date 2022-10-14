import axios from 'axios';
import FormProduct from 'components/FormProduct';
import useAlert from 'hooks/useAlert';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import endPoints from 'services/api';

const Edit = () => {

    const router = useRouter();
    const [product, setProduct] = useState([]);
    const {setAlert} = useAlert();


    useEffect( () => {
        const {id} = router.query;

        if(!router.isReady) return;
        async function getProduct() {
            try {
                const resp = await axios.get(endPoints.products.getProduct(id));
                setProduct(resp.data)
            } catch (error) {
                router.push('/dashboard/products')
            }
        }

        getProduct()
    }, [router?.isReady])

    return <FormProduct product={product} setAlert={setAlert} />
}

export default Edit;