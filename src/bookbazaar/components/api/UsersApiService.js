export const getCart = (userid) => {
    return ({
        "cartItems": [
            {
                "book": {
                    "isbn": 9780099549482,
                    "bookName": "To Kill a Mockingbird",
                    "stockQuantity": 0,
                    "price": 3.4,
                    "authors": [
                        "Harper Lee"
                    ],
                    "description": "A novel that explores the irrationality of adult attitudes to race and class in the Deep South of the thirties.",
                    "rating": 0.0,
                    "imageUrl": "http://books.google.com/books/content?id=st6EqikLVKoC&printsec=frontcover&img=1&zoom=1&source=gbs_api"
                },
                "quantity": 1,
                "totalCost": 3.4
            },
            {
                "book": {
                    "isbn": 9780143454212,
                    "bookName": "The Great Gatsby (PREMIUM PAPERBACK, PENGUIN INDIA)",
                    "stockQuantity": 8,
                    "price": 19.99,
                    "authors": [
                        "F. Scott Fitzgerald"
                    ],
                    "description": "Welcome to the roaring twenties, where money, debauchery, and dancing go hand-in-hand. It is the summer of 1922,and the enigmatic millionaire, Jay Gatsby, is in love. He has everything he could ever want, except the one thing that always remains out of reach-the beautiful socialite Daisy Buchanan, a former lover, now married to someone else. At his Long Island mansion, he throws lavish parties-drowning days and nights into drinks and dancing. But all the money in the world cannot fill the emptiness in his heart. Alone, untouched by the glitz and glamour of the American rich, he stews in his secret longing. But everything changes when Gatsby befriends Nick Carraway, Daisy's cousin and Gatsby's new neighbour, who reunites the two lovers. Then begins a tale of obsession, madness, and tragedy that unravels Jay Gatsby's life forever.",
                    "rating": 0.0,
                    "imageUrl": "http://books.google.com/books/content?id=vwDuzgEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api"
                },
                "quantity": 2,
                "totalCost": 39.98
            }
        ],
        "totalCost": 43.38
    }
    )
}

export const getOrders = (userid) => {
    return(
        [
        {
            "id": 1,
            "orderStatus": "ORDERED",
            "orderItems": [
                {
                    "book": {
                        "isbn": 9780099549482,
                        "bookName": "To Kill a Mockingbird",
                        "stockQuantity": 12,
                        "price": 3.4,
                        "authors": [
                            "Harper Lee"
                        ],
                        "description": "A novel that explores the irrationality of adult attitudes to race and class in the Deep South of the thirties.",
                        "rating": 0.0,
                        "imageUrl": "http://books.google.com/books/content?id=st6EqikLVKoC&printsec=frontcover&img=1&zoom=1&source=gbs_api"
                    },
                    "quantity": 3,
                    "totalCost": 10.200001
                }
            ],
            "orderedDate": "2023-11-30",
            "deliveredDate": "2023-12-02",
            "totalcost": 10.200001
        },
        {
            "id": 2,
            "orderStatus": "ORDERED",
            "orderItems": [
                {
                    "book": {
                        "isbn": 9780143454212,
                        "bookName": "The Great Gatsby (PREMIUM PAPERBACK, PENGUIN INDIA)",
                        "stockQuantity": 8,
                        "price": 19.99,
                        "authors": [
                            "F. Scott Fitzgerald"
                        ],
                        "description": "Welcome to the roaring twenties, where money, debauchery, and dancing go hand-in-hand. It is the summer of 1922,and the enigmatic millionaire, Jay Gatsby, is in love. He has everything he could ever want, except the one thing that always remains out of reach-the beautiful socialite Daisy Buchanan, a former lover, now married to someone else. At his Long Island mansion, he throws lavish parties-drowning days and nights into drinks and dancing. But all the money in the world cannot fill the emptiness in his heart. Alone, untouched by the glitz and glamour of the American rich, he stews in his secret longing. But everything changes when Gatsby befriends Nick Carraway, Daisy's cousin and Gatsby's new neighbour, who reunites the two lovers. Then begins a tale of obsession, madness, and tragedy that unravels Jay Gatsby's life forever.",
                        "rating": 0.0,
                        "imageUrl": "http://books.google.com/books/content?id=vwDuzgEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api"
                    },
                    "quantity": 1,
                    "totalCost": 19.99
                }
            ],
            "orderedDate": "2023-12-05",
            "deliveredDate": "2023-12-07",
            "totalcost": 19.99
        }
    ] 
    )
}

export const getUserDetails = (userid) => {
    return ({
        "id": 1,
        "username": "Jawa",
        "email": "Jawa481@example.com",
        "password": "",
        "address": {
            "address": "123 Main Street, Anytown",
            "city": "England",
            "state": "Iluppur",
            "country": "England",
            "pin": 543212,
            "landmark": "Central Park",
            "mobile": 7708280590
        }
    }
    );
}