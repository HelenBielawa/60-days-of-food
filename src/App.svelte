<script>
  import data from "./data/foodData.json";
  import Beeswarm from "./components/Beeswarm.svelte";
  import LineChart from "./components/lineChart.svelte";
  import FilteredRaster from "./components/filtered_raster.svelte";
  import { LayerCake } from 'layercake';
  import { scaleLinear, scaleOrdinal, scaleBand } from "d3-scale";
  import StartScreen from "./components/startScreen.svelte";

</script>

<div>

<StartScreen {data}/>

</div>

<p>
  For 60 days, I have tracked what I ate. 
  I took a picture of every single meal. I did not miss any tiny bit of snacking. Cheating was not allowed. 
  There were only two times that I missed taking a picture (these were work-related events where I would have been too embarrassed to take a photo of myself with my food). 
  Here you can see all the food that I consumed during 60 days - 285 meals in total which corresponds to almost five meals per day.

  For each meal, I took notes about its type. Most importantly, I rated each meal from zero to 10. Here you can explore and filter all the meals.
</p>

<div class = "chartcontainer" style="width:90%; margin:auto">
  <FilteredRaster {data} />
</div>

<p>
  <br/>
This project was not about weight, health or diet. It was about enjoyment. 
I love food a lot and care much about eating healthy and sustainably. 
With this project I wanted to focus on each meal. 
I rated all the food from zero to ten where zero would be absolutely disgusting and impossible to eat and ten is simply perfect.
</p>
<div class = "chartcontainer" style="width:70%; margin:auto">
  <LayerCake
    {data}
    x='Enjoyment'
    z='Category'
    zScale={scaleBand()}
    zRange={["breakfast", "lunch", "dinner", "snack"]}
    let:width
  >
    <Beeswarm {data}/>
  </LayerCake>

</div>
<p>
At some point during this project I started to recognize my very strict eating routine. My breakfast is almost always at the same time between 7.30 and 8 in the morning. I need lunch a few hours after that, otherwise I am starving. Then, there follows some snack in the afternoon and a dinner (mostly bread) between 6 and 7 in the evening. 
So, I decided to calculate the time that I was NOT eating. I calculated the time difference between all the meals - so there is a long period without food during the night and relatively short periods of time between meals during the day (depending on the amount of snacks).
Here you can see my "rhythm of food" - the time that passed between two meals. The chart starts with the very first meal at the left and the last one at the right.
</p>
<div class = "chartcontainer" style="width:70%; margin:auto">
  <LineChart {data}/>
</div>

<p>
  I hope that you've had fun exploring my data...and maybe you got hungry while watching me eating? 
  And for everyone who followed me while developing this project and is now missing something: The bonus feature of Food-Tinder is still to be developed...stay tuned until it comes out with the next update :)

  This project was part of the <a href="http://www.mastervisualtoolsudg.com/" target="_blank"> Master in Visual Tools To Empower Citizens</a>. It is the final project for the course "Dataviz and Creative Design".
</p>