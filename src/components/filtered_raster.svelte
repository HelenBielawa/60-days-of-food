<script>
  import { fcumsum, image, packSiblings } from "d3";
    import Tooltip from "./Tooltip.svelte";
    import 'lazysizes';

    export let data;
    $: width = 1000;
    $: height = 400;

    const margin = {top: 20, right:20, left:20, bottom:20};
  
    $: innerWidth = width - margin.left - margin.right;
    $: innerHeight = height - margin.top - margin.bottom;

    $: mouseX = 0;
    $: mouseY = 0;

    function handleMouseMove(event) {
      mouseX = event.clientX;
      mouseY = event.clientY;
    }
 
    $: filters = {};
    $: console.log("Filters: ", filters);
    $: console.log("detected cats: ", Object.keys(filters));

    let categories = [{"name": "Category", "values": ["breakfast", "lunch","dinner", "snack"]},
                      {"name": "With_whom", "values": ["boyfriend", "family", "friends", "colleague/s", "alone"]},
                      {"name": "Processing", "values": ["selfmade", "restaurant", "delivered"] },
                      {"name": "Diet", "values": ["vegetarian", "vegan"]}];

    const selectFilter = (category, value) => {
      filters[category] = filters[category] || [];
      const index = filters[category].indexOf(value);
      if (index >= 0) {
        filters[category].splice(index, 1);
      } else {
        filters[category].push(value);
      }
    }

    function checkFilter(meal, filters){
      for (const category in filters) {
        console.log("filtering for cat: ", category)
        if (filters[category].length > 0
            && !filters[category].some(value => meal[category] == value)) {
          return false;

        }
      }
      return true;
    }

    $: checkedData = data.map(meal => {meal.checked = checkFilter(meal, filters); return meal});

    let hoveredData;
   
  </script>

    {#each categories as {name, values}}
    <div class="filterBar">
      <h3>{name}</h3>
      {#each values as value}
          <label>
          <input 
            type="checkbox" 
            on:change={() => selectFilter(name, value)}
          />
          {value}
        </label>
      {/each}
        </div>
    {/each}

    <div
    class="cellwrapper">
    {#each checkedData as meal}
      <div class="cell"
      on:mouseover={() => {hoveredData = meal}}
      on:focus={() => {hoveredData = meal}}
      on:mousemove={handleMouseMove}
      on:mouseleave={() => {hoveredData = null}}
      >

      <img 
        src={'../src/data/img/' + meal.id + '_1.jpg'? '../src/data/img/' + meal.id + '_1.jpg' : '../src/data/img/' + meal.id + '_2.jpg'}
        alt="meal"
        style="opacity: {meal.checked? "1" : "0.4"};
        filter:saturate({ meal.checked? '1' : '50%'})"
        />

      </div>
    {/each}

  
    {#if hoveredData}
      <Tooltip data={hoveredData} x={mouseX} y={mouseY}/>
    {/if}
  
  </div>  


  <style>
    .filterBar {
        display: inline-block;
        vertical-align: top;
        margin-right: 20px;
    }
    .cell{
      /*inline block displays it next to prev div*/
      display: inline-block;
      width: 3rem;
      height: 3rem;
      background-color: #D81E5B;
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      margin: 1px;
      padding:0;
      border-radius:50%;
    }
    .cellwrapper{
      position:relative;
      display: flex;
      flex-wrap: wrap;
      max-width: 90%;
      margin: 0 auto;
    }
    img{
      width: 50px;
      height: 50px;
      object-fit: cover;
      background-position: 50% 50%;
      display: inline-block;
      border-radius:50%;
    }
    @media (min-width: 420px){
      .cell {
        width: 30px;
        height:30px;
      }
      img{
        width: 30px;
        height: 30px;
      }
    }
    @media (min-width: 768px){
      .cell {
        width: 60px;
        height: 60px;
      }
      img{
        width: 60px;
        height: 60px;
      }
    }
  </style>