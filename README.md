# Study Notion

Study Notion is an ED Tech (Education Technology) web application developed using the MERN stack.

## Note

This project is intended as a learning tool and can be used as a sample project for educational purposes or personal projects.



## Features

* User Authentication: Study Notion provides secure user registration and authentication using JWT (JSON Web Tokens). Users can sign up, log in, and manage their 
  profiles with ease.
* Courses and Lessons: Instructors can create courses and add lessons to them. Students can enroll in courses, access course materials, and track their progress.
* Progress Tracking: Study Notion allows students to track their progress in enrolled courses. They can view completed lessons, scores on quizzes and 
  assignments, and overall course progress.
*Payment Integration: Study Notion integrates with Razorpay for payment processing. Users can make secure payments for course enrollment and other services using 
 various payment methods supported by Razorpay.

  
  



## Installation

1. Clone the repository to your local machine.
    ```sh
    git clone https://github.com/himanshu8443/Study-Notion-master.git
    ```

2. Install the required packages.
    ```sh
    cd Study-Notion-master
    npm install
    ```

3. Set up the environment variables:

   Create a .env file in the root directory.
   Add the required environment variables, such as database connection details, JWT secret, and any other necessary configurations.


4. Start the development server.
    ```sh
    npm run dev
    ```

5. Open the project in your browser at [`http://localhost:3000`](http://localhost:3000) to view your project.

The project is set up to use `postcss-cli` to process your CSS files. You can add your own `tailwind.config.js` file to customize your Tailwind setup.
