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
		},
		65:{
			"type":"FDD",
			"frequency":"2100",
			"range":["1920-2010","2110-2200"],
			"scsbw":{
				15:[5,10,15,20],
				30:[10,15,20],
				60:[10,15,20]
			},
			"nrarfcn":[422000,440000]
		},
		66:{
			"type":"FDD",
			"frequency":"1700",
			"range":["1710-1780","2110-2200"],
			"scsbw":{
				15:[5,10,15,20,40],
				30:[10,15,20,40],
				60:[10,15,20,40]
			},
			"nrarfcn":[422000,440000]
		},
		70:{
			"type":"FDD",
			"frequency":"2000",
			"range":["1695-1710","1995-2020"],
			"scsbw":{
				15:[5,10,15,20,25],
				30:[10,15,20,25],
				60:[10,15,20,25]
			},
			"nrarfcn":[399000,404000]
		}
	},
	nrRbData:{
		5:{
			15:25,
			30:11,
			60:null
		},
		10:{
			15:52,
			30:24,
			60:11
		},
		15:{
			15:79,
			30:38,
			60:18
		},
		20:{
			15:106,
			30:51,
			60:24
		},
		25:{
			15:133,
			30:65,
			60:31
		},
		30:{
			15:160,
			30:78,
			60:38
		}
	},
	selectors:{
		streams:{
			1:"SiSo",
			2:"2T2R",
			4:"4T4R",
			8:"8T8R"
		},
		scs:{
			1:"15KHz"
		},
		modulation:{
			2:"QPSK",
			4:"16QAM",
			6:"64QAM",
			8:"256QAM"
		},
		bandwidth:{
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
	name:{
		"band":"NR-Band",
		"scs":"SCS",
		"bandwidth":"Bandwidth",
		"streams":"Streams",
		"modulation":"Modulation",
	},
	
	init:function(){
		s5g.ux.init();
		//s5g.sw.init();
		s5g.logic.addCarrier();
	},
	
	calc:{
		base:1e-6,
		rMax:948/1024,
		
		reduce:function(n){
			return Math.round(n*10000)/10000;
		},
		round:function(n){
			return Math.round(n*100)/100;
		},
		numerology:function(scs){
			if (scs === 15) return 0;
			if (scs === 30) return 1;
			if (scs === 60) return 2;
		},
		scs:function(scs){
			var exp = Math.pow(2,scs);
			return 1e-3/(14*exp);
		},
		carrier:function(info){
			var ret = s5g.calc.base;
			
			var streams = parseInt(info.streams);
			var coding = parseInt(info.modulation);
			var sFactor = parseFloat(info.sfactor);
			var scs = parseInt(info.scs);
			var sRbs = parseInt(info.bandwidth);
			
			var num = s5g.calc.numerology(scs);
			
			//console.log("Streams:",streams,"\n"+"coding:",coding,"\n"+"sFactor:",sFactor,"\n"+"scs:",scs,"\n"+"sRbs:",sRbs,"\n"+"num:",num,"\n")
			
			// MiMo value
			ret = ret * streams;
			
			// Modulation scheme
			ret = ret * coding;
			
			// Scaling factor
			ret = ret * sFactor;
			
			// rMax constant
			ret = ret * s5g.calc.rMax;
			
			// Sub-Carrier spacing
			var cNum = s5g.calc.scs(num);
			var rbs = s5g.nrRbData[sRbs][scs];
			
			ret = ret * ((rbs*12)/cNum);
			
			// Overhead
			var retDl = ret * (1-0.14);
			var retUl = ret * (1-0.08);
			
			// Round values
			retDl = s5g.calc.reduce(retDl,5);
			retUl = s5g.calc.reduce(retUl,5);
			
			console.log("Calculation Complete for carrier",retDl+"Mbps Downlink",retUl+"Mbps Uplink");
			
			return [retDl,retUl];
		},
		run:function(){
			var sumDl = 0, sumUl = 0;
			
			for (var i in s5g.carriers){
				if (s5g.nrRbData[parseInt(s5g.carriers[i].bandwidth)] === undefined) continue;
				
				var carrierSpeed = s5g.calc.carrier(s5g.carriers[i]);
				
				s5g.ux.setRowSpeed(i,carrierSpeed);
				
				sumDl += carrierSpeed[0];
				sumUl += carrierSpeed[1];
			}
			
			return [sumDl,sumUl];
		}
	},
	
	logic:{
		changeCbs:{
			"band":function(caId){
				s5g.logic.resetCarrierData(caId,["band"]);
				s5g.ux.populateSelectors(caId,["scs"]);
				s5g.logic.setPopulateDefaults(caId,true);
			
				// Re-Calculate speed
				s5g.logic.doCalculation();
			},
			"scs":function(caId){
				s5g.logic.resetCarrierData(caId,["band","scs"]);
				s5g.ux.populateSelectors(caId,["bandwidth"]);
			},
			"bandwidth":function(caId){
				s5g.logic.resetCarrierData(caId,["band","scs","bandwidth"]);
				s5g.ux.populateSelectors(caId,["streams","modulation"]);
			},
			"streams":function(){
				//s5g.ux.populateSelectors(caId,["bandwidth"]);
			},
			"modulation":function(){
				//s5g.ux.populateSelectors(caId,["bandwidth"]);
			}
		},
		
		getCaId:function(a){
			return $(a).parent().parent().parent().data("caid");
		},
		
		addCarrier:function(){
			// Push default carrier template
			s5g.carriers.push({
				band:null,
				bandwidth:null,
				streams:null,
				modulation:null,
				sfactor:1,
				scs:null,
				uplinkAggregation:false
			});
			
			var carrier = s5g.carriers.length-1;
			var render = s5g.carriers[carrier];
			
			// Render newly made carrier
			s5g.ux.renderCarrier(render,carrier);
		},
		
		aggregateUplink:function(){
			var caId = s5g.logic.getCaId(this);
			
		},
		removeCarrier:function(){
			var caId = s5g.logic.getCaId(this);
			
			if (caId === 0){
				alert("Cannot remove primary carrier");
				return;
			}
			
			s5g.carriers.splice(caId,1);
			s5g.ux.removeCarrier(caId);
		},
		
		resetCarrierData:function(caId,attributes){
			var clearAttr = ["band","scs","bandwidth","streams","modulation"];
			for (var i = 0; i < 5; i++){
				if (attributes.indexOf(clearAttr[i]) !== -1) continue;
				
				//console.log("Set",clearAttr[i],"to null");
				
				s5g.ux.resetSelector(caId,clearAttr[i]);
				s5g.carriers[caId][clearAttr[i]] = null;
			}
		},
		selectNewValue:function(){
			var caId = s5g.logic.getCaId(this);
			var selector = $(this).data("selector");
			
			s5g.carriers[caId][selector] = $(this).val();
			
			//console.log("Set value for carrier",caId,"->",selector,"to",$(this).val());
			
			s5g.logic.changeCbs[selector](caId);
			
			// Re-Calculate speed
			//s5g.logic.setPopulateDefaults(caId,false);
			s5g.logic.doCalculation();
		},
		setPopulateDefaults:function(caId,override){
			var defaults = {
				"bandwidth":20,
				"streams":2,
				"modulation":4,
				"sfactor":1,
				"scs":30
			};
			
			$(".carrier_row[data-caid='" + caId + "'] div.rowcont div.rowsect select").each(function(){
				var sel = $(this).data("selector");
				if (defaults[sel] === undefined) return;
				if ($(this).val() === "0" && override !== true) return;
				
				s5g.carriers[caId][sel] = defaults[sel];
				$(this).val(defaults[sel]);
				
				s5g.logic.changeCbs[sel](caId);
			});
		},
		
		doCalculation:function(){
			var required = ["bandwidth","streams","modulation","sfactor","scs"];
			
			var error = false;
			for (var i in s5g.carriers){
				ca = s5g.carriers[i];
				for (var j in required){
					if (ca[required[j]] === null){
						error = true;
						s5g.ux.inputError(1,[i,required[j]]);
						break;
					}
				}
			}
			
			if (error) return;
			
			s5g.ux.renderCalculation(s5g.calc.run());
		}
	},
	
	ux:{
		init:function(){
			$("#add_carrier").text("Add Carrier").on("click enter",s5g.logic.addCarrier);
			
			$("#page_title").text("5G Throughput Calculator");
			$("#speeds").text("Please choose a band");
			
			$("#open_settings").hide();
			
			$("#ca_body").empty();
		},
		
		carrierName:function(caId){
			return (parseInt(caId) === 0 ? "Primary Carrier" : "Carrier S" + caId);
		},
		
		generate:{
			band:function(){
				var el = $("<div/>",{"class":"rowsect"}).append(
					$("<span/>",{"class":"rowsectheader"}).text(s5g.name.band)
				);
	
				el.append(
					$("<select/>",{
						"title":"Select NR-Band",
						"data-selector":"band"
					}).append($("<option/>",{"value":0}).text("Select "+s5g.name.band+"...")).on("change",s5g.logic.selectNewValue)
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
					}).append($("<option/>",{"value":0}).text("Select "+s5g.name.scs+"...")).on("change",s5g.logic.selectNewValue)
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
					}).append($("<option/>",{"value":0}).text("Select "+s5g.name.bandwidth+"...")).on("change",s5g.logic.selectNewValue)
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
					}).append($("<option/>",{"value":0}).text("Select "+s5g.name.streams+" Count...")).on("change",s5g.logic.selectNewValue)
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
					}).append($("<option/>",{"value":0}).text("Select "+s5g.name.modulation+"...")).on("change",s5g.logic.selectNewValue)
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
		
		updateRowTitle:function(caId,txt){
			$("div[data-caid='" + caId + "'] div.row_header h2.band_title").html(txt);
		},
		toggleRow:function(){
			var caId = $(this).parent().data("caid");
			var el = $("div[data-caid='" + caId + "'] div.rowcont");
			
			if (el.is(":visible")){
				el.slideUp(500);
			} else {
				el.slideDown(500);
			}
		},
		setRowSpeed:function(caId,speeds){
			var dlSpeed = s5g.calc.round(speeds[0]);
			var ulSpeed = s5g.calc.round(speeds[1]);
			var speedTxt = dlSpeed + "Mbps &#8595; &amp; " + ulSpeed + "Mbps &#8593;";
			
			var caName = s5g.ux.carrierName(caId);
			console.log("Set carrier title for",caName);
			
			s5g.ux.updateRowTitle(caId,caName + "<br />" + speedTxt);
		},
		renderCarrier:function(info,caId){
			var el = $("<div/>",{
				"class":"carrier_row",
				"data-caid":caId
			});
			
			var header = $("<div/>",{"class":"row_header"}).on("click enter",s5g.ux.toggleRow);
			var body = $("<div/>",{"class":"rowcont"});
			
			header.append($("<h2/>",{"class":"band_title"}).text(s5g.ux.carrierName(caId)));
			
			body.append(
				s5g.ux.generate.band(),
				s5g.ux.generate.scs(),
				s5g.ux.generate.bandwidth(),
				s5g.ux.generate.streams(),
				s5g.ux.generate.modulation(),
				s5g.ux.generate.rowOpts(true)
			);
			
			el.append(header,body);
			
			$("#ca_body").append(el);
			
			s5g.ux.populateSelectors(caId,["band"]);
		},
		removeCarrier:function(caId){
			$(".carrier_row[data-caid='" + caId + "']").remove();
		},
		
		resetSelector:function(caId,selector){
			$(".carrier_row[data-caid='" + caId + "'] div.rowcont div.rowsect select[data-selector='" + selector + "']").empty().append(
				$("<option/>",{"value":0}).text("Select "+s5g.name[selector]+"...")
			);
		},
		populateSelectors:function(caId,noReload){
			$(".carrier_row[data-caid='" + caId + "'] div.rowcont div.rowsect select").each(function(){
				var sel = $(this).data("selector");
				
				if (noReload.indexOf(sel) === -1) return;
				
				switch (sel){
					case "band":
						s5g.ux.populateBand($(this),caId);
						break;
					case "scs":
						s5g.ux.populateScs($(this),caId);
						break;
					case "bandwidth":
						s5g.ux.populateBandwidth($(this),caId);
						break;
					default:
						console.log($(this),caId,sel);
						s5g.ux.populateGeneric($(this),caId,sel);
						break;
				}
			});
		},
		populateBand:function(el,caId){
			var dKeys = Object.keys(s5g.nrBandData);
			
			el.empty().append($("<option/>",{"value":0}).text("Select Band..."));
			
			for (var i = 0, l = dKeys.length;i<l;i++){
				if (s5g.nrBandData[dKeys[i]].frequency === "") continue;
				
				txt = "Band " + dKeys[i];
				txt += " | " + s5g.nrBandData[dKeys[i]].type;
				txt += " (" + s5g.nrBandData[dKeys[i]].frequency + "MHz)";
				
				el.append(
					$("<option/>",{"value":dKeys[i]}).text(txt)
				);
			}
		},
		populateBandwidth:function(el,caId){
			//if (s5g.carriers[caId].scs === "0") return;
			
			var scsData = s5g.nrBandData[s5g.carriers[caId].band].scsbw[s5g.carriers[caId].scs];
			
			el.empty().append($("<option/>",{"value":0}).text("Select Bandwidth..."));
			
			for (var i = 0, l = scsData.length;i<l;i++){
				txt = scsData[i] + "MHz";
				
				el.append(
					$("<option/>",{"value":scsData[i]}).text(txt)
				);
			}
		},
		populateScs:function(el,caId){
			var scsData = s5g.nrBandData[s5g.carriers[caId].band].scsbw;
			var keys = Object.keys(scsData);
			
			el.empty();
			
			for (var i = 0, l = keys.length;i<l;i++){
				if (scsData[keys[i]].length === 0) return;
				
				txt = keys[i] + "KHz";
				
				el.append(
					$("<option/>",{"value":keys[i]}).text(txt)
				);
			}
		},
		populateGeneric:function(el,caId,selector){
			var keys = Object.keys(s5g.selectors[selector]);
			for (var i = 0, l = keys.length;i<l;i++){
				el.append(
					$("<option/>",{"value":keys[i]}).text(s5g.selectors[selector][keys[i]])
				);
			}
		},
		renderCalculation:function(data){
			if (data === false){
				$("#speeds").text("Unable to calculate speed");
				return;
			}
			
			$("#speeds").html(data[0] + "Mbps &#8595; &amp; " + data[1] + "Mbps &#8593;");
		},
		inputError:function(type,data){
			var el = $("#speeds");
			
			switch(type){
				case 1:
					el.html("Please enter " + data[1] + " for " + s5g.ux.carrierName(data[0]));
					break;
				default:
					el.html("Error");
					break;
			}
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