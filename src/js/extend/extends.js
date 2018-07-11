/**
 *扩展Array原型方法
 *last()			-获取数组最后一项
 *remove()			-删除指定元素
 */

Object.assign(Array.prototype, {
	/**
	 * 获取数组最后一项
	 * @AuthorHTL
	 * @DateTime  2018-04-16T13:39:11+0800
	 * @return    {any}     - 数组最后一项
	 */
	last () {
		return this[this.length - 1]
	},
	/**
	 * 删除指定元素
	 * @AuthorHTL
	 * @DateTime  2018-04-16T13:39:11+0800
	 * @param    {*}     item 需要删除的元素
	 * @return   {Number}     - 元素下标，如果不存在则-1
	 */
	remove(item) {
		for (let [i, a] of this.entries()) {
			if (item == a) {
				this.splice(i, 1)
				return i
			}
		}
		return -1;
	},

	/**
	 * 数组是否包含指定元素
	 * @AuthorHTL
	 * @DateTime  2018-04-16T13:43:35+0800
	 * @param     {any}                 		item 要查找的值
	 * @return    {Boolean}                      
	 */
	contains (item) {
		for (var i in this) {
			if (this[i] == item) return true
		}
		return false;
	}
})