# Problem Statement

Create a project management application similar to Trello. This application allows users to manage projects by tracking smaller tasks.

## Features

- **Boards**: Represent different projects.
- **Lists**: Represent sub-projects within a board.
- **Cards**: Represent smaller tasks within a list.
- **User Assignment**: Cards can be assigned to users or remain unassigned.

## Requirements

### Entities
- **User**: Each user should have:
    - `userId`
    - `name`
    - `email`
- **Board**: Each board should have:
    - `id`
    - `name`
    - `privacy` (PUBLIC/PRIVATE)
    - `url`
    - `members`
    - `lists`
- **List**: Each list should have:
    - `id`
    - `name`
    - `cards`
- **Card**: Each card should have:
    - `id`
    - `name`
    - `description`
    - `assigned user`

### Functional Requirements
1. **Board Operations**:
     - Create/Delete boards.
     - Add/Remove members from the board.
     - Modify board attributes.
     - Deleting a board should delete all its lists.

2. **List Operations**:
     - Create/Delete lists.
     - Modify list attributes.
     - Deleting a list should delete all its cards.

3. **Card Operations**:
     - Create/Delete cards.
     - Assign/Unassign a member to/from a card.
     - Modify card attributes.
     - Move cards across lists within the same board.

4. **Display Operations**:
     - Show all boards with their lists and cards.
     - Show a specific board, list, or card with all attributes.

### Default Behaviors
- Boards are public by default.
- Cards are unassigned by default.
- IDs for boards, lists, and cards are auto-
BOARD 5da1583ec25d2a7e246b0375 ADD_MEMBER user1
BOARD 5da1583ec25d2a7e246b0375 ADD_MEMBER user2
BOARD 5da1583ec25d2a7e246b0375 ADD_MEMBER user3
BOARD 5da1583ec25d2a7e246b0375 REMOVE_MEMBER user2
SHOW BOARD 5da1583ec25d2a7e246b0375
BOARD DELETE 5da1586caaaad00d9b2d7aa6
SHOW BOARD 5da1586caaaad00d9b2d7aa6
SHOW
LIST CREATE 5da1583ec25d2a7e246b0375 Mock Interviews
SHOW LIST 5da1583547c78c15a1408df2
LIST 5da1583547c78c15a1408df2 name Mock Interviews - Applied
SHOW LIST 5da1583547c78c15a1408df2
LIST CREATE 5da1583ec25d2a7e246b0375 Mock Interviews - Scheduled
SHOW BOARD 5da1583ec25d2a7e246b0375
CARD CREATE 5da1583547c78c15a1408df2 abcd@gmail.com
CARD CREATE 5da1583547c78c15a1408df2 abcda@gmail.com
SHOW LIST 5da1583547c78c15a1408df2
CARD 5da1583547c78c15a14kj78g name abcde@gmail.com
CARD 5da1583547c78c15a14kj78g description At 7PM
SHOW LIST 5da1583547c78c15a1408df2
CARD 5da1583547c78c15a14kjsd8 ASSIGN gaurav@workat.tech
SHOW CARD 5da1583547c78c15a14kjsd8
CARD 5da1583547c78c15a14kjsd8 MOVE 5da1583547c78c15a143hj34
SHOW LIST 5da1583547c78c15a1408df2
SHOW LIST 5da1583547c78c15a143hj34
CARD 5da1583547c78c15a14kjsd8 UNASSIGN
SHOW CARD 5da1583547c78c15a14kjsd8
SHOW
Sample Output
No boards
Created board: 5da1583ec25d2a7e246b0375
{"id": "5da1583ec25d2a7e246b0375", "name": "work@tech", "privacy": "PUBLIC"}
[{"id": "5da1583ec25d2a7e246b0375", "name": "work@tech", "privacy": "PUBLIC"}]
{"id": "5da1583ec25d2a7e246b0375", "name": "workat.tech", "privacy": "PRIVATE"}
Created board: 5da1586caaaad00d9b2d7aa6
[{"id": "5da1583ec25d2a7e246b0375", "name": "workat.tech", "privacy": "PRIVATE"}, {"id": "5da1586caaaad00d9b2d7aa6","name": "workat", "privacy": "PUBLIC"}]
{"id": "5da1583ec25d2a7e246b0375", "name": "workat.tech", "privacy": "PRIVATE", "members": [{"id": "user1", "name":"Gaurav Chandak", "email": "gaurav@workat.tech"}, {"id": "user3", "name": "Sagar Jain", "email":"sagar@workat.tech"}]}
Board 5da1586caaaad00d9b2d7aa6 does not exist
[{"id": "5da1583ec25d2a7e246b0375", "name": "workat.tech", "privacy": "PRIVATE", "members": [{"id": "user1", "name":"Gaurav Chandak", "email": "gaurav@workat.tech"}, {"id": "user3", "name": "Sagar Jain", "email":"sagar@workat.tech"}]}]
Created list: 5da1583547c78c15a1408df2
{"id": "5da1583547c78c15a1408df2", "name": "Mock Interviews"}
{"id": "5da1583547c78c15a1408df2", "name": "Mock Interviews - Applied"}
Created list: 5da1583547c78c15a143hj34
{"id": "5da1583ec25d2a7e246b0375", "name": "workat.tech", "privacy": "PRIVATE", "lists"": [{"id":"5da1583547c78c15a1408df2", "name": "Mock Interviews - Applied"}, {"id": "5da1583547c78c15a143hj34", "name": "MockInterviews - Scheduled"}] "members": [{"id": "user1", "name": "Gaurav Chandak", "email": "gaurav@workat.tech"},
{"id": "user3", "name": "Sagar Jain", "email": "sagar@workat.tech"}]}
Created card: 5da1583547c78c15a14kjsd8
Created card: 5da1583547c78c15a14kj78g
{"id": "5da1583547c78c15a1408df2", "name": "Mock Interviews - Applied", "cards": [{"id": "5da1583547c78c15a14kjsd8","name": "abcd@gmail.com"}, {"id": "5da1583547c78c15a14kj78g", "name": "abcda@gmail.com"}]}
{"id": "5da1583547c78c15a1408df2", "name": "Mock Interviews - Applied", "cards": [{"id": "5da1583547c78c15a14kjsd8","name": "abcd@gmail.com"}, {"id": "5da1583547c78c15a14kj78g", "name": "abcde@gmail.com", "description": "At 7PM"}]}
{"id": "5da1583547c78c15a14kjsd8", "name": "abcd@gmail.com", "assignedTo": "gaurav@workat.tech"}
{"id": "5da1583547c78c15a1408df2", "name": "Mock Interviews - Applied", "cards": [{"id": "5da1583547c78c15a14kj78g","name": "abcde@gmail.com", "description": "At 7PM"}]}
{"id": "5da1583547c78c15a143hj34", "name": "Mock Interviews - Scheduled", "cards": [{"id":"5da1583547c78c15a14kjsd8", "name": "abcd@gmail.com", "assignedTo": "gaurav@workat.tech"}]}
{"id": "5da1583547c78c15a14kjsd8", "name": "abcd@gmail.com"}
Expectations
Make sure that you have a working and demonstrable code
Make sure that the code is functionally correct
Code should be modular and readable
Separation of concern should be addressed
Please do not write everything in a single file
Code should easily accommodate new requirements and minimal changes
There should be a main method from where the code could be easily testable
[Optional] Write unit tests, if possible
No need to create a GUI
Optional Requirements
Please do these only if you’ve time left. You can write your code such that these could be accommodated without changing your code much.

Ability to clone a list with all the cards in it. All of these should have a different id.
Ability to delete all the cards in a list without deleting the list.
Option to add tags to a card and ability to get cards based on assigned tags.
Ability to find all the cards assigned to a particular user.
Setup process
Please go through the setup process here.

Submission
Try to solve it within 1.5 hours.
Please go through the submission process here.