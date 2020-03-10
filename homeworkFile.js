//Create a funtion that will plot the chart 
//Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.

//What is the basic function format? 
//function name (){
    //detailed function steps
//}

//function PlotTheChart() {

//}

//Filtering you json data
function buildTheData(sample) {
    d3.json("samples.json").then((data) => {
      var metadata = data.metadata;
      // Filter the data for the object with the desired sample number
      var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
      var result = resultArray[0];
      // Use d3 to select the panel with id of `#sample-metadata`
      var PANEL = d3.select("#sample-metadata");
  
      // Use `.html("") to clear any existing metadata
      PANEL.html("");
  
      // Use `Object.entries` to add each key and value pair to the panel
      // Hint: Inside the loop, you will need to use d3 to append new
      // tags for each key-value in the metadata.

      //Adding the keys panel inside an h6 tag
      Object.entries(result).forEach(([key, value]) => {
        PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
      });
  
 
    });
  }


  //Step 2: Build the Chart
          //utilize sample as a paramater 
          //build a bubble chart
          
function chartCreation(sample) {
      d3.json("samples.json").then((data) => {
          var bubblesample = data.samples;
          var bubbleArray = bubblesample.filter(sampleObj => sampleObj.id == sample);
          var bubbleresults = bubbleArray[0];



          //Create 3 variables : otu_ids, otu_labels, sample_values
          //give each variable the value of bubbleresults . the var name
          var otu_ids = bubbleresults.otu_ids;
          var otu_labels = bubbleresults.otu_labels;
          var sample_values = bubbleresults.sample_values;

          //Create an object that will hold the layout of the bubble chart
          //Then layout should include a title, margins, hovermode, xaxis
          var bubblechart = {
            title: "Bacteria Samples",
            margin: {t: 0},
            hovermode: "closest",
            xaxis: {title: "OTU ID"},
            margin: {t: 30}
          };

       //What is an objct array 
          //Multiple objects in an array 
              //Example: 
              //Creating a variable - you utilize [ ] to indicate an array
              //{curly brackets} to indicate an object 
             // var pets = [
               // {
                 // dog: 'Grandad',
                  //dog1: 'Bella'
                    //    },
                // {
                //   kid: 'Bot Bot',
                //   kid2: 'dogs',
                //   home: {
                //     city: 'atlanta',
                //     state: 'Georgia'
                //   }
                // }
              //];
 //Create an object array that will showcase the chart data (the data tha will go within the bubble chart)
        //Object 1 should contain x, y, text, mode, and marker
        //Obect 2 should be an extension on marker
        //The marker object should showcase the following variables: size, color, colorscale
          var bubbledata = [
            {
              //The x axis will hold the id
              x: otu_ids,
              //the y axis will hold the samples value
              y: sample_values,
              //the text will utilize the label variable to label the data
              text: otu_labels,

              mode: "markers",
              marker: {
                size: sample_values,
                color: otu_ids,
                colorscale: "Electric"
              }  
            }
          ];



          //Here we will utilize Plotly
      //utilizethe .newPlot()
      //specify the type of chart (bubble) along with the paramaters (variables) you would like to utilize

     
      Plotly.newPlot("bubble", bubbledata, bubblechart);
       //Construct 2 variables 
      var yticks = otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse();
      var barData = [
        {
          y: yticks,
          x: sample_values.slice(0, 10).reverse(),
          text: otu_labels.slice(0, 10).reverse(),
          type: "bar",
          orientation: "h",
        }
      ];
      var barLayout = {
        title: "Top 10 Bacteria Cultures Found",
        margin: { t: 30, l: 150 }
      };
      Plotly.newPlot("bar", barData, barLayout);




      }
 
      )

}

  //Step 3: Build function that will initiate the dropdown (dashboard)
function initDashboard() {
  // create a variable that will hold tje dropdown ref
var theDropDown = d3.select('#selDataset');

//generate teh option from the file
d3.json("samples.json").then((data)=> {

  //Grabbing the name from the json and placing it within a reuseable variable 
  var dataNames = data.names;

  //Creating a forEach () tp itterate through the names (dataNames)
    //then filter through and grab all of the sample values
dataNames.forEach((sample) => {
  //once gathered -call the dropdown element and
  theDropDown
      //then append data 
      .append('option')
      .text(sample)
      .property("value", sample);
});

  //build initial plots utilizing the first sample 
  var sampleOne = dataNames[0];
  //after grabbing the first index item charts adn metadata will be built
  chartCreation(sampleOne);
  buildTheData(sampleOne);
})
}
  // Step 4: Build funtion that recognizes new selection 

  //To allow variety 
  function Variety (varietySample){
    //this will obtai new data each time a new one is selected
    chartCreation(varietySample);
    buildTheData(varietySample);
  }

  initDashboard();