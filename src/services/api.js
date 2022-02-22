import axios from "axios";

const BASE_URL = "https://api.delta.exchange";

const PARAMS = {
    page_size: 10
}

/**
 * Fetch list of products from 'v2/products'
 * @param {number} page_size number of rows to be fetched  
 * @returns {object}  {products,symbols} where products is list of products, and symbols is list of product's symbols
 */
export const getProducts = (params = PARAMS) => {
    return new Promise((resolve,reject)=>{
        axios.get(`${BASE_URL}/v2/products`, {
            params: params
        })
        .then(res=>{
            console.log(res)
            const data = {
                products: res.data.result.map(r=>{
                    // flatten underlying_asset.symbol
                    r.underlying_asset_symbol = r.underlying_asset.symbol
                    return r
                }),
                symbols: res.data.result.map(r=>r.symbol)
            }
            resolve(data);
        })
        .catch(err=>{
            console.log(err)
            reject(err);
        })
    })
}