 var countryCode = {};
    var series = [];
  
    function row(d) {
        series.push([countryCode[d.Country_code], d["2050"]]);
    }
  
    function render() {
        var dataset = {};
        // We need to colorize every country based on "numberOfWhatever"
        // colors should be uniq for every value.
        // For this purpose we create palette(using min/max series-value)
        var onlyValues = series.map(function (obj) {
            return obj[1];
        });
        var minValue = Math.min.apply(null, onlyValues),
            maxValue = Math.max.apply(null, onlyValues);

        // create color palette function
        // color can be whatever you wish
        var paletteScale = d3.scale.linear()
            .domain([minValue, maxValue])
            .range(["#FFEFEF", "#3E000F"]); // blue color

        // fill dataset in appropriate format
        series.forEach(function (item) { //
            // item example value ["USA", 70]
            var iso = item[0],
                value = item[1];
            dataset[iso] = {numberOfThings: value, fillColor: paletteScale(value)};
        });

        // render map
        new Datamap({
            element: document.getElementById('container1'),
            projection: 'mercator', // big world map
            // countries don't listed in dataset will be painted with this color
            fills: {defaultFill: '#F5F5F5'},
            data: dataset,
            geographyConfig: {
                borderColor: '#DEDEDE',
                highlightBorderWidth: 2,
                // don't change color on mouse hover
                highlightFillColor: function (geo) {
                    return geo['fillColor'] || '#F5F5F5';
                },
                // only change border
                highlightBorderColor: '#B7B7B7',
                // show desired information in tooltip
                popupTemplate: function (geo, data) {
                    // don't show tooltip if country don't present in dataset
                    if (!data) {
                        return;
                    }
                    // tooltip content
                    return ['<div class="hoverinfo">',
                        '<strong>', geo.properties.name, '</strong>',
                        '<br>Total Dependency Ratio: <strong>', data.numberOfThings, '</strong>',
                        '</div>'].join('');
                }
            }
        });

    }
  
    function countryCodeRow(d) {
        countryCode[d.Numeric_code] = d.Alpha_3_code;
    }
  
    d3.csv("CountryCode.csv", countryCodeRow, {});
    d3.csv("DependencyRatio.csv", row, render);