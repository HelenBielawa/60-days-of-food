<script>
    export let height;
    export let width;
    export let xScale;
    export let xTicks;
    export let horizontalLines;
    export let axisXTitle;

    console.log(xTicks);
</script>

<g>
    {#each xTicks as tick}
    <text
        x={tick == 0 ? xScale(tick)+4 : xScale(tick)}
        y={height}
        dy=6
        dominant-baseline="hanging"
        text-anchor="middle">
        {tick}</text>
        {#if horizontalLines == true}
            <line x1={xScale(tick)} x2={xScale(tick)} y1="0" y2={height} stroke=grey/>
        {/if}
    {/each}
    <text class="axis-title" y={height-3} x={width} text-anchor="end" dominant-baseline="hanging" dy=6>
        {axisXTitle}
    </text>
</g>

<style>
    text{
        fill:#F9F8F8;
    }
</style>