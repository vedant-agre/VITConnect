const mongoose = require('mongoose');
const User = require('./models/User');
const bcrypt = require('bcrypt');
const connectDB = require('./config/db');

const run = async () => {
    try {
        console.log('1. Connecting to DB...');
        await connectDB();
        console.log('DB Connected.');

        console.log('2. Checking Users...');
        const users = await User.find({});
        console.log(`Found ${users.length} users.`);
        users.forEach(u => console.log(` - ${u.email} (${u.role})`));

        if (users.length > 0) {
            console.log('3. Verifying existing Admin password...');
            const admin = users.find(u => u.email === 'admin@vit.edu');
            if (admin) {
                const isMatch = await bcrypt.compare('adminpassword', admin.password);
                console.log(`Admin password match ('adminpassword'): ${isMatch}`);
            }
        }

        console.log('4. Testing Bcrypt (New Hash)...');
        const text = 'testpassword';
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(text, salt);
        console.log('Bcrypt hash generated successfully:', hash);
        const match = await bcrypt.compare(text, hash);
        console.log('Bcrypt compare result:', match);

        console.log('Diagnosis Complete.');
        process.exit();
    } catch (err) {
        console.error('ERROR:', err);
        if (err.message.includes('not a valid BCrypt hash')) {
            console.log('HINT: The data in DB might not be hashed correctly.');
        }
        process.exit(1);
    }
};

run();
