import {writable} from "svelte/store/index"

export let user = writable(
    {
        "id": 1,
        "name" : "Name",
        "username": "",
    }
);

export let friends = writable(
    [
        {
            "id": 1,
            "name": "",
            "username": "",
        }
    ]
);

export let posts = writable(
    [
        {
            "id":1,
            "user":{
                "id": 1,
                "name": "",
                "username": "",
            },
            "message": "",
            "date": ""
        }
    ]
);
