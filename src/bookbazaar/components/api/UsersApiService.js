import { apiClient } from "./ApiClient"


export const loginUser = (usernameValue, passwordValue) => apiClient.post("/users/login", {username : usernameValue, password: passwordValue});

export const signupuser = (usernameValue, emailValue, passwordValue) => apiClient.post("/users/signup", {username : usernameValue, email : emailValue, password : passwordValue});


export const getUserDetails = (userid) => apiClient.get(`/users/${userid}/userdetails`);

export const updateUserDetails = (userid, userDetails) => apiClient.put(`/users/${userid}/userdetails`, userDetails);


export const getAllFavourites = (userid) => apiClient.get(`/users/${userid}/favourites`);

export const addBookToFavourite = (userid, isbn) => apiClient.put(`/users/${userid}/favourites/${isbn}`);

export const removeBookFromFavourite = (userid, isbn) => apiClient.delete(`/users/${userid}/favourites/${isbn}`);


export const getCart = (userid) => apiClient.get(`/users/${userid}/cart`);

export const addBookToCart = (userid, isbn) => apiClient.put(`/users/${userid}/cart/${isbn}`);

export const updateCartItemQuantity = (userid, isbn, quantity) => apiClient.put(`/users/${userid}/cart/${isbn}/${quantity}`);

export const removeBookFromCart = (userid, isbn) => apiClient.delete(`/users/${userid}/cart/${isbn}`);



export const getUserBookByIsbn = (userid, isbn) => apiClient.get(`/users/${userid}/books/${isbn}`)

export const getBookByIsbn = (isbn) => apiClient.get(`/books/info/${isbn}`)



export const getAllOrders = (userid) => apiClient.get(`/users/${userid}/orders`);

export const buyBook = (userid, isbn) => apiClient.post(`/users/${userid}/buy/${isbn}`);

export const getBuyItemsFromCart = (userid) => apiClient.get(`/users/${userid}/buy/cart`);

export const buyBooksFromCart = (userid) => apiClient.post(`/users/${userid}/buy/cart`);