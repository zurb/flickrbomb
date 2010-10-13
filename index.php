<?php include("includes/_doc_head.php"); ?>
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
				
				
				
				<div class="flickrbombWrapper">
					<img class="flickrbomb" src="public/images/cats/cat.jpg" />
					<a href="#" class="setupIcon"></a>
				</div>
				
				
				<div id="flickrbombFlyout">
					<a href="#"><img src="public/images/cats/cat1.jpg" /></a>
					<a href="#"><img src="public/images/cats/cat2.jpg" /></a>
					<a href="#"><img src="public/images/cats/cat3.jpg" /></a>
					<a href="#"><img src="public/images/cats/cat4.jpg" /></a>
					<a href="#"><img src="public/images/cats/cat5.jpg" /></a>
					<a href="#"><img src="public/images/cats/cat6.jpg" /></a>
					<a href="#"><img src="public/images/cats/cat7.jpg" /></a>
					<a href="#"><img src="public/images/cats/cat8.jpg" /></a>
					<a href="#"><img src="public/images/cats/cat9.jpg" /></a>
				</div>
				
				
				
			</div>
		</div><!-- .column-row -->
	</div><!-- container -->
<?php include("includes/_footer.php");  ?>
</body>
</html>