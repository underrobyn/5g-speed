<!DOCTYPE HTML>
<html lang="en">
	<head>
	
		<title>5G Throughput Calculator</title>
		<meta content="width=device-width, initial-scale=1, maximum-scale=1" name="viewport" />
		<meta content="IE=edge" http-equiv="X-UA-Compatible">
		<meta content="#1a1a1a" name="theme-color">
		<meta http-equiv="content-type" content="text/html; charset=UTF-8">
		<meta property="og:title" content="5G-NR Theoretical Throughput Calculator" />
		<meta property="og:description" content="" />
		<meta name="keywords" content="5g, throughput, calculator, theoretical, tdd, fdd, sdl, resource block, mbps, nr" />
		
		<!-- Enable PWA ability on iOS -->
		<meta name="apple-mobile-web-app-capable" content="yes">
		<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
		<meta name="apple-mobile-web-app-title" content="5G Speeds">
		
		<link rel="manifest" href="manifest.json">
		<link rel="icon" href="images/5g-128.png" type="image/x-icon" sizes="128x128" />
		<link rel="apple-touch-icon" href="images/5g-128.png" sizes="128x128" />
		<link rel="stylesheet" href="style.css" type="text/css" media="all" />
		
	</head>
	<body>
	
		<!--
			5G Throughput Calculator
			GitHub: https://github.com/jake-cryptic/5g-speed/
			Website: https://absolutedouble.co.uk/
			Sources:
			http://niviuk.free.fr/nr_band.php
		-->
		
		<div id="title_bar">
			<h1 id="page_title">Loading...</h1>
			<span id="open_settings">&#9881;</span>
		</div>
		
		<div id="main">
			<div id="speeds"></div>
			<div id="carriers">
				<div id="ca_headers">
					<div class="ca_header">Band</div>
					<div class="ca_header">SCS</div>
					<div class="ca_header">Options</div>
					<div class="ca_header">Scaling Factor</div>
					<div class="ca_header">Bandwidth</div>
					<div class="ca_header">Layers</div>
					<div class="ca_header">Modulation</div>
					<div class="ca_header">Options</div>
				</div>
				<div id="ca_body">Loading..</div>
			</div>
			<div id="add_carrier"></div>
		</div>
		
		<div id="settings"></div>
		<!--[if lt IE 9]><script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script><![endif]--><!--[if gte IE 9]><!--><script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script><!--<![endif]-->
		<!--<script src="https://cdnjs.cloudflare.com/ajax/libs/js-cookie/2.2.0/js.cookie.min.js"></script>-->
		<script src="strings.js" type="text/javascript"></script>
		<script src="app.js" type="text/javascript" defer></script>

	</body>
</html>