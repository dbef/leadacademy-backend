export const applicationSuccess = (
  link: string,
  courseName: string,
  courseStartDate: Date,
  parent_name: string,
  price: number,
  student_name: string,
  student_lastname: string,
): string => {
  return `<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Summer School Registration</title>
    <style>
      body {
        font-family: 'Arial', sans-serif;
        background-color: #d3e7e4;
        padding: 20px;
        margin: 0;
      }
      .container {
        max-width: 600px;
        background: #ffffff;
        padding: 30px;
        border-radius: 12px;
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
        text-align: center;
        margin: auto;
      }
      .header {
        font-size: 28px;
        font-weight: bold;
        color: #1e3a52;
        margin-bottom: 20px;
      }
      .content {
        font-size: 16px;
        color: #454F5B;
        line-height: 1.6;
        margin-bottom: 20px;
      }
      .highlight-box {
        background-color: #f1faf7;
        border-left: 6px solid #00A76F;
        padding: 12px 20px;
        margin: 20px 0;
        border-radius: 8px;
        font-weight: bold;
        font-size: 16px;
      }
      .cta-button {
        display: inline-block;
        background-color: #ff9800;
        color: white;
        text-decoration: none;
        padding: 14px 24px;
        border-radius: 8px;
        font-size: 18px;
        font-weight: bold;
        transition: background 0.3s ease-in-out;
        margin-top: 20px;
      }
      .cta-button:hover {
        background-color: #e68900;
      }
      .footer {
        margin-top: 30px;
        font-size: 14px;
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
    <div class="header">Congratulations! Your admission has been confirmed. 🎓</div>
    <div class="content">
      <p>Dear <strong>${parent_name}</strong>,</p>
      <p>Congratulations! Your admission to <strong>${courseName}</strong> has been confirmed. We are pleased to welcome you to our community. 🎉</p>
      
      <div class="highlight-box">
        To complete the enrollment process, please transfer the final payment: 
        <span style="font-size: 20px; color: #00A76F;">${price.toString()}₾</span>
      </div>
  
      <p>You can pay with card or bank transfer, to pay with card please follow this link</p>
      <a href="${link}" class="cta-button">Pay Now</a>
  
      <p>Alternatively, you can make a bank transfer using the following details:</p>
  
      <div class="highlight-box">
        description: <strong>${courseName}/${student_name} ${student_lastname}</strong>
      </div>
  
      <p>Please ensure to include the course name and student's name in the subject line of your transfer to ensure it is processed correctly</p>
      
      <p><strong>IBAN:</strong></p>
      <p style="font-size: 18px; font-weight: bold; color: #00A76F;">GE89BG0000000606319242</p>
    </div>
  
    <p>Once the payment is completed, kindly send us the payment confirmation for our records. <a href="mailto:contact@sabado.edu.ge"></a></p>
  
    <div class="footer">
      If you have any questions or need assistance, feel free to reach out.
      <a href="mailto:contact@sabado.edu.ge">contact@sabado.edu.ge</a>.
    </div>
  </div>
  
  </body>
  </html>`;
};
