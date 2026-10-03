export const committees = [
  { id: 'aisac', name: 'AISAC & CSI', fullName: 'Artificial Intelligence Students Association Committee & Computer Society of India' },
  { id: 'csi', name: 'ISTE', fullName: 'Indian Society for Technical Education' }
];

export const teamSections = [
  { id: 'leadership', title: 'Leadership', kicker: '01 / Executive Council', desc: 'Guiding the vision, strategic growth, and student representation.' },
  { id: 'technical', title: 'Technical Team', kicker: '02 / Code & AI Engineers', desc: 'Driving technical workshops, hackathons, and AI research projects.' },
  { id: 'documentation', title: 'Documentation Team', kicker: '03 / Editorial & Reports', desc: 'Crafting reports, official communications, and knowledge bases.' },
  { id: 'pro', title: 'Pro Team', kicker: '04 / Public Relations & Outreach', desc: 'Managing corporate tie-ups, guest speakers, and sponsor relations.' },
  { id: 'infra', title: 'Infra & Security', kicker: '05 / Operations & Venue Management', desc: 'Ensuring seamless event execution, venue setup, and safety protocols.' },
  { id: 'creativity', title: 'Creativity Team', kicker: '06 / Media, Design & UI/UX', desc: 'Creating stunning visuals, video teasers, and brand experiences.' }
];

export const teamMembers = {
  aisac: {
    leadership: [
      { id: 'a-l1', name: 'Aayush Karbhal', role: 'Chairperson', year: '3rd Year', avatarColor: 'linear-gradient(135deg, #f667c5, #85e3ed)', initials: 'AM', linkedin: '#', github: '#', instagram: '#' },
      { id: 'a-l2', name: 'Aarya Yerankar', role: 'Secretary', year: '3rd Year', avatarColor: 'linear-gradient(135deg, #d4f77c, #f667c5)', initials: 'AV', linkedin: '#', github: '#', instagram: '#' },
      { id: 'a-l3', name: 'Trisha Shetty', role: 'Joint Secretary', year: '3rd Year', avatarColor: 'linear-gradient(135deg, #85e3ed, #d4f77c)', initials: 'RD', linkedin: '#', github: '#', instagram: '#' },
      { id: 'a-l4', name: 'Darpan Shah', role: 'Treasurer', year: '3rd Year', photo: '/assets/darpan-shah.jpg', avatarColor: 'linear-gradient(135deg, #f667c5, #141513)', initials: 'DS', linkedin: '#', github: '#', instagram: '#' }
    ],
    technical: [
      { id: 'a-t1', name: 'Parth Kariya', role: 'Technical Head', year: '3rd Year', avatarColor: 'linear-gradient(135deg, #85e3ed, #141513)', initials: 'DP', linkedin: '#', github: '#', instagram: '#' },
      { id: 'a-t2', name: 'Sneha Rao', role: 'AI/ML Project Lead', year: '3rd Year', avatarColor: 'linear-gradient(135deg, #d4f77c, #85e3ed)', initials: 'SR', linkedin: '#', github: '#', instagram: '#' },
      { id: 'a-t3', name: 'Aditya Mehta', role: 'Full Stack Developer', year: '2nd Year', avatarColor: 'linear-gradient(135deg, #f667c5, #d4f77c)', initials: 'AM', linkedin: '#', github: '#', instagram: '#' },
      { id: 'a-t4', name: 'Tanvi Joshi', role: 'Webmaster', year: '2nd Year', avatarColor: 'linear-gradient(135deg, #85e3ed, #f667c5)', initials: 'TJ', linkedin: '#', github: '#', instagram: '#' }
    ],
    documentation: [
      { id: 'a-d1', name: 'Pankaj Gujuri', role: 'Documentation Head', year: '3rd Year', avatarColor: 'linear-gradient(135deg, #d4f77c, #141513)', initials: 'IN', linkedin: '#', github: '#', instagram: '#' },
      { id: 'a-d2', name: 'Kabir Bhatt', role: 'Content Writer', year: '2nd Year', avatarColor: 'linear-gradient(135deg, #f667c5, #85e3ed)', initials: 'KB', linkedin: '#', github: '#', instagram: '#' },
      { id: 'a-d3', name: 'Riya Gupta', role: 'Report Editor', year: '2nd Year', avatarColor: 'linear-gradient(135deg, #85e3ed, #d4f77c)', initials: 'RG', linkedin: '#', github: '#', instagram: '#' }
    ],
    pro: [
      { id: 'a-p1', name: 'Sharyou Sanap', role: 'PRO Head', year: '3rd Year', avatarColor: 'linear-gradient(135deg, #f667c5, #d4f77c)', initials: 'SR', linkedin: '#', github: '#', instagram: '#' },
      { id: 'a-p2', name: 'Meera Kapoor', role: 'Outreach Manager', year: '2nd Year', avatarColor: 'linear-gradient(135deg, #85e3ed, #141513)', initials: 'MK', linkedin: '#', github: '#', instagram: '#' },
      { id: 'a-p3', name: 'Yash Sharma', role: 'Sponsorship Coordinator', year: '2nd Year', avatarColor: 'linear-gradient(135deg, #d4f77c, #f667c5)', initials: 'YS', linkedin: '#', github: '#', instagram: '#' }
    ],
    infra: [
      { id: 'a-i1', name: 'Archit Shinde', role: 'Infra & Security Head', year: '3rd Year', photo: '/assets/archit-shinde.jpg', avatarColor: 'linear-gradient(135deg, #85e3ed, #d4f77c)', initials: 'AS', linkedin: '#', github: '#', instagram: '#' },
      { id: 'a-i2', name: 'Pranav Saxena', role: 'Operations Manager', year: '2nd Year', avatarColor: 'linear-gradient(135deg, #f667c5, #141513)', initials: 'PS', linkedin: '#', github: '#', instagram: '#' },
      { id: 'a-i3', name: 'Aman Deep', role: 'Logistics Head', year: '2nd Year', avatarColor: 'linear-gradient(135deg, #d4f77c, #85e3ed)', initials: 'AD', linkedin: '#', github: '#', instagram: '#' }
    ],
    creativity: [
      { id: 'a-c1', name: 'Zara Khan', role: 'Creativity Head', year: '3rd Year', avatarColor: 'linear-gradient(135deg, #f667c5, #85e3ed)', initials: 'ZK', linkedin: '#', github: '#', instagram: '#' },
      { id: 'a-c2', name: 'Aryan Chawla', role: 'UI/UX Designer', year: '2nd Year', avatarColor: 'linear-gradient(135deg, #d4f77c, #f667c5)', initials: 'AC', linkedin: '#', github: '#', instagram: '#' },
      { id: 'a-c3', name: 'Kavya Pillai', role: 'Video & Media Producer', year: '2nd Year', avatarColor: 'linear-gradient(135deg, #85e3ed, #d4f77c)', initials: 'KP', linkedin: '#', github: '#', instagram: '#' }
    ]
  },
  csi: {
    leadership: [
      { id: 'c-l1', name: 'Aditi Sahu', role: 'President', year: '3rd Year', avatarColor: 'linear-gradient(135deg, #85e3ed, #f667c5)', initials: 'VS', linkedin: '#', github: '#', instagram: '#' },
      { id: 'c-l2', name: 'Aadi Kundar', role: 'Secretary', year: '3rd Year', avatarColor: 'linear-gradient(135deg, #d4f77c, #85e3ed)', initials: 'SA', linkedin: '#', github: '#', instagram: '#' },
      { id: 'c-l3', name: 'Aditya Chaurasia', role: 'Joint Secretary', year: '3rd Year', avatarColor: 'linear-gradient(135deg, #f667c5, #141513)', initials: 'NM', linkedin: '#', github: '#', instagram: '#' },
      { id: 'c-l4', name: 'Hiya Modi', role: 'Treasurer', year: '3rd Year', avatarColor: 'linear-gradient(135deg, #85e3ed, #d4f77c)', initials: 'TT', linkedin: '#', github: '#', instagram: '#' }
    ],
    technical: [
      { id: 'c-t1', name: 'Ayush Meshram', role: 'Technical Head', year: '3rd Year', photo: '/assets/ayush-meshram.jpg', avatarColor: 'linear-gradient(135deg, #f667c5, #85e3ed)', initials: 'AM', linkedin: '#', github: '#', instagram: '#' },
      { id: 'c-t2', name: 'Divya Sen', role: 'Competitive Programming Lead', year: '3rd Year', avatarColor: 'linear-gradient(135deg, #d4f77c, #f667c5)', initials: 'DS', linkedin: '#', github: '#', instagram: '#' },
      { id: 'c-t3', name: 'Rahul Nambiar', role: 'Cloud & DevOps Lead', year: '2nd Year', avatarColor: 'linear-gradient(135deg, #85e3ed, #141513)', initials: 'RN', linkedin: '#', github: '#', instagram: '#' }
    ],
    documentation: [
      { id: 'c-d1', name: 'Anuj Gangawane', role: 'Documentation Head', year: '3rd Year', avatarColor: 'linear-gradient(135deg, #d4f77c, #85e3ed)', initials: 'NM', linkedin: '#', github: '#', instagram: '#' },
      { id: 'c-d2', name: 'Varun Grover', role: 'Content Strategist', year: '2nd Year', avatarColor: 'linear-gradient(135deg, #f667c5, #d4f77c)', initials: 'VG', linkedin: '#', github: '#', instagram: '#' }
    ],
    // pro: [
    //   { id: 'c-p1', name: 'Karthik Raja', role: 'Public Relations Head', year: '3rd Year', avatarColor: 'linear-gradient(135deg, #85e3ed, #f667c5)', initials: 'KR', linkedin: '#', github: '#', instagram: '#' },
    //   { id: 'c-p2', name: 'Sanya Mirza', role: 'Corporate Lead', year: '2nd Year', avatarColor: 'linear-gradient(135deg, #d4f77c, #141513)', initials: 'SM', linkedin: '#', github: '#', instagram: '#' }
    // ],
    // infra: [
    //   { id: 'c-i1', name: 'Abhinav Tyagi', role: 'Logistics Head', year: '3rd Year', avatarColor: 'linear-gradient(135deg, #f667c5, #141513)', initials: 'AT', linkedin: '#', github: '#', instagram: '#' },
    //   { id: 'c-i2', name: 'Rupal Jain', role: 'Security Manager', year: '2nd Year', avatarColor: 'linear-gradient(135deg, #85e3ed, #d4f77c)', initials: 'RJ', linkedin: '#', github: '#', instagram: '#' }
    // ],
    // creativity: [
    //   { id: 'c-c1', name: 'Manish Pandey', role: 'Design Lead', year: '3rd Year', avatarColor: 'linear-gradient(135deg, #d4f77c, #f667c5)', initials: 'MP', linkedin: '#', github: '#', instagram: '#' },
    //   { id: 'c-c2', name: 'Pooja Hegde', role: 'Creative Director', year: '2nd Year', avatarColor: 'linear-gradient(135deg, #f667c5, #85e3ed)', initials: 'PH', linkedin: '#', github: '#', instagram: '#' }
    // ]
  }
};
