import fetch from 'cross-fetch';

export const handler = async function (event: any, context: any) {
    const response = await fetch('https://api.predic8.de/shop/products/62');
    const res = await response.json();

    return {
        statusCode: 200,
        headers: {},
        body: JSON.stringify(res)
    };
}