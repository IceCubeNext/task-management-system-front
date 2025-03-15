import api from './api';
import {host} from "@/api-config";

class TaskService {
    getTasks() {
        return api.get(host.tasks);
    }

}

export default new TaskService();