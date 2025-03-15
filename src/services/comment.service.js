import api from './api';
import {host} from "@/api-config";

class CommentService {
    getComments() {
        return api.get(host.comments);
    }

}

export default new CommentService();