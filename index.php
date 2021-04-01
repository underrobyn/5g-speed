<!DOCTYPE HTML>
<html lang="en">
	<head>
	
		<title>5G Throughput Calculator</title>
		<meta content="width=device-width, initial-scale=1, maximum-scale=1" name="viewport" />
		<meta content="IE=edge" http-equiv="X-UA-Compatible" />
		<meta content="#1a1a1a" name="theme-color" />
		<meta http-equiv="content-type" content="text/html; charset=UTF-8" />

		<meta property="og:title" content="5G-NR Theoretical Throughput Calculator" />
		<meta property="og:description" content="A tool to calculate the theoretical maximum for 5G-NR, with FDD, TDD, SDL and SUL band support." />

		<meta name="description" content="A tool to calculate the theoretical maximum for 5G-NR, with FDD, TDD, SDL and SUL band support." />
		<meta name="keywords" content="5g, throughput, calculator, theoretical, tdd, fdd, sdl, resource block, mbps, nr" />

		<!-- Enable PWA ability on iOS -->
		<meta name="apple-mobile-web-app-capable" content="yes">
		<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
		<meta name="apple-mobile-web-app-title" content="5G Speeds">
		
		<link rel="manifest" href="manifest.json">
		<link rel="icon" href="images/5g-128.jpg" type="image/x-icon" sizes="128x128" />
		<link rel="apple-touch-icon" href="images/5g-256.jpg" sizes="256x256" />
		<link rel="stylesheet" href="style.css" type="text/css" media="all" />
		
	</head>
	<body>
	
		<!--
			5G Throughput Calculator
			GitHub: https://github.com/jake-cryptic/5g-speed/
			Website: https://absolutedouble.co.uk/
			Sources:
			https://www.sqimway.com/nr_band.php
			https://www.sqimway.com/nr_sf.php
			https://howltestuffworks.blogspot.com/2019/11/5g-nr-resource-blocks.html
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
					<div class="ca_header">Bandwidth</div>
					<div class="ca_header">Scaling Factor</div>
					<div class="ca_header">Layers</div>
					<div class="ca_header">Modulation</div>
					<div class="ca_header">Options</div>
				</div>
				<div id="ca_body">Loading..</div>
			</div>
			<div id="add_carrier"></div>
		</div>
		
		<div id="settings"></div>

		<!--[if lt IE 9]><script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/1.12.4/jquery.min.js" integrity="sha512-jGsMH83oKe9asCpkOVkBnUrDDTp8wl+adkB2D+//JtlxO4SrLoJdhbOysIFQJloQFD+C4Fl1rMsQZF76JjV0eQ==" crossorigin="anonymous"></script><![endif]-->
		<!--[if gte IE 9]><!--><script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js" integrity="sha512-894YE6QWD5I59HgZOGReFYm4dnWc1Qt5NtvYSaNcOP+u1T9qYdvdihz0PPSiiqn/+/3e7Jo4EaG7TubfWGUrMQ==" crossorigin="anonymous"></script><!--<![endif]-->

		<script src="strings.js" type="text/javascript"></script>
		<script src="app.js" type="text/javascript" defer></script>

	</body>
</html>
