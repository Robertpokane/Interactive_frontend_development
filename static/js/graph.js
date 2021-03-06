queue()
    .defer(d3.csv, "data/oec.csv")
    .await(makeGraphs);

function makeGraphs(error, planetData) {
    var ndx = crossfilter(planetData);

    discoveryYear(ndx);
    discoveryMethod(ndx);
    show_planetSelecor(ndx);
    show_listPlanetIsOn(ndx);
    countChart(ndx);
 


    dc.renderAll();


}

function discoveryYear(ndx) {
    var dim = ndx.dimension(dc.pluck('DiscoveryYear'));
    var group = dim.group();

    dc.barChart("#discoveryYear")
        .width(1000)
        .height(300)
        .margins({ top: 10, right: 50, bottom: 30, left: 50 })
        .dimension(dim)
        .group(group)
        .transitionDuration(500)
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .elasticY(true)
        .xAxisLabel("Discovery Year")
        .yAxisLabel("Number of Records");
        
        
}


function discoveryMethod(ndx) {
    var dim = ndx.dimension(dc.pluck('DiscoveryMethod'));
    var group = dim.group();

    dc.pieChart("#discoveryMethod")
        .width(500)
        .radius(150)
        .transitionDuration(500)
        .dimension(dim)
        .group(group)
        .legend(dc.legend())

};

function show_planetSelecor(ndx) {
    dim = ndx.dimension(dc.pluck('PlanetIdentifier'));
    group = dim.group()

    dc.selectMenu("#planetSelector")
        .dimension(dim)
        .group(group);


}

function show_listPlanetIsOn(ndx) {
    dim = ndx.dimension(dc.pluck('ListsPlanetIsOn'));
    group = dim.group()

    dc.selectMenu("#listSelector")
        .dimension(dim)
        .group(group);


}

function countChart(ndx) {

    dc.dataCount("#mystats")
        .dimension(ndx)
        .group(ndx.groupAll());
}