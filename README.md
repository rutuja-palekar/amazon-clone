Project Title: Amazon Clone – Full Stack Web App  
  
  
Project Overview:  
This project is an Amazon clone, a full-stack web application built using a variety of technologies. The primary purpose is to provide users with an experience similar to the Amazon platform, including features like sign-up, sign-in, product browsing, cart management, address management, and order history.  
  
  
Tech Stack:  
  
Frontend:  
HTML5  
CSS3  
JavaScript  
React JS  
Material UI (for icons)  
react-router-dom package  
react-currency-format package  
date-fns package  
  
Backend:  
Firebase for user authentication and data storage  
Express for server-side functionality  
Node JS as the runtime environment  
  
Payment:  
Stripe for secure payment processing  
  
  
Features:  
1.Sign Up  
Create an account with a form that includes name, mobile number, email, and password.  
Firebase stores user details.  
Email verification link sends to provided email.  
Validation for each field with error display.  
Link to sign in page.  
  
2.Sign In  
Sign in with email and password.  
Alert for invalid credentials.  
Link to sign up page.  
  
3.Home  
Header with navigation menus, logo, and cart icon.  
User-specific greeting and select address/update location button.  
Search bar.  
Sign Out/Sign In button.  
Orders history menu named as Returns & Orders.  
Cart icon displays item count and links to checkout.  
Slideshow with arrows for image navigation.  
Display 6 products with details and "Add to Cart" button.  
  
4.View Address  
Shows user addresses with an option to add a new one.  
Loader until addresses are fetched.  
Clicking "Add Address" option redirects to the Add New Address page.  
  
5.Add New Address  
Form to create a new address with validation.  
Address details stored in Firebase.  
Redirects to View Address after saving address.  
  
6.Checkout  
Advertisement after the header.  
Left Side: Display added products with delete option.  
Right Side: Subtotal of items. "Proceed to Buy" button redirects to the Payment page. Alert if the cart is empty.  
  
7.Payment  
Loader until user addresses and payment setup are fetched.  
Select a delivery address from list of addresses.  
Enter payment details with validation.  
Review items.  
"Place your order" button stores payment on Stripe and order details in Firebase.  
On successful payment, user redirects to the home page.  
Alert the user, if tries to reload page.  
Up and down arrows to toggle sections.  
  
8.Orders' History  
Loader until user orders are fetched.  
Display all orders with details.  
Search bar to find specific orders by product title.  
  
  
What I learned:  
During the development of the Amazon Clone, I gained valuable insights into key aspects of web development, particularly in payment processing and data management. Here's a summary of my learnings:  
  
Server-Side Payment Processing:  
Explored the integration of React for the front-end and Express for the back-end to facilitate payments.  
Adopted the widely recognized concept of "server-side payment processing" by using the Express server to communicate with Stripe, ensuring secure and efficient payment transactions.  
  
Firebase Data Handling:  
Developed proficiency in storing and retrieving data using Firebase.
Accomplished strategic implementation of Firebase without resorting to Firebase Cloud Functions for payment processing.  
  
These challenges have not only improved my technical skills but also given me a deeper understanding of how payment processing, and data management work together to create a secure and user-friendly web app.  
  
  
Challenges and Solutions:  
Throughout the development of the Amazon Clone, I encountered various challenges that prompted creative problem-solving. Here's summary of these challenges and the solutions implemented:  
  
1.User Authentication Complexity:  
  
Challenge: Creating a secure and seamless user authentication process presented complexities in managing user data.
Solution: Leveraged Firebase for user authentication, arranged the sign-up and sign-in processes. This ensured robust security while simplifying user management.  
  
2.Address Handling and Validation:  
  
Challenge: Efficiently managing user addresses while ensuring accurate validation was a challenge in the address-related features.
Solution: Implemented a structured system for handling addresses using Firebase. Validated address details, enhancing the overall user experience.
  
3.Payment Processing Integration:  
  
Challenge: Integrating Stripe for secure payment processing required coordination between the frontend and backend, was a technical integration challenge.  
Solution: Utilized Express on the backend to communicate with Stripe, facilitating server-side payment processing. This approach ensured a secure and smooth payment transaction flow.  
  
4.Firebase Data Handling for Orders:   
  
Challenge: Efficiently storing and retrieving order data from Firebase presented challenge in data organization and retrieval.  
Solution: Strategically organized order data in Firebase, optimizing data retrieval for the user's order history. This approach maximized efficiency without resorting to complex Firebase Cloud Functions.  