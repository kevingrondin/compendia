import axios from "axios";
import { apiURL } from "../../util/api";

export default async (req, res) => {
    try {
        await axios({
            method: "post",
            url: `${apiURL}accounts/login`,
            data: { username: req.body.email, password: req.body.password },
        })
            .then((response) => {
                res.statusCode = response.status;
                res.json(response.data);
            })
            .catch((e) => {
                //TODO handle error
                console.log(e);
            });
    } catch (e) {
        //TODO handle error
        console.log(e);
    }
};
