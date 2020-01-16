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

var s5g = {
	followSpec:false,
	carriers:[],
	nrFreqOverhead:{
		1:[0.14,0.18],
		2:[0.18,0.10]
	},
	nrBandData:{
		1:{
			"type":"FDD",
			"freqrange":1,
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
			"freqrange":1,
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
			"freqrange":1,
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
			"freqrange":1,
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
			"freqrange":1,
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
			"freqrange":1,
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
			"freqrange":1,
			"frequency":"700",
			"range":["699-716","729-746"],
			"scsbw":{
				15:[5,10,15],
				30:[10,15],
				60:[]
			},
			"nrarfcn":[145800,149200]
		},
		14:{
			"type":"FDD",
			"freqrange":1,
			"frequency":"700",
			"range":["788-798","758-768"],
			"scsbw":{
				15:[5,10],
				30:[10],
				60:[]
			},
			"nrarfcn":[151600,153600]
		},
		18:{
			"type":"FDD",
			"freqrange":1,
			"frequency":"800",
			"range":["815-830","860-875"],
			"scsbw":{
				15:[5,10,15],
				30:[10,15],
				60:[]
			},
			"nrarfcn":[151600,153600]
		},
		20:{
			"type":"FDD",
			"freqrange":1,
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
			"freqrange":1,
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
			"freqrange":1,
			"frequency":"700",
			"range":["703-748","758-803"],
			"scsbw":{
				15:[5,10,15,20],
				30:[10,15,20],
				60:[]
			},
			"nrarfcn":[151600,160600]
		},
		29:{
			"type":"SDL",
			"freqrange":1,
			"frequency":"700",
			"range":["717-728"],
			"scsbw":{
				15:[5,10],
				30:[10],
				60:[]
			},
			"nrarfcn":[143400,145600]
		},
		30:{
			"type":"FDD",
			"freqrange":1,
			"frequency":"2300",
			"range":["2305-2315","2350-2360"],
			"scsbw":{
				15:[5,10],
				30:[10],
				60:[]
			},
			"nrarfcn":[470000,472000]
		},
		34:{
			"type":"TDD",
			"freqrange":1,
			"frequency":"2000",
			"range":["2010-2025"],
			"scsbw":{
				15:[5],
				30:[],
				60:[]
			},
			"nrarfcn":[402000,405000]
		},
		38:{
			"type":"TDD",
			"freqrange":1,
			"frequency":"2600",
			"range":["2570-2620"],
			"scsbw":{
				15:[5,10,15,20],
				30:[10,15,20],
				60:[10,15,20]
			},
			"nrarfcn":[514000,524000]
		},
		39:{
			"type":"TDD",
			"freqrange":1,
			"frequency":"1900",
			"range":["1880-1920"],
			"scsbw":{
				15:[5,10,15,20,25,30,40],
				30:[10,15,20,25,30,40],
				60:[10,15,20,25,30,40]
			},
			"nrarfcn":[376000,384000]
		},
		40:{
			"type":"TDD",
			"freqrange":1,
			"frequency":"2300",
			"range":["2300-2400"],
			"scsbw":{
				15:[5,10,15,20,25,30,40,50],
				30:[10,15,20,25,30,40,50,60,80,100],
				60:[10,15,20,25,30,40,50,60,80,100]
			},
			"nrarfcn":[460000,480000]
		},
		41:{
			"type":"TDD",
			"freqrange":1,
			"frequency":"2500",
			"range":["2496-2690"],
			"scsbw":{
				15:[5,10,15,20,40,50],
				30:[10,15,20,40,50,60,80,90,100],
				60:[10,15,20,40,50,60,80,90,100]
			},
			"nrarfcn":[499200,537999]
		},
		48:{
			"type":"TDD",
			"freqrange":1,
			"frequency":"3600",
			"range":["3550-3700"],
			"scsbw":{
				15:[5,10,15,20,40,50],
				30:[10,15,20,40,50,60,80,90,100],
				60:[10,15,20,40,50,60,80,90,100]
			},
			"nrarfcn":[636667,646666]
		},
		50:{
			"type":"TDD",
			"freqrange":1,
			"frequency":"1500",
			"range":["1432-1517"],
			"scsbw":{
				15:[5,10,15,20,40,50],
				30:[10,15,20,40,50,60,80],
				60:[10,15,20,40,50,60,80]
			},
			"nrarfcn":[499200,537999]
		},
		51:{
			"type":"TDD",
			"freqrange":1,
			"frequency":"1500",
			"range":["1427-1432"],
			"scsbw":{
				15:[5],
				30:[],
				60:[]
			},
			"nrarfcn":[499200,537999]
		},
		65:{
			"type":"FDD",
			"freqrange":1,
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
			"freqrange":1,
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
			"freqrange":1,
			"frequency":"2000",
			"range":["1695-1710","1995-2020"],
			"scsbw":{
				15:[5,10,15,20,25],
				30:[10,15,20,25],
				60:[10,15,20,25]
			},
			"nrarfcn":[399000,404000]
		},
		71:{
			"type":"FDD",
			"freqrange":1,
			"frequency":"600",
			"range":["663-698","617-652"],
			"scsbw":{
				15:[5,10,15,20],
				30:[10,15,20],
				60:[]
			},
			"nrarfcn":[123400,130400]
		},
		74:{
			"type":"FDD",
			"freqrange":1,
			"frequency":"1500",
			"range":["1427-1470","1475-1518"],
			"scsbw":{
				15:[5,10,15,20],
				30:[10,15,20],
				60:[10,15,20]
			},
			"nrarfcn":[295000,303600]
		},
		75:{
			"type":"SDL",
			"freqrange":1,
			"frequency":"1500",
			"range":["1432-1517"],
			"scsbw":{
				15:[5,10,15,20],
				30:[10,15,20],
				60:[10,15,20]
			},
			"nrarfcn":[286400,303400]
		},
		76:{
			"type":"SDL",
			"freqrange":1,
			"frequency":"1500",
			"range":["1427-1432"],
			"scsbw":{
				15:[5],
				30:[],
				60:[]
			},
			"nrarfcn":[285400,286400]
		},
		77:{
			"type":"TDD",
			"freqrange":1,
			"frequency":"3700",
			"range":["3300-4200"],
			"scsbw":{
				15:[10,15,20,30,40,50],
				30:[10,15,20,30,40,50,60,70,80,90,100],
				60:[10,15,20,30,40,50,60,70,80,90,100]
			},
			"nrarfcn":[620000,680000]
		},
		78:{
			"type":"TDD",
			"freqrange":1,
			"frequency":"3500",
			"range":["3300-3800"],
			"scsbw":{
				15:[10,15,20,30,40,50],
				30:[10,15,20,30,40,50,60,70,80,90,100],
				60:[10,15,20,30,40,50,60,70,80,90,100]
			},
			"nrarfcn":[620000,653333]
		},
		79:{
			"type":"TDD",
			"freqrange":1,
			"frequency":"4500",
			"range":["4400-5000"],
			"scsbw":{
				15:[40,50],
				30:[40,50,60,80,100],
				60:[40,50,60,80,100]
			},
			"nrarfcn":[693334,733333]
		},
		257:{
			"type":"TDD",
			"freqrange":2,
			"frequency":"28000",
			"range":["26500-29500"],
			"scsbw":{
				60:[50,100,200],
				120:[50,100,200,400]
			},
			"nrarfcn":[2054166,2104165]
		},
		258:{
			"type":"TDD",
			"freqrange":2,
			"frequency":"26000",
			"range":["24250-27500"],
			"scsbw":{
				60:[50,100,200],
				120:[50,100,200,400]
			},
			"nrarfcn":[2016667,2070832]
		},
		260:{
			"type":"TDD",
			"freqrange":2,
			"frequency":"39000",
			"range":["37000-40000"],
			"scsbw":{
				60:[50,100,200],
				120:[50,100,200,400]
			},
			"nrarfcn":[2229166,2279165]
		},
		261:{
			"type":"TDD",
			"freqrange":2,
			"frequency":"28000",
			"range":["27500-28350"],
			"scsbw":{
				60:[50,100,200],
				120:[50,100,200,400]
			},
			"nrarfcn":[2070833,2084999]
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
		},
		40:{
			15:216,
			30:106,
			60:51
		},
		50:{
			15:270,
			30:133,
			60:65
		},
		60:{
			15:null,
			30:162,
			60:79
		},
		80:{
			15:null,
			30:217,
			60:107
		},
		90:{
			15:null,
			30:245,
			60:121
		},
		100:{
			15:null,
			30:273,
			60:135
		}
	},
	selectors:{
		layers:{
			1:"1",
			2:"2",
			4:"4",
			8:"8"
		},
		modulation:{
			1:"BPSK",
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
			1.0:"1.0"
		}
	},
	name:{
		"band":_l["header.band"],
		"scs":_l["header.scs"],
		"options":_l["header.options"],
		"sfactor":_l["header.sfactor"],
		"bandwidth":_l["header.bandwidth"],
		"layers":_l["header.layers"],
		"modulation":_l["header.modulation"],
	},
	
	DEBUG:3,
	
	init:function(){
		s5g.ux.init();
		//s5g.sw.init();
		s5g.logic.addCarrier();
	},
	
	calc:{
		base:1e-6,
		scprb:12,	// Number of subcarriers in PRB
		symslot:14,	// Number of symbols in a slot (Normal CP)
		rMax:948/1024, // TODO: Add option to change this in future version
		
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
			return 1e-3/(s5g.calc.symslot * exp); //slot length = 1ms/2^scs
		},

		common:function(info,band){
			var c = {
				"dl": s5g.calc.base,
				"ul": s5g.calc.base
			};

			var layers = parseInt(info.layers);
			var coding = parseInt(info.modulation);	// TODO: Allow UL to have different coding scheme to DL
			var sFactor = parseFloat(info.sfactor);
			var scs = parseInt(info.scs);
			var sRbs = parseInt(info.bandwidth);

			var num = s5g.calc.numerology(scs);

			console.log(info);

			// MiMo value, we don't change the UL value as it is SISO
			c["dl"] = c["dl"] * layers;

			// Modulation scheme
			c["dl"] = c["dl"] * coding;
			c["ul"] = c["ul"] * coding;

			// Scaling factor
			c["dl"] = c["dl"] * sFactor;
			c["ul"] = c["ul"] * sFactor;

			// rMax
			c["dl"] = c["dl"] * s5g.calc.rMax;
			c["ul"] = c["ul"] * s5g.calc.rMax;

			// Sub-Carrier spacing
			var cNum = s5g.calc.scs(num);
			var tSc = s5g.nrRbData[sRbs][scs] * s5g.calc.scprb;
			var foo = tSc/cNum;

			c["dl"] = c["dl"] * foo;
			c["ul"] = c["ul"] * foo;

			return c;
		},

		fdd:{
			run:function(info,band){
				var c = s5g.calc.common(info,band);
				var freqRange = band.freqrange;

				console.log(c);

				// Overhead
				var retDl = c["dl"] * (1-s5g.nrFreqOverhead[freqRange][0]);
				var retUl = c["ul"] * (1-s5g.nrFreqOverhead[freqRange][1]);

				return [retDl,retUl];
			}
		},

		tdd:{
			run:function(info,band){
				var c = s5g.calc.common(info,band);


			}
		},

		carrier:function(info){
			var ret = [0,0];
			var band = s5g.nrBandData[info.band];

			switch (band.type){
				case "FDD":
					ret = s5g.calc.fdd.run(info,band);
					break;
				case "TDD":
					ret = s5g.calc.tdd.run(info,band);
					break;
				default:
					console.error("Unknown type");
					break;
			}

			// Round values
			ret[0] = s5g.calc.reduce(ret[0]);
			ret[1] = s5g.calc.reduce(ret[1]);
			
			if (s5g.DEBUG > 1) console.log("Calculation Complete for carrier",ret[0]+"Mbps Downlink",ret[1]+"Mbps Uplink");
			
			return ret;
		},
		run:function(){
			var sumDl = 0, sumUl = 0;
			
			for (var i in s5g.carriers){
				if (s5g.nrRbData[parseInt(s5g.carriers[i].bandwidth)] === undefined) continue;
				
				var carrierSpeed = s5g.calc.carrier(s5g.carriers[i]);
				
				s5g.ux.setRowSpeed(i,carrierSpeed);
				
				sumDl += carrierSpeed[0];
				if (s5g.carriers[i].uplinkAggregation === true || parseInt(i) === 0) sumUl += carrierSpeed[1];
			}
			
			return [sumDl,sumUl];
		}
	},
	
	logic:{
		changeCbs:{
			"band":function(caId){
				s5g.logic.resetCarrierData(caId,["band"]);

				if (s5g.carriers[caId]["band"] !== "0") {
					s5g.ux.populateSelectors(caId, ["scs"]);
					s5g.logic.setPopulateDefaults(caId, true);
				}
				
				// Re-Calculate speed
				s5g.logic.doCalculation();
			},
			"scs":function(caId){
				//s5g.logic.resetCarrierData(caId,["band","scs"]);
				s5g.ux.populateSelectors(caId,["bandwidth", "sfactor"]);
			},
			"sfactor":function(caId){

			},
			"bandwidth":function(caId){
				//s5g.logic.resetCarrierData(caId,["band","scs","bandwidth"]);
				s5g.ux.populateSelectors(caId,["layers","modulation", "sfactor"]);
			},
			"layers":function(){
				
			},
			"modulation":function(){
				
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
				layers:null,
				modulation:null,
				sfactor:null,
				scs:null,
				uplinkAggregation:false
			});
			
			var carrier = s5g.carriers.length-1;
			var render = s5g.carriers[carrier];
			
			// Render newly made carrier
			s5g.ux.renderCarrier(render,carrier);
			s5g.ux.inputError(1,[carrier,"band"]);
		},
		
		aggregateUplink:function(){
			var caId = s5g.logic.getCaId(this);
			s5g.carriers[caId].uplinkAggregation = !s5g.carriers[caId].uplinkAggregation;
			
			$(this).text(s5g.carriers[caId].uplinkAggregation === true ? _l["ux.deaggupl"] : _l["ux.aggupl"]);
			
			s5g.logic.doCalculation();
		},
		removeCarrier:function(){
			var caId = s5g.logic.getCaId(this);
			
			if (caId === 0){
				alert(_l["error.remprim"]);
				return;
			}
			
			s5g.carriers.splice(caId,1);
			s5g.ux.removeCarrier(caId);
			
			s5g.logic.doCalculation();
		},
		
		resetCarrierData:function(caId,attributes){
			var clearAttr = ["band","scs","sfactor","bandwidth","layers","modulation"];
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
				"layers":2,
				"modulation":4,
				"sfactor":1,
				"scs":30
			};
			
			var band = parseInt(s5g.carriers[caId].band);
			var data = s5g.nrBandData[band];
			
			if (data.scsbw[30].length === 0) 
				defaults["scs"] = 15;
			
			if (data.scsbw[parseInt(defaults["scs"])].indexOf(20) === -1) 
				defaults["bandwidth"] = data.scsbw[parseInt(defaults["scs"])][0];
			
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
			var required = ["bandwidth","layers","modulation","sfactor","scs"];
			
			var error = false;
			for (var i in s5g.carriers){
				var ca = s5g.carriers[i];
				
				if (isNaN(parseInt(ca.band)) || ca.band === "0") {
					error = true;
					s5g.ux.inputError(1,[i,"band"]);
					s5g.ux.updateRowTitle(i,s5g.ux.carrierName(i));
					continue;
				}
				
				if (s5g.DEBUG > 2) console.log(s5g.nrBandData[parseInt(ca.band)].type);
				if (s5g.nrBandData[parseInt(ca.band)].type === "TDD"){
					error = true;
					s5g.ux.inputError(2,[i]);
					break;
				}
				
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
			$("#add_carrier").text(_l["ux.addca"]).on("click enter",s5g.logic.addCarrier);

			document.title = _l["ux.title"];
			$("#page_title").text(_l["ux.title"]);
			$("#speeds").text(_l["alert.selband"]);
			
			$("#open_settings").hide();
			
			$("#ca_body").empty();
		},
		
		carrierName:function(caId){
			return (parseInt(caId) === 0 ? _l["label.primaryca"] : "Carrier S" + caId);
		},

		selectText:function(selector){
			return _l["label.select"] + " " + s5g.name[selector] + "...";
		},
		
		generate:{
			band:function(){
				var el = $("<div/>",{"class":"rowsect"}).append(
					$("<span/>",{"class":"rowsectheader"}).text(s5g.name.band)
				);
	
				el.append(
					$("<select/>",{
						"title":s5g.ux.selectText("band"),
						"data-selector":"band"
					}).append(
						$("<option/>",{"value":0}).text(s5g.ux.selectText("band"))
					).on("change",s5g.logic.selectNewValue)
				);
				
				return el;
			},
			options:function(){
				var el = $("<div/>",{"class":"rowsect"}).append(
					$("<span/>",{"class":"rowsectheader"}).text(s5g.name.options)
				);

				el.append(
					$("<span/>").text("not implemented")
				);

				return el;
			},
			scs:function(){
				var el = $("<div/>",{"class":"rowsect"}).append(
					$("<span/>",{"class":"rowsectheader"}).text(s5g.name.scs)
				);
	
				el.append(
					$("<select/>",{
						"title":s5g.ux.selectText("scs"),
						"data-selector":"scs"
					}).append(
						$("<option/>",{"value":0}).text(s5g.ux.selectText("scs"))
					).on("change",s5g.logic.selectNewValue)
				);
				
				return el;
			},
			sfactor:function(){
				var el = $("<div/>",{"class":"rowsect"}).append(
					$("<span/>",{"class":"rowsectheader"}).text(s5g.name.sfactor)
				);

				el.append(
					$("<select/>",{
						"title":s5g.ux.selectText("sfactor"),
						"data-selector":"sfactor"
					}).append(
						$("<option/>",{"value":0}).text(s5g.ux.selectText("sfactor"))
					).on("change",s5g.logic.selectNewValue)
				);

				return el;
			},
			bandwidth:function(){
				var el = $("<div/>",{"class":"rowsect"}).append(
					$("<span/>",{"class":"rowsectheader"}).text(s5g.name.bandwidth)
				);
	
				el.append(
					$("<select/>",{
						"title":s5g.ux.selectText("bandwidth"),
						"data-selector":"bandwidth"
					}).append(
						$("<option/>",{"value":0}).text(s5g.ux.selectText("bandwidth"))
					).on("change",s5g.logic.selectNewValue)
				);
				
				return el;
			},
			layers:function(){
				var el = $("<div/>",{"class":"rowsect"}).append(
					$("<span/>",{"class":"rowsectheader"}).text(s5g.name.layers)
				);
	
				el.append(
					$("<select/>",{
						"title":s5g.ux.selectText("layers"),
						"data-selector":"layers"
					}).append(
						$("<option/>",{"value":0}).text(s5g.ux.selectText("layers"))
					).on("change",s5g.logic.selectNewValue)
				);
				
				return el;
			},
			modulation:function(){
				var el = $("<div/>",{"class":"rowsect"}).append(
					$("<span/>",{"class":"rowsectheader"}).text(s5g.name.modulation)
				);
	
				el.append(
					$("<select/>",{
						"title":s5g.ux.selectText("modulation"),
						"data-selector":"modulation"
					}).append(
						$("<option/>",{"value":0}).text(s5g.ux.selectText("modulation"))
					).on("change",s5g.logic.selectNewValue)
				);
				
				return el;
			},

			rowOpts:function(isPrimary){
				var el = $("<div/>",{"class":"rowsect"}).append(
					$("<span/>",{"class":"rowsectheader"}).text(_l["label.options"])
				);
	
				// Every carrier should have this option
				el.append(
					$("<button/>",{"class":"b_rmrow"}).text(_l["ux.remca"]).on("click enter",s5g.logic.removeCarrier)
				);
	
				// Options for carriers that aren't the primary
				if (isPrimary){
					el.append(
						$("<button/>",{"class":"b_aggupl"}).text(_l["ux.aggupl"]).on("click enter",s5g.logic.aggregateUplink)
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
				el.slideUp(300);
			} else {
				el.slideDown(300);
			}
		},
		setRowSpeed:function(caId,speeds){
			var caName = s5g.ux.carrierName(caId);

			var caBandwidth = parseInt(s5g.carriers[caId].bandwidth);
			var caScs = parseInt(s5g.carriers[caId].scs);
			var rbsAvail = s5g.nrRbData[caBandwidth][caScs];
			var bandwidthTxt = caBandwidth + "MHz (" + rbsAvail + " RBs)";

			var dlSpeed = s5g.calc.round(speeds[0]);
			var ulSpeed = s5g.calc.round(speeds[1]);
			var speedTxt = "<strong>" + dlSpeed + "Mbps &#8595; &amp; " + ulSpeed + "Mbps &#8593;" + "</strong>";

			var band = parseInt(s5g.carriers[caId].band);
			var data = s5g.nrBandData[band];
			var bandTxt = "Band n" + band + ": " + data.frequency + "MHz";
			
			if (data.type === "FDD"){
				bandTxt += ", Uplink: " + data.range[0] + "MHz, Downlink: " + data.range[1] + "MHz";
			} else {
				bandTxt += ", Range: " + data.range[0] + "MHz";
			}
			
			s5g.ux.updateRowTitle(caId,caName + ": " + bandwidthTxt + "<br />" + speedTxt + "<br />" + bandTxt);
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
				s5g.ux.generate.options(),
				s5g.ux.generate.sfactor(),
				s5g.ux.generate.bandwidth(),
				s5g.ux.generate.layers(),
				s5g.ux.generate.modulation(),
				s5g.ux.generate.rowOpts((caId !== 0))
			);
			
			el.append(header,body);
			
			$("#ca_body").append(el);
			
			s5g.ux.populateSelectors(caId,["band"]);
		},
		removeCarrier:function(caId){
			$(".carrier_row[data-caid='" + caId + "']").remove();
		},
		
		resetSelector:function(caId,selector){
			if (s5g.DEBUG > 2) console.log("Reset",selector,"for",caId);

			$(".carrier_row[data-caid='" + caId + "'] div.rowcont div.rowsect select[data-selector='" + selector + "']").empty().append(
				$("<option/>",{"value":0}).text(s5g.ux.selectText(selector))
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
						s5g.ux.populateGeneric($(this),caId,sel);
						break;
				}
			});
		},
		populateBand:function(el,caId){
			var dKeys = Object.keys(s5g.nrBandData);
			
			el.empty().append(
				$("<option/>",{"value":0}).text(s5g.ux.selectText("band"))
			);
			
			for (var i = 0, l = dKeys.length;i<l;i++){
				if (s5g.nrBandData[dKeys[i]].frequency === "") continue;
				
				txt = _l["label.band"] + " " + dKeys[i];
				txt += " | " + s5g.nrBandData[dKeys[i]].type;
				txt += " (" + s5g.nrBandData[dKeys[i]].frequency + "MHz)";
				
				el.append(
					$("<option/>",{"value":dKeys[i]}).text(txt)
				);
			}
		},
		populateBandwidth:function(el,caId){
			var lastVal = parseInt(el.val());
			var scsData = s5g.nrBandData[s5g.carriers[caId].band].scsbw[s5g.carriers[caId].scs];
			var setDefault = true;
			
			el.empty();
			
			for (var i = 0, l = scsData.length;i<l;i++){
				txt = scsData[i] + "MHz";
				opts = {
					"value":scsData[i]
				};
				
				// Preserve current value
				if (scsData[i] === lastVal) {
					opts["selected"] = true;
					setDefault = false;
				}
				
				el.append(
					$("<option/>",opts).text(txt)
				);
			}
			
			if (setDefault === true){
				
			}
		},
		populateScs:function(el,caId){
			if (!s5g.nrBandData[s5g.carriers[caId].band]) return;

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
			var lastVal = el.val();
			
			el.empty();
			
			var keys = Object.keys(s5g.selectors[selector]);
			for (var i = 0, l = keys.length;i<l;i++){
				var opts = {
					"value":keys[i]
				};
				
				// Preserve current value
				if (keys[i] === lastVal) opts["selected"] = true;
				
				el.append(
					$("<option/>",opts).text(s5g.selectors[selector][keys[i]])
				);
			}
		},
		renderCalculation:function(data){
			if (data === false){
				$("#speeds").text(_l["error.speedfail"]);
				return;
			}
			
			var dl = s5g.calc.round(data[0]);
			var ul = s5g.calc.round(data[1]);
			
			$("#speeds").html(dl + "Mbps &#8595; &amp; " + ul + "Mbps &#8593;");
		},
		inputError:function(type,data){
			var el = $("#speeds");
			
			switch(type){
				case 1:
					el.text("Please enter " + data[1] + " for " + s5g.ux.carrierName(data[0]));
					break;
				case 2:
					el.text("Band not supported for " + s5g.ux.carrierName(data[0]));
					break;
				default:
					el.text(_l["error.generic"]);
					break;
			}
		}
	},
	
	sw:{
		init:function(){
			if (('serviceWorker' in navigator)) return;
			return;
			navigator.serviceWorker.register("nr-sw.js").then(function(registration){
				if (s5g.DEBUG > 1) console.log("ServiceWorker registration successful with scope:",registration.scope);
			},function(err){
				if (s5g.DEBUG > 1) console.log("ServiceWorker registration failed:",err);
			});
		}
	}
};


// Check that library loaded correctly
if (!window.jQuery){
	var j = document.createElement("script");
	j.src = "https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js";
	j.type = "text/javascript";
	j.onload = "s5g.init();";

	document.head.append(j);
} else {
	s5g.init();
}