# Sprint 1 Notes

For the project our team will be using the following technologies:

- JavaScript - the programming language of the Web, used to program the behavior of the web pages.
- Node.js - the back-end **runtime environment** used to execute JavaScript code outside the web browser. We use commands like 'npm' and 'npx' to access the Node repository to download or remove JavaScript packages (also known as node modules).
- React - a front-end JavaScript **library** that makes it easy to build user interfaces using UI components. By default, a React app is client-side rendered.
- Next.js - the **framework** that enables React-based applications to run with server-side rendering, which is needed when using databases.
- Tailwind CSS - a utility-first CSS framework that is lightweight and simplifies the styling process. An alternative framework would have been Bootstrap, which is more robust and offers predefined templates; but it comes at a significantly larger size and slower loading times that Tailwind. We chose the lightweight, more flexible option.

To familiarize myself with these technologies, I reviewed the documentation, and followed the installation and start-up guides (task 430) found on their respective websites:
https://reactjs.org/docs/create-a-new-react-app.html
https://nextjs.org/docs
https://tailwindcss.com/docs/installation

I also watched two YouTube tutorials on building applications using React, Next.js and Tailwind (task 431). By following the tutorials I was able to install all the required packages and I now have a basic web application that we can build upon in the following sprints.
https://www.youtube.com/watch?v=omV9GEpQUGk
https://www.youtube.com/watch?v=_IBlyR5mRzA

The main difference is that a React app will render in the **client-side**, meaning all the HTML, JavaScript and CSS gets downloaded from the server before the web page is rendered in the browser. This results in a slower initial response, but any user interaction afterwards fast and responsive.

In contrast, a Next.js app will try to interpret and render the files needed to build the requested page in the **server-side**, and then send the finished package to the browser. This results in a quicker initial loading time, but every time the user request a different page, the server must render that page again.

In conclusion, React is best for single-page apps with lots of interaction, and Next is best for multi-page apps with less interaction.
