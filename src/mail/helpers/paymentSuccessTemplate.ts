export const paymentSuccessTemplate = (parent_name: string): string => {
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
        <p>Thank you! We’ve successfully received your payment.</p>
    
        <p>Within the next 72 hours, you will receive a final confirmation regarding your spot in the course.</p>
    
        <p>In case that we are unable to confirm your enrollment, you will receive a full refund.</p>
    
      <div class="footer">
If you have any questions in the meantime, feel free to contact us.
        <a href="mailto:contact@sabado.edu.ge">contact@sabado.edu.ge</a>.
      </div>
    </div>
    
    </body>
    </html>`;
};
