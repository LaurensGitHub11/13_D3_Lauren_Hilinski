// declare svg and chart parameters
var svgWidth = 700;
var svgHeight = 500;

var margin = {
  top: 30,
  right: 40,
  bottom: 80,
  left: 60
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

//create svg wrapper and give it a group with the margins
var $svg = d3
  .select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var chartGroup = $svg
  .append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// initial parameters
var chosenXAxis = "poverty";
var chosenYAxis = "healthCare";

// import data and execute the following
d3.csv("assets/data/data.csv").then(function(healthData){
  console.log(healthData);

  // coerce numerical data into floats
  healthData.forEach(function(data) {
    data.healthcare = +data.healthcare;
    data.poverty = +data.poverty;
    });

  // create scale functions
  var xPovertyLinScale = d3
    .scaleLinear()
    .domain(d3.extent(healthData, d => d.poverty))
    .range([0,width]);

  var yHealthcareLinScale = d3
    .scaleLinear()
    .domain(d3.extent(healthData, d => d.healthcare))
    .range([height,0]);

  // create axis functions
  var xAxis = d3.axisBottom(xPovertyLinScale);
  var yAxis = d3.axisLeft(yHealthcareLinScale);

  // append axes to the chart
  chartGroup
    .append("g")
    .attr("transform", `translate(0, ${height})`)
    .call (xAxis);

  chartGroup
    .append("g")
    .call(yAxis);

  // create circles
  var $circlesGroup = chartGroup
    .selectAll("circle")
    .data(healthData)
    .enter()
    .append("circle")
    .attr("cx", d => xPovertyLinScale(d.poverty))
    .attr("cy", d => yHealthcareLinScale(d.healthcare))
    .attr("r", "12")
    .attr("fill", "green")
    .attr("opacity", "0.6");
    //.classed("circle-data", true)

  // create circle's text
  var $circlesText = chartGroup
    .selectAll("text.circle-text")
    .data(healthData)
    .enter()
    .append("text")
    .classed("circle-text", true)
    .text(d => d.abbr)
    .attr("fill", "white")
    .attr("font-size", "10px")
    .attr("x", d => xPovertyLinScale(d.poverty)-6)
    .attr("y", d => yHealthcareLinScale(d.healthcare)+3);

  // add axis titles
  chartGroup
    .append("text")
    .attr("transform", `translate(${width / 2}, ${height + margin.top + 18})`)
    .attr("text-anchor", "middle")
    .attr("font-size", "18px")
    .attr("fill", "black")
    .text("% In Poverty");

  chartGroup
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left + 25)
    .attr("x", 0 - (height * .65))
    .attr("font-size", "18px")
    .attr("fill", "black")
    .text("% Lacks Healthcare");

});






// ATTEMPT TO MAKE RESPONSIVE
// function makeResponsive() {

//   // if the SVG area isn't empty when the browser loads,
//   // remove it and replace it with a resized version of the chart
// var svgArea = d3.select("body").select("svg");

// if (!svgArea.empty()) {
//   svgArea.remove();
// }

//   // svg params
// var svgHeight = window.innerHeight;
// var svgWidth = window.innerWidth;

//   // margins
// var margin = {
//   top: 50,
//   right: 50,
//   bottom: 50,
//   left: 50
// };
// 
// d3.select(window).on("resize", makeResponsive);
