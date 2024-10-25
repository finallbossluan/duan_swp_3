const { default: SummaryApi } = require("../common")

const fetchNewestProducts = async () => {
    const response = await fetch(SummaryApi.newestProducts.url, {
        method: SummaryApi.newestProducts.method,
        headers: {
            "content-type": "application/json"
        }
    })

    const dataResponse = await response.json()

    return dataResponse
}

export default fetchNewestProducts
