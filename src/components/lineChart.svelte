<script>
    import { scaleTime, scaleLinear } from "d3-scale";
    import { line, curveStep } from 'd3';
    import { extent } from "d3-array";
    import AxisX from "./AxisX.svelte";
    import AxisY from "./AxisY.svelte";
    import Tooltip from "./Tooltip.svelte";
    import { onMount } from "svelte";
    export let data;

 
    $: width = 400;
    $: height  = 400;
    const margin = {top: 50, right:40, left:20, bottom:20};
    $: innerWidth = width - margin.left - margin.right;
    $: innerHeight = height - margin.top - margin.bottom;

    $: xScale = scaleLinear()
    .domain(extent(data, d => +d.id))
    .range([0, innerWidth])
  
    $: yScale = scaleTime()
    .domain([new Date("2023-02-04T00:00:00"), new Date("2023-02-04T16:00:00")])
    .range([innerHeight, 0])

    $: path = line()
        .x((d) => xScale(d.id))
        .y((d) => yScale(Date.parse("2023-02-04T" + d.HungryTime)))
        .curve(curveStep)(data);
  
    let hoveredData;
 
    const radius = 5;

    let containerElement;
    let tooltipX;
    let tooltipY;
    onMount(() => {
      containerElement = document.getElementById('linechart-container');
    });

  </script>
  
  <h2>My Food-Timing is Very Rhythmic</h2>

  <div class="chart-container" id="linechart-container"
      bind:clientWidth={width}
      on:mouseleave={() => {hoveredData = null}}
      on:blur={() => {hoveredData = null}}
      on:mousemove={event => {
        // Get the mouse position relative to the container element
        const mouseX = event.clientX - containerElement.getBoundingClientRect().left;
        const mouseY = event.clientY - containerElement.getBoundingClientRect().top;
      
        // Set the position of the tooltip to the mouse position
        tooltipX = mouseX;
        tooltipY = mouseY;
      }}
      >
    <svg width={width} height={height}>

        <!--LEGEND-->
        <g transform={`translate(${margin.left}, ${margin.top-30})`}>
          <g>
            <circle cx="0" cy="0" r="{radius}" fill="#E97CA0" />
            <text x="{radius*2}" y="0" dy="0.3em" text-anchor="start">Breakfast</text>
          </g>
          <g transform="translate(120,0)">
            <circle cx="0" cy="0" r="{radius}" fill="#D81E5B" />
            <text x="{radius*2}" y="0" dy="0.3em" text-anchor="start">Lunch</text>
          </g>
          <g transform="translate(220,0)">
            <circle cx="0" cy="0" r="{radius*2/3}" fill="#D81E5B" />
            <text x="{radius*2/3*2}" y="0" dy="0.3em" text-anchor="start">Snack</text>
          </g>
          <g transform="translate(340,0)">
            <circle cx="0" cy="0" r="{radius}" fill="#7B1C3B" />
            <text x="{radius*2}" y="0" dy="0.3em" text-anchor="start">Dinner</text>
          </g>
        </g>

      <g transform="translate({margin.left} {margin.top})">
  
      <AxisX height={innerHeight} width={innerWidth}
        xScale={xScale}
        xTicks = {[0, 50, 100, 150, 200, 250]}
        horizontalLines = {false}
        axisXTitle="ID of the meal"/>
      <AxisY 
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
      <Tooltip data={hoveredData} x={tooltipX} y= {tooltipY}/>
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