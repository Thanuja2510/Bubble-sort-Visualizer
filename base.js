var var1=document.getElementById('in1').value;
var var2=document.getElementById('in2').value;

var array = var2.split(',');

var data= array.map(function (ele){return  parseInt(ele,10);});

var svg,
  bandScale,
  text,
  maxElement = parseInt(var1,10),
  dataRange = maxElement * 2,
  areaHeight = 250,
  areaWidth = 800,
  time = 300,
  traverseColor = "#ffcaa1",
  smallestColor = "#ab87ff",
  unsortedColor = "#add8e6",
  sortedColor = "#56b4d3",
  isSorting = false,
  isFound = false;

   //function for creating chart
   function createChart(data) {
    svg = d3.select("#chart").append("svg");
  
    bandScale = d3.scaleBand().domain(data).range([0, areaWidth]).padding(0.1);
  
    svg.attr("width", areaWidth/2).attr("height", areaHeight/2);
  
    svg
      .selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", function (d, i) {
        return bandScale(d);
      })
      .attr("y", function (d) {
        return areaHeight - heightScale(d);
      })
      .attr("width", function () {
        return bandScale.bandwidth();
      })
      .attr("height", function (d) {
        return heightScale(d);
      })
      .style("fill", "rgb(173, 216, 230)");
      
    svg
      .selectAll("text")
      .data(data)
      .enter()
      .append("text")
      .text(function (d) {
        return d;
      })
      .attr("x", function (d, i) {
        return bandScale(d) + 10;
      })
      .attr("y", function (d) {
        return areaHeight - 15;
      })
      .style("width", bandScale.bandwidth())
      .style("fill", "black")
      .style("font-size", areaWidth / data.length / 3)
      .style("font-family", "sans-serif")
      .style("z-index", 1);
  }
  
var heightScale = d3
  .scaleLinear()
  .domain([0, d3.max(data)])
  .range([0, areaHeight]);
const SortAlgo = {
  // bubble sort methods to perform bubble sort algorithm
  bubbleSort() {
    // promise for async bubble sort with delay
    const timer = (ms) => new Promise((res) => setTimeout(res, ms));
    // async function for bubble sort
    async function sort(self) {
      var temp;
      for (let i = 0; i < data.length - 1; i++) {
        // If user click on stop button then this function will stop performing here.
        if (self.abort) {
          self.abort = false;
          return;
        }
        // changing initial smallest bar color
        changeBarColor(data[0], smallestColor);
        await timer(time);
        for (j = 0; j < data.length - i - 1; j++) {
          // If user click on stop button then this function will stop performing here.
          if (self.abort) {
            self.abort = false;
            changeBarColor(data[j], unsortedColor);
            return;
          }
          await timer(time);
          changeBarColor(data[j + 1], traverseColor);
          await timer(time);
          if (data[j] > data[j + 1]) {
            temp = data[j];
            data[j] = data[j + 1];
            data[j + 1] = temp;
            changeBarColor(data[j + 1], smallestColor);
            swapBar(data);
            createChart(data);;
            await timer(time);
            
          } else {
            changeBarColor(data[j + 1], smallestColor);
          }
          changeBarColor(data[j], unsortedColor);
        }
        changeBarColor(data[j], sortedColor);
      }
      
    var out1=document.getElementById('o1');
    out1.value=data;
      svg.selectAll("rect").style("fill", "#56b4d3");
      isSorting = false;
      isFound = true;
      togglePlay();
    }
    sort(this);
   
  },
  sortStop() {
    this.abort = true;
    isSorting = false;
  }
};

function stopSorting() {
  const stopSorting = SortAlgo.sortStop.bind(SortAlgo);
  stopSorting();
}
function startSorting() {
  let algo = document.getElementById("get-algo").value;
  if (algo == "bubble-sort") {
    const bubbleSortStarted = SortAlgo.bubbleSort.bind(SortAlgo);
    bubbleSortStarted();
   
  } 
}


document.getElementById("sort").addEventListener("click", function () {
  isSorting = true;
  var1=document.getElementById('in1').value;
var2=document.getElementById('in2').value;
array = var2.split(',');

data= array.map(function (ele){return  parseInt(ele,10);});
createChart(data);
  startSorting();
  togglePlay();
});

document.getElementById("stop").addEventListener("click", function () {
  if (isSorting) {
    stopSorting();
    togglePlay();
  }
});

document.getElementById("Reset").addEventListener("click", function () {
  if (isSorting) {
    stopSorting();
    togglePlay();
  }
  if (isFound) {
    isFound = false;
    document.getElementById("sort").classList.remove("none");
  }
  svg.remove();
  document.getElementById("chart").innerHTML = "";
   
  var inp1=document.getElementById('in1');
  inp1.value=5;
  var inp2=document.getElementById('in2');
  inp2.value="1,7,3,9,4";
  array = document.getElementById('in2').value;
  var a= array.split(',');

data= a.map(function (ele){return  parseInt(ele,10);});

var out1=document.getElementById('o1');
out1.value="";
  createChart(data);
 
});


