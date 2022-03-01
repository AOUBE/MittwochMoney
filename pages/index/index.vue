<template>
	<view class="container">
		<!-- 顶部工具栏 -->
		<view class="flex-box justify-space-between">
			<u-icon name="calendar" color="#2979ff" size="40" @click="openPicker"></u-icon>
			<u-icon name="plus-circle" color="#2979ff" size="40" @click="openAdd"></u-icon>
		</view>
		<!-- 选择日期 -->
		<u-datetime-picker :show="showCalendar" v-model="calendarTime" mode="date" @cancel="closePicker"
			@confirm="changeCalendarTime"></u-datetime-picker>
		<!-- 日期显示 -->
		<view class="fs20 font600 top-today-box">
			{{today}}
		</view>
		<!-- 详情 -->
		<view class="content-box">
			<span class="fs20 font500">钱包</span>
			<view class="flex-box justify-space-between flex-wrap">
				<view class="content-four-box">
					<view class="content-four-box-top flex-box align-items">
						<u-icon name="calendar" color="#e45656" size="30"></u-icon>
						<span class="fs18 today">今日</span>
					</view>
					<view class="content-four-box-bottom fs20 font500">
						{{money.today}}
						<span class="fs14">RMB</span>
					</view>
				</view>
				<view class="content-four-box">
					<view class="content-four-box-top flex-box align-items">
						<u-icon name="calendar" color="#e45656" size="30"></u-icon>
						<span class="fs18 week">本周</span>
					</view>
					<view class="content-four-box-bottom fs20 font500">
						{{money.today}}
						<span class="fs14">RMB</span>
					</view>
				</view>
				<view class="content-four-box">
					<view class="content-four-box-top flex-box align-items">
						<u-icon name="calendar" color="#e45656" size="30"></u-icon>
						<span class="fs18 month">本月</span>
					</view>
					<view class="content-four-box-bottom fs20 font500">
						{{money.today}}
						<span class="fs14">RMB</span>
					</view>
				</view>
				<view class="content-four-box">
					<view class="content-four-box-top flex-box align-items">
						<u-icon name="calendar" color="#e45656" size="30"></u-icon>
						<span class="fs18 today">全部</span>
					</view>
					<view class="content-four-box-bottom fs20 font500">
						{{money.today}}
						<span class="fs14">RMB</span>
					</view>
				</view>
			</view>
		</view>
		<!-- 详情 -->
		<view class="payContent-box">
			<span class="fs20 font500">描述</span>
			<view>
				<view v-for="(item,index) in payContent" :key="index"
					class="payContent-content flex-box align-items justify-space-between">
					<view class="payContent-content-top fs18 flex-box flex-direction">
						<span>{{item.payContent}}</span>
						<span>{{item.data}}</span>
					</view>
					<view class="payContent-content-bottom fs18">
						{{item.money}}
						<span>RMB</span>
					</view>
				</view>
			</view>
		</view>
		<!-- 记一笔 -->
		<u-popup :show="showAdd" :round="10" @close="closeAdd" :safeAreaInsetTop="true" :closeOnClickOverlay="false">
			<view class="tool-box flex-box justify-space-between">
				<view @click="closeAdd">取消</view>
				<view @click="sumbitAddForm">创建</view>
			</view>
			<view class="add-box">
				<u--form :model="addForm" ref="addForm" :rules="addFormRules">
					<u-form-item label="商品" borderBottom prop="payContent">
						<u--input v-model="addForm.payContent" border="surround"></u--input>
					</u-form-item>
					<u-form-item label="金额" borderBottom prop="money">
						<u--input v-model="addForm.money" border="surround"></u--input>
					</u-form-item>
					<u-form-item label="日期" borderBottom>
						<view style="padding:20rpx" class="fs16 font500" @click="changeToday">{{today}}</view>
					</u-form-item>
				</u--form>
				<u-button type="primary" text="下一个" @click="addNext"></u-button>
			</view>
		</u-popup>
		<u-datetime-picker :show="showAddCalendar" v-model="calendarTime" mode="date" @cancel="closeAddPicker"
			@confirm="changeAddCalendarTime"></u-datetime-picker>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 表单
				addFormRules: {
					payContent: [{
						required: true,
						message: '请填写商品',
						trigger: 'blur'
					}],
					money: [{
						required: true,
						message: '请填写金额',
						trigger: 'blur'
					}]
				},
				showAddCalendar: false,
				addForm: {
					money: '',
					payContent: ''
				},
				showCalendar: false,
				calendarTime: Number(new Date()),
				today: new Date(),
				money: {
					today: 0,
					week: 0,
					month: 0,
					all: 0
				},
				payContent: [{
						money: 1,
						payContent: '公交车',
						data: '2021-1-1'
					},
					{
						money: 1,
						payContent: '公交车',
						data: '2021-1-1'
					}
				],
				showAdd: false
			};
		},
		onLoad() {},
		created() {
			this.today = new Date(this.calendarTime)
			this.today = this.utilJs.formatTime(this.today)
		},
		methods: {
			openPicker() {
				this.showCalendar = true;
			},
			closePicker() {
				this.showCalendar = false;
			},
			changeCalendarTime(val) {
				this.today = this.utilJs.formatTime(new Date(val.value))
				this.closePicker()
			},
			openAdd() {
				this.showAdd = true
			},
			closeAdd() {
				this.showAdd = false
				this.$refs.addForm.resetFields()
			},
			changeToday() {
				this.showAddCalendar = true
			},
			closeAddPicker() {
				this.showAddCalendar = false
			},
			changeAddCalendarTime(val) {
				this.today = this.utilJs.formatTime(new Date(val.value))
				this.closeAddPicker()
			},
			addNext(){
				this.$refs.addForm.validate().then(res=>{
					if(res){
						uni.setStorageSync(this.today,this.addForm)
						this.$refs.addForm.resetFields()
					}
				})
			},
			sumbitAddForm() {
				console.log(this.$refs.addForm);
				this.$refs.addForm.validate().then(res=>{
					if(res){
						uni.setStorageSync(this.today,this.addForm)
						this.closeAdd()
					}
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.container {
		box-sizing: border-box;
		margin: 30rpx;
		border: solid;
	}

	.top-today-box {
		margin-top: 30rpx;
	}

	.content-box {
		margin: 40rpx 20rpx 0 20rpx;

		.content-four-box {
			margin-top: 30rpx;
			border-radius: 20rpx;
			width: 47%;
			background-color: #fff;

			.content-four-box-top {
				padding: 10rpx 20rpx;
			}

			.content-four-box-bottom {
				padding: 10rpx 25rpx;
			}
		}
	}

	.payContent-box {
		margin: 40rpx 20rpx 0 20rpx;

		.payContent-content {
			margin-top: 30rpx;
			border-radius: 20rpx;
			padding: 20rpx;
			background-color: #fff;
		}
	}

	.tool-box {
		margin: 30rpx 20rpx 0 20rpx;
		color: #2979ff;
	}

	.add-box {
		margin: 30rpx 20rpx 50rpx 20rpx;
	}
</style>