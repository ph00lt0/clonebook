<script>
    import io from "socket.io-client";
    import {user, posts} from './data.js';

    const socket = io();
    setTimeout(function(){
        socket.emit('register', $user.id);
    }, 1000);

    socket.on('disconnect', () => {
        socket.emit('disconnect');
    });
</script>
