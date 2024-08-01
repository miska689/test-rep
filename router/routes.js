const url = "http://localhost:6000/"

export default [
    {
        route: "/appointment",
        target: url + "api/appointment"
    },
    {
        route: "/service",
        target: url + "api/service"
    },
    {
        route: "/login",
        target: url + "api/login"
    },
    {
        route: "/register",
        target: url + "api/register"
    },
    {
        route: "/auth",
        target: url + "api/auth"
    },
    {
        route: "/delete-user",
        target: url + "api/delete-user"
    },
    {
        route: "/get-user",
        target: url + "api/get-user"
    }
]