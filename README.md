hello-firestore
===============

A real time synchronized note that used [Firebase](https://firebase.google.com/) and [Vue.js](https://vuejs.org/).

[test now](https://hello-firestore-1936b.firebaseapp.com/)

## How to deploy
1. Make project in [Firebase console](https://console.firebase.google.com/).

2. Enable Authentication with Google by Firebase console.

3. Set firestore security rule.

```
service cloud.firestore {
  match /databases/{database}/documents {
    match /notes/{userID} {
    	allow read, write: if request.auth.uid == userID;
    }
  }
}
```

4. Write api keys into `public/config.js`.

Example is [public/config.js.example](./public/config.js.example).

5. [Deploy or serve with Firebase Hosting](https://firebase.google.com/docs/hosting/quickstart).
