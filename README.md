# JobTracker
Webapp to assist tracking of internship/job hunting efforts

# Live Site
https://jobtracker467.netlify.app/

# Project Requirements
The functionality of the web app would include:  
--Account creation (user auth)  
--Users can create jobs/internships  
--Users can also create 'skills' which can relate to specific jobs/internships: Allows them to track which jobs require which skills, see how frequently certain skills are noted within applications, and track how comfortable they are with those skills/if they need to work on those skills more (ex: 'Docker is noted in 60% of your applications').  
--Users can create 'contacts': keep track of networking, contact information for individuals they've networked with who may be related to specific jobs/companies they're applying to.    

Stretch Goals:  
--Incorporate Glassdoor's API and/or reddit's API, to display data related to certain jobs. Use these to research certain internship application processes

# A breakdown of the full technology stack used to complete this project:
Frontend  
○ Hosting: Netlify (handle load balancing, deployments, SSL, etc)  
○ Framework: React  
○ Languages Used: Javascript, CSS, HTML  
○ Libraries: axios, bootstrap, web-vitals, react-dom, react-hook-form, react-scripts  
Backend  
○ Hosting: Google Cloud Platform App Engine  
○ Framework: NodeJS  
○ Languages Used: Javascript  
○ Libraries: Express, Google-Cloud/datastore, body-parser, bCrypt (used for
hashing the user password before saving down to database)
Database  
○ Type: DocumentDB (NoSQL)  
○ Platform: Google Cloud Platform Datastore  
○ Features: Managed database, so no need to run underlying instances to run the
database. Additionally the database will scale automatically to handle changes in
application demand and storage requirements.  
