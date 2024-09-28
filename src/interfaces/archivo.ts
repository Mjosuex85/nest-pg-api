import { Libraries, Library, Address } from './inter.interfaces';

const data: Libraries[] = [
    {
      "library": {
        "name": "City Central Library",
        "address": {
          "street": "123 Library St",
          "city": "Booktown",
          "zipCode": "12345",
          "country": "Fictivia"
        },
        "books": [
          {
            "id": 1,
            "title": "The Great Gatsby",
            "author": {
              "firstName": "F. Scott",
              "lastName": "Fitzgerald"
            },
            "genre": "Fiction",
            "publishedYear": 1925,
            "available": true
          },
          {
            "id": 2,
            "title": "1984",
            "author": {
              "firstName": "George",
              "lastName": "Orwell"
            },
            "genre": "Dystopian",
            "publishedYear": 1949,
            "available": false
          }
        ],
        "members": [
          {
            "id": 101,
            "firstName": "John",
            "lastName": "Doe",
            "membershipDate": "2020-01-15",
            "borrowedBooks": [
              {
                "bookId": 2,
                "borrowDate": "2024-07-20",
                "dueDate": "2024-08-20"
              }
            ]
          }
        ]
      }
    },
    {
      "library": {
        "name": "Downtown Library",
        "address": {
          "street": "456 Elm St",
          "city": "Readerville",
          "zipCode": "67890",
          "country": "Literaturia"
        },
        "books": [
          {
            "id": 3,
            "title": "To Kill a Mockingbird",
            "author": {
              "firstName": "Harper",
              "lastName": "Lee"
            },
            "genre": "Southern Gothic",
            "publishedYear": 1960,
            "available": true
          },
          {
            "id": 4,
            "title": "Pride and Prejudice",
            "author": {
              "firstName": "Jane",
              "lastName": "Austen"
            },
            "genre": "Romance",
            "publishedYear": 1813,
            "available": true
          }
        ],
        "members": [
          {
            "id": 102,
            "firstName": "Jane",
            "lastName": "Smith",
            "membershipDate": "2021-06-22",
            "borrowedBooks": []
          },
          {
            "id": 103,
            "firstName": "Alice",
            "lastName": "Johnson",
            "membershipDate": "2023-02-10",
            "borrowedBooks": []
          }
        ]
      }
    },
    {
      "library": {
        "name": "Westside Library",
        "address": {
          "street": "789 Maple Ave",
          "city": "Storyville",
          "zipCode": "54321",
          "country": "Narrativa"
        },
        "books": [
          {
            "id": 5,
            "title": "Moby Dick",
            "author": {
              "firstName": "Herman",
              "lastName": "Melville"
            },
            "genre": "Adventure",
            "publishedYear": 1851,
            "available": false
          },
          {
            "id": 6,
            "title": "The Catcher in the Rye",
            "author": {
              "firstName": "J.D.",
              "lastName": "Salinger"
            },
            "genre": "Fiction",
            "publishedYear": 1951,
            "available": true
          }
        ],
        "members": [
          {
            "id": 104,
            "firstName": "Bob",
            "lastName": "Brown",
            "membershipDate": "2019-09-12",
            "borrowedBooks": [
              {
                "bookId": 5,
                "borrowDate": "2024-07-30",
                "dueDate": "2024-08-30"
              }
            ]
          }
        ]
      }
    }
  ]
  



export class LibraryComponent {

    constructor(
        public libraries: Libraries[] = data
    ) {
        
        

    }


    private foo(libraries: Libraries[]):void {
        
        libraries[0].library.books.map((e) => {
            e.author
        })

    }

}