import {writable} from "svelte/store/index"


export let user = writable(
    {
        "id": 1,
        "firstName": "First name",
        "lastName": "Last name",
        "avatar": "avatar.png",
        "username": "username",
        "status": true,
        "email": "a@a.com",
        "invitations": ""
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

export let invitations = writable(
    [
        {
            "id": 1,
            "firstName": "First name",
            "lastName": "Last name",
            "avatar": "avatar.png",
            "username": "username",
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

export let chats = writable(
    [
        {
            "user": {
                "id": 1,
                "firstName": "First name",
                "lastName": "Last name",
                "avatar": "avatar.png",
                "username": "username",
                "status": true,
            },
            "messages": [
                {
                    "id": 21,
                    "message": "",
                    "date": "",
                    "read": false,
                    "by_me": false
                }
            ],
        }
    ]
);

export let activeChats = writable([]);
