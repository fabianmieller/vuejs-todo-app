	document.onreadystatechange = () => {
  	if (document.readyState === 'interactive') {
			Vue.component('list-item', {
			props: ['typ', 'item', 'index', 'check'],
			template: '<li>' +
				'<input type="checkbox" :id="item.name+index" :checked="typ === \'checked\' ? \'checked\' : \'\'" :value="item" @click="onCheckItem"> ' +
				'<label :for="item.name+index">{{ item.name }}</label> - {{ unixToCalenderDate(item.created_at) }} - {{ unixToCalenderDate(item.updated_at) }}' +
				' <a v-if="typ !== \'checked\'" @click="removeItem">Remove</a>' +
				'</li>',
			methods: {
				onCheckItem(event) {
					this.$emit('checked', this.index, this.typ);
				},
				removeItem(event) {
					this.$emit('clicked', this.index);
				},
				unixToCalenderDate(date) {
					return moment.unix(date).format("DD-MM-YYYY, h:mm:ss a");
				}
			}
		});

		let app = new Vue({
			el: '#app',
			data: {
				sayHello: "Hello",
				unchecked: [{
					name: "eins",
					created_at: "1510522332",
					updated_at: "1510522332"
				}, {
					name: "zwei",
					created_at: "1510522332",
					updated_at: "1510522332"
				}],
				checked: [{
					name: "drei",
					created_at: "1510522332",
					updated_at: "1510522332"
				}]
			},
			methods: {
				onCheck(index, typ) {
						if (typ === "unchecked") {
							this.unchecked[index].updated_at = moment().unix();
							this.checked.push(this.unchecked[index]);
							this.unchecked.splice(index, 1);
						} else if (typ === "checked") {
							this.checked[index].updated_at = moment().unix();
							this.unchecked.push(this.checked[index]);
							this.checked.splice(index, 1);
						}
					},
					removeItem(index) {
						this.unchecked.splice(index, 1);
					},
					addItem(event) {
						let date = moment().unix();
						this.unchecked.push({
							name: event.target.value,
							created_at: moment().unix(),
							updated_at: moment().unix()
						});
						event.target.value = "";
					}
			},
			computed: {
				status() {
						let checkedSum = this.checked.length;
						let status = 0;
						if (checkedSum > 0) {
							status = checkedSum / (this.unchecked.length + checkedSum) * 100;
						}
						status = status.toFixed(0);
						return status;
					},
					moment() {
						return moment;
					}
			}
		});
	}
};