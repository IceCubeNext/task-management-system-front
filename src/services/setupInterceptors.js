import axiosInstance from "@/services/api";
import TokenService from "@/services/token.service";
import {host} from "@/api-config";

const setup = (store) => {
    axiosInstance.interceptors.request.use(
        (config) => {
            const token = TokenService.getLocalAccessToken();
            if (token) {
                config.headers["Authorization"] = 'Bearer ' + token;
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    axiosInstance.interceptors.response.use(
        (res) => {
            return res;
        },
        async (err) => {
            const originalConfig = err.config;

            if (originalConfig.url !== host.auth_path + "/auth/sign-in" && err.response) {
                //Access token was expired
                if (err.response.status === 401 && !originalConfig.retry) {
                    originalConfig.retry = true;
                    try {
                        const rs = await axiosInstance.post(host.auth_path + "/token/refresh", {
                            refreshToken: TokenService.getLocalRefreshToken(),
                        });
                        const tokens = rs.data;
                        store.dispatch('auth/refreshToken', tokens);
                        TokenService.updateLocalTokens(tokens);

                        return axiosInstance(originalConfig);
                    } catch (_error) {
                        return Promise.reject(_error);
                    }
                }
            }
            return Promise.reject(err);
        }
    );
};

export default setup;