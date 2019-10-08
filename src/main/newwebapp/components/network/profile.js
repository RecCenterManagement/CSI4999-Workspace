import { getDataFromURL, postDataToURL } from './requests';

const login = (username, password, remember = false, setAccount) => {
    postDataToURL("api/authenticate", { username, password, remember }, (response) => {
        const bearerToken = response.value.headers.authorization;
        const jwt = (bearerToken && bearerToken.slice(0, 7) === 'Bearer ' ? bearerToken.slice(7, bearerToken.length) : bearerToken;

        setAccount(oldAccount => { return { ...oldAccount, authenticated: true, bearerToken: jwt, remember: remember }; })
    });
};

const fetchProfile = () => {
    getDataFromURL("api/account", (response) => {
        setAccount(oldAccount => {return { ...oldAccount, response}});
    });
};