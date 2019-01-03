<template>
    <form method="get">
        <v-select v-model="value" v-bind:options="options"></v-select>
        <input type="hidden" name="name" v-bind:value="value" />
    </form>
</template>

<script lang="ts">
    import vSelect from 'vue-select'

    export default {
        components: {
            'v-select': vSelect
        },
        props: [
            "name",
        ],
        data: function () {
            return {
                value: null,
                options: [],
            };
        },
        mounted: function (): void {
            fetch("https://zaubermaerchen.info/imas_cg/api/idol_name/list/", {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                },
                mode: "cors",
                credentials: "omit"
            }).then((response) => {
                return response.json();
            }).then((json) => {
                this.options = json.names;
                this.value = this.name;
            })
        },
        watch: {
            name: {
                handler(val: string) {
                    this.value = val;
                }
            },
            value: {
                handler(val: string) {
                    this.$emit("change", val);
                }
            }
        }
    }
</script>

<style scoped>
</style>