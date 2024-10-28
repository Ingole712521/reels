import AsyncStorage from '@react-native-async-storage/async-storage';

export const registerUser = async (userData) => {
  try {
    const existingUsers = await AsyncStorage.getItem('users');
    let users = existingUsers ? JSON.parse(existingUsers) : [];
    
    const existingUser = users.find(user => user.email === userData.email);
    if (existingUser) {
      throw new Error('User already exists');
    }

    users.push(userData);
    await AsyncStorage.setItem('users', JSON.stringify(users));
    return true;
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
};

export const loginUser = async (email, password) => {
  try  {
    const existingUsers = await AsyncStorage.getItem('users');
    const users = existingUsers ? JSON.parse(existingUsers) : [];
    
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      await AsyncStorage.setItem('currentUser', JSON.stringify(user));
      return user;
    } else {
      throw new Error('Invalid credentials');
    }
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

export const getCurrentUser = async () => {
  try {
    const currentUser = await AsyncStorage.getItem('currentUser');
    return currentUser ? JSON.parse(currentUser) : null;
  } catch (error) {
    console.error('Get current user error:', error);
    return null;
  }
};

export const logoutUser = async () => {
  try {
    await AsyncStorage.removeItem('currentUser');
  } catch (error) {
    console.error('Logout error:', error);
  }
};