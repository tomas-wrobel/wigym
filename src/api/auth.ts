import {useEffect, useState} from "react";

export let token = '';

const target = new EventTarget();
const event = new Event('token-changed');

async function login(username: string, password: string) {
    const response = await fetch(
        "https://wigym.bakalari.cz/api/login",
        {
            method: "POST",
            body: new URLSearchParams({
                "client_id": "ANDR",
                "grant_type": "password",
                "username": username,
                "password": password
            }),
        }
    );
    const data = await response.json();
    if (data.access_token) {
        token = data.access_token;
        target.dispatchEvent(event);
    } else if (data.error_description) {
        throw new Error(data.error_description);
    } else {
        throw new Error("Unknown error");
    }
}

export async function signIn(username: string, password: string) {
    await login(username, password);
    localStorage.setItem("username", username);
    localStorage.setItem("password", password);
}

export async function load() {
    const username = localStorage.getItem("username");
    const password = localStorage.getItem("password");
    if (username && password) {
        await login(username, password);
    }
}

export function signOut() {
    localStorage.removeItem("username");
    localStorage.removeItem("password");
    token = '';
    target.dispatchEvent(event);
}

export function useLoggedIn() {
    const [loggedIn, setLoggedIn] = useState(!!token);

    useEffect(() => {
        const listener = () => setLoggedIn(!!token);
        target.addEventListener('token-changed', listener);
        return () => target.removeEventListener('token-changed', listener);
    });

    return loggedIn;
}