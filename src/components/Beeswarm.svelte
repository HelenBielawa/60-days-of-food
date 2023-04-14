<script>
    import { forceSimulation, forceX, forceY, forceCollide } from "d3-force";
    import { scaleLinear, scaleOrdinal, scaleBand } from "d3-scale";
    import { mean, rollups } from "d3-array";
    import AxisX from "./AxisX.svelte";
    import AxisY from "./AxisY.svelte";
    import Tooltip from "./Tooltip.svelte";
    import { getContext } from 'svelte';
  import { loop_guard } from "svelte/internal";

    export let data;

    //const { data, xGet, height, zGet } = getContext('LayerCake');
  
    const categories = ["breakfast", "lunch", "dinner", "snack"];
  
    $: width = 400;
    $: height  = 400;
    const margin = {top: 20, right:40, left:0, bottom:20};
    $: innerWidth = width - margin.left - margin.right;
    $: innerHeight = height - margin.top - margin.bottom;

    $: mouseX = 0;
    $: mouseY = 0;

    function handleMouseMove(event) {
      mouseX = event.clientX;
      mouseY = event.clientY;
    }
 
    $: xScale = scaleLinear()
      .domain([0, 10])
      .range([0, innerWidth])
  
    $: yScale = scaleBand()
      .domain(categories) //y value according to the category of data
      .range([innerHeight, 0])
      .paddingOuter(0.5); //free room
  
      const radius = 8;
  
      let simulation = forceSimulation(data);
      let nodes = [];
      simulation.on("tick", () => {
        nodes = simulation.nodes();
      });
  
      $: {
        simulation
          .force(
            "x",
            forceX()
              .x(d => xScale(d.Enjoyment))
              .strength(0.1)
          )
          .force(
            "y",
            forceY()
              .y(d => yScale(d.Category))
              .strength(0.1)
          )
          .force("collide", forceCollide(25).radius(radius))
          .alpha(0.9) // [0, 1] The rate at which the simulation finishes. You should increase this if you want a faster simulation, or decrease it if you want more "movement" in the simulation.
          .alphaDecay(0.0005) // [0, 1] The rate at which the simulation alpha approaches 0. you should decrease this if your bubbles are not completing their transitions between simulation states.
          .restart();
      }
  
      let hoveredData;
  
  </script>
  
  <h2>How are the meals distributed in the range between 0 and 10?</h2>
  
    <div class="chart-container"
      bind:clientWidth={width}
      on:mouseleave={() => {hoveredData = null}}
      on:blur={() => {hoveredData = null}}
      on:mousemove={handleMouseMove}
      >
  
    <svg width={width} {height}>
    <g class="inner-chart" transform="translate({margin.left}, {margin.top})">
  
      <AxisX height={innerHeight}
            width={innerWidth}
            xScale={xScale}
            xTicks ={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
            horizontalLines = {false}
            axisXTitle={"My Food Rating"}/>

      <AxisY height={innerHeight} width={innerWidth} yTicks={["breakfast"]} axisYText={""} yScale={yScale}/>
   
        {#each nodes as node}
          <circle
          cx={node.x}
          cy={node.y}
          r={node.Category == "snack" ? radius/2 : radius}
          opacity={hoveredData ? hoveredData == node ? "1" : ".3" :"1"}
          fill = {node.Category == "breakfast" ? "#E97CA0" : node.Category == "dinner" ? "#7B1C3B" : "#D81E5B"}
          stroke = white
          stroke-width = {node.Processing == "selfmade" ? 1 : 0}
          on:mouseover={() => {hoveredData = node}}
          on:focus={() => {hoveredData = node}}
          tabIndex="0"/>
        {/each}
  
      </g>
  
      <text
      class="axis-title"
      x={width}
      y={height}
      dy="4"
      dominant-baseline="hanging"
      text-anchor="end">
      Enjoyment</text>
  
    </svg>
  
    {#if hoveredData}
      <Tooltip data={hoveredData} x = {mouseX} y = {mouseY}/>
    {/if}
  
  </div>  