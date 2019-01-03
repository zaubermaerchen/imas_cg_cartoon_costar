<template>
    <section>
        <idolselect v-bind:name="name" v-on:change="change"></idolselect>
        <chart v-if="name" v-bind:name="name"></chart>
    </section>
</template>


<script lang="ts">
    import idolselect from './components/select.vue';
    import chart from './components/chart.vue';

    export default {
        components: {
            "idolselect": idolselect,
            "chart": chart,
        },
        data: function () {
            const parameters: URLSearchParams = new URLSearchParams(window.location.search);
            const name: string = parameters.has("name") ? decodeURIComponent(parameters.get("name").replace(/\+/g, " ")) : null;
            return {
                name: name
            };
        },
        methods: {
            change: function(name: string): void {
                this.name = name;
            }
        }
    }
</script>