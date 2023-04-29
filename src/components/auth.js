export const BASE_URL = 'https://auth.nomoreparties.co';

const makeRequest = (url, method, body, token) => {

    const options = {
        method,
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    }

    if (body) {
        options.body = JSON.stringify(body);
    }

    if (token) {
        options.headers.Authorization = `Bearer ${token}`;
    }

    return fetch(`${BASE_URL}${url}`, options).then((response) => {
        if (response.ok) {
            return response.json()
        }
        throw new Error(`ошибка, код ${response.status}`)
    });

};

export const register = (password, email) => {
    return makeRequest("/signup", "POST", {
        password,
        email
    });
}

export const authorize = (password, email) => {
    return makeRequest("/signin", "POST", {
        password,
        email
    });
}

export const getUserData = (token) => {
    return makeRequest("/users/me", "GET", null, token);
}


/*
export const BASE_URL = 'https://auth.nomoreparties.co';

export const register = (password, email) => {
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ password, email })
    })
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(`ошибка, код ${response.status}`)
        })


};
export const authorize = (password, email) => {
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ password, email })
    })
        .then((response => response.json()))
        .then((data) => {
            console.log(data)
            if (data) {
                localStorage.setItem('jwt', data.jwt);
                return data;
            }
        })
        .catch(err => console.log(err))
};
*/