<h1> Hacker News Clone </h1>
This is a Hacker News clone built using the MERN (MongoDB, Express.js, React.js, Node.js) stack. It provides users with a familiar interface to view and interact with top news articles in reverse chronological order. The website also allows users to mark articles as read or delete them from their dashboard.

# Tech Stack

* MongoDB
* Express.js
* React.js
* Node.js

# Features
* <b>Top News Articles:</b> The website displays the top 90 articles sourced from Hacker News.

* <b>Article Details:</b> Each news item includes the following fields:
URL,
Hacker News URL,
Posted On,
Upvotes,
Comments,

* <b>Web Scraping:</b> A script crawls the first three pages of Hacker News, extracts news items, and adds them to the database. If an item already exists, it updates upvote and comment counts.

* <b>User Authentication:</b> Users can sign up or log in to access their personalized dashboard.

* <b>Dashboard:</b> The dashboard lists all news items in reverse chronological order.

* <b>Mark as Read or Delete:</b> Users can mark an article as read or delete it. Deleted items are hidden from their dashboard but are not removed from the database.

# Quick Start

Follow these steps to set up the project locally on your machine.

<h3>Prerequisites</h3>

Make sure you have the following installed on your machine:

* Git
* Node.js
* npm (Node Package Manager)

<h3>Cloning the Repository</h3>

git clone https://github.com/tushar21o7/Hacker-News.git

<h3>Installation</h3>

Install the project dependencies using npm:

npm install

<h3>Set Up Environment Variables</h3>

Create a new file named .env in the server directory of the project and add the following content:

MONGO_URI=

ACCESS_TOKEN_SECRET=

ACCESS_TOKEN_EXPIRY=

Replace the placeholder values with your actual credentials.

<h3>Running client</h3>
cd client

npm run dev

<h3>Running server</h3>
cd server

npm start

Open http://localhost:5173 in your browser to view the project.
