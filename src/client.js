import * as sapper from '@sapper/app';
import {user, friends, posts, chats, invitations} from './data.js'

sapper.start({
    target: document.querySelector('#sapper')
});


async function getUserData() {
    if (!localStorage.jwt) {
        if (window.location.pathname !== '/login') window.location = '/login';
        return
    }
    const response = await fetch("/api/user", {
        method: "POST",
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
        avatar: "/upload/avatars/" + data.avatar,
        username: data.username,
        email: data.email
    };

    let postsDataInit = [];
    let chatDataInit = [];
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
                avatar: "/upload/avatars/" + data.avatar,
                username: data.username
            },
            message: post.message,
            liked_by: post.liked_by,
            date: new Date(post.date),
        }]
    });

    data.friends.forEach(friend => {
        friendsDataInit = [...friendsDataInit, {
            id: friend._id,
            firstName: friend.firstName,
            lastName: friend.lastName,
            status: friend.status,
            avatar: "/upload/avatars/" + friend.avatar,
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
                    avatar: "/upload/avatars/" + friend.avatar,
                    username: friend.username
                },
                message: post.message,
                liked_by: post.liked_by,
                date: new Date(post.date),
            }]
        });
        const messages = [];
        friend.messages.forEach(message => {
            messages.push({
                id: message._id,
                message: message.message,
                date: new Date(message.date),
                read: message.read,
                by_me: message.by_me
            });
        });
        chatDataInit = [...chatDataInit, {
            user: {
                id: friend._id,
                firstName: friend.firstName,
                lastName: friend.lastName,
                status: friend.status,
                avatar: "/upload/avatars/" + friend.avatar,
                username: friend.username
            },
            messages: messages
        }];
    });

    data.invitations.forEach(invite => {
        invitationsDataInit = [...invitationsDataInit, {
            id: invite._id,
            firstName: invite.firstName,
            lastName: invite.lastName,
            username: invite.username,
            avatar: "/upload/avatars/" + invite.avatar,
        }];
    });

    user.set(userDataInit);
    friends.set(friendsDataInit);
    chats.set(chatDataInit);
    invitations.set(invitationsDataInit);
    posts.set(postsDataInit);
}

getUserData();

setInterval( ()=> {
    getUserData();
}, 60000);
