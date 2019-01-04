import React from 'react';
import { setAccount } from '../redux/actions/account';
import Api from './api';
import ErrorCatch from '../components/ErrorCatch';
import NotAllowed from '../routes/NotAllowed';
import Layout from '../components/Layout';

const auth = {
    storeUser: (history, store, redirect = "/") => {
        const { tokenAuth } = localStorage;
        const sendToLogin = err => {
            if (!err) localStorage.removeItem('tokenAuth');
            history.push('/login');
        }

        Api.GetUserToken(tokenAuth).then(res => {
            if (res.status === 201) {
                store.dispatch(setAccount({ ...res.data, tokenAuth }));
                history.push(redirect);
            } else sendToLogin();
        }).catch(sendToLogin);
    },

    authorize: (Composed, props, store, level = 1) => {
        const { pathname } = props.history.location;
        const { account } = store.getState();
        if (!localStorage.tokenAuth) props.history.push('/login');
        if (account._id) {
            if (account.role <= level) return <Layout account={account} ><Composed {...props} /></Layout>;
            else return <NotAllowed />;
        }
        else auth.storeUser(props.history, store, pathname);
        return null;
    },

    validate: (Composed, props, store) => {
        const { account } = store.getState();
        if (!localStorage.tokenAuth) return <ErrorCatch><Composed {...props} /></ErrorCatch>;
        if (!account._id) auth.storeUser(props.history, store);
        return null;
    }
}

export default auth;