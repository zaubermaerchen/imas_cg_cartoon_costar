<script lang="ts">
    import { HorizontalBar } from 'vue-chartjs'

    export default {
        name: "chart",
        extends: HorizontalBar,
        props: [
            "name",
        ],
        data: function () {
            return {
                options: {
                    responsive: true,
                    maintainAspectRatio: true,
                    scales: {
                        xAxes: [ {
                            position: "top",
                            ticks: {
                                beginAtZero: true,
                                stepSize: 1,
                            }
                        }]
                    },
                },
            };
        },
        mounted: function (): void {
            this.getData(this.name);
        },
        methods: {
            getData(name: string): void {
                if (name == null) {
                    return;
                }
                const url = new URL("https://zaubermaerchen.info/imas_cg/api/cartoon/costar/" + name + "/");
                fetch(url.href, {
                    method: "GET",
                    headers: {
                        "Accept": "application/json",
                    },
                    mode: "cors",
                    credentials: "omit"
                }).then((response) => {
                    return response.json();
                }).then((json) => {
                    json.sort(function(a, b) {
                        return b["count"] - a["count"];
                    });
                    let label: string[] = [];
                    let data: number[] = [];
                    for(let i = 0; i < json.length; i++) {
                        label.push(json[i]["name"]);
                        data.push(json[i]["count"]);
                    }
                    this.render(label, data);
                })
            },
            render(label: string[], data: number[]): void {
                this.renderChart({
                    labels: label,
                    datasets: [{
                        label: "共演回数",
                        data: data
                    }]
                }, this.options);
            }
        },
        watch: {
            name: {
                handler(val: string) {
                    this.getData(val);
                }
            },
        }
    }
</script>