import { apiClient } from "./ApiClient";


export const getBookByIsbn = (isbn) => apiClient.get(`/books/view/${isbn}`)

export const getPopularBooks = () => apiClient.get(`/books/popularBooks`)

export const searchBook = (query) => apiClient.get(`/books/search?q=${query}`)