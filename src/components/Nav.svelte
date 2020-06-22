<script>
    export let segment;
    import Search from '../components/Search.svelte';
    import Invitations from '../components/Invitations.svelte';
    import {invitations} from '../data.js';

</script>

<style>
    nav {
        font-weight: 300;
        padding: 0 1em;
        position: fixed;
        z-index: 1;
        background: white;
        width: 100vw;
        -webkit-box-shadow: 14px 14px 31px 21px rgba(237, 237, 237, 1);
        -moz-box-shadow: 14px 14px 31px 21px rgba(237, 237, 237, 1);
        box-shadow: 14px 14px 31px 21px rgba(237, 237, 237, 1);
    }

    ul {
        margin: 0;
        padding: 0;
    }

    /* clearfix */
    ul::after {
        content: '';
        display: block;
        clear: both;
    }

    svg {
        padding-top: 0.5em;
        display: inline-block;
        padding-right: 1em;
    }

    li {
        display: block;
        float: left;
    }

    [aria-current] {
        position: relative;
        display: inline-block;
    }

    [aria-current]::after {
        position: absolute;
        content: '';
        width: calc(100% - 1em);
        height: 2px;
        background-color: blue;
        display: block;
        bottom: -1px;
    }

    a {
        text-decoration: none;
        padding: 1em 0.5em;
        display: block;
    }

    h2 {
        text-decoration: none;
        padding-top: 0.5em;
        padding-right: 1em;
        display: inline-block;
    }

    .space {
        height: 100px;
    }
</style>

<nav>
    <ul>
        <li>
            <svg width="40" height="40" viewBox="0 0 1047 1039" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M650.011 1031.61C878.011 975.029 1047 768.999 1047 523.5C1047 234.379 812.621 0 523.5 0C234.379 0 0 234.379 0 523.5C0 779.573 183.859 992.702 426.768 1038.08C299.161 988.66 213 844.182 213 625.5C213 350.685 350.592 194 530.828 194C688.742 194 808.01 305.567 827 499.577H681.079C670.085 407.289 613.116 351.095 534.159 351.095C428.55 351.095 359.254 450.767 359.254 625.5C359.254 805.155 429.549 899.905 533.16 899.905C610.118 899.905 667.42 848.223 681.079 758.396L827 759.216C815.306 874.701 753.442 983.781 650.011 1031.61Z"
                      fill="url(#paint0_linear)"/>
                <defs>
                    <linearGradient id="paint0_linear" x1="523.5" y1="0" x2="523.5" y2="1047"
                                    gradientUnits="userSpaceOnUse">
                        <stop stop-color="#3BAAFD"/>
                        <stop offset="0.307292" stop-color="#3493F3"/>
                        <stop offset="0.635417" stop-color="#2C79E8"/>
                        <stop offset="1" stop-color="#154486"/>
                    </linearGradient>
                </defs>
            </svg>
        </li>
        <li>
            <Search {segment}/>
        </li>
        <li><a aria-current='{segment === undefined ? "page" : undefined}' href='.'>Home</a></li>
        <li><a rel=prefetch aria-current='{segment === "profile" ? "page" : undefined}' href='profile/me'>
            Profile</a></li>
        <li>
            <Invitations {segment} invitations="{$invitations}"/>
        </li>
        <li><a rel=prefetch aria-current='{segment === "login" ? "page" : undefined}' href='login'>Login</a></li>
    </ul>
</nav>
<div class="space"></div>
