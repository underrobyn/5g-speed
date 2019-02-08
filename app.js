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
	carriers:[],
	
	init:function(){
		s5g.ux.init();
		//s5g.sw.init();
		s5g.logic.addCarrier();
	},
	
	calc:{
		base:1e-6,
		rMax:948/1024,
		n:{
			0:
		}
		
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
		addCarrier:function(){
			// Push default carrier template
			s5g.carriers.push({
				band:null,
				bandwidth:null,
				streams:null,
				modulation:null,
				sfactor:null,
				subCarrierSpacing:null,
				overhead:null
			});
			
			// Render newly made carrier
			s5g.ux.renderCarrier(s5g.carriers.pop());
			
			// Re-Calculate speed
			s5g.logic.doCalculation();
		},
		removeCarrier:function(){
			
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
			
			$("#page_title").text("5G Theoretical Throughput Calculator");
			
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
						"class":"rowopt_band"
					}).append($("<option/>",{"value":0}).text("Select Band..."))
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
						"class":"rowopt_band"
					}).append($("<option/>",{"value":0}).text("Select Bandwidth..."))
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
						"class":"rowopt_band"
					}).append($("<option/>",{"value":0}).text("Select Stream Count..."))
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
						"class":"rowopt_band"
					}).append($("<option/>",{"value":0}).text("Select Modulation..."))
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
						"class":"rowopt_band"
					}).append($("<option/>",{"value":0}).text("Select SCS..."))
				);
				
				return el;
			},
			rowOpts:function(isPrimary){
				var el = $("<div/>",{"class":"rowsect"}).append(
					$("<span/>",{"class":"rowsectheader"}).text("Options")
				);
	
				// Every carrier should have this option
				el.append(
					$("<button/>",{"class":"b_rmrow"}).text("Remove Carrier")
				);
	
				// Options for carriers that aren't the primary
				if (isPrimary){
					el.append(
						$("<button/>",{"class":"b_aggupl"}).text("Aggregate Uplink")
					);
				}
				
				return el;
			}
		},
		renderCarrier:function(info){
			var el = $("<div/>",{
				"class":"carrier_row"
			});
			
			el.append(
				s5g.ux.generate.band(),
				s5g.ux.generate.bandwidth(),
				s5g.ux.generate.streams(),
				s5g.ux.generate.modulation(),
				s5g.ux.generate.scs(),
				s5g.ux.generate.rowOpts(true)
			);
			
			$("#ca_body").append(el);
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