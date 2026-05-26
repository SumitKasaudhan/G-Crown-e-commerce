import jwtTokenCreater from "./jwt.js";
import cookies from "./cookie.js";

const cookiesForUser = async (res, user) => {
    const { accessToken, refreshToken } = await jwtTokenCreater(user);

    cookies(res, "AccessToken", accessToken, 24 * 60 * 60 * 1000);
    cookies(res, "RefreshToken", refreshToken, 30 * 24 * 60 * 60 * 1000);
}

export default cookiesForUser;