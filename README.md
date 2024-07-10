# Amazon Clone – Full Stack Web App #  
  
## Table of Contents ##
- [Overview](#overview)  
- [Recorded Video](#recorded-video)  
- [Tech Stack](#tech-stack)  
- [Features](#features)  
- [What I Learned](#what-i-learned)  
- [Challenges and Solutions](#challenges-and-solutions)   
  
## Overview ##  
Amazon Clone, a Full-Stack Web Application developed using a variety of technologies. The primary purpose is to provide users with an experience similar to the Amazon platform, including features like user authentication, product management, cart handling, address management, and order handling.  
  
  
## Recorded Video ##  
[Watch the recorded video by clicking here](https://drive.google.com/file/d/1ayao7cyXCGsmqvGClh2vSVuUepUekEwz/view?usp=drive_link)  

   
## Tech Stack ##  
  
### Frontend:  ###  
- HTML5  
- CSS3  
- JavaScript  
- React JS  
  
### Backend: ###   
- Firebase for user authentication and data storage.    
- Express and Node JS for server-side functionality.  
  
### Payment:  ###  
- Stripe for secure payment processing.  
  
  
## Features:  ##  
  
### User Authentication: ###  
- Implemented secure user sign-up with Firebase, including email verification and with proper error handling.  
- Enabled users to sign in with email and password.  
  
### Interactive Home Page: ###  
- Designed a header with navigation menus and a cart icon.  
- Personalized user experience with greetings and address management.  
- Implemented a product slideshow with navigation arrows for enhanced user engagement.  
- Included a cart icon displaying item count and linking to the checkout page.  
  
### Address Management: ###  
- Displayed user addresses with an option to add new ones.  
- Implemented a loader for seamless address fetching.  
- Developed a form for adding new addresses with Firebase storage.  
  
### Efficient Checkout Process: ###  
- Incorporated an advertisement section for promotions.  
- Displayed added products with delete options on the left side.  
- Showcased subtotal on the right side, with a "Proceed to Buy" button.  
- Implemented an alert for an empty cart.  
  
### Secure Payment Processing: ###  
- Integrated Stripe for secure payment transactions.  
- Enabled users to select a delivery address and enter payment details with validation.  
- Facilitated server-side payment processing with Express and Firebase.  
  
### Order Management: ###  
- Displayed user orders with details, including a search bar for easy retrieval.  
  
  
## What I learned:  ##  
During the development of the Amazon Clone, I gained valuable insights into key aspects of web development, particularly in payment processing and data management. Here's a summary of my learnings:   
  
**Server-Side Payment Processing:**  
- Explored the integration of React for the front-end and Express for the back-end to facilitate payments.  
- Adopted the widely recognized concept of "server-side payment processing" by using the Express server to communicate with Stripe, ensuring secure and efficient payment transactions.   
  
**Firebase Data Handling:**  
- Developed proficiency in storing and retrieving data using Firebase.  
- Accomplished strategic implementation of Firebase without resorting to Firebase Cloud Functions for payment processing.   
  
These challenges have not only improved my technical skills but also given me a deeper understanding of how payment processing, and data management work together to create a secure and user-friendly web app.   
  
  
## Challenges and Solutions: ##  
Throughout the development of the Amazon Clone, I encountered various challenges that prompted creative problem-solving. Here's summary of these challenges and the solutions implemented:  
  
**User Authentication Complexity:**    
- Challenge: Creating a secure and seamless user authentication process presented complexities in managing user data.  
- Solution: Leveraged Firebase for user authentication, arranged the sign-up and sign-in processes. This ensured robust security while simplifying user management.  
  
**Address Handling and Validation:**  
- Challenge: Efficiently managing user addresses while ensuring accurate validation was a challenge in the address-related features.  
- Solution: Implemented a structured system for handling addresses using Firebase. Validated address details, enhancing the overall user experience.  
  
**Payment Processing Integration:**    
- Challenge: Integrating Stripe for secure payment processing required coordination between the frontend and backend, was a technical integration challenge.  
- Solution: Utilized Express on the backend to communicate with Stripe, facilitating server-side payment processing. This approach ensured a secure and smooth payment transaction flow.   
  
**Firebase Data Handling for Orders:**    
  
- Challenge: Efficiently storing and retrieving order data from Firebase presented challenge in data organization and retrieval.    
- Solution: Strategically organized order data in Firebase, optimizing data retrieval for the user's order history. This approach maximized efficiency without resorting to complex Firebase Cloud Functions.  
  