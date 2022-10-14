import React, {useContext, useState, createContext} from 'react';
import axios from 'axios';
import endPoints from 'services/api';
import Cookies from 'js-cookie';

const AuthContext = createContext();

export function ProviderAuth({children}) {
    const auth = useProvideAuth();
    return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
};

export const useAuth = () => {
    return useContext(AuthContext);
};

function useProvideAuth() {
    const [user, setUser] = useState(null);

    const SignIn = async (email, password) => {
        const options = {
            headers: {
                accept: '*/*',
                'Content-Type': 'application/json'
            },
        }
        const {data: {access_token} } = await axios.post(endPoints.auth.login, {email, password}, options)
        if(access_token) {
            Cookies.set('token', access_token, {expires: 5});
            axios.defaults.headers.authorization = `Bearer ${access_token}`;
            const { data: user } = await axios.get(endPoints.auth.profile);
            setUser(user);

        }
    }

    const logout = () => {
        Cookies.remove('token');
        setUser(null);
        delete axios.defaults.headers.authorization;
        window.location.href = '/login';
    }



    return {
        user,
        SignIn,
        logout
    };
}