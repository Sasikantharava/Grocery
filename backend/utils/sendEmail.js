import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// Create transporter
const transporter = nodemailer.createTransporter({
  service: process.env.EMAIL_SERVICE || 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Verify transporter configuration
transporter.verify((error) => {
  if (error) {
    console.error('❌ Email transporter configuration error:', error);
  } else {
    console.log('✅ Email server is ready to send messages');
  }
});

/**
 * Send email utility
 * @param {Object} options - Email options
 * @param {string} options.to - Recipient email
 * @param {string} options.subject - Email subject
 * @param {string} options.html - HTML content
 * @param {string} options.text - Text content (optional)
 */
export const sendEmail = async (options) => {
  try {
    const mailOptions = {
      from: `"Grocery Delivery" <${process.env.EMAIL_USER}>`,
      to: options.to,
      subject: options.subject,
      html: options.html,
      text: options.text || options.html.replace(/<[^>]*>/g, ''),
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Email sent:', info.messageId);
    return info;
  } catch (error) {
    console.error('❌ Error sending email:', error);
    throw new Error('Email could not be sent');
  }
};

// Email templates
export const emailTemplates = {
  // Welcome email template
  welcome: (userName) => ({
    subject: 'Welcome to Grocery Delivery! 🛒',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #10B981; text-align: center;">Welcome to Grocery Delivery! 🛒</h1>
        <p>Hello <strong>${userName}</strong>,</p>
        <p>Thank you for joining Grocery Delivery! We're excited to have you on board.</p>
        <p>With our service, you can:</p>
        <ul>
          <li>🛍️ Shop from a wide range of groceries</li>
          <li>🚚 Get fast delivery to your doorstep</li>
          <li>💰 Enjoy great discounts and offers</li>
          <li>⭐ Rate and review products</li>
        </ul>
        <p>Start shopping now and experience the convenience of grocery delivery!</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${process.env.FRONTEND_URL}/products" 
             style="background-color: #10B981; color: white; padding: 12px 24px; 
                    text-decoration: none; border-radius: 5px; display: inline-block;">
            Start Shopping
          </a>
        </div>
        <p>If you have any questions, feel free to contact our support team.</p>
        <p>Happy Shopping!<br>The Grocery Delivery Team</p>
      </div>
    `
  }),

  // Order confirmation template
  orderConfirmation: (order, user) => ({
    subject: `Order Confirmed - ${order.orderId}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #10B981; text-align: center;">Order Confirmed! ✅</h1>
        <p>Hello <strong>${user.name}</strong>,</p>
        <p>Thank you for your order! We're preparing your items for delivery.</p>
        
        <div style="background: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
          <h3 style="margin-top: 0;">Order Details</h3>
          <p><strong>Order ID:</strong> ${order.orderId}</p>
          <p><strong>Order Date:</strong> ${new Date(order.createdAt).toLocaleDateString()}</p>
          <p><strong>Total Amount:</strong> ₹${order.priceSummary.grandTotal}</p>
          <p><strong>Delivery Address:</strong> ${order.shippingAddress.street}, ${order.shippingAddress.city}</p>
        </div>

        <div style="text-align: center; margin: 30px 0;">
          <a href="${process.env.FRONTEND_URL}/orders/${order._id}" 
             style="background-color: #10B981; color: white; padding: 12px 24px; 
                    text-decoration: none; border-radius: 5px; display: inline-block;">
            Track Your Order
          </a>
        </div>

        <p>We'll notify you when your order is out for delivery.</p>
        <p>Thank you for choosing Grocery Delivery!</p>
      </div>
    `
  }),

  // Password reset template
  passwordReset: (user, resetToken) => ({
    subject: 'Password Reset Request',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #10B981; text-align: center;">Password Reset</h1>
        <p>Hello <strong>${user.name}</strong>,</p>
        <p>You requested to reset your password. Click the button below to create a new password:</p>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="${process.env.FRONTEND_URL}/reset-password/${resetToken}" 
             style="background-color: #10B981; color: white; padding: 12px 24px; 
                    text-decoration: none; border-radius: 5px; display: inline-block;">
            Reset Password
          </a>
        </div>

        <p>This link will expire in 1 hour for security reasons.</p>
        <p>If you didn't request this reset, please ignore this email.</p>
      </div>
    `
  })
};

export default sendEmail;