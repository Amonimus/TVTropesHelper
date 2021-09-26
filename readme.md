What is:
* An experimental extension for Chrome for gatherting unread messages from https://tvtropes.org/.

Functions:
* It opens the Following page and the Followed Threads page in the background and reads HTML.
* If it sees no table, it assumes the user isn't logged in and shows the login form in iframe.
* If it sees a table, it assumes the user is logged in and copies the profile pic and name.
* If it sees unread messages in the tables, it copies the rows and pareses them into the pop-up and changes the icon.
* The script refreshes every minute.
* Confirmed working even if no tabs are open on tvtropes.com.

Issues:
* I've used String.Split for parsing rows. If Table's html changes, the whole things requires an update.
* It will only load 50 most recent messages (1 page).
* Popup doesn't update while it's open.
* May not work on older versions of Crhome.
* May be slow if you have bad internet, it effectively loads 2 webpages.

Installation:
* Download and extract everything into a folder.
* Open chrome://extensions/, enable Developer mode, click Load unpacked and select the folder.

Plans:
* Parse DMs there too?
* Custom page watcher like AAT or Trope Finder.
* Options page? Timer settings?