// basic utility function to generate 6 digit OTP number
export function generateOTP(): number {
  return Math.floor(100000 + Math.random() * 900000);
}
