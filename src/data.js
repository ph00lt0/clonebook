import {writable} from "svelte/store/index"

export let user = writable(
    {
        "id": 1,
        "firstName": "First name",
        "lastName": "Last name",
        "avatar": "avatar.png",
        "username": "username",
        "status": true,
        "email": "a@a.com"
    }
);

export let friends = writable(
    [
        {
            "id": 1,
            "firstName": "First name",
            "lastName": "Last name",
            "avatar": "avatar.png",
            "username": "username",
            "status": true,
        }
    ]
);

export let posts = writable(
    [
        {
            "id": 1,
            "user": {
                "id": 1,
                "firstName": "First name",
                "lastName": "Last name",
                "avatar": "avatar.png",
                "username": "username",
                "status": true,
            },
            "message": "",
            "liked_by": [],
            "date": ""
        }
    ]
);
