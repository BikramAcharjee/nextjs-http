// mod.cjs
const fetch = (...args) => import("node-fetch").then(({ default: fetch }) => fetch(...args));

function SNEDRESPONSE(status, isLoading, data, error) {
    return {
        status,
        isLoading,
        data,
        error,
    };
}
async function GetRequest(url, headers) {
    if (url === undefined || url === null) return SNEDRESPONSE(400, false, null, "Please enter a url first !");

    return await SENDREQUEST("GET", url, null, headers);
}

async function PostRequest(url, data, headers) {
    if (url === undefined || url === null) return SNEDRESPONSE(400, false, null, "Please enter a url first !");

    return await SENDREQUEST("POST", url, data, headers);
}

async function DeleteRequest(url, headers = {}) {
    if (url === undefined || url === null) return SNEDRESPONSE(400, false, null, "Please enter a url first !");

    return await SENDREQUEST("DELETE", url, null, headers);
}

async function PutRequest(url, data, headers) {
    if (url === undefined || url === null) return SNEDRESPONSE(400, false, null, "Please enter a url first !");

    return await SENDREQUEST("PUT", url, data, headers);
}

async function SENDREQUEST(type, url, data, headers = {}) {
    headers["Content-Type"] = "application/json";
    try {
        const response = await fetch(url, {
            method: type,
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers,
            redirect: "follow",
            referrerPolicy: "no-referrer",
            body: data ? JSON.stringify(data) : null,
        });
        var responsedata = await response.json();

        if (type === "DELETE") responsedata = { message: "Delete success !" };

        if (response.status < 599 && response.status > 399) return SNEDRESPONSE(response.status, false, null, responsedata);

        return SNEDRESPONSE(response.status, false, responsedata, null);
    } catch (error) {
        return SNEDRESPONSE(500, false, null, error);
    }
}

module.exports = {
    GetRequest,
    PostRequest,
    DeleteRequest,
    PutRequest,
};
