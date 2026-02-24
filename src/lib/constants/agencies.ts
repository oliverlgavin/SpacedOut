export interface AgencyInfo {
  id: number;
  name: string;
  abbrev: string;
  slug: string;
  country: string;
  color: string;
  founded: number;
  headquarters: string;
  director: string;
  employees?: string;
  budget?: string;
  website: string;
  description: string;
  history: string;
  values: string[];
  notableMissions: {
    name: string;
    year: string;
    description: string;
  }[];
  keyAchievements: string[];
}

export const AGENCIES: AgencyInfo[] = [
  {
    id: 44,
    name: "National Aeronautics and Space Administration",
    abbrev: "NASA",
    slug: "nasa",
    country: "USA",
    color: "#0B3D91",
    founded: 1958,
    headquarters: "Washington, D.C., USA",
    director: "Bill Nelson",
    employees: "~18,000",
    budget: "$25.4 billion (2024)",
    website: "nasa.gov",
    description:
      "NASA is the United States government agency responsible for the nation's civilian space program and for aeronautics and aerospace research. It leads the world in space exploration, scientific discovery, and aeronautics research.",
    history:
      "Established on July 29, 1958, NASA was created in response to the Soviet Union's launch of Sputnik. It absorbed the National Advisory Committee for Aeronautics (NACA) and quickly became the driving force behind the Space Race. The Mercury and Gemini programs paved the way for Apollo, which landed humans on the Moon in 1969. The Space Shuttle program (1981–2011) enabled construction of the International Space Station. Today, NASA leads the Artemis program to return humans to the Moon and eventually send astronauts to Mars.",
    values: [
      "Safety",
      "Integrity",
      "Teamwork",
      "Excellence",
      "Inclusion",
    ],
    notableMissions: [
      {
        name: "Apollo 11",
        year: "1969",
        description:
          "First crewed mission to land on the Moon. Neil Armstrong and Buzz Aldrin walked on the lunar surface while Michael Collins orbited above.",
      },
      {
        name: "Voyager 1 & 2",
        year: "1977–present",
        description:
          "Twin spacecraft that explored all four giant planets and are now in interstellar space — the farthest human-made objects from Earth.",
      },
      {
        name: "Hubble Space Telescope",
        year: "1990–present",
        description:
          "Revolutionized astronomy with deep-field images revealing the age, size, and expansion of the universe.",
      },
      {
        name: "Mars Perseverance Rover",
        year: "2021–present",
        description:
          "Exploring Jezero Crater on Mars, collecting samples for future return to Earth and testing oxygen production.",
      },
      {
        name: "James Webb Space Telescope",
        year: "2021–present",
        description:
          "The most powerful space telescope ever built, observing the universe in infrared to study the earliest galaxies.",
      },
    ],
    keyAchievements: [
      "First humans on the Moon (1969)",
      "First reusable spacecraft (Space Shuttle, 1981)",
      "International Space Station construction and operation",
      "Mars rover exploration spanning over 25 years",
      "Hubble and James Webb space telescopes",
      "Artemis program returning to the Moon",
    ],
  },
  {
    id: 121,
    name: "SpaceX",
    abbrev: "SpaceX",
    slug: "spacex",
    country: "USA",
    color: "#005288",
    founded: 2002,
    headquarters: "Hawthorne, California, USA",
    director: "Elon Musk",
    employees: "~13,000",
    budget: "Private",
    website: "spacex.com",
    description:
      "Space Exploration Technologies Corp. is a private American aerospace manufacturer and space transportation company. SpaceX designs, manufactures, and launches advanced rockets and spacecraft with the ultimate goal of enabling human life on Mars.",
    history:
      "Founded by Elon Musk in 2002, SpaceX started with the goal of reducing space transportation costs. After three failed Falcon 1 launches, the fourth attempt succeeded in 2008, making it the first privately-funded liquid-fuel rocket to reach orbit. Falcon 9 followed in 2010 and became the workhorse of the commercial launch industry. In 2015, SpaceX achieved the first successful landing of a first-stage booster, revolutionizing rocket reusability. Dragon became the first commercial spacecraft to deliver cargo to the ISS, and later Crew Dragon began ferrying astronauts. Starship, the largest and most powerful rocket ever built, represents the next chapter.",
    values: [
      "Make life multi-planetary",
      "Rapid innovation and iteration",
      "Vertical integration",
      "Reusability as a core principle",
    ],
    notableMissions: [
      {
        name: "Falcon 1 Flight 4",
        year: "2008",
        description:
          "First privately-funded liquid-fuel rocket to reach orbit, proving commercial spaceflight was viable.",
      },
      {
        name: "CRS-1 (Dragon)",
        year: "2012",
        description:
          "First commercial spacecraft to deliver cargo to the International Space Station.",
      },
      {
        name: "Falcon 9 First Landing",
        year: "2015",
        description:
          "First successful landing of an orbital-class rocket booster, opening the era of reusable rockets.",
      },
      {
        name: "Crew Dragon Demo-2",
        year: "2020",
        description:
          "First crewed orbital spaceflight by a commercial company, restoring American crewed launch capability.",
      },
      {
        name: "Starship IFT",
        year: "2023–present",
        description:
          "Testing the largest and most powerful rocket ever built, designed to carry humans to the Moon and Mars.",
      },
    ],
    keyAchievements: [
      "First private company to reach orbit (2008)",
      "Pioneered orbital-class rocket reusability",
      "Over 300 successful Falcon 9 missions",
      "First private company to send astronauts to the ISS",
      "Starlink — world's largest satellite constellation",
      "Building Starship, the most powerful rocket ever",
    ],
  },
  {
    id: 27,
    name: "European Space Agency",
    abbrev: "ESA",
    slug: "esa",
    country: "EU",
    color: "#003247",
    founded: 1975,
    headquarters: "Paris, France",
    director: "Josef Aschbacher",
    employees: "~2,200",
    budget: "€7.8 billion (2024)",
    website: "esa.int",
    description:
      "The European Space Agency is an intergovernmental organisation of 22 member states dedicated to the exploration of space. ESA coordinates European space activities and develops rockets, spacecraft, and ground facilities.",
    history:
      "ESA was established in 1975 through the merger of the European Launcher Development Organisation (ELDO) and the European Space Research Organisation (ESRO). The Ariane rocket family, first launched in 1979, gave Europe independent access to space. ESA has been a key partner in the International Space Station program and has sent missions across the solar system. The Rosetta mission's landing on a comet in 2014 was a historic first. ESA's Earth observation programs, including Copernicus, are world-leading environmental monitoring systems.",
    values: [
      "Cooperation between European nations",
      "Peaceful exploration of space",
      "Scientific excellence",
      "Innovation and technology development",
    ],
    notableMissions: [
      {
        name: "Ariane 5",
        year: "1996–2023",
        description:
          "Europe's flagship heavy-lift launcher, conducting over 100 successful missions including deploying the James Webb Space Telescope.",
      },
      {
        name: "Rosetta / Philae",
        year: "2004–2016",
        description:
          "First spacecraft to orbit a comet and deploy a lander on its surface — Comet 67P/Churyumov–Gerasimenko.",
      },
      {
        name: "Huygens Probe",
        year: "2005",
        description:
          "First landing in the outer solar system, descending through Titan's thick atmosphere to its surface.",
      },
      {
        name: "Gaia",
        year: "2013–present",
        description:
          "Mapping over a billion stars in the Milky Way with unprecedented precision, creating a 3D map of our galaxy.",
      },
    ],
    keyAchievements: [
      "Independent European access to space via Ariane rockets",
      "First comet landing (Rosetta/Philae, 2014)",
      "First landing in the outer solar system (Huygens on Titan)",
      "Copernicus — world's largest Earth observation program",
      "Key ISS partner with Columbus laboratory module",
      "Ariane 6 next-generation launcher development",
    ],
  },
  {
    id: 31,
    name: "Indian Space Research Organisation",
    abbrev: "ISRO",
    slug: "isro",
    country: "IND",
    color: "#FF9933",
    founded: 1969,
    headquarters: "Bengaluru, Karnataka, India",
    director: "S. Somanath",
    employees: "~17,000",
    budget: "~$1.5 billion (2024)",
    website: "isro.gov.in",
    description:
      "ISRO is the national space agency of India, headquartered in Bengaluru. Known for its cost-effective missions, ISRO has achieved remarkable feats in space exploration, satellite technology, and launch vehicle development.",
    history:
      "India's space program began in 1962 under Vikram Sarabhai, the father of the Indian space program. ISRO was formally established in 1969. Early efforts focused on using space technology for national development — communications, weather forecasting, and resource management. The PSLV, first launched in 1993, became one of the world's most reliable rockets. India's Mars Orbiter Mission (Mangalyaan) made history in 2014 as the first successful Mars mission by an Asian nation — and on the first attempt. Chandrayaan-3's successful lunar landing in 2023 made India only the fourth country to soft-land on the Moon.",
    values: [
      "Space technology for national development",
      "Cost-effective innovation",
      "Self-reliance in space technology",
      "Peaceful use of outer space",
    ],
    notableMissions: [
      {
        name: "Chandrayaan-1",
        year: "2008",
        description:
          "India's first lunar mission. Discovered water molecules on the Moon's surface, reshaping our understanding of the lunar environment.",
      },
      {
        name: "Mars Orbiter Mission (Mangalyaan)",
        year: "2014",
        description:
          "First Asian nation to reach Mars orbit, and on the first attempt. Achieved at a fraction of the cost of comparable missions.",
      },
      {
        name: "Chandrayaan-3",
        year: "2023",
        description:
          "Successfully soft-landed near the Moon's south pole, making India the fourth country to achieve a lunar landing.",
      },
      {
        name: "Gaganyaan",
        year: "Upcoming",
        description:
          "India's first crewed spaceflight program, aiming to send Indian astronauts to low Earth orbit.",
      },
    ],
    keyAchievements: [
      "Most cost-effective Mars mission in history (Mangalyaan)",
      "Fourth country to soft-land on the Moon (2023)",
      "PSLV — one of the world's most reliable launch vehicles",
      "104 satellites launched in a single mission (2017)",
      "Discovered water on the Moon (Chandrayaan-1)",
      "Developing crewed spaceflight capability (Gaganyaan)",
    ],
  },
  {
    id: 37,
    name: "Japan Aerospace Exploration Agency",
    abbrev: "JAXA",
    slug: "jaxa",
    country: "JPN",
    color: "#1A3C5E",
    founded: 2003,
    headquarters: "Chōfu, Tokyo, Japan",
    director: "Hiroshi Yamakawa",
    employees: "~1,500",
    budget: "~$2.6 billion (2024)",
    website: "jaxa.jp",
    description:
      "JAXA is Japan's national aero-space agency responsible for space exploration, aviation research, and development of rockets and satellites. Japan is a leader in asteroid science and sample return missions.",
    history:
      "Japan's space program dates back to the 1950s with sounding rocket experiments. Three predecessor agencies — NASDA, ISAS, and NAL — merged in 2003 to form JAXA. Japan became the fourth country to launch a satellite in 1970. JAXA has excelled in planetary science, particularly asteroid exploration. The Hayabusa missions successfully returned samples from two asteroids, groundbreaking firsts in space science. Japan is a major ISS partner, operating the Kibo laboratory module, and is developing the H3 next-generation launch vehicle.",
    values: [
      "Pursuit of wisdom through space",
      "Contributing to society through technology",
      "International cooperation",
      "Pioneering spirit",
    ],
    notableMissions: [
      {
        name: "Hayabusa",
        year: "2003–2010",
        description:
          "First mission to return samples from an asteroid (25143 Itokawa), despite numerous technical difficulties during its seven-year journey.",
      },
      {
        name: "Hayabusa2",
        year: "2014–2020",
        description:
          "Returned pristine subsurface samples from asteroid Ryugu, providing clues about the origins of the solar system and life.",
      },
      {
        name: "Kibo (ISS Module)",
        year: "2008–present",
        description:
          "Japan's largest contribution to the ISS — the biggest single module, with an exposed experiment facility for space science.",
      },
      {
        name: "SLIM",
        year: "2024",
        description:
          "Smart Lander for Investigating Moon — achieved a precision lunar landing, making Japan the fifth country to land on the Moon.",
      },
    ],
    keyAchievements: [
      "First asteroid sample return (Hayabusa, 2010)",
      "First subsurface asteroid samples (Hayabusa2, 2020)",
      "Fifth country to soft-land on the Moon (SLIM, 2024)",
      "Kibo — largest single ISS module",
      "H-II/H3 launch vehicle family",
      "Pioneers in space debris mitigation technology",
    ],
  },
  {
    id: 63,
    name: "Russian Federal Space Agency",
    abbrev: "ROSCOSMOS",
    slug: "roscosmos",
    country: "RUS",
    color: "#C1272D",
    founded: 1992,
    headquarters: "Moscow, Russia",
    director: "Yuri Borisov",
    employees: "~170,000 (including industry)",
    budget: "~$3.5 billion (2024)",
    website: "roscosmos.ru",
    description:
      "Roscosmos is the governmental body responsible for Russia's space science program and general aerospace research. It inherits the legacy of the Soviet space program, which achieved many historic firsts in space exploration.",
    history:
      "The Soviet space program achieved a remarkable series of firsts: the first satellite (Sputnik, 1957), first human in space (Yuri Gagarin, 1961), first spacewalk (Alexei Leonov, 1965), and first space station (Salyut 1, 1971). After the Soviet Union dissolved, Roscosmos was established in 1992 as the successor agency. The Soyuz spacecraft became the sole means of reaching the ISS after the Space Shuttle retired in 2011 until commercial crew vehicles arrived in 2020. Russia's Mir space station operated from 1986 to 2001, pioneering long-duration spaceflight. Today Roscosmos continues operating Soyuz missions and is developing next-generation systems.",
    values: [
      "Pioneering space exploration",
      "Human spaceflight expertise",
      "Reliability through proven technology",
      "International partnerships",
    ],
    notableMissions: [
      {
        name: "Sputnik 1",
        year: "1957",
        description:
          "The first artificial satellite, launching the Space Age and triggering the Space Race between the USSR and the United States.",
      },
      {
        name: "Vostok 1",
        year: "1961",
        description:
          "Yuri Gagarin became the first human in space, completing one orbit of Earth in 108 minutes.",
      },
      {
        name: "Mir Space Station",
        year: "1986–2001",
        description:
          "The first modular space station, hosting crews continuously for almost 10 years and advancing long-duration spaceflight research.",
      },
      {
        name: "Soyuz Program",
        year: "1966–present",
        description:
          "The longest-running crewed spaceflight program in history, with over 150 missions carrying crews to space stations.",
      },
    ],
    keyAchievements: [
      "First satellite in orbit (Sputnik, 1957)",
      "First human in space (Gagarin, 1961)",
      "First spacewalk (Leonov, 1965)",
      "First space station (Salyut 1, 1971)",
      "Mir — pioneered long-duration spaceflight",
      "Soyuz — most reliable crewed spacecraft in history",
    ],
  },
  {
    id: 88,
    name: "China Aerospace Science and Technology Corporation",
    abbrev: "CASC",
    slug: "casc",
    country: "CHN",
    color: "#DE2910",
    founded: 1999,
    headquarters: "Beijing, China",
    director: "Wu Yansheng",
    employees: "~170,000",
    budget: "~$12 billion (2024)",
    website: "spacechina.com",
    description:
      "CASC is the main contractor for the Chinese space program, responsible for manufacturing and launching China's rockets and spacecraft. It operates under the China National Space Administration (CNSA) and has rapidly advanced China's position as a major space power.",
    history:
      "China's space program began in the 1950s and launched its first satellite, Dongfanghong 1, in 1970. CASC was reorganized in 1999 from the former Ministry of Aerospace Industry. The Shenzhou program achieved China's first crewed spaceflight in 2003, making China the third country to independently send humans to space. The Chang'e lunar program has achieved multiple firsts, including the first landing on the far side of the Moon (2019) and the first far-side sample return (2024). The Tiangong space station became fully operational in 2022, giving China a permanent crewed presence in orbit.",
    values: [
      "Independent space capability",
      "Technological self-reliance",
      "Long-term strategic planning",
      "Advancing national prestige through space",
    ],
    notableMissions: [
      {
        name: "Shenzhou 5",
        year: "2003",
        description:
          "China's first crewed spaceflight. Yang Liwei orbited Earth 14 times, making China the third country to send humans to space.",
      },
      {
        name: "Chang'e 4",
        year: "2019",
        description:
          "First-ever landing on the far side of the Moon, in Von Kármán crater, relaying data via the Queqiao satellite.",
      },
      {
        name: "Tiangong Space Station",
        year: "2021–present",
        description:
          "China's permanently crewed modular space station, the second operational station after the ISS.",
      },
      {
        name: "Chang'e 6",
        year: "2024",
        description:
          "First mission to return samples from the far side of the Moon, a historic achievement in planetary science.",
      },
    ],
    keyAchievements: [
      "Third country to independently launch humans (2003)",
      "First far-side Moon landing (Chang'e 4, 2019)",
      "First far-side Moon sample return (Chang'e 6, 2024)",
      "Tiangong — second operational space station",
      "Long March rocket family with over 500 launches",
      "BeiDou global navigation satellite system",
    ],
  },
  {
    id: 115,
    name: "Arianespace",
    abbrev: "ASA",
    slug: "arianespace",
    country: "FRA",
    color: "#0055A4",
    founded: 1980,
    headquarters: "Courcouronnes, France",
    director: "Stéphane Israël",
    employees: "~300",
    budget: "Private (ESA-backed)",
    website: "arianespace.com",
    description:
      "Arianespace is the world's first commercial launch service provider, operating from the Guiana Space Centre in Kourou, French Guiana. It provides launch services using the Ariane, Soyuz (formerly), and Vega rocket families.",
    history:
      "Founded in 1980, Arianespace pioneered the commercial launch industry, predating SpaceX by over two decades. It was created to market and manage the Ariane rocket program for commercial satellite launches. The company's location near the equator in French Guiana provides a significant performance advantage for geostationary launches. Ariane 4 dominated commercial launches in the 1990s, and Ariane 5 took over from 1996, achieving over 100 successful missions. Arianespace is now transitioning to Ariane 6, designed to be more cost-competitive in the modern launch market.",
    values: [
      "Guaranteed European access to space",
      "Reliability and mission assurance",
      "Commercial innovation in launch services",
      "Serving institutional and commercial customers equally",
    ],
    notableMissions: [
      {
        name: "First Ariane 1 Launch",
        year: "1979",
        description:
          "Europe's first independent orbital launch, ending reliance on American and Soviet rockets for satellite deployment.",
      },
      {
        name: "Ariane 5 — JWST Deployment",
        year: "2021",
        description:
          "Launched the James Webb Space Telescope with such precision that it saved years of fuel, extending the telescope's operational life.",
      },
      {
        name: "Ariane 5 — 100th Launch",
        year: "2022",
        description:
          "Ariane 5's 100th mission, cementing its status as one of the most reliable heavy-lift launchers ever built.",
      },
      {
        name: "Ariane 6 Inaugural Flight",
        year: "2024",
        description:
          "Europe's next-generation launcher, designed for flexibility and competitiveness in the evolving launch market.",
      },
    ],
    keyAchievements: [
      "World's first commercial launch service provider (1980)",
      "Over 600 satellites launched for customers worldwide",
      "Ariane 5 — 100+ successful missions",
      "Precision JWST deployment extending its mission life",
      "Pioneered the commercial satellite launch market",
      "Ariane 6 development for next-gen European launches",
    ],
  },
];
