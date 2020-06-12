import * as sapper from '@sapper/app';
import {user, friends, posts} from './data.js'

sapper.start({
    target: document.querySelector('#sapper')
});


async function getUserData() {
    if (!localStorage.jwt) {
        return
    }
    const response = await fetch("/api/user", {
        headers: {authorization: localStorage.jwt},
    });
    if (response.ok) {
        const result = await response.json();
        console.log(result);
        addWriteableData(result)
    }
}

function addWriteableData(data) {
    let userDataInit = {
        id: data._id,
        name: data.name,
        username: data.username
    };

    let postsDataInit = [];
    let friendsDataInit = [];


    data.posts.forEach(post => {
        postsDataInit = [...postsDataInit, {
            id: post._id,
            user: {
                id: data._id,
                name: data.name,
                username: data.username
            },
            message: post.message,
            date: post.date
        }]
    });

    data.friends.forEach(friend => {
        friendsDataInit = [...friendsDataInit, {
            id: friend._id,
            name: friend.name,
            username: friend.username,
        }];
        // add friend posts to ajAllPostsTempInit
        friend.posts.forEach(post => {
            postsDataInit = [...postsDataInit, {
                id: post._id,
                user: {
                    id: data._id,
                    name: data.name,
                    username: data.username
                },
                message: post.message,
                date: post.date
            }]
        });
    });

    user.set(userDataInit);
    friends.set(friendsDataInit);
    posts.set(postsDataInit);
}

getUserData();
