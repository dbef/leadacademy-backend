export const applicationConfirmedAndPayed = (
  link: string,
  courseName: string,
  courseStartDate: Date,
  parent_name: string,
  student_email: string,
  student_password: string,
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
            position: relative;
        }
        .header {
            font-size: 28px;
            font-weight: bold;
            color: #1e3a52;
            margin-bottom: 20px;
        }
        .sub-header {
            font-size: 22px;
            font-weight: bold;
            color: #00A76F;
            margin-bottom: 15px;
        }
        .content {
            font-size: 16px;
            color: #454F5B;
            line-height: 1.6;
            margin-bottom: 20px;
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
        .image {
            width: 100px;
            height: auto;
            margin-bottom: 20px;
        }
    </style>
</head>
<body>

<div class="container">
    <div class="content">
        <p>Dear <strong>${parent_name}</strong>,</p>
        <p>We are pleased to inform you that you have been successfully enrolled in the <strong>${courseName}</strong>. We are excited to have you join us and look forward to an engaging learning experience.</p>
        <p><strong>Student Credentials</strong></p>
        <p style="font-size: 18px; font-weight: bold; color: #00A76F;">Email: ${student_email}</p>
        <p style="font-size: 18px; font-weight: bold; color: #00A76F;">Password: ${student_password}</p>
    </div>

    <div class="footer">
        If you have any questions, reach out to us at 
        <a href="mailto:support@summerschool.com">contact@sabado.edu.ge</a>.
    </div>
</div>

</body>
</html>
  `;
};
