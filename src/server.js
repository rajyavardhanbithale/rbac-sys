
import app from './app.js';
import connectDB from './config/db.js';

const PORT = process.env.PORT || 8000;

app.listen(PORT, async () => {
    try {
        await connectDB();
        console.log(`App is running at http://localhost:${PORT}`);
    } catch (error) {
        console.log('Failed to connect to the database');
        console.log(error.message);
        process.exit(1);
    }
});