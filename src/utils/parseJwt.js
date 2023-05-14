const parseJwt = (token) => {
    let payload = token.substring(token.indexOf(".") + 1, token.lastIndexOf("."));
    return JSON.parse(atob(payload));
};

export default parseJwt;