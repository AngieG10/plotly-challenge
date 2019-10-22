function buildMetadata(sample) {
   
    d3.json(`/metadata/${sample}`).then(data => {
    
        var metadataPanel = d3.select('#sample-metadata')
        metadataPanel.html("");
        
        Object.entries(data).forEach(([key,value]) =>{
            newInfo = metadataPanel.append("p").text(`${key}: ${value}`);            
            });
    
    var gdData = [gdTrace];
    
    var layout = {
        width:500,
        height: 500,
        margin: {t:0, b:0}
    };
        
    Plotly.newPlot('gauge', gdData, layout);
    
    });


    
};
// Charts

function buildCharts(sample) {

    d3.json(`/samples/${sample}`).then(data =>{        
        var trace = {
            labels: data['otu_ids'].slice(0,10),
            values: data['sample_values'].slice(0,10),
            hovertext: data['otu_labels'].slice(0,10),
            showlegend:true,
            type: 'pie'
        };
        
        var data1 = [trace];
        
        var layout = {
            title:'Top 10 sample values by Otu ID'
        };
        
        Plotly.newPlot('pie',data1, layout);
        var trace = {
            x: data['otu_ids'],
            y: data['sample_values'],
            text: data['otu_labels'],
            mode: 'markers',
            marker:{
                size: data['sample_values'],
                color: data['otu_ids']
            }
        };
        
        var data1 = [trace];
        
        var layout = {
            title:'Otu IDs vs. Sample Values'
        };
        
        Plotly.newPlot('bubble',data1, layout)
        
    });
    
    

};

//////

function init() {
  var selector = d3.select("#selDataset");

  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
};


function optionChanged(newSample) {
  buildCharts(newSample);
  buildMetadata(newSample);
}

/////////////////////// Start Dashboard
init();
