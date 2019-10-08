import 'axios'

export const postDataToURL = (url, data, callback) => {
    axios.post(url, data).then(
        response => callback(response)
    );
};

export const getDataFromURL = (url, callback) => {
    axios.get(url).then(
        response => callback(response)
    );
};