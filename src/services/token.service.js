class TokenService {
    getLocalRefreshToken() {
        const user = JSON.parse(localStorage.getItem("user"));
        return user?.refreshToken;
    }

    getLocalAccessToken() {
        const user = JSON.parse(localStorage.getItem("user"));
        return user?.accessToken;
    }

    updateLocalTokens(tokens) {
        let user = JSON.parse(localStorage.getItem("user"));
        user.accessToken = tokens.accessToken;
        user.refreshToken = tokens.refreshToken;
        localStorage.setItem("user", JSON.stringify(user));
    }

    getUser() {
        return JSON.parse(localStorage.getItem("user"));
    }

    setUser(user) {
        localStorage.setItem("user", JSON.stringify(user));
    }

    removeUser() {
        localStorage.removeItem("user");
    }
}

export default new TokenService();