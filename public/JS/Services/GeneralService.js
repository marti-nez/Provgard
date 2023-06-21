'use strict';

const apiUrl = 'http://localhost:3000/api/'

const ProcessGet = async (routerName, params) => {

    let result = null;

    await axios({
        method: 'get',
        url: apiUrl + routerName,
        responseType: 'json',
        params: params
    }).then((res) => {
        result = res.data;
    }).catch( (err) => {
        console.log(err);
    });

    return result;
};

const ProcessPost = async (routerName, data) => {

    let result = null;

    await axios({
        method: 'post',
        url: apiUrl + routerName,
        responseType: 'json',
        data: data
    }).then((res) => {
        result = res.data;
    }).catch((err) => {
        console.log(err);
    });

    return result;
};

const ProcessPut = async (routerName, data) => {

    let result = null;

    await axios({
        method: 'put',
        url: apiUrl + routerName,
        responseType: 'json',
        data: data
    }).then((res) => {
        result = res.data;
    }).catch((err) => {
        console.log(err);
    });

    return result;
};

const ProcessDelete = async (routerName, data) => {
    let result = null;

    await axios({
        method: 'delete',
        url: apiUrl + routerName,
        responseType: 'json',
        data: data
    }).then((res) => {
        result = res.data;
    }).catch((err) => {
        console.log(err);
    });

    return result;
};

// la siguiente formula podria sustituir las dos anteriores y asi podriamos utilizar solo con esta a todos los controllers
// menos el get que necesita params en lugar de data?
async function ProcessAction(pMethod, pRouterName, pData) {// el primer parametro es cualquier metodo (delete, post, etc)

    let result = null;
    await axios({
        method: pMethod,
        url: apiUrl + pRouterName,
        responseType: 'json',
        data: pData
    })
        .then(async (res) => {// async para evitar problemas.
            result = res.data;
        })
        .catch((err) => {
            console.log(err);
        });
    return result;
}
