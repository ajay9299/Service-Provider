const crypto = require("crypto");

export const generatePasswordReset = () => {
  const resetPasswordToken = crypto.randomBytes(20).toString("hex");
  const resetPasswordExpires = Date.now() + 3600000; //expires in an hour

  return { resetPasswordToken, resetPasswordExpires };
};

