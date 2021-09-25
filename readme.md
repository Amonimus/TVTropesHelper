What is:
* An experimental extension for Chrome for gatherting unread messages from https://tvtropes.org/.

Functions:
* It reads Following page and Followed Threads page as HTML.
* If it sees unread messages, it copies the rows and pareses them into the pop-up and changes the icon.
* The script refreshes every minute.
* Confirmed working even if no tabs are open on tvtropes.com.

Issues:
* You must be logged in.
* I've used string.split for parsing rows. If table html changes, the whole things requires an update.
* It will only load 50 most recent messages (1 page).
* It refreshes at set intervals, should add a manual refresh.
* Maybe move (remove) jquery if it's not used.
* May not work on older versions of Crhome.
* May be slow if you have bad internet, it effectively loads 2 webpages.

Installation:
# Download and extract everything into a folder.
# Open chrome://extensions/, enable Developer mode, click Load unpacked.

Plans:
* Parse DMs there too?
* Custom page watcher like AAT or Trope Finder.
* Options page? Timer settings?