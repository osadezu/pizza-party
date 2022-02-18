# PizzaParty 🍕

A fast and easy way for new remote teams to break the zoom ice. Through a shared link, the group quickly throws together an interactive album, immediately dipping their toes into the collab spirit. During their first few days working together, members can revisit the page to remind themselves of who is who, where everyone lives, and what was the name of that fun person that —against all odds— hates Hawaiian.

## See it Live 

🚧 https://pizza-party.osadezu.com/ 🚧 (actively under development)

### Technology Stack

- [Next.js](https://nextjs.org/) ([React](https://reactjs.org/)) app deployed on [Vercel](https://vercel.com/)
- [Django](https://www.djangoproject.com/)-based [REST API](https://www.django-rest-framework.org/) with [PostgreSQL](https://www.postgresql.org/) deployed on [Heroku](https://www.heroku.com)
- Authentication session data stored in encrypted cookies using [iron-session](https://github.com/vvo/iron-session)
- [AWS S3]([url](https://aws.amazon.com/s3/) user image storage.
- Other: [Djoser](https://github.com/sunscrapers/djoser), [Axios](https://axios-http.com/), [swr](https://swr.vercel.app/)
- Parts of the styling were borrowed / informed by:
  - https://bootswatch.com/sketchy/
  - https://codepen.io/tmrDevelops/pen/VeRvKX
  - https://codepen.io/piccalilli/pen/MPLzay
  - https://codepen.io/mp/pen/kBEeKw
- Huge shout-out to [Excalidraw](https://excalidraw.com/#json=RK85fN9wlf43MLqPG5Nx7,TRVcMeBK_V8_pC90jWjGiQ) for their amazing, free app. 

### pizza-party-api

Visit the [API repo](https://github.com/osadezu/pizza-party-api/).

## Planning

### Wireframes

![image](https://user-images.githubusercontent.com/24361930/154749581-d112c163-ccbb-4c63-aa77-10b6d6f60747.png)
![image](https://user-images.githubusercontent.com/24361930/154749598-7d345537-403b-44a9-90b9-ed5cb7fde841.png)
![image](https://user-images.githubusercontent.com/24361930/154749611-485269f0-dd8f-49b6-bb92-cc2c3a2f6b81.png)
![image](https://user-images.githubusercontent.com/24361930/154749623-f3f9a407-a993-4ef6-9641-e52347b58034.png)

#### User stories

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
