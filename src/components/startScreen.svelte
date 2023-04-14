<script>
    import { onMount } from 'svelte';
    export let data;
  

    let images = data.flatMap(d => {
    return [
        `img/img_highQual/${d.id}_1.jpg`,
        `img/img_highQual/${d.id}_2.jpg`,
        `img/img_highQual/${d.id}_3.jpg`
    ];
    });
  
    let currentIndex = 0;
  
    function getNextImage() {
      const imagePath = images[currentIndex];
      currentIndex = (currentIndex + 1) % images.length;
      return imagePath;
    }
  
    let currentImage = getNextImage();
  
    onMount(() => {
      setInterval(() => {
        currentImage = getNextImage();
      }, 700);
    });
  </script>
  
  <body>
  <div class="split-screen">
    <div class="left">
      {#if currentImage}
        <img src={currentImage} alt="no pic" />
      {/if}
    </div>
    <div class="right">
      <h1>Eat.<br/>Repeat.</h1>
    </div>
  </div>

</body>
  
<style>
    .split-screen {
      display: flex;
      height: 100vh;
    }
  
    .left {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 50%;
      height: 100vh;
      display: flex;
      overflow: hidden;
      position: absolute;
      top: 0;
      left: 0;
    }
  
    .left img {
      height: 100%;
      width: 100%;
      object-fit: cover;
    }
  
    .right {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        position: relative;
        padding-left: 50vw;
        }
    .right h1 {
      font-size: 7em;
      text-align: center;
      margin-left: auto;
      margin-right: auto;
      color: #D81E5B;
    }
  
    div {
      display: flex;
    }
    /* .right {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #D81E5B;
      background-color: #2A2D34;
      font-size: 4rem;
      font-weight: bold;
      text-align: center;
    } */

  </style>
  