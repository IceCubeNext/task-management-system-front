import {host} from "@/api-config";
import api from "@/services/api";
import TokenService from "@/services/token.service";

const API_URL = host.auth_path + '/auth';

class AuthService {
    logoutMessage;

    login(user) {
        return api
            .post(API_URL + '/sign-in', {
                login: user.login,
                password: user.password,
                userRole: "ROLE_ADMIN"
            })
            .then(response => {
                if (response.data.accessToken) {
                    TokenService.setUser(response.data)
                }
                return response.data;
            })
    }

    logout(user) {
        if (user) {
            api.delete(API_URL + '/logout/' + user.id, {}).then(response => {
                if (response.data.logoutMessage) {
                    console.log(response.data.logoutMessage);
                }
            });
        }
        TokenService.removeUser();
    }

    register(user) {
        return api.post(API_URL + '/sign-up', {
            login: user.login,
            firstName: user.firstName,
            lastName: user.lastName,
            patronymic: user.patronymic,
            password: user.password
        });
    }
}

export default new AuthService();