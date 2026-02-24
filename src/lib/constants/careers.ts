export interface CareerLink {
  title: string;
  url: string;
  org: string;
  description: string;
  color: string;
}

export interface CareerCategory {
  name: string;
  description: string;
  links: CareerLink[];
}

export const CAREER_CATEGORIES: CareerCategory[] = [
  {
    name: "Space Agency Careers",
    description: "Official job boards and career portals from the world's leading space agencies.",
    links: [
      {
        title: "NASA Careers",
        url: "https://www.nasa.gov/careers/",
        org: "NASA",
        description: "Engineering, science, mission operations, and internship opportunities across NASA centers.",
        color: "#0B3D91",
      },
      {
        title: "ESA Careers",
        url: "https://www.esa.int/About_Us/Careers_at_ESA",
        org: "ESA",
        description: "Positions in space science, engineering, and operations across Europe. Includes the Young Graduate Trainee programme.",
        color: "#003247",
      },
      {
        title: "SpaceX Careers",
        url: "https://www.spacex.com/careers/",
        org: "SpaceX",
        description: "Roles in rocket engineering, manufacturing, launch operations, Starlink, and Starship development.",
        color: "#005288",
      },
      {
        title: "ISRO Recruitment",
        url: "https://www.isro.gov.in/Careers.html",
        org: "ISRO",
        description: "Scientific, engineering, and technical roles at India's space agency and its centers.",
        color: "#FF9933",
      },
      {
        title: "JAXA Career Information",
        url: "https://global.jaxa.jp/about/employ/",
        org: "JAXA",
        description: "Research, engineering, and project management positions at Japan's aerospace agency.",
        color: "#1A3C5E",
      },
      {
        title: "Canadian Space Agency Careers",
        url: "https://www.asc-csa.gc.ca/eng/jobs/",
        org: "CSA",
        description: "Opportunities in space science, robotics, and astronaut recruitment campaigns.",
        color: "#C8102E",
      },
      {
        title: "Blue Origin Careers",
        url: "https://www.blueorigin.com/careers/",
        org: "Blue Origin",
        description: "Roles in rocket propulsion, spacecraft design, and lunar lander development.",
        color: "#0033A0",
      },
      {
        title: "Rocket Lab Careers",
        url: "https://rocketlabcorp.com/careers/",
        org: "Rocket Lab",
        description: "Positions in small launch vehicle engineering, spacecraft development, and mission management.",
        color: "#1C1C1C",
      },
    ],
  },
  {
    name: "Astronomy & Astrophysics Research",
    description: "Academic and research positions at observatories, universities, and research institutions.",
    links: [
      {
        title: "AAS Job Register",
        url: "https://jobregister.aas.org/",
        org: "AAS",
        description: "The primary job board for astronomers — faculty, postdoc, research, and technical positions worldwide.",
        color: "#1E3A5F",
      },
      {
        title: "ESO Recruitment",
        url: "https://www.eso.org/public/jobs/",
        org: "ESO",
        description: "Careers at the European Southern Observatory — home of the VLT and the upcoming ELT.",
        color: "#003366",
      },
      {
        title: "STScI Careers",
        url: "https://www.stsci.edu/opportunities",
        org: "STScI",
        description: "Positions at the Space Telescope Science Institute, operators of Hubble and JWST.",
        color: "#2B4C7E",
      },
      {
        title: "CERN Jobs",
        url: "https://careers.cern/",
        org: "CERN",
        description: "Physics, engineering, and computing roles at the world's largest particle physics laboratory.",
        color: "#003DA5",
      },
      {
        title: "NASA JPL Careers",
        url: "https://www.jpl.jobs/",
        org: "JPL",
        description: "Jet Propulsion Laboratory — robotics, planetary science, deep space missions, and Mars rovers.",
        color: "#E75113",
      },
      {
        title: "ESA Research Fellowships",
        url: "https://www.cosmos.esa.int/web/space-science-faculty/opportunities",
        org: "ESA",
        description: "Postdoctoral research fellowship programmes in space science and astronomy.",
        color: "#003247",
      },
    ],
  },
  {
    name: "Internships & Early Career",
    description: "Programmes designed for students and graduates starting their space careers.",
    links: [
      {
        title: "NASA Internships",
        url: "https://www.nasa.gov/learning-resources/internship-programs/",
        org: "NASA",
        description: "Paid internships for undergraduate and graduate students at all NASA centers.",
        color: "#0B3D91",
      },
      {
        title: "ESA Young Graduate Trainees",
        url: "https://www.esa.int/About_Us/Careers_at_ESA/Young_Graduate_Trainees",
        org: "ESA",
        description: "One-year trainee positions across ESA for recent graduates in STEM fields.",
        color: "#003247",
      },
      {
        title: "SpaceX University Internships",
        url: "https://www.spacex.com/careers/?department=Internships",
        org: "SpaceX",
        description: "Engineering, manufacturing, and software internships at SpaceX facilities.",
        color: "#005288",
      },
      {
        title: "NASA Pathways Programme",
        url: "https://www.nasa.gov/careers/pathways-program/",
        org: "NASA",
        description: "Federal career programme for students and recent graduates leading to full-time positions.",
        color: "#0B3D91",
      },
      {
        title: "Caltech SURF Programme",
        url: "https://sfp.caltech.edu/",
        org: "Caltech / JPL",
        description: "Summer undergraduate research fellowships with opportunities at JPL and Caltech.",
        color: "#FF6C0C",
      },
      {
        title: "UK Space Agency Graduate Scheme",
        url: "https://www.gov.uk/government/organisations/uk-space-agency/about/recruitment",
        org: "UKSA",
        description: "Graduate roles supporting the UK's growing space sector and national space strategy.",
        color: "#1D2671",
      },
    ],
  },
  {
    name: "Space Industry & Commercial",
    description: "Career opportunities in the growing commercial space sector.",
    links: [
      {
        title: "Space Crew — Space Jobs Board",
        url: "https://spacecrew.com/",
        org: "Space Crew",
        description: "Aggregated job listings from across the global space industry — startups to established players.",
        color: "#6B21A8",
      },
      {
        title: "Airbus Defence & Space",
        url: "https://www.airbus.com/en/careers",
        org: "Airbus",
        description: "Satellite, launcher, and space exploration roles across Airbus's European facilities.",
        color: "#00205B",
      },
      {
        title: "Lockheed Martin Space",
        url: "https://www.lockheedmartin.com/en-us/careers/why-lm/business-areas/space.html",
        org: "Lockheed Martin",
        description: "Positions in spacecraft development, deep space exploration, and space defence systems.",
        color: "#00263E",
      },
      {
        title: "Northrop Grumman Space",
        url: "https://jobs.northropgrumman.com/careers",
        org: "Northrop Grumman",
        description: "Roles in satellite systems, launch vehicles, and space logistics including Cygnus resupply missions.",
        color: "#003B5C",
      },
      {
        title: "Boeing Space & Launch",
        url: "https://jobs.boeing.com/category/space-jobs/185/69467/1",
        org: "Boeing",
        description: "Starliner crew capsule, SLS rocket, and satellite systems career opportunities.",
        color: "#0033A0",
      },
      {
        title: "Relativity Space",
        url: "https://www.relativityspace.com/careers",
        org: "Relativity Space",
        description: "3D-printed rocket startup — roles in additive manufacturing, propulsion, and software.",
        color: "#FF4D00",
      },
    ],
  },
  {
    name: "Learning & Development",
    description: "Educational resources to build your skills for a career in space.",
    links: [
      {
        title: "NASA Learning Resources",
        url: "https://www.nasa.gov/learning-resources/",
        org: "NASA",
        description: "Free educational resources, STEM challenges, and programmes for students at all levels.",
        color: "#0B3D91",
      },
      {
        title: "ESA Education",
        url: "https://www.esa.int/Education",
        org: "ESA",
        description: "University programmes, teacher training, and student competitions in space science.",
        color: "#003247",
      },
      {
        title: "Coursera — Space Science & Engineering",
        url: "https://www.coursera.org/courses?query=astronomy",
        org: "Coursera",
        description: "Online courses in astronomy, astrophysics, and spacecraft engineering from top universities.",
        color: "#0056D2",
      },
      {
        title: "International Space University",
        url: "https://www.isunet.edu/",
        org: "ISU",
        description: "Graduate programmes and summer sessions in space studies bringing together students worldwide.",
        color: "#002244",
      },
      {
        title: "MIT OpenCourseWare — Aerospace",
        url: "https://ocw.mit.edu/search/?q=aerospace",
        org: "MIT",
        description: "Free course materials for aerospace engineering, orbital mechanics, and space systems.",
        color: "#A31F34",
      },
      {
        title: "Space Generation Advisory Council",
        url: "https://spacegeneration.org/",
        org: "SGAC",
        description: "Global network for students and young professionals in the space sector — events, scholarships, and projects.",
        color: "#1B75BC",
      },
    ],
  },
];
