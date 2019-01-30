const Errors = {
    NotValidEmail: { message: 'This email is not valid' },
    PasswordsAreNotTheSame: { message: 'Passwords are not the same' },
    UserWithTheSameEmailAlreadyExists: { message: 'User with the same email is already exist' },
    UserWithTheSameUsernameAlreadyExists: { message: 'User with the same username is already exist' },
    UsernameMustNotContainsSobaka: { message: 'Username mustn\'t contains @' },
    UserNotLogin: { message: 'You are not logged in' },

    AdAlreadyClosed: { message: 'This ad already closed' },
    LinkAlreadyUsed: {message: 'This link already used'},
    NotValidPrice: { message: 'Price is not valid' },
    InsufficientFunds: { message: 'You have not enough money' },
}

export {
    Errors,
}