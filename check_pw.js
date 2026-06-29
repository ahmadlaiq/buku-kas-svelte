import bcrypt from 'bcryptjs';
const isMatch = bcrypt.compareSync('admin123', '$2b$10$HV.7x1PCIzbk4Ofw4Y2wruH.Vqh/eZP6v0.X79OZXww.cbzs/PEfO');
console.log('Is admin123?', isMatch);
