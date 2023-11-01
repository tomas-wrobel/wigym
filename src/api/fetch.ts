import {token} from "./auth";

function api(path: string, params?: Record<string, string> | "POST") {
    return fetch(
        `https://wigym.bakalari.cz/api/3/${path}${typeof params === "object" ? "?" + new URLSearchParams(params) : ''}`,
        {
            method: params === "POST" ? "POST" : "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }
    ).then(response => response.json());
}

export {api as fetch};