const utilJs = {
  // 切换日期格式
  formatTime(date) {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()
    return `${[year, month, day].map(this.formatNumber).join('-')}`
    // return `${[year, month, day].map(formatNumber).join('/')} ${[hour, minute, second].map(formatNumber).join(':')}`
  },
  formatNumber(n) {
    n = n.toString()
    return n[1] ? n : `0${n}`
  },
  // 获取一周的日期
  getWeek() {
    let oneDayTime = 1000 * 60 * 60 * 24 //一天的时间
    let today = new Date()
    let todayDay = today.getDay() || 7 //星期几
    let startDate = new Date(
      today.getTime() - oneDayTime * (todayDay - 1)
    )
    let dateList = new Array()
    for (let i = 0; i < 7; i++) {
      let temp = new Date(startDate.getTime() + i * oneDayTime)
      let year = temp.getFullYear()
      let month = temp.getMonth() + 1
      let day = temp.getDate()
      dateList[i] = `${year}-${month}-${day}`
    }
    return dateList
  },
  // 获取一个月的日期
  // 获取一个月的每天
  getMouth() {
    let today = new Date()
    let year = today.getFullYear()
    let month = today.getMonth() + 1
    let d = this.getMouthDay(year, month)
    let dateList = new Array()
    for (let i = 1; i <= d; i++) {
      dateList[i] = `${year}-${month}-${i}`
    }
    return dateList
  },
  // 获取当前月份有几天
  getMouthDay(year, month) {
    let d = new Date(year, month, 0);
    return d.getDate();
  }
}

export default utilJs