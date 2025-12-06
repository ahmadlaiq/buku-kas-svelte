import prisma from './prisma';
import { hashSync } from 'bcryptjs';

// Initialize database with default user if not exists
async function initializeDatabase() {
  try {
    const userCount = await prisma.user.count();
    
    if (userCount === 0) {
      const hashedPassword = hashSync('admin123', 10);
      await prisma.user.create({
        data: {
          username: 'admin',
          password: hashedPassword,
          full_name: 'Administrator'
        }
      });
      console.log('✅ Default admin user created (username: admin, password: admin123)');
    }
  } catch (error) {
    console.error('Error initializing database:', error);
  }
}

// Run initialization
initializeDatabase();

export default prisma;
