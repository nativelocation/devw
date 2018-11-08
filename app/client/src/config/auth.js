import React from 'react';
import { setAccount } from '../redux/actions/account';
import Api from './api';

class Authentication {

    storeUser(history, store, redirect = "/") {
        const { tokenAuth } = localStorage;
        const sendToLogin = () => {
            localStorage.removeItem('tokenAuth');
            history.push('/login');
        }

        Api.GetUser(tokenAuth).then(res => {
            if (res.status === 201) {
                store.dispatch(setAccount(res.data));
                history.push(redirect);
            } else sendToLogin();
        }).catch(sendToLogin);
    }

    authorize(Composed, props, store) {
        const { pathname } = props.history.location;
        const { account } = store.getState();
        if (!localStorage.tokenAuth) props.history.push('/login');
        if (account._id) return <Composed {...props} />;
        else this.storeUser(props.history, store, pathname);
        return null;
    }

    validate(Composed, props, store) {
        const { account } = store.getState();
        if (!localStorage.tokenAuth) return <Composed {...props} />;
        if (!account._id) this.storeUser(props.history, store);
        return null;
    }
}

export default new Authentication();