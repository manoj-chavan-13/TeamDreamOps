import User from '../models/User.js';
import bcrypt from 'bcryptjs';


export const register = async (req, res) => {
    try {
        const { name, email, password, phone, address, admin } = req.body;

        if(!name || !email || !password || !phone || !address) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "User already exists" });
        }
        
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({ 
            Username: name, 
            email, 
            password: hashedPassword, 
            phone, 
            address,
            admin: admin || 'user'
        });
        res.status(201).json({ message: 'User created successfully', user });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
}


export const login = async (req, res) => {
    try {
      const {email, password} = req.body;
      if(!email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
      }
      const user = await User.findOne({ email });
      if(!user) {
        return res.status(400).json({ message: 'User not found' });
      }
      
      // Compare password
      const isMatch = await bcrypt.compare(password, user.password);
      if(!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
      
      // Success - return user data
      res.status(200).json({ 
        message: 'Login successful', 
        user: {
          id: user._id,
          name: user.Username,
          email: user.email,
          admin: user.admin
        } 
      });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
}
