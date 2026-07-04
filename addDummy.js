const fs = require('fs');
const path = require('path');

const addDummyData = (filePath) => {
  let content = fs.readFileSync(filePath, 'utf8');

  // Replace `benefits: [...],` with `benefits: [...],\n    whoCanBenefit: ["Dummy Audience 1", "Dummy Audience 2", "Dummy Audience 3"],\n    whyChooseUs: ["Dummy Reason 1", "Dummy Reason 2", "Dummy Reason 3"],`
  // But only if they don't already have whoCanBenefit
  
  const lines = content.split('\n');
  const newLines = [];
  
  for (let i = 0; i < lines.length; i++) {
    newLines.push(lines[i]);
    
    // Check if line contains `benefits:` and the next line does not contain `whoCanBenefit:`
    if (lines[i].includes('benefits: [') && !lines[i].includes('whoCanBenefit:')) {
      if (i + 1 < lines.length && !lines[i+1].includes('whoCanBenefit')) {
        // Find indentation
        const match = lines[i].match(/^(\s*)/);
        const indent = match ? match[1] : '    ';
        newLines.push(`${indent}whoCanBenefit: ["Dummy Audience 1", "Dummy Audience 2", "Dummy Audience 3", "Dummy Audience 4"],`);
        newLines.push(`${indent}whyChooseUs: ["Premium Care", "Expert Doctors", "Modern Facilities", "Holistic Approach"],`);
      }
    }
  }
  
  fs.writeFileSync(filePath, newLines.join('\n'), 'utf8');
  console.log(`Updated ${filePath}`);
};

addDummyData(path.join(__dirname, 'frontend/src/data/treatments.ts'));
addDummyData(path.join(__dirname, 'backend/seedIntelligent.js'));
