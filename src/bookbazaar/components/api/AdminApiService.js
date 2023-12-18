import { apiClient } from "./ApiClient"


const fetchCount = 10;

export const getAllBooks = (page) => apiClient.get(`/admin/books?page=${page}&count=${fetchCount}`);

export const getBooksCount = () => apiClient.get(`admin/books/count`);

export const getBookByIsbn = (isbn) => apiClient.get(`/admin/books/search?isbn=${isbn}`)

export const updateBookInfo = (isbn, price, stock) => apiClient.put(`/admin/books/${isbn}/${price}/${stock}`);


export const getAllUsers = (page) => apiClient.get(`/admin/users?page=${page}&count=${fetchCount}`);

export const getUsersCount = () => apiClient.get(`admin/users/count`);

export const getUserById = (userid) => apiClient.get(`/admin/users/search?userid=${userid}`)

export const getOrderedUserDetails = (userid) => apiClient.get(`/admin/userdetails/${userid}`);


export const getAllOrders = (page) => apiClient.get(`/admin/orders?page=${page}&count=${fetchCount}`);

export const getOrdersCount = () => apiClient.get(`admin/orders/count`);

export const getPendingOrders = (page) => apiClient.get(`/admin/orders/pending?page=${page}&count=${fetchCount}`);

export const getOrderById = (orderid) => apiClient.get(`/admin/orders/search?orderid=${orderid}`)

export const updateOrderStatus = (orderid, status) => apiClient.put(`/admin/orders/${orderid}/status/${status}`);

export const getOrderItems = (orderid) => apiClient.get(`/admin/orders/${orderid}/items`);


// Case 1: 
// 50 recors

// 1st page = 0; 1-10
// 2nd page = 1;
// 3rd page = 2;
// ..
// 5the page = 4; 41-50

// Case 2 :
// 23 records 

// 1st page = 0; 1 - 10
// 2nd page = 1; 11 - 20
// 3rd page = 2; 21 - 23;

// if(page + 1 * 10 > 23) -> last