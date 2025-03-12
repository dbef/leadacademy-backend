export const applicationConfirmedAndPayed = (
  link: string,
  courseName: string,
  courseStartDate: Date,
  parent_name: string,
  student_email: string,
  student_password: string,
): string => {
  return `<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <title>Summer School Registration</title>
      <style>
          body {
              font-family: 'Public Sans Variable', Arial, sans-serif;
              background-color: #F4F6F8;
              padding: 20px;
              margin: 0;
          }
          .container {
              max-width: 600px;
              background: #FFFFFF;
              padding: 20px;
              border-radius: 12px;
              box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
              text-align: center;
              margin: auto;
          }
          .header {
              background-color: #00A76F;
              padding: 20px;
              color: white;
              font-size: 24px;
              font-weight: bold;
              border-radius: 12px 12px 0 0;
          }
          .content {
              margin: 20px 0;
              font-size: 16px;
              color: #454F5B;
              line-height: 1.6;
          }
          .button {
              display: inline-block;
              background-color: #8E33FF;
              color: white;
              text-decoration: none;
              padding: 14px 24px;
              border-radius: 6px;
              font-size: 16px;
              font-weight: bold;
              transition: background 0.3s ease-in-out;
          }
          .button:hover {
              background-color: #5119B7;
          }
          .footer {
              margin-top: 20px;
              font-size: 12px;
              color: #637381;
          }
          .footer a {
              color: #00B8D9;
              text-decoration: none;
          }
      </style>
  </head>
  <body>
  
  <div class="container">
      <div class="header">🌞 Welcome to ${courseName} Summer School! 🎓</div>
  
      <div class="content">
          <p>Dear <strong>${parent_name}</strong>,</p>
          <p>Thank you for registering for <strong>${courseName}</strong>. We are thrilled to have you onboard! 🎉</p>
          <p>The course begins on <strong>${courseStartDate}</strong>. We can't wait to get started!</p>

     <p>The student creds: <strong>Email: ${student_email}</strong>. <strong>Password: ${student_password}</strong></p>
      </div>
  
      <div class="footer">
          If you have any questions, reach out to us at 
          <a href="mailto:support@summerschool.com">support@summerschool.com</a>.
      </div>
  </div>
  
  </body>
  </html>
  `;
};
