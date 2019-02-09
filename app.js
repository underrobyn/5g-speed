/*
 * 	5G Speed Calculator
 *	Developed by AbsoluteDouble
 *	GitHub: https://github.com/jake-cryptic/5g-speed
 * 	Website: https://absolutedouble.co.uk/
*/

// Polyfill: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/includes#Polyfill
if (!String.prototype.includes) {
	String.prototype.includes = function(search, start) {
		if (typeof start !== 'number') {
			start = 0;
		}

		if (start + search.length > this.length) {
			return false;
		} else {
			return this.indexOf(search, start) !== -1;
		}
	};
}

if (!window.location.host.includes("absolutedouble.co.uk")){
	console.log("\n5G Theoretical Throughput Calculator");
	console.log("Developed by AbsoluteDouble");
	console.log("Website: https://absolutedouble.co.uk");
	console.log("Github: https://github.com/jake-cryptic/5g-speed");
}

// Fallback for jQuery
if (!window.jQuery){
	var j = document.createElement("script");
	j.src = "https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js";
	j.type = "text/javascript";
	document.head.append(j);
}

var s5g = {
	followSpec:false,
	carriers:[],
	nrBandData:{
		1:{
			"type":"FDD",
			"frequency":"2100",
			"range":["1920-1980","2110-2170"],
			"scsbw":{
				15:[5,10,15,20],
				30:[10,15,20],
				60:[10,15,20]
			},
			"nrarfcn":[422000,434000]
		},
		2:{
			"type":"FDD",
			"frequency":"1900",
			"range":["1850-1910","1930-1990"],
			"scsbw":{
				15:[5,10,15,20],
				30:[10,15,20],
				60:[10,15,20]
			},
			"nrarfcn":[386000,398000]
		},
		3:{
			"type":"FDD",
			"frequency":"1800",
			"range":["1710-1785","1805-1880"],
			"scsbw":{
				15:[5,10,15,20,25,30],
				30:[10,15,20,25,30],
				60:[10,15,20,25,30]
			},
			"nrarfcn":[361000,376000]
		},
		5:{
			"type":"FDD",
			"frequency":"850",
			"range":["824-849","869-894"],
			"scsbw":{
				15:[5,10,15,20],
				30:[10,15,20],
				60:[]
			},
			"nrarfcn":[173800,178800]
		},
		7:{
			"type":"FDD",
			"frequency":"2600",
			"range":["2500-2570","2620-2690"],
			"scsbw":{
				15:[5,10,15,20],
				30:[10,15,20],
				60:[10,15,20]
			},
			"nrarfcn":[524000,538000]
		},
		8:{
			"type":"FDD",
			"frequency":"900",
			"range":["880-915","925-960"],
			"scsbw":{
				15:[5,10,15,20],
				30:[10,15,20],
				60:[]
			},
			"nrarfcn":[185000,192000]
		},
		12:{
			"type":"FDD",
			"frequency":"700",
			"range":["699-716","729-746"],
			"scsbw":{
				15:[5,10,15],
				30:[10,15],
				60:[]
			},
			"nrarfcn":[145800,149200]
		},
		20:{
			"type":"FDD",
			"frequency":"800",
			"range":["832-862","791-821"],
			"scsbw":{
				15:[5,10,15,20],
				30:[10,15,20],
				60:[]
			},
			"nrarfcn":[158200,164200]
		},
		25:{
			"type":"FDD",
			"frequency":"1900",
			"range":["1850-1915","1930-1995"],
			"scsbw":{
				15:[5,10,15,20],
				30:[10,15,20],
				60:[10,15,20]
			},
			"nrarfcn":[386000,399000]
		},
		28:{
			"type":"FDD",
			"frequency":"700",
			"range":["703-748","758-803"],
			"scsbw":{
				15:[5,10,15,20],
				30:[10,15,20],
				60:[]
			},
			"nrarfcn":[151600,160600]
		}
	},
	selectors:{
		streams:{
			1:"SiSo",
			2:"2T2R",
			4:"4T4R",
			8:"8T8R"
		},
		modulation:{
			2:"QPSK",
			4:"16QAM",
			6:"64QAM",
			8:"256QAM"
		},
		bandwidths:{
			5:"5MHz",
			10:"10MHz",
			15:"15MHz",
			20:"20MHz",
			25:"25MHz",
			30:"30MHz",
			40:"40MHz",
			50:"50MHz",
			60:"60MHz",
			80:"80MHz",
			90:"90MHz",
			100:"100MHz"
		},
		sfactor:{
			0.4:"0.4",
			0.75:"0.75",
			0.8:"0.8",
			1:"1"
		}
	},
	
	init:function(){
		s5g.ux.init();
		//s5g.sw.init();
		s5g.logic.addCarrier();
	},
	
	calc:{
		base:1e-6,
		rMax:948/1024,
		
		round:function(n){
			return Math.round(n*100)/100;
		},
		scs:function(spacing){
			return (1e-3/14*(2^spacing));
		},
		carrier:function(info){
			var ret = 1;
			
			// MiMo value
			ret = ret * info.streams;
			
			// Modulation scheme
			ret = ret * info.modulation;
			
			// Scaling factor
			ret = ret * info.sfactor;
			
			// rMax constant
			ret = ret * s5g.calc.rMax;
			
			// Sub-Carrier spacing
			ret = ret * (2/s5g.calc.scs(info.subCarrierSpacing));
			
			return ret;
		},
		run:function(){
			var result = s5g.calc.base;
			var sumCarriers = 0;
			
			for (var i in s5g.carriers){
				sumCarriers += s5g.calc.carrier(
					s5g.carriers[i]
				);
			}
			
			return result * sumCarriers;
		}
	},
	
	logic:{
		getCaId:function(a){
			return $(a).parent().parent().data("caid");
		},
		
		addCarrier:function(){
			// Push default carrier template
			s5g.carriers.push({
				band:null,
				bandwidth:null,
				streams:null,
				modulation:null,
				sfactor:null,
				subCarrierSpacing:null,
				overhead:null,
				uplinkAggregation:false
			});
			
			var carrier = s5g.carriers.length-1;
			var render = s5g.carriers[carrier];
			
			// Render newly made carrier
			s5g.ux.renderCarrier(render,carrier);
			
			// Re-Calculate speed
			s5g.logic.doCalculation();
		},
		
		aggregateUplink:function(){
			var caId = s5g.logic.getCaId(this);
		},
		removeCarrier:function(){
			var caId = s5g.logic.getCaId(this);
		},
		selectNewValue:function(){
			var caId = s5g.logic.getCaId(this);
			var selector = $(this).data("selector");
			
			console.log(s5g.carriers[caId][selector],$(this).val());
		},
		
		doCalculation:function(){
			var uplink = s5g.calc.run();
			var downlink = s5g.calc.run();
			
			s5g.ux.renderCalculation([uplink,downlink]);
		}
	},
	
	ux:{
		init:function(){
			$("#add_carrier").text("Add Carrier").on("click enter",s5g.logic.addCarrier);
			
			$("#page_title").text("5G Throughput Calculator");
			
			$("#open_settings").hide();
			
			$("#ca_body").empty();
		},
		
		generate:{
			band:function(){
				var el = $("<div/>",{"class":"rowsect"}).append(
					$("<span/>",{"class":"rowsectheader"}).text("NR-Band")
				);
	
				el.append(
					$("<select/>",{
						"title":"Select NR-Band",
						"data-selector":"band"
					}).append($("<option/>",{"value":0}).text("Select Band...")).on("change",s5g.logic.selectNewValue)
				);
				
				return el;
			},
			scs:function(){
				var el = $("<div/>",{"class":"rowsect"}).append(
					$("<span/>",{"class":"rowsectheader"}).text("SCS")
				);
	
				el.append(
					$("<select/>",{
						"title":"Select Sub-Carrier Spacing",
						"data-selector":"scs"
					}).append($("<option/>",{"value":0}).text("Select SCS...")).on("change",s5g.logic.selectNewValue)
				);
				
				return el;
			},
			bandwidth:function(){
				var el = $("<div/>",{"class":"rowsect"}).append(
					$("<span/>",{"class":"rowsectheader"}).text("Bandwidth")
				);
	
				el.append(
					$("<select/>",{
						"title":"Select Bandwidth",
						"data-selector":"bandwidth"
					}).append($("<option/>",{"value":0}).text("Select Bandwidth...")).on("change",s5g.logic.selectNewValue)
				);
				
				return el;
			},
			streams:function(){
				var el = $("<div/>",{"class":"rowsect"}).append(
					$("<span/>",{"class":"rowsectheader"}).text("Streams")
				);
	
				el.append(
					$("<select/>",{
						"title":"Select Streams",
						"data-selector":"streams"
					}).append($("<option/>",{"value":0}).text("Select Stream Count...")).on("change",s5g.logic.selectNewValue)
				);
				
				return el;
			},
			modulation:function(){
				var el = $("<div/>",{"class":"rowsect"}).append(
					$("<span/>",{"class":"rowsectheader"}).text("Modulation")
				);
	
				el.append(
					$("<select/>",{
						"title":"Select Modulation",
						"data-selector":"modulation"
					}).append($("<option/>",{"value":0}).text("Select Modulation...")).on("change",s5g.logic.selectNewValue)
				);
				
				return el;
			},
			rowOpts:function(isPrimary){
				var el = $("<div/>",{"class":"rowsect"}).append(
					$("<span/>",{"class":"rowsectheader"}).text("Options")
				);
	
				// Every carrier should have this option
				el.append(
					$("<button/>",{"class":"b_rmrow"}).text("Remove Carrier").on("click enter",s5g.logic.removeCarrier)
				);
	
				// Options for carriers that aren't the primary
				if (isPrimary){
					el.append(
						$("<button/>",{"class":"b_aggupl"}).text("Aggregate Uplink").on("click enter",s5g.logic.aggregateUplink)
					);
				}
				
				return el;
			}
		},
		
		renderCarrier:function(info,caId){
			var el = $("<div/>",{
				"class":"carrier_row",
				"data-caid":caId
			});
			
			el.append(
				s5g.ux.generate.band(),
				s5g.ux.generate.scs(),
				s5g.ux.generate.bandwidth(),
				s5g.ux.generate.streams(),
				s5g.ux.generate.modulation(),
				s5g.ux.generate.rowOpts(true)
			);
			
			$("#ca_body").append(el);
			
			s5g.ux.populateSelectors(caId);
		},
		
		populateSelectors:function(caId){
			$(".carrier_row[data-caid='" + caId + "'] div.rowsect select").each(function(){
				console.log($(this).data("selector"));
				
				var sel = $(this).data("selector");
				
				switch (sel){
					case "band":
						s5g.ux.populateBand($(this),caId);
						break;
					case "scs":
						s5g.ux.populateBandwidth($(this),caId);
						break;
					case "bandwidth":
						s5g.ux.populateBandwidth($(this),caId);
						break;
					case "streams":
						s5g.ux.populateBandwidth($(this),caId);
						break;
					case "modulation":
						s5g.ux.populateBandwidth($(this),caId);
						break;
					default:
						console.log("Unknown:",sel,caId);
						break;
				}
			});
		},
		populateBand:function(selector,caId){
			var dKeys = Object.keys(s5g.nrBandData);
			
			for (var i = 0, l = dKeys.length;i<l;i++){
				if (s5g.nrBandData[dKeys[i]].frequency !== "") continue;
				
				txt = "Band " + dKeys[i];
				txt += " | " + s5g.nrBandData[dKeys[i]].type;
				txt += " (" + s5g.nrBandData[dKeys[i]].frequency + "MHz)";
				
				selector.append(
					$("<option/>",{"value":dKeys[i]}).text(txt)
				);
			}
		},
		populateBandwidth:function(selector,caId){
			
		},
		renderCalculation:function(data){
			
		}
	},
	
	sw:{
		init:function(){
			if ('serviceWorker' in navigator) {
				navigator.serviceWorker.register("nr-sw.js").then(function(registration){
					console.log("ServiceWorker registration successful with scope:",registration.scope);
				},function(err){
					console.log("ServiceWorker registration failed:",err);
				});
			}
		}
	}
};

$(document).ready(s5g.init);