var offObjs = 4; // object offset (lines delimiting focus area)
var nsrsObjs = 5; // object series (pin, mrk, zpin, zmrk, time)
locfile = "data/localities_latest_more.csv";
psuppfile = "data/supps_present.csv";
xpsfld = 'data/xps_latest/';  
var refmdl_name = "present";

var tot_present_locs = 6404;
var timeDt = [["Early Miocene",23.03,15.2],
              ["Middle Miocene",15.5,11.056],
              ["Early late Miocene",12.049,7.2],
              ["Late Late Miocene",7.6,5.3],
              ["Pliocene",5.333,2.5]]

// {"label": "Early Miocene (23.5-15.2Ma) [23.5-15i]", "time_from": 23.5, "time_to": 15, "filter_mode": "inclus"},
// {"label": "Middle Miocene (15-11.7Ma) [15-12.1]", "time_from": 15, "time_to": 12.1, "filter_mode": "overlap"},
// {"label": "Early Late Miocene (11.2-7.5Ma) [11.6-7.5]", "time_from": 11.6, "time_to": 7.5, "filter_mode": "overlap"},
// {"label": "Late Late Miocene (11-7.5Ma) [7-5.5]", "time_from": 7, "time_to": 5.5, "filter_mode": "overlap"},
// {"label": "Pliocene (5.3-2.4Ma) [5-2.5]", "time_from": 5, "time_to": 2.5, "filter_mode": "overlap"},
                 
var timeSpans = []
for (tD of timeDt) {
    timeSpans.push({"label": tD[0]+" [" + tD[1] +"--" + tD[2] + "]", "time_from": tD[1], "time_to": tD[2], "filter_mode": "inclus"});
}

var climMdls = ["EarlyMio_Nor_420",
                "EarlyMio_Nor_560",
                "LateMio_CTP",
                "LateMio_MPI_360",
                "LateMio_Nor_350",
                "LateMio_Nor_560",
                "LateMio_oro0",
                "LateMio_oro100",
                "LateMio_oro50",
                "LateMio_R",
                "LateMio_S-C-TP",
                "LateMio_S-SE-TP",
                "LateMio_STP100",
                "LateMio_STP50",
                "LateMio_STP-Z",
                "LateMio_TP100",
                "LateMio_TP50",
                "LateMio_TP-Z",
                "LateMio_TP-Z50",
                "LateMio_TP-Z-TA",
                "MidPlio_405",
                "present",
                "Present_oro0",
                "Present_oro50",
                "Present_S-C-TP",
                "Present_STP",
                "Present_TP",
                "Present_TP-Z",
                "Present_TP-Z-TA"];

var redLbls = ['rA', 'rB', 'rC', 'rD', 'rE', 'rF', 'rG', 'rH', 'rI', 'rJ', 'rK', 'rL', 'rM', 'rN', 'rO', 'rP', 'rQ']
var redDtls = {'rA': ['[SF &#8804; 0.222] &#8743; [BU &#8804; 0.357]', '[TMeanY &#8804; 15.4]', '0.914', '0.000', '160', '170', '3497', '2577'],
	'rB': ['[0.286 &#8804; BU]', '[2.0 &#8804; TMeanDryQ]', '0.810', '0.000', '476', '237', '3030', '2661'],
	'rC': ['[HYP &#8804; 1.733] &#8744; [0.154 &#8804; SF]', '[117.0 &#8804; PWetM]', '0.787', '0.000', '574', '380', '3516', '1934'],
	'rD': ['[0.154 &#8804; AL]', '[-5.5 &#8804; TMeanY &#8804; 19.1]', '0.747', '0.000', '483', '632', '3287', '2002'],
	'rE': ['[AL &#8804; 0.308]', '[32.0 &#8804; TIso]', '0.729', '0.000', '863', '328', '3198', '2015'],
	'rF': ['[0.235 &#8804; OO]', '[-29.6 &#8804; TMinColdM &#8804; 6.0]', '0.676', '0.000', '370', '1080', '3022', '1932'],
	'rG': ['[HYP &#8804; 1.857]', '[TMeanRngD &#8804; 12.3]', '0.658', '0.000', '877', '649', '2940', '1938'],
	'rH': ['[HYP &#8804; 1.778]', '[17.0 &#8804; TMeanWarmQuarter &#8804; 30.6]', '0.657', '0.000', '588', '947', '2940', '1929'],
	'rI': ['[0.222 &#8804; OL &#8804; 0.571]', '[-4.0 &#8804; TMeanDryQ]', '0.643', '0.000', '935', '664', '2884', '1921'],
	'rJ': ['[0.2 &#8804; OO &#8804; 0.8]', '[-16.7 &#8804; TMeanDryQ &#8804; 16.2]', '0.643', '0.000', '900', '700', '2876', '1928'],
	'rK': ['[0.267 &#8804; OL &#8804; 0.636]', '[TRngY &#8804; 36.4]', '0.639', '0.000', '822', '788', '2852', '1942'],
	'rL': ['[1.692 &#8804; HYP]', '[PDryM &#8804; 4.0]', '0.613', '0.000', '699', '1010', '2708', '1987'],
	'rM': ['[0.286 &#8804; SF &#8804; 0.667] &#8744; [0.333 &#8804; OO]', '[PWarmQ &#8804; 240.0]', '0.609', '0.000', '1171', '476', '2565', '2192'],
	'rN': ['[0.059 &#8804; SF &#8804; 0.4]', '[63.7 &#8804; TSeason &#8804; 742.4] &#8743; [61.0 &#8804; PSeason &#8804; 102.0]', '0.601', '0.000', '520', '430', '1430', '4024'],
	'rO': ['[0.125 &#8804; OL &#8804; 0.545]', '[PSeason &#8804; 96.0]', '0.595', '0.000', '879', '935', '2664', '1926'],
	'rP': ['[0.353 &#8804; OL]', '[32.0 &#8804; TIso &#8804; 58.0]', '0.590', '0.000', '1136', '702', '2644', '1922'],
	'rQ': ['[OL &#8804; 0.471]', '[241.0 &#8804; PWarmQ]', '0.577', '0.000', '1098', '788', '2575', '1943']}

var clustNames = ["A", "B", "C", "D", "E"];
var clustDsts = [["L", "l1"], ["E", "l2"], ["H", "hits"]];
var clustSeries = [["d", ""]]; //, ["n", " normalized"]];
var clustLbls = [];
var mapClustLbls = {};
var clustDstsMinMax = {};
/*for (dst of clustDsts) {
    clustLbls.push("assignment ("+dst[1]+")");
    mapClustLbls[clustLbls[clustLbls.length-1]] = {"name": "all", "dst": dst[0], "serie": "assign"};
}
for (dst of clustDsts) {
    for (serie of clustSeries) {
        clustDstsMinMax[dst[0]+"_"+serie[0]] = [1,0];
        for (clust of clustNames) {
            clustLbls.push("cluster "+clust+" ("+dst[1]+serie[1]+")");
            mapClustLbls[clustLbls[clustLbls.length-1]] = {"name": clust, "dst": dst[0], "serie": serie[0]};
        }
    }
}*/

// DATA TOOLS
//---------------------------
const range = (start, stop, step) => Array.from({ length: (stop - start) / step + 1}, (_, i) => start + (i * step));

function rtrnPresentSupp(d) {
    collect = {id: +d.ID,
        lat: +d.LAT, // convert to number
        lng: +d.LONG // convert to number
    };
    for (var i = 0; i < redLbls.length; i++) {
        collect[redLbls[i]] = +d["r"+String.fromCharCode('A'.charCodeAt(0)+i)];
    }
    return collect;
}

function rtrnLoc(d) {
    return {
        lidnum: +d.LIDNUM, // convert to number
        name: d.NAME, // lowercase
        lat: +d.LAT, // convert to number
        lng: +d.LONG, // convert to number
        maxage: +d.MAX_AGE, // convert to number
        minage: +d.MIN_AGE, // convert to number
        nbsp: +d.NBSP, // convert to number
        lblrho: +d.RHO_LBL, // convert to number
        lblphi: +d.PHI_LBL // convert to number
    };
}
function rtrnSupp(d) {
    collect = {id: +d.ID};
    for (var i = 0; i < redLbls.length; i++) {
        collect[redLbls[i]] = +d["r"+String.fromCharCode('A'.charCodeAt(0)+i)];
    }
    return collect;
}
function rtrnClust(d) {
    collect = {id: +d.ID};
    for (var j = 0; j < clustLbls.length; j++) {
        if (mapClustLbls[clustLbls[j]]["name"] == "all"){
            collect[clustLbls[j]] = +d[mapClustLbls[clustLbls[j]]["serie"]+mapClustLbls[clustLbls[j]]["dst"]];
        }
        else {
            collect[clustLbls[j]] = +d["c"+mapClustLbls[clustLbls[j]]["dst"]+mapClustLbls[clustLbls[j]]["serie"]+mapClustLbls[clustLbls[j]]["name"]];
            let mmk = mapClustLbls[clustLbls[j]]["dst"]+"_"+mapClustLbls[clustLbls[j]]["serie"];
            if (collect[clustLbls[j]] < clustDstsMinMax[mmk][0]) { clustDstsMinMax[mmk][0] = collect[clustLbls[j]]; }
            if (collect[clustLbls[j]] > clustDstsMinMax[mmk][1]) { clustDstsMinMax[mmk][1] = collect[clustLbls[j]]; }
        }
    }
    return collect;
}

// COLORMAPPING
//--------------------------
function enforceBounds(x) {
    if (x < 0) {
        return 0;
    } else if (x > 1){
        return 1;
    } else {
        return x;
    }
}

function interpolateLinearly(x, values) {

    // Split values into four lists
    var x_values = [];
    var r_values = [];
    var g_values = [];
    var b_values = [];
    for (i in values) {
        x_values.push(values[i][0]);
        r_values.push(values[i][1][0]);
        g_values.push(values[i][1][1]);
        b_values.push(values[i][1][2]);
    }

    var i = 1;
    while (x_values[i] < x) {
        i = i+1;
    }
    i = i-1;

    var width = Math.abs(x_values[i] - x_values[i+1]);
    var scaling_factor = (x - x_values[i]) / width;

    // Get the new color values though interpolation
    var r = r_values[i] + scaling_factor * (r_values[i+1] - r_values[i])
    var g = g_values[i] + scaling_factor * (g_values[i+1] - g_values[i])
    var b = b_values[i] + scaling_factor * (b_values[i+1] - b_values[i])

    return "rgb("+(255*enforceBounds(r)).toFixed(0)+","+(255*enforceBounds(g)).toFixed(0)+","+(255*enforceBounds(b)).toFixed(0)+")";

}

// SIMPLE TOOLS
//---------------------------
function unionList(listA, listB) {
    let _union = new Set(listA.concat(listB))
    return [..._union];
}

function getAssociatedMrks(i, n) {
    if (i >= 0 && i < n){   
        return [i+n+offObjs, i+3*n+offObjs];
    }
    return [];
}
function getAssociatedTlns(i, n) {
    if (i >= 0 && i < n){   
        return [i+4*n+offObjs];
    }
    return [];
}
function getAssociatedObjs(i, n) {
    if (i >= 0 && i < n){
        // pin, mrk, zpin, zmrk, time
        return [i+offObjs, i+n+offObjs, i+2*n+offObjs, i+3*n+offObjs, i+4*n+offObjs];
    }
    return [];
}

function getAssociatedId(i, n) {
    if (i >= offObjs && i < 5*n+offObjs){
        return (i-offObjs) % n;
    }
    return -1;
}

function add(s, v) {
    return s+v
}

function cart2pol(x, y){
    return {rho: Math.sqrt(x*x + y*y),
            phi: Math.atan2(y, x)}
}
    
function pol2cart(rho, phi){
    return {x: rho * Math.cos(phi),
            y: rho * Math.sin(phi)}
}
function scaleVal(v, fact=100, off=0, pw=2){
    // console.log(v);
    if (pw == 1){
        return off-fact*v;
    }
    return off-fact*Math.pow(v, pw);
}

// SELECTORS TOOLS
//---------------------------
function clearOptions(selector) {
    while(selector.firstChild) selector.removeChild(selector.lastChild);
}

function assignOptions(textArray, selector) {
    for (var i = 0; i < textArray.length; i++) {
        var currentOption = document.createElement('option');
        currentOption.text = textArray[i];
        selector.appendChild(currentOption);
    }
}

// PLOT PREPARATION
//---------------------------
function prepareLocsColors(dataSC, locIds, cparameters) {
    var mapLocs = {};
    for (var i = 0; i < locIds.length; i++) {
        mapLocs[locIds[i]] = i;
    }
    var locsColors = [];
    if ( cparameters["red_type"] == "red" ){
        for (var k = 0; k < dataSC.length; k++){
            locsColors[mapLocs[dataSC[k].id]] = cparameters["suppColorsStatus"][dataSC[k][cparameters["red_lbl"]]];
        }
    }
    else{
        // clusters
        for (var k = 0; k < dataSC.length; k++){
            let colorv = "#eeeeee";
            let dv = dataSC[k][cparameters["red_lbl"]];
            if (cparameters["mapClustLbls"][cparameters["red_lbl"]]["name"] == "all"){
                colorv = cparameters["clustColorsMap"][dv];
            }
            else {
                let mmk = cparameters["mapClustLbls"][cparameters["red_lbl"]]["dst"]+"_"+cparameters["mapClustLbls"][cparameters["red_lbl"]]["serie"];
                let ndv = (dv-cparameters["clustDstsMinMax"][mmk][0])/(cparameters["clustDstsMinMax"][mmk][1]-cparameters["clustDstsMinMax"][mmk][0]);
                colorv = 'hsl('+cparameters["clustHueMap"][cparameters["mapClustLbls"][cparameters["red_lbl"]]["name"]]+','+
                    scaleVal(ndv, cparameters["clustColSFact"], 100, cparameters["clustColSPw"]).toFixed(0)+'%,'+
                    scaleVal(ndv, cparameters["clustColLFact"], 50, cparameters["clustColLPw"]).toFixed(0)+'%)';
                // if ( k < 10 ){
                //     console.log(clustLbls[j], dataClusts[i][k][clustLbls[j]], dv, ndv, colorv);
                // }
            }
            locsColors[mapLocs[dataSC[k].id]] = colorv;
        }
    }
    return locsColors;
}


function prepareLocs(data) {
    var locs = {lidnum: [], name: [], lat: [], lng: [], maxage: [], minage: [], nbsp: [], lblrho: [], lblphi: []};
    for (var i = 0; i < data.length; i++) {
        var datum = data[i];
        locs.lidnum.push(datum.lidnum);
        locs.name.push(datum.name);
        locs.lat.push(datum.lat);
        locs.lng.push(datum.lng);
        locs.maxage.push(datum.maxage);
        locs.minage.push(datum.minage);
        locs.nbsp.push(datum.nbsp);
        locs.lblrho.push(datum.lblrho);
        locs.lblphi.push(datum.lblphi);
    };
    return locs
}
function pairCmp(pairA, pairB){
    if ( pairA[0] == pairB[0] ){
        if ( pairA[1] == pairB[1] ){
            if ( pairA[2] == pairB[2] ){
                if ( pairA[3] == pairB[3] ){
                    return pairB[4] - pairA[4];
                }
                else {
                    return pairA[3] - pairB[3];
                }
            }
            else {
                return pairB[2] - pairA[2];
            }
        }
        else {
            return pairB[1] - pairA[1];
        }
    }
    else {
        return pairA[0] - pairB[0];
    }
}
function idsSorted(vA, vB, vC, vD, vE){
    let ids = [...Array(vA.length).keys()].sort(function(a, b){return pairCmp([vA[a], vB[a], vC[a], vD[a], vE[a]], [vA[b], vB[b], vC[b], vD[b], vE[b]])});
    var idsMap = {};
    // var idsK = {}; // to get the sorted list of ids
    for (var i = 0; i < ids.length; i++) {
        idsMap[ids[i]] = i;
        // idsK[i] = vE[ids[i]];
    }
    // console.log(idsK);    
    return idsMap;
}

// PLOTTING TOOLS
//---------------------------
function makePresentTraces(data, cparameters){
    var ddt = {"cls": [], "xs": [], "ys": [], "lbls": []}
    for (var i = 0; i < data.length; i++) {
        ddt["xs"].push(data[i].lng);
        ddt["ys"].push(data[i].lat);
        ddt["lbls"].push("<i>"+data[i].id+"</i>");
        ddt["cls"].push(cparameters["suppColorsStatus"][data[i][cparameters["red_lbl"]]]);
    }
    mrk = {lon: ddt["xs"], 
           lat: ddt["ys"], 
           text: ddt["lbls"],
           visible: true,
           type:'scattergeo',
           mode:'markers',
           marker: {
               color: ddt["cls"],
               opacity: cparameters["preOpac"],
               symbol: 'hexagon',
               size: cparameters["preMrkSz"]
           },
           hoverinfo: "skip",
           showlegend: false
          }
    zmrk = {x: ddt["xs"], 
            y: ddt["ys"],
            text: ddt["lbls"],
            visible: true,
            type:'scatter',
            mode:'markers',
            marker: {
                color: ddt["cls"],
                opacity: cparameters["preZOpac"],
                symbol: 'hexagon',
                size: cparameters["preZMrkSz"]
            },
            hoverinfo: "skip",
            showlegend: false,
            xaxis: 'x2',
            yaxis: 'y2'
           }
    return {"mrk": [mrk], "zmrk": [zmrk]};
}

function makeTraces(locs, ordAges, locsColors, cparameters){
    var frng = 0.012*Math.min(cparameters["xlims"][1]-cparameters["xlims"][0], cparameters["ylims"][1]-cparameters["ylims"][0]);
    var zfrng = 0.038*Math.min(cparameters["zxlims"][1]-cparameters["zxlims"][0], cparameters["zylims"][1]-cparameters["zylims"][0]);
    idsMapAge = idsSorted(locs.maxage, locs.minage, locs.lng, locs.lat, locs.lidnum);
    var traces = {"pin": [], "mrk": [], "zpin": [], "zmrk": [], "time": []}
    for (var i = 0; i < locs.lidnum.length; i++) {
        let xy_pin = {x: locs.lng[i], y: locs.lat[i]}
        let zxy_pin = {x: xy_pin.x, y: xy_pin.y}
        let pinc = '#ffffff';
        let pinw = 0;
        if (locs.lblrho[i] > 0){
            xy_off = pol2cart(locs.lblrho[i], locs.lblphi[i]*2*Math.PI/100);
            xy_pin.x += frng*xy_off.x;
            xy_pin.y += frng*xy_off.y;
            zxy_pin.x += zfrng*xy_off.x;
            zxy_pin.y += zfrng*xy_off.y;            
            pinc = cparameters["pinColor"];
            pinw = cparameters["pinWidth"];
        }
        traces["pin"].push({lon: [xy_pin.x, locs.lng[i]],
                            lat: [xy_pin.y, locs.lat[i]], 
                            visible: true,
                            type: 'scattergeo',
                            mode: 'lines',
                            name: "tip"+i,
                            line: {
                                color: pinc,
                                width: pinw
                            },
                            hoverinfo: "skip",
                            showlegend: false
                           });
        traces["mrk"].push({lon: [xy_pin.x], 
                            lat: [xy_pin.y], 
                            text: ["<b>"+locs.lidnum[i]+" "+locs.name[i]+"</b>"
                                   +"<br><i>["+locs.maxage[i].toFixed(2)+"—"+locs.minage[i].toFixed(2)+"]</i>"
                                   +"   <i>"+locs.lat[i].toFixed(3)+";"+locs.lng[i].toFixed(3)+"</i>"],
                            visible: true,
                            type:'scattergeo',
                            mode:'markers',
                            name: "dot"+i,
                            marker: {
                                line: {
                                    color: locsColors[i],
                                    width: cparameters["baseMLSz"],
                                },
                                color: locsColors[i],
                                size: cparameters["baseMrkSz"]
                            },
                            hoverinfo: "text",
                            showlegend: false
                           });
        traces["zpin"].push({x: [zxy_pin.x, locs.lng[i]],
                             y: [zxy_pin.y, locs.lat[i]], 
                             visible: true,
                             type: 'scatter',
                             mode: 'lines',
                             name: "ztip"+i,
                             line: {
                                 color: pinc,
                                 width: pinw,
                             },
                             hoverinfo: "skip",
                             showlegend: false,
                             xaxis: 'x2',
                             yaxis: 'y2'
                            });
        traces["zmrk"].push({x: [zxy_pin.x], 
                             y: [zxy_pin.y], 
                             text: ["<b>"+locs.lidnum[i]+" "+locs.name[i]+"</b>"
                                   +"<br><i>["+locs.maxage[i].toFixed(2)+"—"+locs.minage[i].toFixed(2)+"]</i>"
                                   +"   <i>"+locs.lat[i].toFixed(3)+";"+locs.lng[i].toFixed(3)+"</i>"],
                             visible: true,
                             type:'scatter',
                             mode:'markers',
                             name: "zdot"+i,
                             marker: {
                                line: {
                                    color: locsColors[i],
                                    width: cparameters["baseMLSz"],
                                 },
                                 color: locsColors[i],
                                 size: cparameters["baseMrkSz"]
                             },
                             hoverinfo: "text",
                             showlegend: false,
                             xaxis: 'x2',
                             yaxis: 'y2'
                            });
        traces["time"].push({x: [ordAges[locs.maxage[i]], ordAges[locs.minage[i]]], 
                             y: [idsMapAge[i], idsMapAge[i]], 
                             text: ["<b>"+locs.lidnum[i]+" "+locs.name[i]+"</b>"
                                   +"<br><i>["+locs.maxage[i].toFixed(2)+"—"+locs.minage[i].toFixed(2)+"]</i>"
                                   +"   <i>"+locs.lat[i].toFixed(3)+";"+locs.lng[i].toFixed(3)+"</i>"],
                             visible: true,
                             type:'scatter',
                             mode:'lines',
                             name: "time"+i,
                             line: {
                                 color: locsColors[i],
                                 width: cparameters["baseLineW"]
                             },
                             hoverinfo: "text",
                             showlegend: false,
                             xaxis: 'x3',
                             yaxis: 'y3'
                        });

    };
    return traces;
}



function makePlot(dataLocs, dataSC, dataPresent, cparameters){
    // prepare data
    locs = prepareLocs(dataLocs);
    ages = unionList(locs.maxage.concat(locs.minage), cparameters["agesTicks"]).sort(function(a, b){return b-a});    
    ageBounds = [ages[0], ages[ages.length-1]];
    
    var ordAges = {}
    for (var i = 0; i < ages.length; i++) {
        xx = (ages[i]-ageBounds[0])/(ageBounds[1]-ageBounds[0]);
        ordAges[ages[i]] = xx;
        // tticks.push(xx);
        // ordAges[ages[i]] = i+1;
        // tticks.push(i+1);
        // ttickTxts.push(ages[i].toFixed(4));
    }
    var tticks = [];
    for (var i = 0; i < cparameters["agesTicks"].length; i++) {
        tticks.push((cparameters["agesTicks"][i]-ageBounds[0])/(ageBounds[1]-ageBounds[0]));
    }
    locsColors = prepareLocsColors(dataSC, locs.lidnum, cparameters);
    
    // prepare plot elements
    present_traces = makePresentTraces(dataPresent, cparameters);
    traces = makeTraces(locs, ordAges, locsColors, cparameters);
    traces_zoom = [{lon: [cparameters["zxlims"][0], cparameters["zxlims"][1], cparameters["zxlims"][1], cparameters["zxlims"][0], cparameters["zxlims"][0]],
                   lat: [cparameters["zylims"][0], cparameters["zylims"][0], cparameters["zylims"][1], cparameters["zylims"][1], cparameters["zylims"][0]],
                   visible: true, //agesMap[ages[0]].vect[i],
                   type: 'scattergeo',
                   mode: 'lines',
                   name: "zoomFrame",
                   line: {
                       color: "#aaaaaa",
                       width: 1,
                       dash: 'dot',
                   },
                   hoverinfo: "skip",
                   showlegend: false
                   },
                  {x: [cparameters["zxlims"][0], cparameters["zxlims"][1], cparameters["zxlims"][1], cparameters["zxlims"][0], cparameters["zxlims"][0]],
                   y: [cparameters["zylims"][0], cparameters["zylims"][0], cparameters["zylims"][1], cparameters["zylims"][1], cparameters["zylims"][0]],
                   visible: true, //agesMap[ages[0]].vect[i],
                   type: 'scatter',
                   mode: 'lines',
                   name: "zzoomFrame",
                   line: {
                       color: "#aaaaaa",
                       width: 2,
                       dash: 'dot',
                   },
                   xaxis: 'x2',
                   yaxis: 'y2',
                   hoverinfo: "skip",
                   showlegend: false
                  }];

    var myPlot = document.getElementById('graph'),
        data = traces_zoom.concat(present_traces["mrk"], present_traces["zmrk"], traces["pin"], traces["mrk"], traces["zpin"], traces["zmrk"], traces["time"]),
        layout = {margin: {l: 5, r: 5, t: 5, b: 5},
                  paper_bgcolor: "#e7e7e7",
                  width: cparameters["fdims"][0],
                  height: cparameters["fdims"][1],
                  hovermode:'closest',
                  // grid: {rows: 1, columns: 2, pattern: 'independent'},
                  xaxis2: {
                      anchor: 'y2', domain: [0.52, 1], range: [cparameters["zxlims"][0]-.025, cparameters["zxlims"][1]+.025],
                      showgrid: false, showline: false, showticklabels: false
                  },
                  yaxis2: {
                      scaleanchor: 'x2', scaleratio: 1, //(zylims[1]-zylims[0])/(zxlims[1]-zxlims[0]),
                      anchor: 'x2', domain: [0.52, .95], range: [cparameters["zylims"][0]-cparameters["padZ"], cparameters["zylims"][1]+cparameters["padZ"]],
                      showgrid: false, showline: false, showticklabels: false
                  },
                  xaxis3: {
                      anchor: 'y3', domain: [0, 1], range: [-cparameters["padT"], 1+cparameters["padT"]], // [tticks[0], tticks[tticks.length-1]],
                      tickmode: "array", tickvals: tticks, ticktext: cparameters["ttickTxts"],
                      showgrid: true, showline: false, zeroline: false, showticklabels: true,
                      rangeslider: {visible: false}
                  },
                  yaxis3: {
                      anchor: 'x3', domain: [0.1, 0.48], // range: tlims,
                      showgrid: false, showline: false, zeroline: false, showticklabels: false, fixedrange: true
                  },
                  geo: {
                      scope: 'asia',
                      resolution: 50,
                      projection: {type: 'miller'},
                      domain: {x: [0, 0.48], y: [0.52, 1]},
                      lonaxis: {range: cparameters["xlims"]},
                      lataxis: {range: cparameters["ylims"]},
                      showcoastlines: true,
                      showocean: true,
                      oceancolor: "#F9FCFF",
                      showcountries: false
                  }
                  };
    config = {displaylogo: false,
              responsive: true,
              toImageButtonOptions: {
                  format: 'svg', // one of png, svg, jpeg, webp
                  filename: 'mapFossilsRedSupps',
                  width: cparameters["fdims"][0],
                  height: cparameters["fdims"][1],
                  scale: 1 // Multiply title/legend/axis/canvas sizes by this factor
              },
              modeBarButtonsToRemove:  ['zoom2d', 'pan2d', 'select2d', 'lasso2d', 'zoomIn2d', 'zoomOut2d',
                                        'autoScale2d', 'resetScale2d',
                                        'zoomInGeo', 'zoomOutGeo', 'resetGeo', 'hoverClosestGeo',
                                        'hoverClosestGl2d', 'hoverClosestPie', 'toggleHover', 'resetViews',
                                        'sendDataToCloud', 'toggleSpikelines', 'resetViewMapbox',
                                        'hoverClosestCartesian', 'hoverCompareCartesian']
             }
    
    Plotly.newPlot('graph', data, layout, config);

    var dids = [];
    // var oids = [];
    // for (var j = 0; j < nsrsObjs; j++) {
    //     oids.push([]);
    // }
    var statuses = [];
    for (var i = 0; i < locs.lidnum.length; i++) {
        for (var j = 0; j < nsrsObjs; j++) {
            // oids[j].push(i+j*locs.lidnum.length+offObjs);
            dids.push(i+j*locs.lidnum.length+offObjs);
        }
        statuses.push(0);
    }
    // var bids = new Int32Array(bids);

    function evFilterBounds(L, tfrom, tto, bounds, dids, filter_mode){
        sbounds = [bounds[0], bounds[1]];
        if (tfrom < 1){
            sbounds[0] = bounds[0]+(bounds[1]-bounds[0])*tfrom;
        } else {
            sbounds[0] = tfrom;
        }
        if (tto < 1){
            sbounds[1] = bounds[0]+(bounds[1]-bounds[0])*tto;
        } else {
            sbounds[1] = tto;
        }
        var visM = [];
        for (var i = 0; i < L.maxage.length; i++) {
            // visM.push(L.minage[i] <= sbounds[0] && L.maxage[i] >= sbounds[1]);
            for (var j = 0; j < nsrsObjs; j++) {
                if (filter_mode == "inclus"){
                    visM.push(L.minage[i] >= sbounds[1] && L.maxage[i] <= sbounds[0]);
                } else {
                    visM.push(L.minage[i] <= sbounds[0] && L.maxage[i] >= sbounds[1]);
                }
            }
        }
        // for (var i = 0; i < oids.length; i++) {
        //     Plotly.restyle('graph', {'visible': visM}, oids[i]);
        // }
        Plotly.restyle('graph', {'visible': visM}, dids);
        return visM;
    }
    
    function evFilterTime(dt, L, bounds, dids, cparameters){
        if ( "xaxis3.range[0]" in dt && "xaxis3.range[1]" in dt){            
            if ( dt["xaxis3.range[0]"] > 0 && dt["xaxis3.range[1]"] < 1 && dt["xaxis3.range[0]"] < dt["xaxis3.range[1]"] ){
                return evFilterBounds(L, dt["xaxis3.range[0]"], dt["xaxis3.range[1]"], bounds, dids, cparameters["filter_mode"]);
            } else {
                // for (var i = 0; i < L.maxage.length; i++) {
                //     visM.push(Boolean(1));
                // }
                // for (var i = 0; i < oids.length; i++) {
                //     Plotly.restyle('graph', {'visible': Boolean(1)}, oids[i]);
                // }
                Plotly.restyle('graph', {'visible': Boolean(1)}, dids);
                return -1;
            }
        }
    }

    myPlot.on('plotly_relayout', function(data){ visM = evFilterTime(data, locs, ageBounds, dids, cparameters); updateScores(visM); });

    function evClickLoc(dt, locs, locsColors, ST, cparameters){
        var szM = [];
        var idsM = [];
        var szT = [];
        var idsT = [];
        var colMT = [];
        for(var i=0; i < dt.points.length; i++){
            bid = getAssociatedId(dt.points[i].curveNumber, locs.lidnum.length);
            if ( bid >= 0 ){
                idsM.push(...getAssociatedMrks(bid, locs.lidnum.length));
                idsT.push(...getAssociatedTlns(bid, locs.lidnum.length));

                if ( ST[bid] == 0 ){ // activate
                    ST[bid] = 1;
                    colMT.push(cparameters["highColor"]);
                    szM.push(cparameters["highMrkSz"]);
                    szT.push(cparameters["highLineW"]);
                } else { // deactivate
                    ST[bid] = 0;
                    colMT.push(locsColors[bid]);
                    szM.push(cparameters["baseMrkSz"]);
                    szT.push(cparameters["baseLineW"]);                    
                }
            }
        }
        if ( idsT.length > 0){
            Plotly.restyle('graph', {'marker.color': colMT, 'marker.size': szM}, idsM);
            Plotly.restyle('graph', {'line.color': colMT, 'line.width': szT}, idsT);
        }
    }

    myPlot.on('plotly_click', function(data){ evClickLoc(data, locs, locsColors, statuses, cparameters); });
    if (cparameters["time_from"] != 0 || cparameters["time_to"] != 1){
        visM = evFilterBounds(locs, cparameters["time_from"], cparameters["time_to"], ageBounds, dids, cparameters["filter_mode"]);
        updateScores(visM);
    }
    else {
        updateScores(-1);
    }
    

    // function highlightOn(points, nbRows){
    //     for(var i=0; i < points.length; i++){
    //         bidsOn = getAssociatedIds(points[i].curveNumber, nbRows);
    //         if ( bidsOn.length == 2 ){
    //             Plotly.restyle('graph', {'marker.size': [2*baseMrkSz]}, [bidsOn[0]]);
    //             Plotly.restyle('graph', {'line.width': [2*baseLineW]}, [bidsOn[1]]);
    //         }
    //     }
    // }
    // function highlightOff(points, nbRows){
    //     for(var i=0; i < points.length; i++){
    //         bidsOff = getAssociatedIds(points[i].curveNumber, nbRows);
    //         if ( bidsOff.length == 2 ){
    //             Plotly.restyle('graph', {'marker.size': [baseMrkSz]}, [bidsOff[0]]);
    //             Plotly.restyle('graph', {'line.width': [baseLineW]}, [bidsOff[1]]);
    //         }            
    //     }
    // }
    // myPlot.on('plotly_hover', function(data){ highlightOn(data.points, locs.lidnum.length); });
    // myPlot.on('plotly_unhover', function(data){ highlightOff(data.points, locs.lidnum.length); });

    
}

var loc_parameters = {"fdims": [1200, 1000],
                      "highColor": "#ffff00",
                      "preMrkSz": 4.5,
                      "preZMrkSz": 18,
                      "preOpac": 0.15,
                      "preZOpac": 0.05,
                      "baseMrkSz": 5,
                      "baseMLSz": 3,
                      "baseLineW": 2,
                      "highMrkSz": 15,
                      "highLineW": 3,
                      "pinColor": '#888888',
                      //"pinColor": '#dddddd',
                      "pinWidth": .5,
                      "noiseLoc": 0,
                      "padT": 0.001 ,
                      "padZ": .025,
                      "clustColSFact": 95,
                      "clustColSPw": 1,
                      "clustColLFact": 20,
                      "clustColLPw": 2,
                      "mapClustLbls": mapClustLbls,
                      "clustDstsMinMax": clustDstsMinMax,
                      "filter_mode": "overlap",
                      "time_from": 0,
                      "time_to": 1                     
                     }

loc_parameters["suppColorsMap"] = {0: "#FC5864", 1: "#74A8F6", 2: "#662A8D", 3: "#BBBBBB"}
loc_parameters["clustColorsMap"] = {"-1": "#E6E6E6",
                                    0:"#8000ff", 1:"#00b5eb", 2:"#81ffb4", 3:"#ffb360", 4:"#ff0000",
                                    "A":"#8000ff", "B":"#00b5eb", "C":"#81ffb4", "D":"#ffb360", "E":"#ff0000"}
/// 0:191, 1:137, 2:102, 3:22, 4:0,
loc_parameters["clustHueMap"] = {0:270, 1:193, 2:144, 3:31, 4:0,
                                 "A":270, "B":193, "C":144, "D":31, "E":0}

// --- Present [6404]
// LAT:    [6.00756,49.57583]
// LONG:   [66.3889,140.0148]
// FOSSIL DATA
// LAT:	[15.000, 47.000]
// LONG:	[69.000, 121.000]
// MAX_AGE:	[3.032, 23.030]
// MIN_AGE:	[2.500, 20.440]
// loc_parameters["xlims"] = [ 64, 126];
// loc_parameters["ylims"] = [ 0, 47];
// loc_parameters["zxlims"] = [101, 116];
// loc_parameters["zylims"] = [32.25, 43.75];
// loc_parameters["xlims"] = [ 64, 126];
// loc_parameters["ylims"] = [ 0, 50];
// loc_parameters["zxlims"] = [100, 116];
// loc_parameters["zylims"] = [32.8, 45];
loc_parameters["xlims"] = [ 64, 142];
loc_parameters["ylims"] = [ 0, 52];
loc_parameters["zxlims"] = [100, 116];
loc_parameters["zylims"] = [32.8, 45];
// loc_parameters["ttickTxts"] = ["12.57 Ma", "<b>Clarendonian-1</b>", "12.11 Ma", "<b>Clarendonian-2</b>", "10.09 Ma", "<b>Clarendonian-3</b>", "9.07 Ma", "<b>Hemphillian-1</b>", "7.59 Ma", "<b>Hemphillian-2</b>", "6.88 Ma", "<b>Hemphillian-3</b>", "5.91 Ma", "<b>Hemphillian-4</b>", "4.91 Ma", "<b>Blancan-Early</b>", "2.63 Ma"]
// loc_parameters["agesTicks"] = [12.57, 12.34, 12.11, 11.10, 10.09, 9.58, 9.07, 8.33, 7.59, 7.23, 6.88, 6.39, 5.91, 5.41, 4.91, 3.77, 2.63]
// loc_parameters["ttickTxts"] = ["", "15 Ma", "14 Ma", "13 Ma", "12 Ma", "<b>11.63 Ma</b>", "11 Ma", "10 Ma", "9 Ma", "8 Ma", "<b>7.25 Ma</b>", "7 Ma", "6 Ma", "<b>5.33 Ma</b>", "5 Ma", "4 Ma", "3 Ma", ""]
// loc_parameters["agesTicks"] = [15.6, 15, 14, 13, 12, 11.63, 11, 10, 9, 8, 7.25, 7, 6, 5.33, 5, 4, 3, 2]

loc_parameters["ttickTxts"] = ["", "22 Ma", "<b>20.44 Ma</b>", "20 Ma", "18 Ma", "<b>15.97 Ma</b>", "14 Ma", "12 Ma", "<b>11.63 Ma</b>", "10 Ma", "8 Ma", "<b>7.25 Ma</b>", "6 Ma", "<b>5.33 Ma</b>", "4 Ma", ""]
loc_parameters["agesTicks"] = [23.3, 22, 20.44, 20, 18, 15.97, 14, 12, 11.63, 10, 8, 7.25, 6, 5.33, 4, 2.2]


// LAT:    [15.000, 47.000]
// LONG:   [69.000, 121.000]
// MAX_AGE:    [3.032, 15.500]
// MIN_AGE:    [2.500, 13.183]

function collectScores(visM, dataSupps, redsAsCols=true){
    var cnts_locs = {};
    var refmdl_id = climMdls.indexOf(refmdl_name);
    var cnts_cmp = {};
    var sts_clim_satisfied = [1,2];
    // Just like a redescription, but both LHS and RHS are climate query, the former evaluated with present day climate (reference), the latter with past climate model
    // sts_refmdl: status of the climate query w.r.t. present day climate model (reference)
    // sts: status of the climate query w.r.t. past climate model 
    // (sts_refmdl, sts) -> index
    // (1,0) -> 0, (0,1) -> 1, (1,1) -> 2, (0,0) -> 3
    
    for (var c = 0; c < climMdls.length; c++){
        for (var r = 0; r < redLbls.length; r++){
            if (redsAsCols) {
                cnts_locs[c+"_"+r] = [0,0,0,0];
                cnts_cmp[c+"_"+r] = [0,0,0,0];
            }
            else {
                cnts_locs[r+"_"+c] = [0,0,0,0];
                cnts_cmp[r+"_"+c] = [0,0,0,0];
            }
        }
    }
    for (var l = 0; l < dataSupps[0].length; l++){
        if ( visM == -1 || visM[l*nsrsObjs]){
            for (var r = 0; r < redLbls.length; r++){
                let climsts_refmdl = sts_clim_satisfied.includes(dataSupps[refmdl_id][l][redLbls[r]]);
                for (var c = 0; c < climMdls.length; c++){
                    let sts = dataSupps[c][l][redLbls[r]];
                    let climsts = sts_clim_satisfied.includes(sts);
                    let mtch_sts = -1;
                    if ( climsts ){
                        if ( climsts_refmdl ){
                            mtch_sts = 2;
                        }
                        else {
                            mtch_sts = 1;
                        }
                    } else {
                        if ( climsts_refmdl ){
                            mtch_sts = 0;
                        }
                        else {
                            mtch_sts = 3;
                        }
                    }

                    if (redsAsCols) {
                        cnts_locs[c+"_"+r][sts]++;
                        cnts_cmp[c+"_"+r][mtch_sts]++;
                    }
                    else {
                        cnts_locs[r+"_"+c][sts]++;
                        cnts_cmp[r+"_"+c][mtch_sts]++;
                    }
                }
            }
        }
    }
    return [cnts_locs, cnts_cmp];
}

function computeCountsMeasure(cnts, cnts_cmp, tot, measure){
    // console.log(cnts, cnts_cmp);
    switch(measure) {
    case "C0":
    case "C10":
        return cnts_cmp[0]/tot;
    case "C1":
    case "C01":
        return cnts_cmp[1]/tot;
    case "C2":
    case "C11":
        return cnts_cmp[2]/tot;
    case "C3":
    case "C00":
        return cnts_cmp[3]/tot;
    case "CAcc":
        return (cnts_cmp[2]+cnts_cmp[3])/tot;
    case "0":
    case "E10":
        return cnts[0]/tot;
    case "1":
    case "E01":
        return cnts[1]/tot;
    case "2":
    case "E11":
        return cnts[2]/tot;
    case "3":
    case "E00":
        return cnts[3]/tot;
    case "LHS":
        return (cnts[0]+cnts[2])/tot;
    case "RHS":
        return (cnts[1]+cnts[2])/tot;
    // case "acc":
    // case "J":
    // case "jacc":
    default:
        return cnts[2]/(cnts[0]+cnts[1]+cnts[2]);
    }
}

function tabulateScores(cnts_locs, cnts_cmp, rows, cols, sel_row, sel_col, score_sort="jacc", score_opac="jacc", score_txt="jacc", redsAsCols=true){
    var N = cnts_locs["0_0"][0]+ cnts_locs["0_0"][1]+ cnts_locs["0_0"][2]+cnts_locs["0_0"][3];
    
    let cids = range(0, cols.length-1, 1);
    if (score_sort != "none"){
        let cvals = cids.map(x => computeCountsMeasure(cnts_locs[sel_row+"_"+x], cnts_cmp[sel_row+"_"+x], N, score_sort));
        cids.sort((a, b) => cvals[a] - cvals[b]);
    }

    let rids = range(0, rows.length-1, 1);
    if (score_sort != "none"){
        let rvals = rids.map(x => computeCountsMeasure(cnts_locs[x+"_"+sel_col], cnts_cmp[x+"_"+sel_col], N, score_sort));
        rids.sort((a, b) => rvals[a] - rvals[b]);
    }

    let scores_head = "<tr>\n\t<td class=\"totN\">N="+N+", val:"+score_txt+", opac:"+ score_opac +", sort:"+ score_sort+"</td>\n";
    let scores_mrgtop = "<tr>\n\t<td class=\"mrg_top\"></td>\n";
    for (var c = 0; c < cids.length; c++){
        scores_head += "\t<th class=\"lbl_col\">"+cols[cids[c]]+"</th>\n";
        scores_mrgtop += "\t<td class=\"mrg_top\"></td>\n";
    }
    
    var scores_txt = "<table>\n" + scores_head + "</tr>\n" + scores_mrgtop + "</tr>\n";
    for (var r = 0; r < rids.length; r++){
        scores_txt += "<tr><th class=\"lbl_row\">"+rows[rids[r]]+"</th>\n"
        for (var c = 0; c < cids.length; c++){
            var t = (100*computeCountsMeasure(cnts_locs[rids[r]+"_"+cids[c]], cnts_cmp[rids[r]+"_"+cids[c]], N, score_opac)).toFixed(0);
            var v = (0.20+0.80*computeCountsMeasure(cnts_locs[rids[r]+"_"+cids[c]], cnts_cmp[rids[r]+"_"+cids[c]], N, score_txt)).toFixed(2);
            var cl = " class=\"other\"";
            if ( cids[c] == sel_col && rids[r] == sel_row ) {
                cl = " class=\"selected_cell\"";
            }
            else if ( rids[r] == sel_row ){
                cl = " class=\"selected_row\"";
            }
            else if ( cids[c] == sel_col ) {
                cl = " class=\"selected_col\"";
            }
            scores_txt += "\t<td"+cl+" onclick=\"setCR("+rids[r]+","+ cids[c] +","+redsAsCols+")\" style=\"opacity:"+v+"\">"+t+"</td>\n";
        }
        scores_txt += "</tr>\n"
    }
    scores_txt += "</table>\n";
    return scores_txt
}
    
function updateScores(visM){
    if (visM !== undefined){
        xx = collectScores(visM, loc_parameters["dataSupps"]);
        cnts_locs = xx[0];
        cnts_cmp = xx[1];
        scores_txt = tabulateScores(cnts_locs, cnts_cmp, climMdls, redLbls, loc_parameters["clim_id"], loc_parameters["red_id"], loc_parameters["score_sort"], loc_parameters["score_opac"], loc_parameters["score_txt"]);
        // cnts_locs = collectScores(visM, loc_parameters["dataSupps"], false);
        // scores_txt = tabulateScores(cnts_locs, redLbls, climMdls, loc_parameters["red_id"], loc_parameters["clim_id"]);
        document.getElementById("scores").innerHTML = scores_txt;
    }
}

function setCR(rid, cid, redsAsCols=true){
    if (rid !== undefined && cid !== undefined){
        if (redsAsCols) {
            redSelector.value = redLbls[cid];
            climSelector.value = climMdls[rid];
        }
        else {
            redSelector.value = redLbls[rid];
            climSelector.value = climMdls[cid];
        }
        updatePlots(1, 1);
    }
}


function updatePlotsClim(){
    updatePlots(1, 0);
}
function updatePlotsRed(){
    updatePlots(0, 1);
}
function updatePlots(upClim, upRed){

    loc_parameters["suppColorsStatus"] = {0: loc_parameters["suppColorsMap"][0],
                                          1: loc_parameters["suppColorsMap"][1],
                                          2: loc_parameters["suppColorsMap"][2],
                                          3: loc_parameters["suppColorsMap"][3]}


    loc_parameters["score_txt"] = "E11";
    loc_parameters["score_sort"] = "none";    
    if (sideSelector.selectedIndex == 1){ // only dental trait
        loc_parameters["suppColorsStatus"][2] = loc_parameters["suppColorsMap"][0];
        loc_parameters["suppColorsStatus"][1] = loc_parameters["suppColorsMap"][3];
    } else if (sideSelector.selectedIndex == 2){ // only climate
        loc_parameters["suppColorsStatus"][2] = loc_parameters["suppColorsMap"][1];
        loc_parameters["suppColorsStatus"][0] = loc_parameters["suppColorsMap"][3];
        loc_parameters["score_txt"] = "CAcc";
        loc_parameters["score_sort"] = "none";
    } 
    
    var queryString = window.location.search;
    var urlParams = new URLSearchParams(queryString);
    
    if ( urlParams.has('score') ) {
        loc_parameters["score_txt"] = urlParams.get('score');
        if ( urlParams.has('score_sort') ) {
            loc_parameters["score_sort"] = urlParams.get('score_sort');
        }
        else {
            loc_parameters["score_sort"] = loc_parameters["score_txt"];
        }        
    }
    if ( urlParams.has('score_sort') ) {
        loc_parameters["score_sort"] = urlParams.get('score_sort');
    }
    if ( urlParams.has('score_opac') ) {
        loc_parameters["score_opac"] = urlParams.get('score_opac');
    }
    else {
        loc_parameters["score_opac"] = loc_parameters["score_txt"];
    }


    if (timeSelector.selectedIndex > 0){ // time selected
        loc_parameters["filter_mode"] = timeSpans[timeSelector.selectedIndex-1]["filter_mode"];
        loc_parameters["time_from"] = timeSpans[timeSelector.selectedIndex-1]["time_from"];
        loc_parameters["time_to"] = timeSpans[timeSelector.selectedIndex-1]["time_to"];
    } else {
        loc_parameters["filter_mode"] = "overlap";
        loc_parameters["time_from"] = 0;
        loc_parameters["time_to"] = 1;
    }

    if ( urlParams.has('filter_mode') ) {
        loc_parameters["filter_mode"] = urlParams.get('filter_mode');
    }
    if ( urlParams.has('time_from') ) {
        loc_parameters["time_from"] = parseFloat(urlParams.get('time_from'));
    }
    if ( urlParams.has('time_to') ) {
        loc_parameters["time_to"] = parseFloat(urlParams.get('time_to'));
    }
    
    if ( urlParams.has('clim') && climSelector.value == climMdls[0] && climMdls.includes(urlParams.get('clim'))) {
        climSelector.value = urlParams.get('clim');
    }
    if ( urlParams.has('red') && redSelector.value == redLbls[0] && ( redLbls.includes(urlParams.get('red')) || clustLbls.includes(urlParams.get('red')) )) {
        redSelector.value = urlParams.get('red');
    }

    loc_parameters["clim_id"] = climMdls.indexOf(climSelector.value)
    if (loc_parameters["clim_id"] == -1) {
            loc_parameters["clim_id"] = 0;
    }
    loc_parameters["clim_lbl"] = climMdls[loc_parameters["clim_id"]];
    
    loc_parameters["red_type"] = "red";
    loc_parameters["red_id"] = redLbls.indexOf(redSelector.value)
    if (loc_parameters["red_id"] == -1) {
        loc_parameters["red_id"] = clustLbls.indexOf(redSelector.value)
        if (loc_parameters["red_id"] == -1) {
            loc_parameters["red_id"] = 0;
        }
        else{
            loc_parameters["red_type"] = "clust";
        }
    }
    // if (loc_parameters["red_type"] == "clust") {
    //     loc_parameters["red_lbl"] = clustLbls[loc_parameters["red_id"]];
    //     document.getElementById("red").innerHTML = "Cluster: "+loc_parameters["red_lbl"];
    //     makePlot(loc_parameters["dataLocs"], loc_parameters["dataClusts"][loc_parameters["clim_id"]], loc_parameters["dataPresent"], loc_parameters);
    // }
    // else {
    if (true) {
        loc_parameters["red_lbl"] = redLbls[loc_parameters["red_id"]];
        var red_txt = "Redescription: "+loc_parameters["red_lbl"]+"<br/>" +
        "<table>" +
"<tr>" + 
"<td style=\"width:2em;color:"+loc_parameters["suppColorsMap"][0]+"\">qD=</td>" +
"<td style=\"width:50em;\">"+redDtls[loc_parameters["red_lbl"]][0]+"</td>" + 
"</tr>" +
"<tr>" + 
"<td style=\"width:2em;color:"+loc_parameters["suppColorsMap"][1]+"\">qC=</td>" +
"<td style=\"width:50em;\">"+redDtls[loc_parameters["red_lbl"]][1]+"</td>" + 
"</tr>" +
"<tr>" + 
"<td></td><td>" +
"J= "+redDtls[loc_parameters["red_lbl"]][2]+", "+
"<font color=\""+loc_parameters["suppColorsMap"][2]+"\">supp%= "+ (100*redDtls[loc_parameters["red_lbl"]][6]/tot_present_locs).toFixed(2) +
"</td></tr>" +
"</table>"
        document.getElementById("red").innerHTML = red_txt;
        makePlot(loc_parameters["dataLocs"], loc_parameters["dataSupps"][loc_parameters["clim_id"]], loc_parameters["dataPresent"], loc_parameters);
    }
}

// prepare drop-down selectors
var climSelector = document.querySelector('#choice-clim');
assignOptions(climMdls, climSelector);
var redSelector = document.querySelector('#choice-red');
assignOptions(redLbls.concat(clustLbls), redSelector);
var sideSelector = document.querySelector('#choice-side');
assignOptions(["", "LHS - Dental traits", "RHS - Climate"], sideSelector);
var timeSelector = document.querySelector('#choice-time');
var time_options = [""];
for (var i = 0; i < timeSpans.length; i++) {
    time_options.push(timeSpans[i]["label"]);
}
assignOptions(time_options, timeSelector);



climSelector.addEventListener('change', updatePlotsClim, false);
redSelector.addEventListener('change', updatePlotsRed, false);
sideSelector.addEventListener('change', updatePlotsRed, false);
timeSelector.addEventListener('change', updatePlotsRed, false);

d3.csv(psuppfile, function (p) { return rtrnPresentSupp(p) })
.then(
function(dataPresent){
d3.csv(locfile, function (d) { return rtrnLoc(d) })
.then(
    function(dataLocs){

        promisesSupps = []
        for (climMdl of climMdls) {
            promisesSupps.push(d3.csv(xpsfld+"supps_top20_"+climMdl+".csv", function(d) { return rtrnSupp(d) }));
        }
        Promise.all(promisesSupps)
            .then(
                function(dataSupps){ 
                    loc_parameters["dataPresent"] = dataPresent;
                    loc_parameters["dataLocs"] = dataLocs;
                    loc_parameters["dataSupps"] = dataSupps;
                    updatePlots(1, 1);
                },
                function(err) { console.log(err); } // Error: "It broke when reading locations"
            );
    },
    function(err) { console.log(err); } // Error: "It broke when reading locations"
);
},
    function(err) { console.log(err); } // Error: "It broke when reading locations"
);
