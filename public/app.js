new Vue({
	el: 'main',
	data: {
		user: null,
		note: '',
	},
	mounted() {
		firebase.auth().onAuthStateChanged(user => {
			this.user = user;

			if (user !== null) {
				/* get once *//*
				this.db.collection('notes').doc(user.uid).get()
					.then(doc => {
						if (doc.exists) {
							this.note = doc.data().note;
						}
					})
					.catch(console.error)
					*/

				/* get realtime */
				this.db.collection('notes').doc(user.uid)
					.onSnapshot(doc => {
						if (doc) {
							this.note = doc.data().note;
						}
					})
			}
		});

		firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
			.then(() => {
				const ui = new firebaseui.auth.AuthUI(firebase.auth());

				ui.start('#auth-container', {
					signInOptions: [
						firebase.auth.GoogleAuthProvider.PROVIDER_ID,
					],
					signInSuccessUrl: location.href,
				});
			})
			.catch(console.error)
	},
	computed: {
		db() {
			return firebase.firestore();
		},
	},
	methods: {
		upload() {
			this.db.collection('notes').doc(this.user.uid).set({
				user: this.user.uid,
				note: this.note,
			}).catch(console.error);
		},
		logout() {
			firebase.auth().signOut();
			location.reload();
		},
	},
});
