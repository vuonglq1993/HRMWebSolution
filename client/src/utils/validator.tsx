export const validateEmail = (email: string) => {
    if (!email) return "Email is required";
    if (!/\S+@\S+\.\S+/.test(email)) return "Invalid email address";
    return "";
  };
  
  export const validatePassword = (password: string) => {
    if (!password) return "Password is required";
    return "";
  };
  
  export const validateRePassword = (password: string, rePassword: string) => {
    if (password !== rePassword) return "Passwords must match";
    return "";
  };
  
  export const validateFullName = (fullName: string) => {
    if (!fullName) return "Full name is required";
    return "";
  };
  
  export const validateAddress = (address: string) => {
    if (!address) return "Address is required";
    return "";
  };
  
  export const validatePhone = (phone?: string) => {
    if (!phone) return "";
    if (!/^\d{9,15}$/.test(phone)) return "Phone must be numeric and between 9 to 15 digits";
    return "";
  };
  