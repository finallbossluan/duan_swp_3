const backendDomin = "http://localhost:8080"

const SummaryApi = {
    signUP : {
        url : `${backendDomin}/api/signup`,
        method : "post"
    },
    signIn : {
        url : `${backendDomin}/api/signin`,
        method : "post"
    },
    current_user : {
        url : `${backendDomin}/api/user-details`,
        method : "get"
    },
    logout_user : {
        url : `${backendDomin}/api/userLogout`,
        method : 'get'
    },
    allUser : {
        url : `${backendDomin}/api/all-user`,
        method : 'get'
    },
    updateUser : {
        url : `${backendDomin}/api/update-user`,
        method : "post"
    },

    forgot_password: {
        url: `${backendDomin}/api/forgot-password`,
        method: "post"
    },
    reset_password: {
        url: `${backendDomin}/api/reset-password`,
        method: "post"
    },
    google_signIn: {
        url: `${backendDomin}/api/auth/google`,
        method: "get",
    },

    editProfile: {
        url : `${backendDomin}/api/edit-profile`,
        method : "post"
    },
    changePassword: {
        url : `${backendDomin}/api/change-password`,
        method : "post"
    },


    uploadProduct : {
        url : `${backendDomin}/api/upload-product`,
        method : 'post'
    },
    allProduct : {
        url : `${backendDomin}/api/get-product`,
        method : 'get'
    },
    updateProduct : {
        url : `${backendDomin}/api/update-product`,
        method  : 'post'
    },
    categoryProduct : {
        url : `${backendDomin}/api/get-categoryProduct`,
        method : 'get'
    },
    categoryWiseProduct : {
        url : `${backendDomin}/api/category-product`,
        method : 'post'
    },
    productDetails : {
        url : `${backendDomin}/api/product-details`,
        method : 'post'
    },
    addToCartProduct : {
        url : `${backendDomin}/api/addtocart`,
        method : 'post'
    },
    addToCartProductCount : {
        url : `${backendDomin}/api/countAddToCartProduct`,
        method : 'get'
    },
    addToCartProductView : {
        url : `${backendDomin}/api/view-card-product`,
        method : 'get'
    },
    updateCartProduct : {
        url : `${backendDomin}/api/update-cart-product`,
        method : 'post'
    },
    deleteCartProduct : {
        url : `${backendDomin}/api/delete-cart-product`,
        method : 'post'
    },
    searchProduct : {
        url : `${backendDomin}/api/search`,
        method : 'get'
    },
    filterProduct : {
        url : `${backendDomin}/api/filter-product`,
        method : 'post'
    }
    ,
    updateOrder: {
        url: `${backendDomin}/api/update-order`,
        method: 'post'
    },
    createOrder: {
        url: `${backendDomin}/api/create-order`,
        method: 'post'
    },
    payment: {
        url: `${backendDomin}/api/create-payment-link`,
        method: 'post'
    },
    allOrder : {
        url : `${backendDomin}/api/all-order`,
        method : 'get'
    },
    userOrder: {
        url: `${backendDomin}/api/user-order`,
        method: 'get'
    },
    uploadNews : {
        url : `${backendDomin}/api/upload-news`,
        method : 'post'
    },
    allNews : {
        url : `${backendDomin}/api/get-news`,
        method : 'get'
    },
    newsDetails : {
        url : `${backendDomin}/api/news-details`,
        method : 'post'
    },
    allDiscount : {
        url : `${backendDomin}/api/get-discount`,
        method : 'get'
    },
    uploadDiscount : {
        url : `${backendDomin}/api/upload-discount`,
        method : 'post'
    },
    AddReview : {
        url: `${backendDomin}/api/add`, 
        method: 'post',
    },
    getReviews : {
        url: `${backendDomin}/api/:productId`,
        method: 'get',
    },
    allreview : {
        url: `${backendDomin}/api/all-review`,
        method: 'get',
    },
    newestProducts : {
        url: `${backendDomin}/api/get-newestProduct`,
        method: 'get',
    },
    updateStatusOrder: {
        url: (orderId) => `${backendDomin}/api/updatestatus-order/${orderId}`, 
        method: 'put',
    },
    getBestSellerProducts: {
        url: (category) => {
            return category 
                ? `${backendDomin}/api/best-seller-products?category=${category}` 
                : `${backendDomin}/api/best-seller-products`;
        },
        method: 'get',
    }
}


export default SummaryApi