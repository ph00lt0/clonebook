import * as sapper from '@sapper/app';
import {user, friends, posts, invitations} from './data.js'

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
        addWriteableData(result)
    }
}

function addWriteableData(data) {
    let userDataInit = {
        id: data._id,
        firstName: data.firstName,
        lastName: data.lastName,
        status: data.status,
        avatar: data.avatar,
        username: data.username,
        email: data.email
    };

    let postsDataInit = [];
    let friendsDataInit = [];
    let invitationsDataInit = [];


    data.posts.forEach(post => {
        postsDataInit = [...postsDataInit, {
            id: post._id,
            user: {
                id: data._id,
                firstName: data.firstName,
                lastName: data.lastName,
                status: data.status,
                avatar: data.avatar,
                username: data.username
            },
            message: post.message,
            liked_by: post.liked_by,
            date: post.date
        }]
    });

    data.friends.forEach(friend => {
        friendsDataInit = [...friendsDataInit, {
            id: friend._id,
            firstName: friend.firstName,
            lastName: friend.lastName,
            status: friend.status,
            avatar: friend.avatar,
            username: friend.username,
        }];
        // add friend posts to ajAllPostsTempInit
        friend.posts.forEach(post => {
            postsDataInit = [...postsDataInit, {
                id: post._id,
                user: {
                    id: friend._id,
                    firstName: friend.firstName,
                    lastName: friend.lastName,
                    status: friend.status,
                    avatar: friend.avatar,
                    username: friend.username
                },
                message: post.message,
                liked_by: post.liked_by,
                date: post.date
            }]
        });
    });

    data.invitations.forEach(invite => {
        invitationsDataInit = [...invitationsDataInit, {
            id: invite._id,
            firstName: invite.firstName,
            lastName: invite.lastName,
            username: invite.username,
            avatar: invite.avatar,
        }];
    });

    user.set(userDataInit);
    friends.set(friendsDataInit);
    invitations.set(invitationsDataInit);
    posts.set(postsDataInit);
}

getUserData();
