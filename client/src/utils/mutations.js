import gql from 'graphql-tag';

export const loginUser = gql`
    mutation loginUser($email: String!, $password: String!) {
        loginUser(email: $email, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }
`;
export const createUser = gql`
    mutation createUser($username: String!, $email: String!, $password: String!) {
        createUser(username: $username, email: $email, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }
`;
export const saveBook = gql`
    mutation saveBook($input: savedBook!) {
        saveBook(input: $input ) {
            _id
            username
            email
            bookCount
            savedBooks {
                bookId
                title
                description
                authors
                link
                image
            }
        }
    }
`;
export const removeBook = gql`
    mutation removeBook($bookId: String!) {
        removeBook(bookId: $bookId) {
            _id
            username
            email
            bookCount
            savedBooks {
                bookId
                title
                description
                authors
                link
                image
            }
        }
    }
`;