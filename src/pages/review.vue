<template>
    <div class='review'>
    	<ul>
    		<li>
    			<a>
    				<!-- <img class='item-bg' src="" /> -->
    				<div class="mask">
    					<div class="other-bg"></div>
    					<div class="content">
    						<div class="item-img-panel">
    							<img class='item-img' src="../assets/images/atom.png" />
    						</div>
    						<p class="line-panel">
			                  <i class="item-line"></i>
			                </p>
			                <h3 class="item-title">雅典娜.自动化平台</h3>
			                <p class='item-alias'>Athena</p>
			                <p class="item-desc">
                              雅典娜（Athena）是古希腊智<br>
                              慧女神和女战神，她是智慧，理智<br>
                              和纯洁的化身，极具战斗天赋，<br>
                              雅典娜自动化平台涵盖了主机作业调度，IAAS资源<br>
                              管理(网络/存储/虚拟化/防火墙/主机等)，<br>
                              数据库管理，容器管理模块
                            </p>
                            <span class="item-link" @click='goHome'></span>
    					</div>
    				</div>
    			</a>
    		</li>
    		<li>
    			<a>
    				<!-- <img class='item-bg' src="" /> -->
    				<div class="mask">
    					<div class="other-bg"></div>
    					<div class="content">
    						<div class="item-img-panel">
    							<img class='item-img' src="../assets/images/at.png" />
    						</div>
    						<p class="line-panel">
			                  <i class="item-line"></i>
			                </p>
			                <h3 class="item-title">阿耳戈斯.一体化监控</h3>
			                <p class='item-alias'>Argus</p>
			                <p class="item-desc">
                              阿耳戈斯（Argus）是古希腊的百眼巨人，<br>
                              洞察一切。
                            </p>
                            <span class="item-link" @click='openFht'></span>
    					</div>
    				</div>
    			</a>
    		</li>
    		<li>
    			<a>
    				<!-- <img class='item-bg' src="" /> -->
    				<div class="mask">
    					<div class="other-bg"></div>
    					<div class="content">
    						<div class="item-img-panel">
    							<img class='item-img' src="../assets/images/bigData.png" />
    						</div>
    						<p class="line-panel">
			                  <i class="item-line"></i>
			                </p>
			                <h3 class="item-title">美狄丝.运维大数据</h3>
			                <p class='item-alias'>Metis</p>
			                <p class="item-desc">
                              美狄丝（Metis）是古希腊聪明美丽的<br>
                              女泰坦，预言未来。
                            </p>
                            <!-- <span class="item-link"></span> -->
                            <h3 class="item-title item-hope">敬请期待...</h3>
    					</div>
    				</div>
    			</a>
    		</li>
    	</ul>
    </div>
</template>

<style lang='scss' scoped>
	.review {
		height: calc(100%);
		background: url('../assets/images/bg.jpg') center no-repeat;
		background-size: 100% 100%;
		a {
			cursor: pointer;
		}
		ul {
			display: flex;
			height: calc(100%);
			justify-content: center;
			align-items: center;
			li {
				position: relative;
				flex: 1;
				height: 100%;
				text-align: center;
				border-left: 1px solid transparent;
				border-right: 1px solid transparent;
				transition: all .4s cubic-bezier(.4,0,.2,1);
				&:hover {
					border-color: #02C6E2;
					.content {
						top: 60px;
					}
					.item-line {
						opacity: 0;
					}

					.item-desc, .item-link {
						opacity: 1
					}
					.item-desc {
						line-height: 2;
						color: #6A7C86;
					}
					.item-link {
						border: 1px solid #02C6E2;
					}
					.other-bg {
						opacity: 0;
					}
					.item-hope {
						opacity: 1
					}
				}
			}
			.item-bg {
				width: 100%;
				height: 100%;
			}
			.other-bg {
				opacity: .82;
				position: absolute;
			    left: 0;
			    right: 0;
			    top: 0;
			    bottom: 0;
			    background: #081626;
			    transition: all .4s cubic-bezier(.4,0,.2,1);
			}
			.mask {
				position: absolute;
				left: 0;
				right: 0;
				top: 0;
				bottom: 0;
			}
			.content {
				position: absolute;
			    left: 0;
			    right: 0;
			    top: 150px;
			    bottom: 0;
			    transition: all .4s cubic-bezier(.4,0,.2,1);
			}
			.line-panel {
			    margin-top: 20px;
			    transition: all .4s cubic-bezier(.4,0,.2,1);
			    .item-line {
			    	width: 20px;
		    	    height: 2px;
		    	    background: #B4C0C5;
		    	    display: inline-block;
		    	    opacity: 1;
		    	    transition: all .4s cubic-bezier(.4,0,.2,1);
			    }
			}
			.item-title {
				color: #fff;
				font-size: 22px;
				line-height: 24px;
				margin-top: 24px;
				font-weight: 700;
				transition: all .4s cubic-bezier(.4,0,.2,1);
			}
			.item-hope {
				opacity: 0;
			}
			.item-desc {
				opacity: 0;
    			transition: all .4s cubic-bezier(.4,0,.2,1);
			}
			.item-alias {
				color: #B4C0C5;
				margin: 10px 0 40px;
			}
			.item-link {
				display: inline-block;
				border: 1px solid transparent;
				opacity: 0;
				width: 178px;
				height: 40px;
				background: url('../assets/images/lg.png') center no-repeat;
				margin-top: 62px;
				transition: all .4s cubic-bezier(.4,0,.2,1);
			}


		}


	}
</style>

<script type="text/javascript">
	export default {
		methods: {
			goHome () {
				//app.go('home/first')
				app.go(this.$store.state.pages.menuList[0].path)
			},
			openFht () {
				window.open('https://fht.midea.com')
			}
		}
	}
</script>

