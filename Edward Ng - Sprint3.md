For this sprint, I connected our project to ebay's API.

I created an ebay developer account and got approved for a key to access ebay's production api. 

Relevant links I found very useful this sprint:
https://www.youtube.com/watch?v=bYFYF2GnMy8&list=PLC3y8-rFHvwgg3vaYJgHGnModB54rxOk3
-how to make an HTTP request using axios in node.js

https://kapeli.com/cheat_sheets/Axios.docset/Contents/Resources/Documents/index
-Clarifies documentation on axios body format

https://stackoverflow.com/questions/43761288/token-type-in-the-authorization-header-is-invalid-ebay-api
-"Bearer" in front of ebay's authentication token makes it work

https://forums.developer.ebay.com/questions/44165/endpoint-for-getitem-browseapi.html
-/item_id in ebay's browse api GET getItem method does not actually refer to the id of an item on ebay's site listing, but rather is set to 0 for some reason
-instead, that id should be the legacyID part of getItem call instead

https://stackoverflow.com/questions/45578844/how-to-set-header-and-options-in-axios
-axios's method calls are very versatile in allowing information set by additional flags within its body, on top of url and method

I was able to make our project directly pull the name data from a shopping item on ebay using only that item's ID beforehand in a GET api call.
The project has demonstrated that it can directly interact with ebay through axios calls. However, I am not sure if the access token I'm using
to access ebay is permenant for the time being so I will need to look into how to prevent our authentication from running out in future sprints.