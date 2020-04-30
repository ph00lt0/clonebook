import {writable} from "svelte/store";

export let me = writable({
        "name": "M",
        "lastName": "P",
        "friends": [
            {"id": "5e9edd3636b92723a03e06ef", "name": "A", "lastName": "AA", "status": 1},
            {"id": "5ea15c9ba266660db4ead82c", "name": "B", "lastName": "BB", "status": 1},
            {"id": "5ea15ca5a266660db4ead82d", "name": "C", "lastName": "CC", "status": 1}
        ]
    }
);