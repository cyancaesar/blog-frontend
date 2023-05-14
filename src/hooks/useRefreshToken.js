import useAuth from "./useAuth";
import { axiosPrivate } from "../api/axios";
import parseJwt from "../utils/parseJwt";

export const useRefreshToken = () => {

    const { setAuth } = useAuth();

    const refresh = async () => {
        let accessToken = undefined; // TODO: review this code
        await axiosPrivate.get("/api/auth/refresh")
            .then((res) => {
                accessToken = res?.data?.message.accessToken;
                setAuth(prev => {
                    let { username: user, role } = parseJwt(accessToken);
                    return { user, role, accessToken };
                });
            }).catch((err) => {
                setAuth({}); // flush auth state
                // navigate("/login", { replace: true });
            });

        return accessToken;
    };

    return refresh;
};