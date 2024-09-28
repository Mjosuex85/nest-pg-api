export interface Libraries {
    library: Library;
}

export interface Library {
    name:    string;
    address: Address;
    books:   Book[];
    members: Member[];
}

export interface Address {
    street:  string;
    city:    string;
    zipCode: string;
    country: string;
}

export interface Book {
    id:            number;
    title:         string;
    author:        Author;
    genre:         string;
    publishedYear: number;
    available:     boolean;
}

export interface Author {
    firstName: string;
    lastName:  string;
}

export interface Member {
    id:             number;
    firstName:      string;
    lastName:       string;
    membershipDate: string;
    borrowedBooks:  BorrowedBook[];
}

export interface BorrowedBook {
    bookId:     number;
    borrowDate: string;
    dueDate:    string;
}
