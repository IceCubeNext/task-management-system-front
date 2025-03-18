import CustomStore from "devextreme/data/custom_store";
import {host} from "@/api-config";
import api from "@/services/api";
import EventBus from "@/common/EventBus";

export const tasksStore = new CustomStore({
    key: "id",
    load: () => {
        return api.get(host.tasks, {})
            .then(response => {
                return response.data
            }).catch(error => {
                if (error.response && error.response.status === 403) {
                    EventBus.dispatch("logout");
                }
            })
    },
    insert: (item) => {
        return api.post(host.tasks, item, {})
            .then(response => {
                return response.data;
            }).catch(error => {
                if (error.response && error.response.status === 403) {
                    EventBus.dispatch("logout");
                }
            })
    },
    update: (id, item) => {
        return api.patch(host.tasks + '/' + id, item, {})
            .then(response => {
                return response.data;
            }).catch(error => {
                if (error.response && error.response.status === 403) {
                    EventBus.dispatch("logout");
                }
            })
    },
    remove: (id) => {
        return api.delete(host.tasks + '/' + id, {})
            .then(response => {
                return response.data;
            }).catch(error => {
                if (error.response && error.response.status === 403) {
                    EventBus.dispatch("logout");
                }
            })
    },
    byKey: (key) => {
        return api.get(host.users + '/' + `${key}`, {})
            .then(response => {
                return response.data
            }).catch(error => {
                if (error.response && error.response.status === 403) {
                    EventBus.dispatch("logout");
                }
            })
    },
})