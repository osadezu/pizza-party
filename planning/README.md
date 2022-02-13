### Your project idea

**PizzaParty** is a fast and easy way for new remote teams to break the zoom ice. Through a shared link, the group quickly throws together an interactive album, immediately dipping their toes into the collab spirit. During their first few days working together, members can revisit the page to remind themselves of who is who, where everyone lives, and what was the name of that fun person that —against all odds— hates Hawaiian.

### Your tech stack (frontend, backend, database)

f. Next.js (React), with some ui framework like Bootstrap/[MDB](https://mdbootstrap.com/docs/b5/react/)/[Motion](https://www.framer.com/motion/)
b. Django, DRF, Djoser
d. PostgreSQL

### List of backend models and their properties

- User

  - email
  - username
  - password

- Member (would it be better to combine whith user or keep separate?)

  - first_name
  - last_name
  - goes_by
  - pronouns
  - avatar
  - link
  - location
  - interests
  - pets
  - answer_to_custom_question
  - collab (field that gets populated collectively into the team page for inspiration)
  - likes_count

- Team
  - Name
  - Blurb
  - hero_image
  - admin (User)
  - custom_question

### React component hierarchy

- App
  - TeamView
    - TeamCollab
    - MapView
    - MembersGrid
      - MemberView
  - TeamEdit
  - MemberEdit

### User stories

- As a member of a new team, I would like to have a visual reference to remember who is who in the team.
- As a member of a new team, I would like to see some non-intrusive details about my team members so that I can get acquainted with them more easily.
- As a member of a new remote team, I would like to see a map showing where everyone is located so that I can feel connected and inspired to work together.
- As a member of a remote team, I would like an easy and safe opportunity to display a little bit of my personality and learn more about my peers to promote friendly collaboration.
- As a user of an online platform, I would like an easy way to enter, edit, and delete my information so that I always have control of what is shown.
- As a user of an online team-building tool, I would like to have small ways to interact so that I can feel there are real people in my team.
- As a member of a new team, I would like to have an early opportunity to do something fun as a group so that I can feel inspired by collaboration.
- As the leader/organizer of a new remote team, I would like an easy and low-commitment exercise so that my team starts coming together quickly.
- As the leader/organizer of a new remote team, I would like my team members to make something together in little time so that they can soon feel onboarded into a dynamic team.
- As a team admin, I would like to quickly create a team page with a custom image and some basic information so that it matches my team's purpose.
- As the leader/organizer of a collective exercise, I would like to choose a custom prompt for my teammates so that I can set the tone of the exercise.

### Wireframes

<img width="883" alt="image" src="https://media.git.generalassemb.ly/user/40345/files/28bbed00-8b28-11ec-994a-853cf7350a5b">
<img width="883" alt="image" src="https://media.git.generalassemb.ly/user/40345/files/36717280-8b28-11ec-9fd7-f5b9330ebbe5">
<img width="883" alt="image" src="https://media.git.generalassemb.ly/user/40345/files/3f624400-8b28-11ec-9fa5-3450303c8059">
<img width="883" alt="image" src="https://media.git.generalassemb.ly/user/40345/files/46895200-8b28-11ec-9e55-1247a8fcc8ef">

### Stretch Goals

- Allow team admin to select a color theme
- Allow each member to select a color for their member card in the team
- Extend likes to add emoji reactions
- Add a department/subgroup field for members of larger teams

### Anything else your squad lead should know

- I would like a little help choosing a UI framework to simplify building elements like member cards and grids with attractive styling that can support some subtle animations.
- Regarding DB, is it a good idea to create a separate Member table to hold the team-member's details separate from Django's authenticated user?
