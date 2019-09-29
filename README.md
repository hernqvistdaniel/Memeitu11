MEMEIT
=======

## A reddit clone built as a school-project with NodeJS and Handlebars

As our mid-term full-stack project I decided to build a reddit-clone. I wanted something that could be used by old friends or school-mates that you won't see for a while. I like reddit and the structure of it. I knew that i couldn't accomplish the same complexity in a month time. But I wanted to build something that wasn't very front-end heavy, instead going for a more complex database with alot of endpoints supporting alot of different options for users on the site.  


* A user can register an account with username and password that is encrypted.
* A user can edit his/her profile to extend personality while using the forums.
* A user can enter a room, a room is to memeit what /r is to reddit. In the room there are posts, or the user can create posts. Which other people can comment on, and upvote/downvote.
* A post contains a title and subject-body. It also supports adding image and a clickable link. The post is displayed with the username as author with a timestamp of the creation.
* A comment also displays the author with a timestamp.
* All usernames are clickable to show their profile.
* A user has statistics that comes with total posts and total comments.
* The index room displays dynamic and fun statistics such as: The post with highest number of accumulated points, the newest post and the top3 users that has provided the most posts.
* A user can delete their account by a security measurement of writing their own username before hitting delete.
* A user can edit and delete their own posts.
* A user can become the moderator, giving him/her extended authority of deleting and editing all posts, aswell as creating new rooms (/r).
* A user can become an admin, giving them even more authority than the moderator by gaining access to the database aswell as the option to delete other users.  

Memeit is hosted at: [here!](https://memeitu11.herokuapp.com)

Written by **Daniel Hernqvist** while studying at Chas Academy in Stockholm.

Created using Nodejs, express and handlebars view engine.

Not sourced, read [License.](https://github.com/hernqvistdaniel/Memeitu11/blob/master/LICENSE.md)