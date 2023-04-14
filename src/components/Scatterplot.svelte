<script>
    import data from "../data/foodData.json";
    import { scaleLinear } from "d3-scale";
    import { max } from "d3-array";
    import AxisX from "./AxisX.svelte";
    import AxisY from "./AxisY.svelte";
    import Tooltip from "./Tooltip.svelte";
  
    let width = 400;
    let height = 400;
    const margin = {top: 20, right:40, left:0, bottom:20}
  
    $: xScale = scaleLinear()
    .domain([0,max(data, d => d.id)])
    .range([0, width - margin.left - margin.right])
  
    const yScale = scaleLinear()
    .domain([0,max(data, d => d.Enjoyment)])
    .range([height - margin.top - margin.bottom, 0])
  
    let hoveredData;
 
  </script>
  
  <!-- binding chart size to screensize of client-->
  <div class="chart-container"
      bind:clientWidth={width}
      on:mouseleave={() => {hoveredData = null}}
      on:blur={() => {hoveredData = null}}
      >
  
    
    <svg width={width} height={height}>

  
      <AxisX {height} {width} xScale={xScale} xTicks = {[0, 25, 50, 75, 100]} horizontalLines={false}/>
      <AxisY {height} {width} {margin} yScale={yScale} yTicks={[0, 5, 10]}/>
  
      <!--create a group for the circles and transform-translate it to adapt to margin-->
      <g class="cirlces" transform="translate({margin.left} {margin.top})">
      
      {#each data.sort((a, b) => a.id - b.id) as meal}
      <circle cx={xScale(meal.id)}
              cy={yScale(meal.Enjoyment)}
              r={hoveredData && hoveredData == meal ? "20" : "10"}
              opacity={hoveredData ? hoveredData == meal ? "1" : ".3" :"1"}
              fill="#D81E5B"
              stroke="#FFF05A"
              on:mouseover={() => {hoveredData = meal}}
              on:focus={() => {hoveredData = meal}}
              tabIndex="0"
              />
      {/each}
  
      </g>
    </svg>
  
     {#if hoveredData}
      <Tooltip data={hoveredData} {yScale}/>
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