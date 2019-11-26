## A full-stack app template that you can have hosted and running in minutes. Based on React-Hooks and Firebase.

**Live demo at: (https://react-firebase-essentials.com)**

This is a full application template intended to provide the basic features that most online products or services need to get started, so that you can get straight into building out the important parts of your MVP without getting bogged down with the boring tasks that you've already done for a million apps before.

**Features:**

- Modern authentication UI flows have already been built out, it's as simple as plugging in your Firebase API keys. Email, Facebook and Google are all included methods.
- Basic security rules have already been written for the database.
- It's built entirely with React Hooks and the new Context API. Built on top of Create-React-App.
- Mobile-ready responsive design.
- Push Notifications set up out of the box, with a cloud function supplied for triggering messages.
- Utilizes Styled-Components, carefully using global variables that allow you to quickly and easily adjust to your tastes.
- Requires very few dependencies.
- Dark Mode! You gotta have dark mode!

**Getting set up:** (in minutes)

1. Make sure you have both Create-React-App and the Firebase CLI installed. Create a new project in the Firebase console and **make sure** you go into project settings and choose a GCP resource location under the general tab.
2. Enable Facebook, Google, and Email/Password authentication in the Firebase console. When enabling "Email/Password", be sure to enable "Email link" as well. (OAuth with Facebook and Google will require some additional steps, outlined when you view each method in the Firebase authentication console)
3. Clone the project and `npm run setup`.
4. Select your Firebase project in the command line by using `firebase use [YOUR_PROJECT_ID]`.
5. Copy the contents from `.env_template.txt` and create an `.env.production.local` and put your Firebase keys there. Be sure to create an `.env.development.local` for working locally as well.
6. Go into `public/firebase-messaging-sw.js` and manually change the messagingSenderId, which will be the same as `REACT_APP_FIREBASE_MESSAGING_ID` in your `.env` files.
7. Run `npm run build` to create a production build of your project, and `firebase deploy`. Your application should now be hosted and ready to visit.
