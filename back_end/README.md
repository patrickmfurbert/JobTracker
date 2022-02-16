To launch JobTracker Backend on Google Cloud: 

1. Setup an account on GCP, usually you will get first 3 months free 
2. Launch the Google Cloud Platform, setup a new project 
3. In GCP > search for App Engine > Create  application
4. App Engine will ask for Language/Env, you can skip this and go straight to Terminal (find the terminal icon on top right of App Engine window) > Activate Cloud Shell 
5. A new terminal will popup on bottom of screen. Clone the backend repo in this terminal. 
6. Access the repo in terminal and type 'gcloud app deploy' . This will make AppEngine run the backend software.
7. Once deployed, you will receive a URL from AppEngine where you can point your backend requests, should look like: jobtracker467.uc.r.appspot.com 
8. Lastly note all data will be automatically be saved to GCP Datastore 
