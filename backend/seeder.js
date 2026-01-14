const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const Event = require('./models/Event');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const importData = async () => {
    try {
        await User.deleteMany();
        await Event.deleteMany();

        // Create Admin
        const adminUser = await User.create({
            name: 'Admin User',
            email: 'admin@vit.edu',
            password: 'adminpassword',
            role: 'admin'
        });

        // Create Student
        const studentUser = await User.create({
            name: 'John Student',
            email: 'john@vit.edu',
            password: 'password123',
            role: 'student',
            regNumber: '21BCE0001'
        });

        console.log('Users Imported!');
        console.log('Admin: admin@vit.edu / adminpassword');
        console.log('Student: john@vit.edu / password123');

        // Create Sample Events
        await Event.create([
            {
                title: 'Tech Symposium 2026',
                description: 'Annual technology symposium featuring top industry speakers and workshops.',
                date: new Date('2026-03-15'),
                venue: 'Anna Auditorium',
                organizer: 'Computer Society of India',
                image: '/images/tech.jpg',
                featured: true
            },
            {
                title: 'Cultural Fest: Riviera',
                description: 'The biggest cultural and sports fest of the year.',
                date: new Date('2026-02-20'),
                venue: 'Main Ground',
                organizer: 'Student Council',
                image: '/images/cult.jpg',
                featured: true
            },
             {
                title: 'HackVIT 2026',
                description: '36-hour hackathon to solve real-world problems.',
                date: new Date('2026-04-10'),
                venue: 'SJT Building',
                organizer: 'GDSC VIT',
                image: '/images/hack.jpg',
                featured: false
            }
        ]);

        console.log('Events Imported!');
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

importData();
