class Api {
    constructor(basePath, token) {
        this._basePath = basePath;
        this._token = token;
    }

    _getHeaders() {
        return {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
        };
    }

    _getJson(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    getCards() {
        return fetch(`${this._basePath}/cards`, {
            headers: this._getHeaders(),
        }).then(this._getJson);
    }


    createCard(item) {
        return fetch(`${this._basePath}/cards`, {
            method: "POST",
            headers: this._getHeaders(),
            body: JSON.stringify(item),
        }).then(this._getJson);
    }

    getCurrentUser() {
        return fetch(`${this._basePath}/users/me`, {
            headers: this._getHeaders(),
        }).then(this._getJson);
    }


    setUserInfo(item) {
        return fetch(`${this._basePath}/users/me`, {
            method: 'PATCH',
            headers: this._getHeaders(),
            body: JSON.stringify({
                name: item.name,
                about: item.about
            })
        })
            .then(this._getJson);
    }

    setUserAvatar(avatar) {
        return fetch(`${this._basePath}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._getHeaders(),
            body: JSON.stringify(avatar),
        })
            .then(this._getJson);

    }

    deleteCard(id) {
        return fetch(`${this._basePath}/cards/${id}`, {
            method: "DELETE",
            headers: this._getHeaders(),
        }).then(this._getJson);
    }

    setLike(id) {
        return fetch(`${this._basePath}/cards/${id}/likes`, {
            method: 'PUT',
            headers: this._getHeaders(),
            // body: JSON.stringify(likes),
        }).then(this._getJson);

    }

    deleteLike(id) {
        return fetch(`${this._basePath}/cards/${id}/likes`, {
            method: 'DELETE',
            headers: this._getHeaders(),

        })
            .then(this._getJson);
    }

}

const api = new Api(
<<<<<<< HEAD
    "https://mesto.nomoreparties.co/v1/cohort-61/",
    "8cfb2ade-293c-430d-a1cd-027f0315247f"
=======
    "https://api.mesta.nomoredomains.rocks/"
>>>>>>> 78e0f39415ba2c8f5e15d95de635771c43ca8b04
)

export default api