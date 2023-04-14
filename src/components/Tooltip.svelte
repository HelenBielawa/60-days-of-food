<script>
    export let data;
    export let x;
    export let y;

</script>

<div class="tooltip" id="tooltip"
    style="position: absolute; left: {x}px; top: {y}px;text-align:left">
    <p>
    <b>{data.Day}</b> <br>
    {#if data.With_whom == "alone"}
    <i>{data.Category} (alone)</i><br>
    {:else}
    <i>{data.Category} with {data.With_whom}</i><br>
    {/if}
    Rating: {data.Enjoyment}/10<br>
    Diet: {data.Diet}<br>
    Source: {data.Processing}<br> </p>
    <img src={"img/" + data.id + "_1.jpg"} width = "70" alt="[missing pic]">
    <img src={"img/" + data.id + "_2.jpg"} width = "70" alt="[missing pic]">
</div>

<style>
    .tooltip{
        padding: 6px;
        position: absolute;
        background: rgba(216, 30, 91, 0.8);
        pointer-events:none;
        transition: top 100ms ease, left 100ms ease;
    }
</style>