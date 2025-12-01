// Script to clear test projects from backend database
// Run this with: node clear-test-projects.js

require('dotenv').config();
const mongoose = require('mongoose');
const ProjectModel = require('./models/project-model');

async function clearTestProjects() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.ATLASDB);
    console.log('✅ Connected to MongoDB');

    // Find all projects
    const allProjects = await ProjectModel.find();
    console.log(`📊 Found ${allProjects.length} projects in database`);

    // Delete all projects (or filter to delete only test ones)
    // Option 1: Delete ALL projects (nuclear option)
    const result = await ProjectModel.deleteMany({});
    console.log(`✅ Deleted ${result.deletedCount} projects from database`);

    // Option 2: Delete only test projects (uncomment to use this instead)
    // const testProjects = await ProjectModel.deleteMany({
    //   $or: [
    //     { title: { $regex: /test|Test|cypress|Cypress|Project to/i } },
    //     { description: { $regex: /test|Test|cypress|Cypress/i } }
    //   ]
    // });
    // console.log(`✅ Deleted ${testProjects.deletedCount} test projects`);

    await mongoose.connection.close();
    console.log('✅ Database connection closed');
    console.log('🎉 Cleanup complete! Your original projects are in the frontend fallback data.');
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

clearTestProjects();

