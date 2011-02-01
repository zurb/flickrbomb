<?php include("includes/_doc_head.php"); ?>
<style>
/*	#testthing {width: 400px; height: 400px;}*/
</style>
<body id="<?= $page_name ?>-page" class="<?=$browser?>">
	<div class="container">
		<div class="column-row">
			<div class="sixteen columns pushdown">
			
			
				<!--  Code we want to have the user engage with:				
				<img class="flickrbomb" src="cats" /> 
				or
				<img class="flickrbomb"  width="300" height="200" src="cats" />
				
				In the case of no width and height declaration we're going to default to what they have set for .flickrBomb or some ID for this photo
				
				 -->
				
				<img id="testthing" src="flickr://taylor swift" width="600px" height="600px" />
				
				<!-- <img src="flickr://dogs and cats" data-width="200" data-height="400" /> -->
				
				
			</div>
		</div><!-- .column-row -->
	</div><!-- container -->

<script type="text/template" id="imageTemplate">
	<div class="flickrbombWrapper">
		<img class="flickrbomb" src="" />
		<a href="#" class="setupIcon"></a>
	</div>
	<div class="flickrbombFlyout">
		<a href="#" class="next">reload</a>
	</div>
</script>

<script type="text/template" id="flickrImageTemplate">
	<img src="<%= thumb_url() %>" />
</script>

	
<?php include("includes/_footer.php");  ?>
</body>
</html>