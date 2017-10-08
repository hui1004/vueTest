<template>
	<div>
		<div class="search-head">
			<div class="search-key">
				<i class="iconfont icon-search"></i><input type="text" v-model.trim="keywords" placeholder="搜索你想找的商品">
			</div>
			<div class="go-search" @click="search">
				<span>搜索</span>
			</div>
		</div>
		<div class="search-records">
			<h4>最近搜索
				<i class="iconfont icon-delete" @click="clear_history"></i>
			</h4>
			<p v-if="no_records">暂无搜索记录...</p>
			<ul v-else class="record-history">
				<li v-for="item in records" :key="item">{{item}}</li>
			</ul>
		</div>
		<div class="search-hot">
			<h4>大家都在搜</h4>
			<ul>
				<li>蜂蜜</li>
				<li class="hot">三黄鸡</li>
				<li>巧克力</li>
				<li>大米</li>
				<li class="hot">红酒</li>
				<li>红枣</li>
				<li>粽子</li>
				<li>特产</li>
			</ul>
		</div>
	</div>
</template>
<script>
export default {
	data() {
		return {
			keywords: '',
			no_records: false,
			records: []
		}
	},
	created() {
		let ss = window.sessionStorage;
		let records = ss.getItem('records');
		if (!records) {
			this.no_records = true;
		} else {
			this.no_records = false;
			this.records = JSON.parse(records)
		}
	},
	methods: {
		search() {
			if (!this.keywords) {
				return;
			} else {
				let ss = window.sessionStorage;
				let records = [];
				if (ss.getItem('records')) {
					records = [...JSON.parse(ss.getItem('records'))]
				}
				records.unshift(this.keywords);
				ss.setItem('records', JSON.stringify(records))
				this.$router.push('/result/result');
			}
		},
		clear_history() {
			let ss = window.sessionStorage;
			ss.removeItem('records');
			this.no_records = true;
		}
	}
}
</script>
<style lang="scss" scoped>
.search-head {
	height: 0.88rem;
	display: flex;
	align-items: center;
	padding-left: .46rem;
	.search-key {
		width: 80%;
		height: 0.6rem;
		background: #f6f6f6;
		border-radius: .12rem;
		line-height: .6rem;
		padding: 0 .1rem;
		display: flex;
		.iconfont {
			font-size: .3rem;
			color: #999;
			padding: 0 .1rem;
		}
		input {
			flex: 1;
			height: 100%;
			border: 0;
			background: none;
			&::-webkit-input-placeholder {
				color: #ccc;
			}
		}
	}
	.go-search {
		line-height: .88rem;
		color: #333;
		padding-left: .3rem;
		span {
			font-size: .26rem;
		}
	}
}

.search-records {
	padding-left: .3rem;
	height: 2.24rem;
	h4 {
		line-height: .96rem;
		font-size: .32rem;
		font-weight: 400;
		color: #666;
		position: relative;
		.iconfont {
			position: absolute;
			right: 0.3rem;
			top: 0;
			font-size: .44rem;
			color: #000;
		}
	}
	p {
		font-size: .32rem;
		color: #333;
	}
	.record-history {
		display: flex;
		flex-wrap: wrap;
		li {
			height: .5rem;
			line-height: .5rem;
			padding: 0 .2rem;
			border: 1px solid #999;
			font-size: .26rem;
			color: #333;
			border-radius: .1rem;
			margin-right: .3rem;
			margin-bottom: .3rem;
		}
	}
}

.search-hot {
	padding-left: .3rem;
	margin-top: .2rem;
	h4 {
		line-height: .96rem;
		font-size: .32rem;
		font-weight: 400;
		color: #666;
	}
	ul {
		display: flex;
		flex-wrap: wrap;
		li {
			padding: .12rem .2rem;
			border: 1px solid #999;
			font-size: .26rem;
			color: #333;
			border-radius: .1rem;
			margin-right: .3rem;
			margin-bottom: .3rem;
			&.hot {
				color: #fc4141;
				border-color: #fc4141;
			}
		}
	}
}
</style>
