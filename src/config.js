const dev = {
    baseUrl: "http://localhost:4000",
};

const prod = {
    baseUrl: "http://138.68.94.58",
};

const config = process.env.NODE_ENV === "development" ? dev : prod;
export default config;