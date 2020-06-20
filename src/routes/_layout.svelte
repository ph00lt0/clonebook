<script>
    import Nav from '../components/Nav.svelte';
    import Aside from '../components/Aside.svelte';

    export let segment;
</script>

<style>
    main {
        position: relative;
        margin: 1em;
    }

    section {
        mzax-width: 56em;
        width: 100%;
        background-color: white;
        margin: 0 auto;
        box-sizing: border-box;
    }

    aside {
        display: none;
    }

    @media screen and (min-width: 700px) {
        main {
            display: grid;
            grid-gap: 2em;
            grid-template-columns: 4fr 1fr;
        }

        aside {
            display: block;
        }
    }
</style>


<Nav {segment}/>

<main>
    <section>
        <slot></slot>
    </section>
    <aside>
        <Aside/>
    </aside>
</main>
