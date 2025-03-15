import CustomStore from "devextreme/data/custom_store";
import {host} from "@/api-config";
import api from "@/services/api";
import EventBus from "@/common/EventBus";

export const usersStore = new CustomStore({
    load: () => {
        return api.get(host.users, {}).then(response => {
            return response.data
        }).catch(error => {
            if (error.response && error.response.status === 403) {
                EventBus.dispatch("logout");
            }
        })
    },
    insert: (item) => {
        return api.post(host.users, item, {})
            .then(response => {
                return response.data;
            }).catch(error => {
                if (error.response && error.response.status === 403) {
                    EventBus.dispatch("logout");
                }
            })
    },
    update: (id, item) => {
        return api.patch(host.users + '/' + id, item, {})
            .then(response => {
                return response.data;
            }).catch(error => {
                if (error.response && error.response.status === 403) {
                    EventBus.dispatch("logout");
                }
            })
    },
    remove: (id) => {
        return api.delete(host.users + '/' + id,  {})
            .then(response => {
                return response.data;
            }).catch(error => {
                if (error.response && error.response.status === 403) {
                    EventBus.dispatch("logout");
                }
            })
    }
})