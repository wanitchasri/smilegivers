# SMILE GIVERS APP (Front-End)
----------------------------------------------------

## COURSE INFO
ID : CSX4107 <br />
Name : Web Application Development <br />
Assignment : Final Project

----------------------------------------------------

## TEAM MEMBERS 
- SUTISAN NILRATTANAKUL (6213221) <br />
- WANITCHA SRITHONGCHUAY (6213365) 

----------------------------------------------------

## PROJECT DESCRIPTION
This application is used to manage item donation requesting process with regards the needed items posted by the admin. Users are divided into admin and donator. The app allows the admin to post and update the list of items which is currently in short supply and allows the donator to make a donation request as per those items listed. Note that the process of sending and receiving items will be done outside the system. Only the requesting process of item shortage and item donation are to be supported by the app.

### STAKEHOLDERS
1. Admin/Distributor 
   > acts as the site administrator who is responsible for managing the item and donation requests. (i.e., Charity Foundation)
2. Donator/Supporter
   > can check for current needed items and choose to donate any listed items in a desired quantity.

### ENTITIES
1. Item
   - name
   - neededAmount
2. Donation
   - code
   - itemName
   - quantity
   - donatorName
   - contactNo
   - donationStatus
3. EditRequest
   - type
   - requestorName
   - donationCode
   - requestStatus

### FUNTIONALITIES
> CRUD = CREATE, READ, UPDATE, DELETE <br />
> Rest API = GET, POST, PUT, PATCH, DELETE

THE WEBSITE IS DIVIDED FOR TWO STAKEHOLDERS (ADMIN & DONATOR) <br />
The main web page is for users who are donators. <br />
For admins, system log-in is required. (The web page shown will be different from regular users.) <br />
However, log-in system is provided for both stakeholders.

1. **Admin/Distributor** <br />
   > email: admin@hotmail.com <br />
   > password: adminishere <br />
   - add needed items (POST)
   - update needed items (PUT, PATCH)
   - remove needed items after success distribution (DELETE) <br />
     > *item distribution is done outside the system*
   - check for donation requests (GET)
   - remove donation requests after receiving donated items (DELETE) 
     > *donation acceptance is done outside the system*
2. **Donator/Supporter** <br />
   > email: donator@hotmail.com <br />
   > password: donatorishere <br />
   - check for needed items (GET)
   - donate items (POST)
   - request to update donation (PUT, PATCH)
   - request to cancel donation (DELETE)

----------------------------------------------------

## TECH STACK
This project uses **MERN** Stack for implementation.
> MERN = MongoDB, Express, React, Node <br />
> Front-end : React.js <br />
> Back-end : Express.js

----------------------------------------------------
