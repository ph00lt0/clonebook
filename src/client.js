import * as sapper from '@sapper/app';
import {user, friends, posts, chats, invitations} from './data.js'

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
        const messages = [];
        friend.messages.forEach(message => {
            messages.push({
                id: message._id,
                message: message.message,
                date: message.date,
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
                avatar: friend.avatar,
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
            avatar: invite.avatar,
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
}, 10000);
