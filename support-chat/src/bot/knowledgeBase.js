// Knowledge base for the demo store "ShopEasy".
// phrases  : multi-word expressions (strong match, score +3 each)
// keywords : single words (score +1 each, typo tolerant)
// NOTE: write phrases without apostrophes (the engine strips them), e.g. "cant login".
// Put generic intents (greeting, thanks, bye) LAST so specific intents win ties.

export const INITIAL_SUGGESTIONS = ['Track my order', 'Refund policy', 'Shipping info', 'Talk to a human'];

export const INTENTS = [
  {
    id: 'order_status',
    action: 'askOrder',
    phrases: ['track order', 'track my order', 'where is my order', 'order status', 'track my package', 'where is my package', 'where is my delivery', 'my order'],
    keywords: ['track', 'tracking', 'package', 'parcel', 'shipment'],
    reply: 'Sure, I can check that. Please send your order number (for example ORD-123456 or just 123456).',
    suggestions: [],
  },
  {
    id: 'cancel',
    phrases: ['cancel order', 'cancel my order', 'cancel my purchase', 'dont want the order'],
    keywords: ['cancel', 'cancellation'],
    reply: 'You can cancel for free within 1 hour of placing an order, or any time before it ships. Go to My Account → Orders → Cancel. If it has already shipped, refuse the delivery or start a return and you will get a refund.',
    suggestions: ['Refund policy', 'Return an item'],
  },
  {
    id: 'refund',
    phrases: ['money back', 'get a refund', 'refund status', 'where is my refund'],
    keywords: ['refund', 'reimburse', 'reimbursement'],
    reply: 'Refunds go to your original payment method within 5–7 business days after we receive the returned item (cancellations are refunded right away). Your bank can take 2–3 extra days to show it.',
    suggestions: ['Return an item', 'Payment failed'],
  },
  {
    id: 'return',
    phrases: ['return item', 'return an item', 'return policy', 'send back', 'return a product', 'exchange policy'],
    keywords: ['return', 'exchange', 'replace', 'replacement'],
    reply: 'You can return most items within 30 days of delivery if they are unused and in original packaging. Steps: My Account → Orders → Return item → choose a reason → book a free pickup. Once we receive it, your refund or exchange is processed.',
    suggestions: ['Refund policy', 'Damaged item'],
  },
  {
    id: 'shipping',
    phrases: ['delivery time', 'how long', 'when will it arrive', 'how many days', 'shipping cost', 'shipping charges', 'delivery charges', 'free shipping'],
    keywords: ['delivery', 'deliver', 'arrive', 'shipping', 'ship', 'dispatch', 'courier'],
    reply: 'Standard delivery takes 3–5 business days and express takes 1–2 business days. Shipping is free on orders above ₹999, otherwise ₹49. We currently deliver within India only.',
    suggestions: ['Track my order', 'Change address'],
  },
  {
    id: 'payment_failed',
    phrases: ['payment failed', 'money deducted', 'payment not going through', 'charged twice', 'double charged', 'amount deducted', 'payment declined'],
    keywords: ['failed', 'deducted', 'declined', 'twice'],
    reply: 'Sorry about that. If money was deducted but the order was not confirmed, it is automatically reversed within 5–7 business days. If you were charged twice, send us the transaction ID and we will fix it. You can also try a different payment method.',
    suggestions: ['Payment methods', 'Talk to a human'],
  },
  {
    id: 'payment_methods',
    phrases: ['payment methods', 'how can i pay', 'cash on delivery', 'net banking'],
    keywords: ['payment', 'pay', 'upi', 'card', 'cod', 'netbanking', 'wallet', 'emi'],
    reply: 'We accept UPI, credit and debit cards, net banking, popular wallets, EMI on select cards, and Cash on Delivery for orders up to ₹5,000.',
    suggestions: ['Payment failed', 'Discount codes'],
  },
  {
    id: 'password',
    phrases: ['forgot password', 'reset password', 'cannot log in', 'cant login', 'unable to login', 'cant log in', 'change password'],
    keywords: ['password', 'login', 'signin', 'locked'],
    reply: 'On the login page click "Forgot password", enter your registered email or phone number, and we will send a reset link or OTP. If you do not get it within 5 minutes, check your spam folder.',
    suggestions: ['My account', 'Talk to a human'],
  },
  {
    id: 'account',
    phrases: ['create account', 'sign up', 'delete account', 'change email', 'update profile', 'my account'],
    keywords: ['account', 'register', 'signup', 'profile'],
    reply: 'You can create an account with your email or phone number, and manage your profile, addresses and orders under My Account. To delete your account, go to My Account → Settings → Delete account.',
    suggestions: ['Forgot password', 'Change address'],
  },
  {
    id: 'address',
    phrases: ['change address', 'wrong address', 'update address', 'change delivery address'],
    keywords: ['address'],
    reply: 'You can change the delivery address from My Orders as long as the order has not been dispatched. After dispatch the address cannot be changed, but you can contact the courier or start a return.',
    suggestions: ['Track my order', 'Cancel an order'],
  },
  {
    id: 'discount',
    phrases: ['discount code', 'promo code', 'coupon code', 'gift card'],
    keywords: ['coupon', 'promo', 'discount', 'voucher', 'offer', 'sale'],
    reply: 'Enter your code in the "Apply coupon" box at checkout. Only one code can be used per order, codes cannot be combined with other offers, and each one has an expiry date and minimum order value shown in its terms.',
    suggestions: ['Payment methods', 'Shipping info'],
  },
  {
    id: 'damaged',
    phrases: ['damaged item', 'wrong item', 'item is broken', 'not working', 'arrived broken', 'missing item', 'item missing'],
    keywords: ['damaged', 'defective', 'broken', 'faulty', 'wrong', 'missing', 'warranty'],
    reply: 'I am sorry about that. Please report it within 7 days of delivery: My Account → Orders → Report a problem, and upload a photo. We will arrange a free replacement or a full refund.',
    suggestions: ['Return an item', 'Talk to a human'],
  },
  {
    id: 'invoice',
    phrases: ['gst invoice', 'download invoice'],
    keywords: ['invoice', 'bill', 'gst', 'receipt'],
    reply: 'You can download your invoice from My Account → Orders → select the order → Download invoice. For a GST invoice, add your GST number in your profile before ordering.',
    suggestions: ['My account'],
  },
  {
    id: 'hours',
    phrases: ['working hours', 'opening hours', 'are you open', 'customer care number', 'contact number', 'contact support'],
    keywords: ['hours', 'phone', 'call', 'contact', 'email', 'timing', 'timings'],
    reply: 'Our support team is available 9 AM – 9 PM IST, Monday to Saturday. Email: support@shopeasy.example · Phone: 1800-000-0000 (demo details).',
    suggestions: ['Talk to a human'],
  },
  {
    id: 'human',
    phrases: ['talk to a human', 'talk to human', 'speak to agent', 'real person', 'human agent', 'talk to someone', 'talk to an agent', 'customer care'],
    keywords: ['agent', 'human', 'representative', 'executive', 'supervisor', 'manager'],
    reply: 'I will pass you to a person. Our agents are available 9 AM – 9 PM IST, Monday to Saturday. Please email support@shopeasy.example with your order number, or call 1800-000-0000 (demo details), and mention this chat.',
    suggestions: ['Track my order', 'Refund policy'],
  },
  {
    id: 'identity',
    phrases: ['are you a bot', 'are you human', 'who are you', 'your name', 'are you real'],
    keywords: [],
    reply: 'I am ShopEasy\'s automated support assistant, not a person. I can answer common questions and look up order status, and I can point you to a human agent whenever you want one.',
    suggestions: ['Talk to a human', 'Track my order'],
  },
  // ---- generic intents last ----
  {
    id: 'thanks',
    phrases: ['thank you', 'thanks a lot'],
    keywords: ['thanks', 'thank', 'thx', 'appreciate'],
    reply: 'You are welcome! Is there anything else I can help you with?',
    suggestions: ['Track my order', 'Refund policy'],
  },
  {
    id: 'bye',
    phrases: ['good bye', 'see you', 'nothing else'],
    keywords: ['bye', 'goodbye'],
    reply: 'Thanks for chatting with ShopEasy support. Have a great day! 👋',
    suggestions: [],
  },
  {
    id: 'greeting',
    phrases: ['good morning', 'good evening', 'good afternoon', 'good day'],
    keywords: ['hello', 'hi', 'hey', 'namaste'],
    reply: 'Hello! 👋 I\'m the ShopEasy support assistant. I can help with orders, returns, refunds, shipping, payments and your account. What do you need?',
    suggestions: ['Track my order', 'Refund policy', 'Shipping info'],
  },
];

export const FALLBACK_TEXT =
  'Sorry, I did not quite get that. I can help with orders and tracking, cancellations, returns and refunds, shipping, payments, discount codes, and your account. Could you rephrase, or pick a topic below?';

export const ESCALATE_TEXT =
  'I am still not able to answer that, and I do not want to keep you going in circles. A human agent can help: email support@shopeasy.example or call 1800-000-0000 (9 AM – 9 PM IST, Mon–Sat, demo details).';
