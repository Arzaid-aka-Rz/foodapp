export const generateWelcomeEmailHtml = (name: string) => {
    return `
          <html>
            <head>
              <style>
                .email-container {
                  font-family: Arial, sans-serif;
                  line-height: 1.6;
                  color: #333;
                  padding: 20px;
                  background-color: #f4f4f4;
                  border-radius: 10px;
                  max-width: 600px;
                  margin: auto;
                }
                .email-header {
                  background-color: #4CAF50;
                  color: white;
                  padding: 10px;
                  text-align: center;
                  border-radius: 10px 10px 0 0;
                }
                .email-body {
                  padding: 20px;
                  background-color: white;
                  border-radius: 0 0 10px 10px;
                }
                .email-footer {
                  text-align: center;
                  padding: 10px;
                  font-size: 12px;
                  color: #777;
                }
              </style>
            </head>
            <body>
              <div class="email-container">
                <div class="email-header">
                  <h1>Welcome to Arzaid Food-Hub!</h1>
                </div>
                <div class="email-body">
                  <p>Hi ${name},</p>
                  <p>Congratulations! Your email has been successfully verified.</p>
                  <p>We are excited to have you on board at Arzaid Food-Hub. Explore our platform and enjoy our services.</p>
                  <p>If you have any questions or need assistance, feel free to reach out to us.</p>
                  <p>Best Regards,<br/>The Arzaid Food Team</p>
                </div>
                <div class="email-footer">
                  <p>&copy; 2024 Arzaid Food. All rights reserved.</p>
                </div>
              </div>
            </body>
          </html>
        `;
};