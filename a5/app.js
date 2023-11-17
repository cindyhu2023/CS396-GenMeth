


// Do setup
document.addEventListener("DOMContentLoaded", function(){
	new Vue({
		el: "#app",
		template: `<div id="app">
			<chat-widget :messages="messages" />


			Current points: {{bot.point}}

			<div id="controls">
				<div>
					<input ref="input" v-model="currentInput" @keyup="sayKey" @keyup.enter="enterInput">

					<button @click="enterInput">↩️</button>
				</div>
				<div>
					<button @click="handleInput('Frozen Yogurt!')">Frozen Yogurt?</button>

					<button @click="handleInput('Let\\'s do something')">Let's do something!</button>
					<button @click="handleInput('Where will I go after I die?')">Where will I go after I die?</button>
					<button @click="handleInput('life advice')">Give me some life advice</button>
				</div>


			</div>

			{{currentInput}}
		</div>`,

		watch: {
			// currentInput() {
			// 	console.log('Input is now', this.currentInput)
			// },

			messages() {
				// console.log("messages", this.messages)
			}
		},

		methods: {
			sayKey() {
				console.log("KEY")
			},

			postToChat(text, owner, isSelf) {
				this.messages.push({
					text: text,
					isSelf: isSelf,
					owner: owner,
				})
			},

			enterInput() {
				let text = this.currentInput
				this.currentInput = ""


				this.handleInput(text)

			},

			handleInput(text) {
				// Does bot things
				this.postToChat(text, "‍🌈", true)

				// Add to the messages in chat

				// Bot does something
				let output = this.bot.respondTo(text)

				setTimeout(() => {
					this.postToChat(output, "👩🏻‍💼")

				}, Math.random()*100 + 400)

			}
		},

		mounted() {

			console.log("Vue app is all set up....")
			setInterval(() => {
				// this.currentInput = randomMessage()

			}, 1500)

			this.bot.post = (text) =>  {
				// this is now the vue object
				this.postToChat(text, "👩🏻‍💼")
			}

		},


		data() {
			return {
				// Store the bot
				bot: new JanetBot(),

				// And the message
				messages: [],

				// And the current thing in the input
				currentInput: ""
			}
		}
	})
})
