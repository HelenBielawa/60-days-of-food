<script>
    import { scaleTime, scaleLinear } from "d3-scale";
    import { line, curveStep } from 'd3';
    import { max, extent } from "d3-array";
    import AxisX from "./AxisX.svelte";
    import AxisY from "./AxisY.svelte";
    import Tooltip from "./Tooltip.svelte";

    export let data;

    console.log(typeof(data[5].HungryTime));
  
    $: width = 400;
    $: height  = 400;
    const margin = {top: 20, right:40, left:20, bottom:20};
    $: innerWidth = width - margin.left - margin.right;
    $: innerHeight = height - margin.top - margin.bottom;

    $: mouseX = 0;
    $: mouseY = 0;

    function handleMouseMove(event) {
      mouseX = event.clientX;
      mouseY = event.clientY;
    }
  
    $: xScale = scaleLinear()
    .domain(extent(data, d => +d.id))
    .range([0, innerWidth])
  
    $: yScale = scaleTime()
    //.domain([new Date("2023-02-04T00:00:00"), max(data, d => Date.parse("2023-02-04T" + d.HungryTime))])
    .domain([new Date("2023-02-04T00:00:00"), new Date("2023-02-04T16:00:00")])
    .range([innerHeight, 0])

    $: path = line()
        .x((d) => xScale(d.id))
        .y((d) => yScale(Date.parse("2023-02-04T" + d.HungryTime)))
        .curve(curveStep)(data);
  
    let hoveredData;

    const radius = 5;
 
  </script>
  
  <!-- binding chart size to screensize of client-->
  <div class="chart-container"
      bind:clientWidth={width}
      on:mouseleave={() => {hoveredData = null}}
      on:blur={() => {hoveredData = null}}
      on:mousemove={handleMouseMove}
      >
  
    <svg width={width} height={height}>
      <g transform="translate({margin.left} {margin.top})">
  
      <AxisX height={innerHeight} width={innerWidth}
        xScale={xScale}
        xTicks = {[0, 50, 100, 150, 200, 250]}
        horizontalLines = {false}
        axisXTitle="ID of the meal"/>
      <AxisY height={innerHeight}
        width={innerWidth}
        {yScale}
        yTicks={["00", "02", "04", "06", "08", "10", "12", "14", "16"]}
        axisYText = " hours passed since the previous meal"/>
        
        <path 
            d="{path}"
            fill="none"
            stroke="#D81E5B"
            stroke-width="2px"
            opacity=0.3
        />
        </g>
      <!--create a group for the circles and transform-translate it to adapt to margin-->
      <g class="cirlces" transform="translate({margin.left} {margin.top})">

      
      {#each data.sort((a, b) => a.id - b.id) as meal}
      <circle cx={xScale(meal.id)}
              cy={yScale(Date.parse("2023-02-04T" + meal.HungryTime))}
              r={meal.Category == "snack" ? radius/2 : radius}
              opacity={hoveredData ? hoveredData == meal ? "1" : ".3" :"1"}
              fill = {meal.Category == "breakfast" ? "#E97CA0" : meal.Category == "dinner" ? "#7B1C3B" : "#D81E5B"}
              stroke = white
              stroke-width = {meal.Processing == "selfmade" ? 1 : 0}
              on:mouseover={() => {hoveredData = meal}}
              on:mouseleave={hoveredData = null}
              on:focus={() => {hoveredData = meal}}
              tabIndex="0"
              />
      {/each}
  
      </g>
    </svg>
  
     {#if hoveredData}
      <Tooltip data={hoveredData} x={mouseX} y= {mouseY}/>
     {/if}
  
  </div>
  
  <style>
    circle {
      transition: r 300ms ease, opacity 300ms ease;
      cursor: pointer;
    }
  
    circle:focus{
      outline: none;
    }
  </style>