<?php include("includes/_doc_head.php"); ?>
<style>
/*	#testthing {width: 400px; height: 400px;}*/
</style>
<body id="<?= $page_name ?>-page" class="<?=$browser?>">
	<div class="container">
				<div class="row">
					<div claass="sixteen columns"><h1><img src="images/bomb.png">flickrBomb</h1></div>
				</div>
				<div class="row">
					<div class="sixteen columns">
						<div id="demo-splash">
							<img id="uniqueID" src="flickr://Super Meat Boy" width="940px" height="250px" />
							<span>Loading New Demo Content</span>
						</div>
						<div id="demo-content">
							&lt;img id=&quot;uniqueID&quot; src=&quot;flickr://<span id="keywords" contenteditable="true" spellcheck="false">Super Meat Boy</span>&quot; width=&quot;<span id="width" contenteditable="true" spellcheck="false">940</span>px&quot; height=&quot;<span id="height" contenteditable="true" spellcheck="false">250</span>px&quot;&gt;
						</div>
						<div id="demo-body">
							<h2>Placeholders are old school, load relevant content with flickrBomb</h2>
							<div class="row">
								<div class="five columns">
									<img class="demo" src="flickr://water buffalo" width="100px" height="100px">
								</div>
								<div class="five columns">
									column 2
								</div>
								<div class="five columns">
									column 3
								</div>
							</div>
						</div>
					</div>
				</div>
	</div><!-- container -->
	
<?php include("includes/_footer.php");  ?>
</body>
</html>