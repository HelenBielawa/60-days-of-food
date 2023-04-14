<script>
  import { construct_svelte_component } from "svelte/internal";


    export let width;
    export let yScale;
    export let height;
    export let yTicks;
    export let axisYText;

</script>

<g>
    <g class='tick' transform="translate(0, {yScale(Date.parse("2023-02-04T" + "16" + ":00:00"))})">
    {#each yTicks as tick}
    <text
        x=0
        y={yScale(Date.parse("2023-02-04T" + tick + ":00:00"))}
        dy="-6">
        {tick == "00" ? " " : tick} {tick == "16" ? axisYText : ""}
    </text>
    <line
        x1="0"
        y1={yScale(Date.parse("2023-02-04T" + tick + ":00:00"))}
        x2={width}
        y2={yScale(Date.parse("2023-02-04T" + tick + ":00:00"))}
        stroke="#cecece"
        opacity=0.3
        color="#F9F8F8"/>

    {/each}
    </g>
</g>

<style>
    text{
        fill:#F9F8F8;
    }
</style>

