// backend/services/blockerService.js
const fs = require('fs');
const path = require('path');

const blockSites = (sites) => {
  const hostsPath = 'C:\\Windows\\System32\\drivers\\etc\\hosts';
  const redirectIp = '127.0.0.1';
  
  let content = fs.readFileSync(hostsPath, 'utf8');
  
  // Remove existing blocks
  content = content.split('\n')
    .filter(line => !line.includes('# ProductivityTracker'))
    .join('\n');
  
  // Add new blocks
  const blockEntries = sites.map(site => 
    `${redirectIp} ${site} # ProductivityTracker`
  ).join('\n');
  
  fs.writeFileSync(hostsPath, `${content}\n${blockEntries}`);
};

const unblockSites = () => {
  const hostsPath = 'C:\\Windows\\System32\\drivers\\etc\\hosts';
  let content = fs.readFileSync(hostsPath, 'utf8');
  
  content = content.split('\n')
    .filter(line => !line.includes('# ProductivityTracker'))
    .join('\n');
  
  fs.writeFileSync(hostsPath, content);
};

module.exports = { blockSites, unblockSites };