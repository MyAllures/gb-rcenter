<!DOCTYPE html>
<html lang="zh-CN">
	<head>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
		<meta name="format-detection" content="telephone=no">
		<title>在线浏览-W3C专业切图</title>
		<!--plugin-->
	</head>
	<body>
		<!-------------------------------------- 头部开始 -------------------------------------->
		<header>
			<div class="container">
				
			</div>
		</header>
		<!-------------------------------------- 头部结束 -------------------------------------->
		<!-------------------------------------- 内容开始 -------------------------------------->
		<main>
			<div class="container">
				<div class="ui-index">
					<div class="part head">
						<p>在线浏览</p>
					</div>
					<hr>
					<div class="cont list">
						<ol>
							<?php  
							function showDir($filedir){
								$dir = @dir($filedir);
								while(($file = $dir->read())!==false){
									if(strpos($file, '.html')>0){
							  		echo "<li><a href='" .$file. "' target='_blank'>".$file."</a></li>";
									}
								}
								$dir->close();
							}  
							showDir(".");  
							?>
						</ol>
					</div>
					<div class="part foot">
						<p>
							<a href="http://w3cut.applinzi.com" target="_blank">W3C专业切图</a>
						</p>
					</div>
				</div>
				<style>
					body{
						font-family: 微软雅黑;
						font-size: 12px;
						font-weight: 200;
					}
					.ui-index{

					}
					.ui-index a{
						color: #000;
					}
					.ui-index a:hover{
						text-decoration: underline;
					}
					.ui-index >.part{
						margin: 20px 2.5em;
					}
					.ui-index >.cont{
						margin: 0;
						padding: 20px 2.5em;
						background-color: #fffff0;
					}
					.ui-index .head{
						margin: 30px 0;
					}
					.ui-index .head p{
						text-align: center;
						font-size: 24px;
					}
					.ui-index .list{

					}
					.ui-index .list ol{

					}
					.ui-index .list ol li{
						list-style: inherit;
						margin: .5em 0;
						font-weight: bold;
					}
					.ui-index .list ol hr{
						margin: .5em 0;
					}
					.ui-index .foot{

					}
					.ui-index .foot p{
						font-style: italic;
						text-align: center;
					}
				</style>
				<script>
					
				</script>
			</div>
		</main>
		<!-------------------------------------- 内容结束 -------------------------------------->
		<!-------------------------------------- 尾部开始 -------------------------------------->
		<footer>
			<div class="container">
				
			</div>
		</footer>
		<!-------------------------------------- 尾部开始 -------------------------------------->
	</body>
</html>
<style>
	
</style>