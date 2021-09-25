What is:
* An experimental extension for Chrome for gatherting unread messages from https://tvtropes.org/.

Functions:
* It reads Following page and Followed Threads page as HTML.
* If it sees unread messages, it copies the rows and pareses them into the pop-up and changes the icon.

Issues:
* You must be logged in.
* I've used string.split for parsing rows. If table html changes, the whole things requires an update.
* It will only load 50 most recent messages (1 page).

Installation:
# Download and extract everything into a folder.
# Open chrome://extensions/, enable Developer mode, click Load unpacked.

Plans:
* Parse DMs there too?
* Custom page watcher like AAT or Trope Finder.