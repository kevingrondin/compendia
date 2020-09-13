import axios from "axios";
import { apiURL } from "../../util/api";

export default async (req, res) => {
    try {
        await axios({
            method: "post",
            url: `${apiURL}accounts/register`,
            data: {
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                password_confirmation: req.body.passwordConfirm,
            },
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
