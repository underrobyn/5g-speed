/*
 * 	5G Speed Calculator
 *	Developed by AbsoluteDouble
 *	GitHub: https://github.com/jake-cryptic/5g-speed
 * 	Website: https://absolutedouble.co.uk/
*/

// Polyfill: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/includes#Polyfill
if (!String.prototype.includes) {
	String.prototype.includes = function (search, start) {
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

if (!window.location.host.includes("absolutedouble.co.uk") && !window.location.host.includes("localhost")) {
	console.log("\n5G Theoretical Throughput Calculator");
	console.log("Developed by AbsoluteDouble");
	console.log("Website: https://absolutedouble.co.uk");
	console.log("Github: https://github.com/jake-cryptic/5g-speed");
}

let s5g = {
	haltCalculation: false,
	followSpec: false,
	carriers: [],
	nrFreqOverhead: {
		1: [0.14, 0.08],
		2: [0.18, 0.10]
	},
	nrBandData: {
		1: {
			"type": "FDD",
			"rel": 15.0,
			"freqrange": 1,
			"frequency": "2100",
			"range": ["1920-1980", "2110-2170"],
			"scsbw": {
				"dl": {
					15: [5, 10, 15, 20, 25, 30, 40, 50],
					30: [10, 15, 20, 25, 30, 40, 50],
					60: [10, 15, 20, 25, 30, 40, 50]
				}
			},
			"nrarfcn": [422000, 434000]
		},
		2: {
			"type": "FDD",
			"rel": 15.0,
			"freqrange": 1,
			"frequency": "1900",
			"range": ["1850-1910", "1930-1990"],
			"scsbw": {
				"dl": {
					15: [5, 10, 15, 20],
					30: [10, 15, 20],
					60: [10, 15, 20]
				}
			},
			"nrarfcn": [386000, 398000]
		},
		3: {
			"type": "FDD",
			"rel": 15.0,
			"freqrange": 1,
			"frequency": "1800",
			"range": ["1710-1785", "1805-1880"],
			"scsbw": {
				"dl": {
					15: [5, 10, 15, 20, 25, 30, 40],
					30: [10, 15, 20, 25, 30, 40],
					60: [10, 15, 20, 25, 30, 40]
				}
			},
			"nrarfcn": [361000, 376000]
		},
		5: {
			"type": "FDD",
			"rel": 15.0,
			"freqrange": 1,
			"frequency": "850",
			"range": ["824-849", "869-894"],
			"scsbw": {
				"dl": {
					15: [5, 10, 15, 20],
					30: [10, 15, 20],
					60: []
				}
			},
			"nrarfcn": [173800, 178800]
		},
		7: {
			"type": "FDD",
			"rel": 15.0,
			"freqrange": 1,
			"frequency": "2600",
			"range": ["2500-2570", "2620-2690"],
			"scsbw": {
				"dl": {
					15: [5, 10, 15, 20, 25, 30, 40, 50],
					30: [10, 15, 20, 25, 30, 40, 50],
					60: [10, 15, 20, 25, 30, 40, 50]
				}
			},
			"nrarfcn": [524000, 538000]
		},
		8: {
			"type": "FDD",
			"rel": 15.0,
			"freqrange": 1,
			"frequency": "900",
			"range": ["880-915", "925-960"],
			"scsbw": {
				"dl": {
					15: [5, 10, 15, 20],
					30: [10, 15, 20],
					60: []
				}
			},
			"nrarfcn": [185000, 192000]
		},
		12: {
			"type": "FDD",
			"rel": 15.2,
			"freqrange": 1,
			"frequency": "700",
			"range": ["699-716", "729-746"],
			"scsbw": {
				"dl": {
					15: [5, 10, 15],
					30: [10, 15],
					60: []
				}
			},
			"nrarfcn": [145800, 149200]
		},
		13: {
			"type": "FDD",
			"rel": 17.0,
			"freqrange": 1,
			"frequency": "700",
			"range": ["777-787", "746-756"],
			"scsbw": {
				"dl": {
					15: [5, 10],
					30: [10],
					60: []
				}
			},
			"nrarfcn": [149200, 151200]
		},
		14: {
			"type": "FDD",
			"rel": 16.0,
			"freqrange": 1,
			"frequency": "700",
			"range": ["788-798", "758-768"],
			"scsbw": {
				"dl": {
					15: [5, 10],
					30: [10],
					60: []
				}
			},
			"nrarfcn": [151600, 153600]
		},
		18: {
			"type": "FDD",
			"rel": 16.0,
			"freqrange": 1,
			"frequency": "800",
			"range": ["815-830", "860-875"],
			"scsbw": {
				"dl": {
					15: [5, 10, 15],
					30: [10, 15],
					60: []
				}
			},
			"nrarfcn": [151600, 153600]
		},
		20: {
			"type": "FDD",
			"rel": 15.0,
			"freqrange": 1,
			"frequency": "800",
			"range": ["832-862", "791-821"],
			"scsbw": {
				"dl": {
					15: [5, 10, 15, 20],
					30: [10, 15, 20],
					60: []
				}
			},
			"nrarfcn": [158200, 164200]
		},
		24: {
			"type": "FDD",
			"rel": 17.1,
			"freqrange": 1,
			"frequency": "1600",
			"range": ["1626.5-1660.5", "1525-1559"],
			"scsbw": {
				"dl": {
					15: [5, 10, 15, 20],
					30: [10, 15, 20],
					60: []
				}
			},
			"nrarfcn": [305000, 311800]
		},
		25: {
			"type": "FDD",
			"rel": 15.2,
			"freqrange": 1,
			"frequency": "1900",
			"range": ["1850-1915", "1930-1995"],
			"scsbw": {
				"dl": {
					15: [5, 10, 15, 20, 25, 30, 40],
					30: [10, 15, 20, 25, 30, 40],
					60: [10, 15, 20, 25, 30, 40]
				}
			},
			"nrarfcn": [386000, 399000]
		},
		26: {
			"type": "FDD",
			"rel": 16.3,
			"freqrange": 1,
			"frequency": "850",
			"range": ["814-849", "859-894"],
			"scsbw": {
				"dl": {
					15: [5, 10, 15, 20],
					30: [10, 15, 20],
					60: [10, 15, 20]
				}
			},
			"nrarfcn": [171800, 178800]
		},
		28: {
			"type": "FDD",
			"rel": 15.0,
			"freqrange": 1,
			"frequency": "700",
			"range": ["703-748", "758-803"],
			"scsbw": {
				"dl": {
					15: [5, 10, 15, 20, 30, 40],
					30: [10, 15, 20, 30, 40],
					60: []
				}
			},
			"nrarfcn": [151600, 160600]
		},
		29: {
			"type": "SDL",
			"rel": 16.1,
			"freqrange": 1,
			"frequency": "700",
			"range": ["717-728"],
			"scsbw": {
				"dl": {
					15: [5, 10],
					30: [10],
					60: []
				}
			},
			"nrarfcn": [143400, 145600]
		},
		30: {
			"type": "FDD",
			"rel": 16.0,
			"freqrange": 1,
			"frequency": "2300",
			"range": ["2305-2315", "2350-2360"],
			"scsbw": {
				"dl": {
					15: [5, 10],
					30: [10],
					60: []
				}
			},
			"nrarfcn": [470000, 472000]
		},
		34: {
			"type": "TDD",
			"rel": 15.2,
			"freqrange": 1,
			"frequency": "2000",
			"range": ["2010-2025"],
			"scsbw": {
				"dl": {
					15: [5, 10, 15],
					30: [10, 15],
					60: [10, 15]
				}
			},
			"nrarfcn": [402000, 405000]
		},
		38: {
			"type": "TDD",
			"rel": 15.0,
			"freqrange": 1,
			"frequency": "2600",
			"range": ["2570-2620"],
			"scsbw": {
				"dl": {
					15: [5, 10, 15, 20, 25, 30, 40],
					30: [10, 15, 20, 25, 30, 40],
					60: [10, 15, 20, 25, 30, 40]
				}
			},
			"nrarfcn": [514000, 524000]
		},
		39: {
			"type": "TDD",
			"rel": 15.2,
			"freqrange": 1,
			"frequency": "1900",
			"range": ["1880-1920"],
			"scsbw": {
				"dl": {
					15: [5, 10, 15, 20, 25, 30, 40],
					30: [10, 15, 20, 25, 30, 40],
					60: [10, 15, 20, 25, 30, 40]
				}
			},
			"nrarfcn": [376000, 384000]
		},
		40: {
			"type": "TDD",
			"rel": 15.2,
			"freqrange": 1,
			"frequency": "2300",
			"range": ["2300-2400"],
			"scsbw": {
				"dl": {
					15: [5, 10, 15, 20, 25, 30, 40, 50],
					30: [10, 15, 20, 25, 30, 40, 50, 60, 80, 90, 100],
					60: [10, 15, 20, 25, 30, 40, 50, 60, 80, 90, 100]
				}
			},
			"nrarfcn": [460000, 480000]
		},
		41: {
			"type": "TDD",
			"rel": 15.0,
			"freqrange": 1,
			"frequency": "2500",
			"range": ["2496-2690"],
			"scsbw": {
				"dl": {
					15: [10, 15, 20, 40, 50],
					30: [10, 15, 20, 40, 50, 60, 80, 90, 100],
					60: [10, 15, 20, 40, 50, 60, 80, 90, 100]
				}
			},
			"nrarfcn": [499200, 537999]
		},
		/*46:{
			"type":"TDD",
			"rel":16.5,
			"freqrange":1,
			"frequency":"3600",
			"range":["3550-3700"],
			"scsbw":{
				"dl":{
					15:[5,10,15,20,40,50],
					30:[10,15,20,40,50,60,80,90,100],
					60:[10,15,20,40,50,60,80,90,100]
				}
			},
			"nrarfcn":[636667,646666]
		},*/
		48: {
			"type": "TDD",
			"rel": 16.0,
			"freqrange": 1,
			"frequency": "3600",
			"range": ["3550-3700"],
			"scsbw": {
				"dl": {
					15: [5, 10, 15, 20, 40, 50],
					30: [10, 15, 20, 40, 50, 60, 80, 90, 100],
					60: [10, 15, 20, 40, 50, 60, 80, 90, 100]
				}
			},
			"nrarfcn": [636667, 646666]
		},
		50: {
			"type": "TDD",
			"rel": 15.3,
			"freqrange": 1,
			"frequency": "1500",
			"range": ["1432-1517"],
			"scsbw": {
				"dl": {
					15: [5, 10, 15, 20, 40, 50],
					30: [10, 15, 20, 40, 50, 60, 80],
					60: [10, 15, 20, 40, 50, 60, 80]
				}
			},
			"nrarfcn": [499200, 537999]
		},
		51: {
			"type": "TDD",
			"rel": 15.0,
			"freqrange": 1,
			"frequency": "1500",
			"range": ["1427-1432"],
			"scsbw": {
				"dl": {
					15: [5],
					30: [],
					60: []
				}
			},
			"nrarfcn": [499200, 537999]
		},
		53: {
			"type": "TDD",
			"rel": 16.3,
			"freqrange": 1,
			"frequency": "2500",
			"range": ["2383.5-2495"],
			"scsbw": {
				"dl": {
					15: [5, 10],
					30: [10],
					60: [10]
				}
			},
			"nrarfcn": [496700, 499000]
		},
		65: {
			"type": "FDD",
			"rel": 16.0,
			"freqrange": 1,
			"frequency": "2100",
			"range": ["1920-2010", "2110-2200"],
			"scsbw": {
				"dl": {
					15: [5, 10, 15, 20, 50],
					30: [10, 15, 20, 50],
					60: [10, 15, 20, 50]
				}
			},
			"nrarfcn": [422000, 440000]
		},
		66: {
			"type": "FDD",
			"rel": 15.0,
			"freqrange": 1,
			"frequency": "1700",
			"range": ["1710-1780", "2110-2200"],
			"scsbw": {
				"dl": {
					15: [5, 10, 15, 20, 25, 30, 40],
					30: [10, 15, 20, 25, 30, 40],
					60: [10, 15, 20, 25, 30, 40]
				}
			},
			"nrarfcn": [422000, 440000]
		},
		67: {
			"type": "SDL",
			"rel": 17.2,
			"freqrange": 1,
			"frequency": "700",
			"range": ["738-758"],
			"scsbw": {
				"dl": {
					15: [5, 10, 15, 20],
					30: [10, 15, 20],
					60: []
				}
			},
			"nrarfcn": [147600, 151600]
		},
		70: {
			"type": "FDD",
			"rel": 15.0,
			"freqrange": 1,
			"frequency": "2000",
			"range": ["1695-1710", "1995-2020"],
			"scsbw": {
				"dl": {
					15: [5, 10, 15, 20, 25],
					30: [10, 15, 20, 25],
					60: [10, 15, 20, 25]
				}
			},
			"nrarfcn": [399000, 404000]
		},
		71: {
			"type": "FDD",
			"rel": 15.0,
			"freqrange": 1,
			"frequency": "600",
			"range": ["663-698", "617-652"],
			"scsbw": {
				"dl": {
					15: [5, 10, 15, 20],
					30: [10, 15, 20],
					60: []
				}
			},
			"nrarfcn": [123400, 130400]
		},
		74: {
			"type": "FDD",
			"rel": 15.3,
			"freqrange": 1,
			"frequency": "1500",
			"range": ["1427-1470", "1475-1518"],
			"scsbw": {
				"dl": {
					15: [5, 10, 15, 20],
					30: [10, 15, 20],
					60: [10, 15, 20]
				}
			},
			"nrarfcn": [295000, 303600]
		},
		75: {
			"type": "SDL",
			"rel": 15.0,
			"freqrange": 1,
			"frequency": "1500",
			"range": ["1432-1517"],
			"scsbw": {
				"dl": {
					15: [5, 10, 15, 20, 25, 30, 40, 50],
					30: [10, 15, 20, 25, 30, 40, 50],
					60: [10, 15, 20, 25, 30, 40, 50]
				}
			},
			"nrarfcn": [286400, 303400]
		},
		76: {
			"type": "SDL",
			"rel": 15.0,
			"freqrange": 1,
			"frequency": "1500",
			"range": ["1427-1432"],
			"scsbw": {
				"dl": {
					15: [5],
					30: [],
					60: []
				}
			},
			"nrarfcn": [285400, 286400]
		},
		77: {
			"type": "TDD",
			"rel": 15.0,
			"freqrange": 1,
			"frequency": "3700",
			"range": ["3300-4200"],
			"scsbw": {
				"dl": {
					15: [10, 15, 20, 30, 40, 50],
					30: [10, 15, 20, 30, 40, 50, 60, 70, 80, 90, 100],
					60: [10, 15, 20, 30, 40, 50, 60, 70, 80, 90, 100]
				}
			},
			"nrarfcn": [620000, 680000]
		},
		78: {
			"type": "TDD",
			"rel": 15.0,
			"freqrange": 1,
			"frequency": "3500",
			"range": ["3300-3800"],
			"scsbw": {
				"dl": {
					15: [10, 15, 20, 30, 40, 50],
					30: [10, 15, 20, 30, 40, 50, 60, 70, 80, 90, 100],
					60: [10, 15, 20, 30, 40, 50, 60, 70, 80, 90, 100]
				}
			},
			"nrarfcn": [620000, 653333]
		},
		79: {
			"type": "TDD",
			"rel": 15.0,
			"freqrange": 1,
			"frequency": "4500",
			"range": ["4400-5000"],
			"scsbw": {
				"dl": {
					15: [40, 50],
					30: [40, 50, 60, 80, 100],
					60: [40, 50, 60, 80, 100]
				}
			},
			"nrarfcn": [693334, 733333]
		},
		80: {
			"type": "SUL",
			"rel": 15.0,
			"freqrange": 1,
			"frequency": "1800",
			"range": ["1710-1785"],
			"scsbw": {
				"dl": {
					15: [5, 10, 15, 20, 25, 30],
					30: [10, 15, 20, 25, 30],
					60: [10, 15, 20, 25, 30]
				}
			},
			"nrarfcn": [342000, 357000]
		},
		81: {
			"type": "SUL",
			"rel": 15.0,
			"freqrange": 1,
			"frequency": "900",
			"range": ["880-915"],
			"scsbw": {
				"dl": {
					15: [5, 10, 15, 20],
					30: [10, 15, 20],
					60: []
				}
			},
			"nrarfcn": [176000, 183000]
		},
		82: {
			"type": "SUL",
			"rel": 15.0,
			"freqrange": 1,
			"frequency": "800",
			"range": ["832-862"],
			"scsbw": {
				"dl": {
					15: [5, 10, 15, 20],
					30: [10, 15, 20],
					60: []
				}
			},
			"nrarfcn": [166400, 172400]
		},
		83: {
			"type": "SUL",
			"rel": 15.0,
			"freqrange": 1,
			"frequency": "700",
			"range": ["703-748"],
			"scsbw": {
				"dl": {
					15: [5, 10, 15, 20],
					30: [10, 15, 20],
					60: []
				}
			},
			"nrarfcn": [140600, 149600]
		},
		84: {
			"type": "SUL",
			"rel": 15.0,
			"freqrange": 1,
			"frequency": "2100",
			"range": ["1920-1980"],
			"scsbw": {
				"dl": {
					15: [5, 10, 15, 20],
					30: [10, 15, 20],
					60: [10, 15, 20]
				}
			},
			"nrarfcn": [384000, 396000]
		},
		86: {
			"type": "SUL",
			"rel": 15.2,
			"freqrange": 1,
			"frequency": "1700",
			"range": ["1710-1780"],
			"scsbw": {
				"dl": {
					15: [5, 10, 15, 20, 40],
					30: [10, 15, 20, 40],
					60: [10, 15, 20, 40]
				}
			},
			"nrarfcn": [342000, 356000]
		},
		89: {
			"type": "SUL",
			"rel": 16.1,
			"freqrange": 1,
			"frequency": "850",
			"range": ["824-849"],
			"scsbw": {
				"dl": {
					15: [5, 10, 15, 20],
					30: [10, 15, 20],
					60: []
				}
			},
			"nrarfcn": [164800, 169800]
		},
		90: {
			"type": "TDD",
			"rel": 16.0,
			"freqrange": 1,
			"frequency": "2600",
			"range": ["2496-2690"],
			"scsbw": {
				"dl": {
					15: [10, 15, 20, 40, 50],
					30: [10, 15, 20, 40, 50, 60, 70, 80, 90, 100],
					60: [10, 15, 20, 40, 50, 60, 70, 80, 90, 100]
				}
			},
			"nrarfcn": [499200, 538000]
		},
		91: {
			"type": "FDD",
			"rel": 16.2,
			"freqrange": 1,
			"frequency": "1500",
			"range": ["832-862", "1427-1432"],
			"scsbw": {
				"dl": {
					15: [5],
					30: [],
					60: []
				},
				"ul": {
					15: [5, 10],
					30: [],
					60: []
				}
			},
			"nrarfcn": [285400, 286400]
		},
		92: {
			"type": "FDD",
			"rel": 16.2,
			"freqrange": 1,
			"frequency": "1500",
			"range": ["832-862", "1432-1517"],
			"scsbw": {
				"dl": {
					15: [5, 10, 15, 20],
					30: [10, 15, 20],
					60: []
				}
			},
			"nrarfcn": [285400, 286400]
		},
		93: {
			"type": "FDD",
			"rel": 16.2,
			"freqrange": 1,
			"frequency": "1500",
			"range": ["880-915", "1427-1432"],
			"scsbw": {
				"dl": {
					15: [5],
					30: [],
					60: []
				},
				"ul": {
					15: [5, 10],
					30: [],
					60: []
				}
			},
			"nrarfcn": [285400, 286400]
		},
		94: {
			"type": "FDD",
			"rel": 16.2,
			"freqrange": 1,
			"frequency": "1500",
			"range": ["880-915", "1427-1432"],
			"scsbw": {
				"dl": {
					15: [5, 10, 15, 20],
					30: [10, 15, 20],
					60: []
				}
			},
			"nrarfcn": [286400, 303400]
		},
		95: {
			"type": "SUL",
			"rel": 16.2,
			"freqrange": 1,
			"frequency": "2000",
			"range": ["2010-2050"],
			"scsbw": {
				"dl": {
					15: [5, 10, 15],
					30: [10, 15],
					60: [10, 15]
				}
			},
			"nrarfcn": [402000, 405000]
		},
		96: {
			"type": "TDD",
			"rel": 16.5,
			"freqrange": 1,
			"frequency": "6500",
			"range": ["5925-7125"],
			"scsbw": {
				"dl": {
					15: [20, 40],
					30: [20, 40, 60, 80],
					60: [20, 40, 60, 80]
				}
			},
			"nrarfcn": [795000, 875000]
		},
		97: {
			"type": "SUL",
			"rel": 17.0,
			"freqrange": 1,
			"frequency": "2300",
			"range": ["2300-2400"],
			"scsbw": {
				"dl": {
					15: [5, 10, 15, 20, 25, 30, 40, 50],
					30: [10, 15, 20, 25, 30, 40, 50, 60, 80],
					60: [10, 15, 20, 25, 30, 40, 50, 60, 80]
				}
			},
			"nrarfcn": [460000, 480000]
		},
		98: {
			"type": "SUL",
			"rel": 17.0,
			"freqrange": 1,
			"frequency": "1900",
			"range": ["1880-1920"],
			"scsbw": {
				"dl": {
					15: [5, 10, 15, 20, 25, 30, 40],
					30: [10, 15, 20, 25, 30, 40],
					60: [10, 15, 20, 25, 30, 40]
				}
			},
			"nrarfcn": [376000, 384000]
		},
		99: {
			"type": "SUL",
			"rel": 17.1,
			"freqrange": 1,
			"frequency": "1600",
			"range": ["1626.5-1660.5"],
			"scsbw": {
				"dl": {
					15: [5, 10],
					30: [10],
					60: [10]
				}
			},
			"nrarfcn": [325300, 332100]
		},
		257: {
			"type": "TDD",
			"freqrange": 2,
			"frequency": "28000",
			"range": ["26500-29500"],
			"scsbw": {
				"dl": {
					60: [50, 100, 200],
					120: [50, 100, 200, 400]
				}
			},
			"nrarfcn": [2054166, 2104165]
		},
		258: {
			"type": "TDD",
			"freqrange": 2,
			"frequency": "26000",
			"range": ["24250-27500"],
			"scsbw": {
				"dl": {
					60: [50, 100, 200],
					120: [50, 100, 200, 400]
				}
			},
			"nrarfcn": [2016667, 2070832]
		},
		259: {
			"type": "TDD",
			"freqrange": 2,
			"frequency": "41000",
			"range": ["39500-43500"],
			"scsbw": {
				"dl": {
					60: [50, 100, 200],
					120: [50, 100, 200, 400]
				}
			},
			"nrarfcn": [2270832, 2337499]
		},
		260: {
			"type": "TDD",
			"freqrange": 2,
			"frequency": "39000",
			"range": ["37000-40000"],
			"scsbw": {
				"dl": {
					60: [50, 100, 200],
					120: [50, 100, 200, 400]
				}
			},
			"nrarfcn": [2229166, 2279165]
		},
		261: {
			"type": "TDD",
			"freqrange": 2,
			"frequency": "28000",
			"range": ["27500-28350"],
			"scsbw": {
				"dl": {
					60: [50, 100, 200],
					120: [50, 100, 200, 400]
				}
			},
			"nrarfcn": [2070833, 2084999]
		}
	},
	nrRbData: {
		1: {
			5: {
				15: 25,
				30: 11,		// Info: This will never be used
				60: null
			},
			10: {
				15: 52,
				30: 24,
				60: 11
			},
			15: {
				15: 79,
				30: 38,
				60: 18
			},
			20: {
				15: 106,
				30: 51,
				60: 24
			},
			25: {
				15: 133,
				30: 65,
				60: 31
			},
			30: {
				15: 160,
				30: 78,
				60: 38
			},
			40: {
				15: 216,
				30: 106,
				60: 51
			},
			50: {
				15: 270,
				30: 133,
				60: 65
			},
			60: {
				15: null,
				30: 162,
				60: 79
			},
			80: {
				15: null,
				30: 217,
				60: 107
			},
			90: {
				15: null,
				30: 245,
				60: 121
			},
			100: {
				15: null,
				30: 273,
				60: 135
			}
		},
		2: {
			50: {
				60: 66,
				120: 32
			},
			100: {
				60: 132,
				120: 66
			},
			200: {
				60: 264,
				120: 132
			},
			400: {
				60: null,
				120: 264
			}
		}
	},
	nrTddConf: [
		"DDDDDDDDDDDDDD",
		"UUUUUUUUUUUUUU",
		"FFFFFFFFFFFFFF",
		"DDDDDDDDDDDDDF",
		"DDDDDDDDDDDDFF",
		"DDDDDDDDDDDFFF",
		"DDDDDDDDDDFFFF",
		"DDDDDDDDDFFFFF",
		"FFFFFFFFFFFFFU",
		"FFFFFFFFFFFFUU",
		"FUUUUUUUUUUUUU",
		"FFUUUUUUUUUUUU",
		"FFFUUUUUUUUUUU",
		"FFFFUUUUUUUUUU",
		"FFFFFUUUUUUUUU",
		"FFFFFFUUUUUUUU",
		"DFFFFFFFFFFFFF",
		"DDFFFFFFFFFFFF",
		"DDDFFFFFFFFFFF",
		"DFFFFFFFFFFFFU",
		"DDFFFFFFFFFFFU",
		"DDDFFFFFFFFFFU",
		"DFFFFFFFFFFFUU",
		"DDFFFFFFFFFFUU",
		"DDDFFFFFFFFFUU",
		"DFFFFFFFFFFUUU",
		"DDFFFFFFFFFUUU",
		"DDDFFFFFFFFUUU",
		"DDDDDDDDDDDDFU",
		"DDDDDDDDDDDFFU",
		"DDDDDDDDDDFFFU",
		"DDDDDDDDDDDFUU",
		"DDDDDDDDDDFFUU",
		"DDDDDDDDDFFFUU",
		"DFUUUUUUUUUUUU",
		"DDFUUUUUUUUUUU",
		"DDDFUUUUUUUUUU",
		"DFFUUUUUUUUUUU",
		"DDFFUUUUUUUUUU",
		"DDDFFUUUUUUUUU",
		"DFFFUUUUUUUUUU",
		"DDFFFUUUUUUUUU",
		"DDDFFFUUUUUUUU",
		"DDDDDDDDDFFFFU",
		"DDDDDDFFFFFFUU",
		"DDDDDDFFUUUUUU",
		"DDDDDFUDDDDDFU",
		"DDFUUUUDDFUUUU",
		"DFUUUUUDFUUUUU",
		"DDDDFFUDDDDFFU",
		"DDFFUUUDDFFUUU",
		"DFFUUUUDFFUUUU",
		"DFFFFFUDFFFFFU",
		"DDFFFFUDDFFFFU",
		"FFFFFFFDDDDDDD",
		"DDFFFUUUDDDDDD"
	],
	selectors: {
		dlLayers: {
			1: "1",
			2: "2",
			4: "4",
			8: "8"
		},
		ulLayers: {
			1: "1",
			2: "2",
			4: "4"
		},
		dlModulation: {
			1: "BPSK",
			2: "QPSK",
			4: "16QAM",
			6: "64QAM",
			8: "256QAM"
		},
		ulModulation: {
			1: "BPSK",
			2: "QPSK",
			4: "16QAM",
			6: "64QAM",
			8: "256QAM"
		},
		bandwidth: {
			5: "5MHz",
			10: "10MHz",
			15: "15MHz",
			20: "20MHz",
			25: "25MHz",
			30: "30MHz",
			40: "40MHz",
			50: "50MHz",
			60: "60MHz",
			80: "80MHz",
			90: "90MHz",
			100: "100MHz",
			200: "200MHz",
			400: "400MHz"
		},
		sfactor: {
			0.4: "0.4",
			0.5: "0.5",
			0.65: "0.65",
			0.75: "0.75",
			0.8: "0.8",
			1.0: "1.0"
		}
	},
	name: {
		"band": _l["header.band"],
		"scs": _l["header.scs"],
		"bandconf": _l["header.bandconf"],
		"sfactor": _l["header.sfactor"],
		"bandwidth": _l["header.bandwidth"],
		"dlBandwidth": _l["header.dlbandwidth"],
		"ulBandwidth": _l["header.ulbandwidth"],
		"layers": _l["header.layers"],
		"dlLayers": _l["header.dllayers"],
		"ulLayers": _l["header.ullayers"],
		"modulation": _l["header.modulation"],
		"dlModulation": _l["header.dlmodulation"],
		"ulModulation": _l["header.ulmodulation"],
		"tddSlotFormat": _l["header.tddslotformat"]
	},

	DEBUG: 3,

	init: function () {
		s5g.ux.init();
		s5g.sw.init();
		s5g.logic.addCarrier();
	},

	calc: {
		base: 1e-6,
		scprb: 12,	// Number of subcarriers in PRB
		symslot: 14,	// Number of symbols in a slot (Normal CP)
		frametime: 10,	// Frame time (in ms)
		rMax: 948 / 1024, // TODO: Add option to change this in future version

		reduce: function (n) {
			return Math.round(n * 10000) / 10000;
		},
		round: function (n) {
			return Math.round(n * 100) / 100;
		},
		numerology: function (scs) {
			if (scs === 15) return 0;
			if (scs === 30) return 1;
			if (scs === 60) return 2;
			if (scs === 120) return 3;
		},
		scs: function (scs) {
			let exp = Math.pow(2, scs);
			return 1e-3 / (s5g.calc.symslot * exp); //slot length = 1ms/2^scs
		},

		common: function (info, band) {
			let c = {
				"dl": s5g.calc.base,
				"ul": s5g.calc.base
			};

			let dlLayers = parseInt(info.dlLayers),
				ulLayers = parseInt(info.ulLayers);

			let dlCoding = parseInt(info.dlModulation),
				ulCoding = parseInt(info.ulModulation);

			let sFactor = parseFloat(info.sfactor);

			let scs = parseInt(info.scs);

			let sDlRbs = parseInt(info.dlBandwidth),
				sUlRbs = parseInt(info.ulBandwidth);

			if (info.ulBandwidth === null) sUlRbs = sDlRbs;

			let num = s5g.calc.numerology(scs);

			// Number of layers in use
			c["dl"] = c["dl"] * dlLayers;
			c["ul"] = c["ul"] * ulLayers;

			// Modulation scheme
			c["dl"] = c["dl"] * dlCoding;
			c["ul"] = c["ul"] * ulCoding;

			// Scaling factor
			c["dl"] = c["dl"] * sFactor;
			c["ul"] = c["ul"] * sFactor;

			// rMax
			c["dl"] = c["dl"] * s5g.calc.rMax;
			c["ul"] = c["ul"] * s5g.calc.rMax;

			// Sub-Carrier spacing
			let cNum = s5g.calc.scs(num);

			let tDlSc = s5g.nrRbData[band.freqrange][sDlRbs][scs] * s5g.calc.scprb,
				tUlSc = s5g.nrRbData[band.freqrange][sUlRbs][scs] * s5g.calc.scprb;

			c["dl"] = c["dl"] * (tDlSc / cNum);
			c["ul"] = c["ul"] * (tUlSc / cNum);

			return c;
		},

		calcOverhead: function (band, calc) {
			let freqRange = band.freqrange;

			let retDl = calc["dl"] * (1 - s5g.nrFreqOverhead[freqRange][0]),
				retUl = calc["ul"] * (1 - s5g.nrFreqOverhead[freqRange][1]);

			return {
				"dl": retDl,
				"ul": retUl
			};
		},

		fdd: {
			run: function (caId, info, band) {
				let calc = s5g.calc.common(info, band);
				let final = s5g.calc.calcOverhead(band, calc);

				return [final["dl"], final["ul"]];
			}
		},

		tdd: {
			run: function (caId, info, band) {
				let calc = s5g.calc.common(info, band);

				console.log(calc);
				console.log(info);

				let tddConf = s5g.calc.tdd.getSlotFormat(caId, info);
				if (!tddConf) return [0, 0];
				if (!tddConf.length) {
					s5g.ux.inputError(1, [caId, 'a valid TDD slot pattern']);
					return [0, 0];
				}

				// Check slots and symbols
				let userInputError = false;
				tddConf.forEach(function (pattern) {
					let values = Object.values(pattern);
					values.forEach(function (value) {
						if (value < 0 || value > 99) userInputError = true;
					});
				});
				if (userInputError) {
					s5g.ux.inputError(1, [caId, 'a valid TDD slot pattern']);
					return [0, 0];
				}

				// Check periodicity value
				let userPeriodicityError = false;
				tddConf.forEach(function (pattern) {
					if (pattern['periodicity'] <= 0) userPeriodicityError = true;
				});
				if (userPeriodicityError) {
					s5g.ux.inputError(2, [caId, 'Periodicity cannot be less than or equal to 0']);
					return [0, 0];
				}

				console.log(tddConf);

				let tdd = s5g.logic.calcSlotPercent(calc, tddConf, info);
				console.log(tdd);

				// Overhead
				let final = s5g.calc.calcOverhead(band, calc);

				let dlPc = tdd["D"],
					ulPc = tdd["U"];

				// Are we using the Flexible symbol for data or as guard period?
				if (info.tddFlexData === true) {
					dlPc += tdd["F"];
					ulPc += tdd["F"];
				}

				return [
					final["dl"] * dlPc,
					final["ul"] * ulPc
				];
			},

			getSlotFormat: function (caId, info) {
				let patterns = [];

				function checkPeriodicity(p) {
					return p !== null && p !== "" && !isNaN(p) && isFinite(p) && p >= 0 && p <= 10;
				}

				function checkFrameStruct(s) {
					if (s === null || s === "") return false;
					if (!s.includes('/') || s.length < 3) return false;

					let a = s.split('/');
					if (a.length !== 2) return false;

					return a.reduce(function (l, n) {
						return l && isFinite(n) && !isNaN(n);
					});
				}

				function getFrameStruct(s) {
					return s.split('/').map(function (a) {
						return parseInt(a);
					});
				}

				['1', '2'].forEach(function (patternInt) {
					if (checkPeriodicity(info['tddPattern' + patternInt + 'Period'])) {
						if (checkFrameStruct(info['tddPattern' + patternInt + 'CustomSlot']) && checkFrameStruct(info['tddPattern' + patternInt + 'CustomSymb'])) {
							let slots = getFrameStruct(info['tddPattern' + patternInt + 'CustomSlot']);
							let symbs = getFrameStruct(info['tddPattern' + patternInt + 'CustomSymb']);

							patterns.push({
								'periodicity': parseInt(info['tddPattern' + patternInt + 'Period']),
								'nrofDownlinkSlots': slots[0],
								'nrofDownlinkSymbols': symbs[0],
								'nrofUplinkSlots': slots[1],
								'nrofUplinkSymbols': symbs[1]
							});
						}
					}
				});

				return patterns;
			}
		},

		sxl: {
			run: function (caId, info, band) {
				let calc = s5g.calc.common(info, band);
				let type = band.type;

				// Overhead
				let final = s5g.calc.calcOverhead(band, calc);

				if (type === "SDL") {
					return [final["dl"], 0];
				} else {
					return [0, final["ul"]];
				}
			}
		},

		carrier: function (caId) {
			let info = s5g.carriers[caId];
			let ret = [0, 0];
			let band = s5g.nrBandData[info.band];

			switch (band.type) {
				case "FDD":
					ret = s5g.calc.fdd.run(caId, info, band);
					break;
				case "TDD":
					ret = s5g.calc.tdd.run(caId, info, band);
					break;
				case "SDL":
				case "SUL":
					ret = s5g.calc.sxl.run(caId, info, band);
					break;
				default:
					console.error("Unknown type");
					break;
			}


			// Round values
			ret[0] = s5g.calc.reduce(ret[0]);
			ret[1] = s5g.calc.reduce(ret[1]);

			if (s5g.DEBUG > 1) console.log("Calculation Complete for carrier", ret[0] + "Mbps Downlink", ret[1] + "Mbps Uplink");

			return ret;
		},

		run: function () {
			let sumDl = 0, sumUl = 0;

			for (let i in s5g.carriers) {
				let band = s5g.carriers[i].band;
				let info = s5g.nrBandData[band];

				if (s5g.nrRbData[info.freqrange][parseInt(s5g.carriers[i].dlBandwidth)] === undefined) continue;

				let carrierSpeed = s5g.calc.carrier(i);

				s5g.ux.setRowSpeed(i, carrierSpeed);

				sumDl += carrierSpeed[0];
				if (s5g.carriers[i].uplinkAggregation === true || parseInt(i) === 0) sumUl += carrierSpeed[1];
			}

			return [sumDl, sumUl];
		}
	},

	logic: {
		changeCbs: {
			"band": function (caId) {
				s5g.logic.resetCarrierData(caId, ["band"]);

				if (s5g.carriers[caId]["band"] !== "0") {
					s5g.ux.updateBandconf(caId);
					s5g.ux.updateBandwidth(caId);
					s5g.ux.populateSelectors(caId, ["scs"]);
					s5g.logic.setPopulateDefaults(caId, true);
				}

				// Re-Calculate speed
				s5g.logic.doCalculation();
			},

			"scs": function (caId) {
				s5g.ux.populateSelectors(caId, ["dlBandwidth", "ulBandwidth", "sfactor"]);
			},

			"sfactor": function (caId) {
			},

			"bandwidth": function (caId) {
				s5g.ux.populateSelectors(caId, ["dlLayers", "ulLayers", "dlModulation", "ulModulation", "sfactor"]);
			},
			"dlBandwidth": function (caId) {
				s5g.logic.changeCbs["bandwidth"](caId);
			},
			"ulBandwidth": function (caId) {
				s5g.logic.changeCbs["bandwidth"](caId);
			},

			"tddSlotFormat": function (caId) {
				s5g.carriers[caId]["tddCustomSlot"] = "";
			},
			"tddCustomSlot": function (caId) {
				if (s5g.carriers[caId]["tddCustomSlot"].length !== 0) {
					s5g.carriers[caId]["tddSlotFormat"] = null;
				}
			},

			"tddPattern": function (caId) {

			},
			"tddPattern1Period": function (caId) {
				s5g.logic.changeCbs["tddPattern"](caId);
			},
			"tddPattern1CustomSlot": function (caId) {
				s5g.logic.changeCbs["tddPattern"](caId);
			},
			"tddPattern1CustomSymb": function (caId) {
				s5g.logic.changeCbs["tddPattern"](caId);
			},
			"tddPattern2Period": function (caId) {
				s5g.logic.changeCbs["tddPattern"](caId);
			},
			"tddPattern2CustomSlot": function (caId) {
				s5g.logic.changeCbs["tddPattern"](caId);
			},
			"tddPattern2CustomSymb": function (caId) {
				s5g.logic.changeCbs["tddPattern"](caId);
			},


			"layers": function (caId) {
				// console.log("Layers changed for " + caId);
			},
			"dlLayers": function (caId) {
				s5g.logic.changeCbs["layers"](caId);
			},
			"ulLayers": function (caId) {
				s5g.logic.changeCbs["layers"](caId);
			},

			"modulation": function (caId) {
				// console.log("Modulation changed for " + caId);
			},
			"dlModulation": function (caId) {
				s5g.logic.changeCbs["modulation"](caId);
			},
			"ulModulation": function (caId) {
				s5g.logic.changeCbs["modulation"](caId);
			}
		},

		validateSlotString: function (str) {
			// Check frame string is valid
			if (!/[DFU]/g.test(str)) return [false, _l["error.badslotchar"]];
			if (str.length !== 14) return [false, _l["error.badslotlength"]];

			return [true];
		},

		decodeSlotString: function (str) {
			let chars = str.split("");
			let result = {
				D: 0,
				U: 0,
				F: 0
			};

			// Total up number of each frame
			chars.forEach(val => result[val] += 1);

			return result;
		},

		calcSlotPercent: function (res, patterns, info) {
			let period = (1 / (s5g.calc.numerology(parseInt(info.scs)) + 1));
			let frameSymbols = s5g.calc.symslot * s5g.calc.frametime / period;

			console.log('Period', period, 'frameSym', frameSymbols);

			let dlSymbols = 0, ulSymbols = 0, periodicity = 0;

			patterns.forEach(function (pattern) {
				dlSymbols += (pattern.nrofDownlinkSlots * s5g.calc.symslot) + pattern.nrofDownlinkSymbols;
				ulSymbols += (pattern.nrofUplinkSlots * s5g.calc.symslot) + pattern.nrofUplinkSymbols;
				periodicity += pattern.periodicity;
			});

			if (periodicity !== s5g.calc.frametime) {
				let multiplier = s5g.calc.frametime / periodicity;
				dlSymbols *= multiplier;
				ulSymbols *= multiplier;
			}

			let flSymbols = frameSymbols - (dlSymbols + ulSymbols);

			console.log('dlSymbols', dlSymbols, 'ulSymbols', ulSymbols, 'flSymbols', flSymbols);

			return {
				"D": (dlSymbols / frameSymbols),
				"U": (ulSymbols / frameSymbols),
				"F": (flSymbols / frameSymbols),
			};
		},

		getCaId: function (a) {
			return $(a).parent().parent().parent().data("caid");
		},

		addCarrier: function () {
			// Push default carrier template
			s5g.carriers.push({
				band: null,
				dlBandwidth: null,
				ulBandwidth: null,

				dlLayers: null,
				ulLayers: null,

				dlModulation: null,
				ulModulation: null,

				sfactor: null,
				scs: null,

				tddPattern1Period: null,
				tddPattern1CustomSlot: null,
				tddPattern1CustomSymb: null,
				tddPattern2Period: null,
				tddPattern2CustomSlot: null,
				tddPattern2CustomSymb: null,
				tddFlexData: false,

				uplinkAggregation: false
			});

			let carrier = s5g.carriers.length - 1;
			let render = s5g.carriers[carrier];

			// Render newly made carrier
			s5g.ux.renderCarrier(render, carrier);
			s5g.ux.inputError(1, [carrier, "band"]);
		},

		aggregateUplink: function () {
			let caId = s5g.logic.getCaId(this);
			s5g.carriers[caId].uplinkAggregation = !s5g.carriers[caId].uplinkAggregation;

			$(this).text(s5g.carriers[caId].uplinkAggregation === true ? _l["ux.deaggupl"] : _l["ux.aggupl"]);

			s5g.logic.doCalculation();
		},
		flexToggle: function () {
			let caId = s5g.logic.getCaId(this);
			s5g.carriers[caId].tddFlexData = !s5g.carriers[caId].tddFlexData;

			$(this).text(s5g.carriers[caId].tddFlexData === true ? _l["ux.flexguard"] : _l["ux.flexdata"]);

			s5g.logic.doCalculation();
		},
		removeCarrier: function () {
			let caId = s5g.logic.getCaId(this);

			if (caId === 0) {
				alert(_l["error.remprim"]);
				return;
			}

			s5g.carriers.splice(caId, 1);
			s5g.ux.removeCarrier(caId);

			s5g.haltCalculation = false;

			s5g.logic.doCalculation();
		},

		resetCarrierData: function (caId, attributes) {
			let clearAttr = ["band", "scs", "sfactor", "dlBandwidth", "ulBandwidth", "dlLayers", "ulLayers", "dlModulation", "ulModulation"];
			for (let i = 0; i < 5; i++) {
				if (attributes.indexOf(clearAttr[i]) !== -1) continue;

				s5g.ux.resetSelector(caId, clearAttr[i]);
				s5g.carriers[caId][clearAttr[i]] = null;
			}
		},
		selectNewValue: function () {
			let caId = s5g.logic.getCaId(this);
			let selector = $(this).data("selector");

			s5g.carriers[caId][selector] = $(this).val();
			s5g.haltCalculation = false;


			s5g.logic.changeCbs[selector](caId);

			// Re-Calculate speed
			//s5g.logic.setPopulateDefaults(caId,false);
			s5g.logic.doCalculation();
		},
		setPopulateDefaults: function (caId, override) {
			var defaults = {
				"dlBandwidth": 20,
				"ulBandwidth": 20,
				"dlLayers": 2,
				"ulLayers": 1,
				"dlModulation": 8,
				"ulModulation": 6,
				"sfactor": 1,
				"scs": 30,
				"tddPattern1Period": 5,
				"tddPattern1CustomSlot": "7/7",
				"tddPattern1CustomSymb": "4/4",
				"tddFlexData": false
			};

			let band = parseInt(s5g.carriers[caId].band);
			var data = s5g.nrBandData[band];

			let scsbw = Object.keys(data.scsbw["dl"]);
			if (scsbw.indexOf("30") === -1 || data.scsbw["dl"]["30"].length === 0) {
				if (scsbw.indexOf("15") === -1 || data.scsbw["dl"]["15"].length === 0) {
					defaults["scs"] = 60;
				} else {
					defaults["scs"] = 15;
				}
			}

			if (data.scsbw["dl"][parseInt(defaults["scs"])].indexOf(20) === -1) {
				defaults["dlBandwidth"] = data.scsbw["dl"][parseInt(defaults["scs"])][0];
				defaults["ulBandwidth"] = data.scsbw["dl"][parseInt(defaults["scs"])][0];
			}

			$(".carrier_row[data-caid='" + caId + "'] div.rowcont div.rowsect select").each(function () {
				let sel = $(this).data("selector");

				if (defaults[sel] === undefined) return;
				if ($(this).val() === "0" && override !== true) return;

				s5g.carriers[caId][sel] = defaults[sel];
				$(this).val(defaults[sel]);

				s5g.logic.changeCbs[sel](caId);
			});
		},

		doCalculation: function () {
			let required = {
				"FDD": ["dlBandwidth", "ulBandwidth", "dlLayers", "ulLayers", "dlModulation", "ulModulation", "sfactor", "scs"],
				"TDD": ["dlBandwidth", "dlLayers", "ulLayers", "dlModulation", "ulModulation", "sfactor", "scs"/*,"tddPattern1Period","tddPattern1CustomSlot","tddPattern1CustomSymb"*/],
				"SDL": ["dlBandwidth", "dlLayers", "dlModulation", "sfactor", "scs"]
			};

			let error = false;
			for (let i in s5g.carriers) {
				let ca = s5g.carriers[i];
				let bandType = s5g.nrBandData[ca.band].type;

				if (isNaN(parseInt(ca.band)) || ca.band === "0") {
					error = true;
					s5g.ux.inputError(1, [i, "band"]);
					s5g.ux.updateRowTitle(i, s5g.ux.carrierName(i));
					continue;
				}

				if (s5g.DEBUG > 2) console.log(s5g.nrBandData[parseInt(ca.band)].type);

				for (let j in required[bandType]) {
					if (ca[required[bandType][j]] !== null) continue;

					error = true;
					s5g.ux.inputError(1, [i, required[bandType][j]]);
				}
			}

			if (error) return;

			s5g.ux.renderCalculation(s5g.calc.run());
		}
	},

	ux: {
		init: function () {
			$("#add_carrier").text(_l["ux.addca"]).on("click enter", s5g.logic.addCarrier);

			document.title = _l["ux.title"];
			$("#page_title").text(_l["ux.title"]);
			$("#speeds").text(_l["alert.selband"]);

			$("#open_settings").hide();

			$("#ca_body").empty();
		},

		carrierName: function (caId) {
			return (parseInt(caId) === 0 ? _l["label.primaryca"] : "Carrier S" + caId);
		},

		selectText: function (selector) {
			return _l["label.select"] + " " + s5g.name[selector] + "...";
		},

		generate: {
			band: function () {
				let el = $("<div/>", {"class": "rowsect"}).append(
					$("<span/>", {"class": "rowsectheader"}).text(s5g.name.band)
				);

				el.append(
					$("<label/>").text(_l["header.band"]),
					$("<select/>", {
						"title": s5g.ux.selectText("band"),
						"data-selector": "band"
					}).append(
						$("<option/>", {"value": 0}).text(s5g.ux.selectText("band"))
					).on("change", s5g.logic.selectNewValue)
				);

				return el;
			},
			tddbandconf: function () {
				let el = [];

				el.push(
					$("<div/>", {"class": "tdd_header tddopts", "style": "display:none"}).append(
						$("<h1/>", {"class": "tdd_predefined"}).text("Predefined Format"),
						$("<h1/>", {"class": "tdd_patterns"}).text("TDD Custom Patterns"),
					)
				);

				el.push(
					$("<div/>", {"class": "rowsect rowsectlarge", "style": "display:none"}).append(
						$("<span/>", {"class": "rowsectheader"}).text(s5g.name.bandconf),
						$("<label/>", {"class": "tddopts"}).text(_l["header.tddslotformat"]),
						$("<select/>", {
							"class": "tddopts",
							"title": s5g.ux.selectText("tddSlotFormat"),
							"data-selector": "tddSlotFormat"
						}).append(
							$("<option/>", {"value": 0}).text(s5g.ux.selectText("tddSlotFormat"))
						).on("change", s5g.logic.selectNewValue),

						$("<label/>").text(_l["header.tddcustomslot"]),
						$("<input/>", {
							"type": "text",
							"placeholder": "Enter 14 symbols (D/U/F)",
							"data-selector": "tddCustomSlot",
						}).on("keyup", s5g.logic.selectNewValue)
					)
				);

				el.push(
					$("<div/>", {"class": "rowsect rowsectlarge tddopts", "style": "display:none"}).append(
						$("<span/>", {"class": "rowsectheader"}).text('TDD Custom Config'),
						$("<label/>").text('Pattern 1'),
						$("<input/>", {
							"type": "number",
							"placeholder": "Periodicity (ms)",
							"data-selector": "tddPattern1Period",
						}).on("change", s5g.logic.selectNewValue),

						$("<label/>").text('Slots (DL / UL)'),
						$("<input/>", {
							"type": "text",
							"placeholder": "e.g. 7 / 2",
							"data-selector": "tddPattern1CustomSlot",
						}).on("keyup", s5g.logic.selectNewValue),

						$("<label/>").text('Symbols (DL / UL)'),
						$("<input/>", {
							"type": "text",
							"placeholder": "e.g. 4 / 4",
							"data-selector": "tddPattern1CustomSymb",
						}).on("keyup", s5g.logic.selectNewValue)
					)
				);

				el.push(
					$("<div/>", {"class": "rowsect rowsectlarge tddopts", "style": "display:none"}).append(
						$("<label/>").text('Pattern 2 (Optional)'),
						$("<input/>", {
							"type": "number",
							"placeholder": "Periodicity (ms)",
							"data-selector": "tddPattern2Period",
						}).on("change", s5g.logic.selectNewValue),

						$("<label/>").text('Slots (DL / UL)'),
						$("<input/>", {
							"type": "text",
							"placeholder": "e.g. 7 / 2",
							"data-selector": "tddPattern2CustomSlot",
						}).on("keyup", s5g.logic.selectNewValue),

						$("<label/>").text('Symbols (DL / UL)'),
						$("<input/>", {
							"type": "text",
							"placeholder": "e.g. 4 / 4",
							"data-selector": "tddPattern2CustomSymb",
						}).on("keyup", s5g.logic.selectNewValue)
					)
				);

				return el;
			},
			scs: function () {
				let el = $("<div/>", {"class": "rowsect"}).append(
					$("<span/>", {"class": "rowsectheader"}).text(s5g.name.scs)
				);

				el.append(
					$("<label/>").text(_l["header.scs"]),
					$("<select/>", {
						"title": s5g.ux.selectText("scs"),
						"data-selector": "scs"
					}).append(
						$("<option/>", {"value": 0}).text(s5g.ux.selectText("scs"))
					).on("change", s5g.logic.selectNewValue)
				);

				return el;
			},
			sfactor: function () {
				let el = $("<div/>", {"class": "rowsect"}).append(
					$("<span/>", {"class": "rowsectheader"}).text(s5g.name.sfactor)
				);

				el.append(
					$("<label/>").text(_l["header.sfactor"]),
					$("<select/>", {
						"title": s5g.ux.selectText("sfactor"),
						"data-selector": "sfactor"
					}).append(
						$("<option/>", {"value": 0}).text(s5g.ux.selectText("sfactor"))
					).on("change", s5g.logic.selectNewValue)
				);

				return el;
			},
			bandwidth: function () {
				let el = $("<div/>", {"class": "rowsect"}).append(
					$("<span/>", {"class": "rowsectheader"}).text(s5g.name.bandwidth)
				);

				el.append(
					$("<label/>").text(_l["header.bandwidth"]),
					$("<select/>", {
						"title": s5g.ux.selectText("bandwidth"),
						"data-selector": "dlBandwidth"
					}).append(
						$("<option/>", {"value": 0}).text(s5g.ux.selectText("bandwidth"))
					).on("change", s5g.logic.selectNewValue)
				);

				return el;
			},
			fddbandwidth: function () {
				let el = $("<div/>", {"class": "rowsect"}).append(
					$("<span/>", {"class": "rowsectheader"}).text(s5g.name.bandwidth)
				);

				el.append(
					$("<label/>").text(_l["header.dlbandwidth"]),
					$("<select/>", {
						"title": s5g.ux.selectText("dlBandwidth"),
						"data-selector": "dlBandwidth"
					}).append(
						$("<option/>", {"value": 0}).text(s5g.ux.selectText("dlBandwidth"))
					).on("change", s5g.logic.selectNewValue),

					$("<label/>").text(_l["header.ulbandwidth"]),
					$("<select/>", {
						"title": s5g.ux.selectText("ulBandwidth"),
						"data-selector": "ulBandwidth"
					}).append(
						$("<option/>", {"value": 0}).text(s5g.ux.selectText("ulBandwidth"))
					).on("change", s5g.logic.selectNewValue)
				);

				return el;
			},
			layers: function () {
				let el = $("<div/>", {"class": "rowsect"}).append(
					$("<span/>", {"class": "rowsectheader"}).text(s5g.name.layers)
				);

				el.append(
					$("<label/>").text(_l["header.dllayers"]),
					$("<select/>", {
						"title": s5g.ux.selectText("dlLayers"),
						"data-selector": "dlLayers"
					}).append(
						$("<option/>", {"value": 0}).text(s5g.ux.selectText("dlLayers"))
					).on("change", s5g.logic.selectNewValue),

					$("<label/>").text(_l["header.ullayers"]),
					$("<select/>", {
						"title": s5g.ux.selectText("ulLayers"),
						"data-selector": "ulLayers"
					}).append(
						$("<option/>", {"value": 0}).text(s5g.ux.selectText("ulLayers"))
					).on("change", s5g.logic.selectNewValue)
				);

				return el;
			},
			modulation: function () {
				let el = $("<div/>", {"class": "rowsect"}).append(
					$("<span/>", {"class": "rowsectheader"}).text(s5g.name.modulation)
				);

				el.append(
					$("<label/>").text(_l["header.dlmodulation"]),
					$("<select/>", {
						"title": s5g.ux.selectText("dlModulation"),
						"data-selector": "dlModulation"
					}).append(
						$("<option/>", {"value": 0}).text(s5g.ux.selectText("dlModulation"))
					).on("change", s5g.logic.selectNewValue),

					$("<label/>").text(_l["header.ulmodulation"]),
					$("<select/>", {
						"title": s5g.ux.selectText("ulModulation"),
						"data-selector": "ulModulation"
					}).append(
						$("<option/>", {"value": 0}).text(s5g.ux.selectText("ulModulation"))
					).on("change", s5g.logic.selectNewValue)
				);

				return el;
			},

			rowOpts: function (isPrimary) {
				let el = $("<div/>", {"class": "rowsect"}).append(
					$("<span/>", {"class": "rowsectheader"}).text(_l["label.options"])
				);

				// TDD Flex Symbol purpose
				el.append(
					$("<label/>", {"class": "tddopts", "style": "display:none"}).text(_l["header.flexsympurpose"]),
					$("<button/>", {
						"class": "tddopts",
						"style": "display:none"
					}).text(_l["ux.flexdata"]).on("click enter", s5g.logic.flexToggle)
				);

				// Options for carriers that aren't the primary
				if (!isPrimary) {
					el.append(
						$("<label/>").text(_l["header.rowcaopts"]),
						$("<button/>", {"class": "b_rmrow"}).text(_l["ux.remca"]).on("click enter", s5g.logic.removeCarrier),
						$("<button/>", {"class": "b_aggupl"}).text(_l["ux.aggupl"]).on("click enter", s5g.logic.aggregateUplink)
					);
				}

				return el;
			}
		},

		updateRowTitle: function (caId, txt) {
			$("div[data-caid='" + caId + "'] div.row_header h2.band_title").html(txt);
		},
		toggleRow: function () {
			let caId = $(this).parent().data("caid");
			let el = $("div[data-caid='" + caId + "'] div.rowcont");

			if (el.is(":visible")) {
				el.slideUp(300);
			} else {
				el.slideDown(300);
			}
		},
		setRowSpeed: function (caId, speeds) {
			let caName = s5g.ux.carrierName(caId);
			let band = parseInt(s5g.carriers[caId].band);
			let data = s5g.nrBandData[band];

			let caDlBandwidth = parseInt(s5g.carriers[caId].dlBandwidth),
				caUlBandwidth = parseInt(s5g.carriers[caId].ulBandwidth);

			let caScs = parseInt(s5g.carriers[caId].scs);
			let rbsAvailDl = s5g.nrRbData[data.freqrange][caDlBandwidth][caScs],
				rbsAvailUl = s5g.nrRbData[data.freqrange][caDlBandwidth][caScs];

			let bandwidthTxt = caDlBandwidth + "MHz (" + rbsAvailDl + " RBs)";

			// If DL and UL bandwidths are different, update text
			if (caDlBandwidth !== caUlBandwidth && data.type === "FDD") {
				bandwidthTxt += "&#8595; &amp; " + caUlBandwidth + "MHz (" + rbsAvailUl + " RBs) &#8593;"
			}

			let dlSpeed = s5g.calc.round(speeds[0]),
				ulSpeed = s5g.calc.round(speeds[1]);

			let speedTxt = "<strong>";
			if (dlSpeed !== 0) speedTxt += dlSpeed + "Mbps &#8595";
			if (dlSpeed !== 0 && ulSpeed !== 0) speedTxt += "; &amp; ";
			if (ulSpeed !== 0) speedTxt += ulSpeed + "Mbps &#8593";
			speedTxt += "</strong>";
			if (dlSpeed === 0 && ulSpeed === 0) speedTxt = _l["alert.nodata"];

			let bandTxt = "Band n" + band + ": " + data.frequency + "MHz";

			if (data.type === "FDD") {
				bandTxt += ", Uplink: " + data.range[0] + "MHz, Downlink: " + data.range[1] + "MHz";
			} else {
				bandTxt += ", Range: " + data.range[0] + "MHz";
			}

			s5g.ux.updateRowTitle(caId, caName + ": " + bandwidthTxt + "<br />" + speedTxt + "<br />" + bandTxt);
		},
		renderCarrier: function (info, caId) {
			let el = $("<div/>", {
				"class": "carrier_row",
				"data-caid": caId
			});

			let header = $("<div/>", {"class": "row_header"}).on("click enter", s5g.ux.toggleRow);
			let body = $("<div/>", {"class": "rowcont"});

			header.append($("<h2/>", {"class": "band_title"}).text(s5g.ux.carrierName(caId)));

			body.append(
				s5g.ux.generate.band(),
				s5g.ux.generate.scs(),
				s5g.ux.generate.bandwidth(),
				s5g.ux.generate.sfactor(),
				s5g.ux.generate.layers(),
				s5g.ux.generate.modulation(),
				s5g.ux.generate.rowOpts((caId === 0)),
				s5g.ux.generate.tddbandconf()
			);

			el.append(header, body);

			$("#ca_body").append(el);

			s5g.ux.populateSelectors(caId, ["band"]);
		},
		removeCarrier: function (caId) {
			$(".carrier_row[data-caid='" + caId + "']").remove();
		},

		resetSelector: function (caId, selector) {
			if (s5g.DEBUG > 2) console.log("Reset", selector, "for", caId);

			$(".carrier_row[data-caid='" + caId + "'] div.rowcont div.rowsect select[data-selector='" + selector + "']").empty().append(
				$("<option/>", {"value": 0}).text(s5g.ux.selectText(selector))
			);
		},

		populateSelectors: function (caId, noReload) {
			$(".carrier_row[data-caid='" + caId + "'] div.rowcont div.rowsect select").each(function () {
				let sel = $(this).data("selector");

				if (noReload.indexOf(sel) === -1) return;

				switch (sel) {
					case "band":
						s5g.ux.populateBand($(this), caId);
						break;
					case "scs":
						s5g.ux.populateScs($(this), caId);
						break;
					case "dlBandwidth":
					case "ulBandwidth":
						s5g.ux.populateBandwidth($(this), caId, "dl");
						s5g.ux.populateBandwidth($(this), caId, "ul");
						break;
					default:
						s5g.ux.populateGeneric($(this), caId, sel);
						break;
				}
			});
		},

		populateBand: function (el, caId) {
			let dKeys = Object.keys(s5g.nrBandData);

			el.empty().append(
				$("<option/>", {"value": 0}).text(s5g.ux.selectText("band"))
			);

			for (let i = 0, l = dKeys.length; i < l; i++) {
				if (s5g.nrBandData[dKeys[i]].frequency === "") continue;

				txt = "n" + dKeys[i];
				txt += "\t | " + s5g.nrBandData[dKeys[i]].type;
				txt += " " + s5g.nrBandData[dKeys[i]].frequency + "MHz";

				el.append(
					$("<option/>", {"value": dKeys[i]}).text(txt)
				);
			}
		},
		populateBandwidth: function (el, caId, direction) {
			if (direction === "ul" && s5g.nrBandData[s5g.carriers[caId].band].type !== "FDD") return;

			let lastVal = parseInt(el.val());
			let scsDataBw = s5g.nrBandData[s5g.carriers[caId].band].scsbw;
			let scsData = (scsDataBw[direction] ? scsDataBw[direction] : scsDataBw["dl"])[s5g.carriers[caId].scs];
			let setDefault = true;

			el.empty();

			for (let i = 0, l = scsData.length; i < l; i++) {
				txt = scsData[i] + "MHz";
				opts = {
					"value": scsData[i]
				};

				// Preserve current value
				if (scsData[i] === lastVal) {
					opts["selected"] = true;
					setDefault = false;
				}

				el.append(
					$("<option/>", opts).text(txt)
				);
			}

			if (setDefault === true) {

			}
		},
		populateScs: function (el, caId) {
			if (!s5g.nrBandData[s5g.carriers[caId].band]) return;

			let scsData = s5g.nrBandData[s5g.carriers[caId].band].scsbw["dl"];
			let keys = Object.keys(scsData);

			el.empty();

			for (let i = 0, l = keys.length; i < l; i++) {
				if (scsData[keys[i]].length === 0) return;

				txt = keys[i] + "KHz";

				el.append(
					$("<option/>", {"value": keys[i]}).text(txt)
				);
			}
		},
		populateTddSlotFormat: function (el, caId) {
			let lastVal = el.val();

			el.empty();

			for (let i = 0, l = s5g.nrTddConf.length; i < l; i++) {
				let opts = {
					"value": i
				};

				// Preserve current value
				if (s5g.nrTddConf[i] === lastVal) opts["selected"] = true;

				el.append(
					$("<option/>", opts).text(s5g.nrTddConf[i])
				);
			}
		},
		populateGeneric: function (el, caId, selector) {
			let lastVal = el.val();

			el.empty();

			let keys = Object.keys(s5g.selectors[selector]);
			for (let i = 0, l = keys.length; i < l; i++) {
				let opts = {
					"value": keys[i]
				};

				// Preserve current value
				if (keys[i] === lastVal) opts["selected"] = true;

				el.append(
					$("<option/>", opts).text(s5g.selectors[selector][keys[i]])
				);
			}
		},

		updateBandconf: function (caId) {
			let bandInfo = s5g.nrBandData[s5g.carriers[caId].band];

			if (bandInfo.type === "TDD") {
				$(".carrier_row[data-caid='" + caId + "'] div.rowcont div.rowsect .tddopts").show();
				$(".carrier_row[data-caid='" + caId + "'] div.rowcont div.tddopts").show();
				s5g.ux.populateTddSlotFormat(
					$(".carrier_row[data-caid='" + caId + "'] div.rowcont div.rowsect select[data-selector='tddSlotFormat']"), caId
				);
			} else {
				$(".carrier_row[data-caid='" + caId + "'] div.rowcont div.rowsect .tddopts").hide();
				$(".carrier_row[data-caid='" + caId + "'] div.rowcont div.tddopts").hide();
			}
		},

		updateBandwidth: function (caId) {
			let bandInfo = s5g.nrBandData[s5g.carriers[caId].band];
			let el = $(".carrier_row[data-caid='" + caId + "'] div.rowcont div.rowsect:nth-child(3)");

			el.empty();
			if (bandInfo.type === "FDD") {
				el.replaceWith(
					s5g.ux.generate.fddbandwidth()
				);
			} else {
				el.replaceWith(
					s5g.ux.generate.bandwidth()
				);
			}
		},

		renderCalculation: function (data) {
			if (s5g.haltCalculation) return;

			let el = $("#speeds");

			if (data === false) {
				el.text(_l["error.speedfail"]);
				return;
			}

			let dlSpeed = s5g.calc.round(data[0]),
				ulSpeed = s5g.calc.round(data[1]);

			let speedTxt = "";
			if (dlSpeed !== 0) speedTxt += dlSpeed + "Mbps &#8595";
			if (dlSpeed !== 0 && ulSpeed !== 0) speedTxt += "; &amp; ";
			if (ulSpeed !== 0) speedTxt += ulSpeed + "Mbps &#8593";
			if (dlSpeed === 0 && ulSpeed === 0) speedTxt = _l["alert.nodata"];

			el.html(speedTxt);
		},
		inputError: function (type, data) {
			s5g.haltCalculation = true;

			let el = $("#speeds");

			switch (type) {
				case 1:
					el.text("Please enter " + data[1] + " for " + s5g.ux.carrierName(data[0]));
					break;
				case 2:
					el.text(data[1] + " for " + s5g.ux.carrierName(data[0]));
					break;
				default:
					el.text(_l["error.generic"]);
					break;
			}
		}
	},

	sw: {
		init: function () {
			if (!('serviceWorker' in navigator)) return;

			navigator.serviceWorker.register("nr-sw.js").then(function (registration) {
				if (s5g.DEBUG > 1) console.log("ServiceWorker registration successful with scope:", registration.scope);
			}, function (err) {
				if (s5g.DEBUG > 1) console.log("ServiceWorker registration failed:", err);
			});
		}
	}
};


// Check that library loaded correctly
if (!window.jQuery) {
	let j = document.createElement("script");
	j.src = "https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js";
	j.integrity = "sha384-vtXRMe3mGCbOeY7l30aIg8H9p3GdeSe4IFlP6G8JMa7o7lXvnz3GFKzPxzJdPfGK";
	j.crossorigin = 'anonymous';
	j.type = "text/javascript";
	j.onload = "s5g.init();";

	document.head.append(j);
} else {
	s5g.init();
}
