# **Relativity Resume**
Web application used to help create resumé's for Cal Poly Pomona students
to prepare them for applying to certain jobs. Our application will provide
useful suggestions to better their descriptions of their experience,
provide clean templates to keep their resume organized,
and print out the resume on a Microsoft Word document.

How to run:
1. After downloading repository, open terminal and cd into bronco-resume-app directory
2. run npm install
3. run npm run start:server
4. Open second terminal and cd into bronco-resume-app directory
5. run ng serve

How to deploy on AWS:
1. Zip all of the backend files into one zip file.
2. Log in to AWS console and start a new Elastic Beanstalk.
3. Set an application name.
4. Platform - select Node.js.
5. Application code -> Upload your code -> Upload -> Local file -> Choose File -> (Previously created zip file).
6. After Elastic Beanstalk environment has been created, click on the Application link and then click on the instance to reload.
7. The health status should quickly become Degraded. This is because it first attempts to run app.js (Express framework) first instead of server.js (Node server). Click on Configuration on the right hand side. Click on Modify under the Software category. Under Node command type node server.js. 
8. Scroll down to environment properties. Under Name enter MONGO_ATLAS_PW. Under Value enter doXbB996gyUniohb. Enter a second property. Under Name enter JWT_KEY. Under Value enter alafi234uweryiumns234568o5457462mnvncurehhkjeiru234234jwehb3423421jhbqgejfhadhjfgjamsdhjgfiuwe. Both of these properties can be found in bronco-resume-app/src/nodemon.json.
9. After the update has finished, if the Health status is still Degraded, click on the Actions button on the top left and restart app servers.
10. Health status should be Ok. On the Dashboard, click on show all next to recent events. Find the Created EIP event and add the IP address to the MongoDB whitelist under network access.
11. On the Dashboard of the Elastic Beanstalk application environment, at the top of the page there is a URL. Click on the URL and copy the URL from the opened web page.
12. In bronco-resume-app/src/environments/environment.prod.ts replace the apiURL with your copied URL + '/api'. It should look something like 'http://resumebuilderbackend-env.tin857nw3q.us-west-1.elasticbeanstalk.com/api'.
13. Save the changes to the file and in the terminal, navigate to the project folder (bronco-resume-app). Run ng build --prod.
14. After the project has been built, you should have a new folder dist in the bronco-resume-app. In AWS, go to Services at the top of the page, click on S3 under Storage and click create a bucket.
15. Give your bucket a name. Click Next twice until you reach permissions. Uncheck Block all public access. Click next and then click create bucket.
16. Click on your newly created bucket. Click on Permissions. Click on Bucket Policy. Paste this into your bucket policy editor.
{
  "Version":"2012-10-17",
  "Statement":[
    {
      "Sid":"PublicRead",
      "Effect":"Allow",
      "Principal": "*",
      "Action":["s3:GetObject"],
      "Resource":["arn:aws:s3:::examplebucket/*"]
    }
  ]
}
Replace examplebucket with your bucket name and click save.
17. Click Properties at the top. Click Static website hosting. Click user this bucket to host a website. Enter index.html for Index document and the Error document. Save.
18. To update any changes to the front end, simply rebuild the project making sure to use the command ng build --prod after saving your changes. Then just upload the new files to your S3 bucket. If you need to make changes to the backend you'll need to save the changes and rezip and upload the new zip file to the Elastic Beanstalk environment.