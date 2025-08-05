const ghanianUniversities = [
    {
        name: "University of Ghana",
        shortName: "UG",
        location: {
            city: "Accra",
            region: "Greater Accra",
            coordinates: {
                latitude: 5.6508,
                longitude: -0.1864
            }
        },
        establishedYear: 1948,
        type: "Public",
        website: "https://www.ug.edu.gh",
        description: "The premier university in Ghana, established as the University College of the Gold Coast.",
        logo: "/images/universities/ug-logo.png",
        isActive: true
    },
    {
        name: "University of Cape Coast",
        shortName: "UCC",
        location: {
            city: "Cape Coast",
            region: "Central",
            coordinates: {
                latitude: 5.1053,
                longitude: -1.2466
            }
        },
        establishedYear: 1962,
        type: "Public",
        website: "https://www.ucc.edu.gh",
        description: "A leading university known for education and research excellence.",
        logo: "/images/universities/ucc-logo.png",
        isActive: true
    },
    {
        name: "Kwame Nkrumah University of Science and Technology",
        shortName: "KNUST",
        location: {
            city: "Kumasi",
            region: "Ashanti",
            coordinates: {
                latitude: 6.6745,
                longitude: -1.5716
            }
        },
        establishedYear: 1952,
        type: "Public",
        website: "https://www.knust.edu.gh",
        description: "Ghana's premier university of science and technology.",
        logo: "/images/universities/knust-logo.png",
        isActive: true
    },
    {
        name: "University for Development Studies",
        shortName: "UDS",
        location: {
            city: "Tamale",
            region: "Northern",
            coordinates: {
                latitude: 9.4016,
                longitude: -0.8591
            }
        },
        establishedYear: 1992,
        type: "Public",
        website: "https://www.uds.edu.gh",
        description: "A multi-campus university focused on development studies.",
        logo: "/images/universities/uds-logo.png",
        isActive: true
    },
    {
        name: "University of Education, Winneba",
        shortName: "UEW",
        location: {
            city: "Winneba",
            region: "Central",
            coordinates: {
                latitude: 5.3514,
                longitude: -0.6200
            }
        },
        establishedYear: 1992,
        type: "Public",
        website: "https://www.uew.edu.gh",
        description: "Ghana's premier teacher education university.",
        logo: "/images/universities/uew-logo.png",
        isActive: true
    },
    {
        name: "Ghana Institute of Management and Public Administration",
        shortName: "GIMPA",
        location: {
            city: "Accra",
            region: "Greater Accra",
            coordinates: {
                latitude: 5.6037,
                longitude: -0.1870
            }
        },
        establishedYear: 1961,
        type: "Public",
        website: "https://www.gimpa.edu.gh",
        description: "Specialized in management and public administration education.",
        logo: "/images/universities/gimpa-logo.png",
        isActive: true
    },
    {
        name: "University of Mines and Technology",
        shortName: "UMaT",
        location: {
            city: "Tarkwa",
            region: "Western",
            coordinates: {
                latitude: 5.3016,
                longitude: -1.9999
            }
        },
        establishedYear: 2004,
        type: "Public",
        website: "https://www.umat.edu.gh",
        description: "Specialized in mining, technology, and engineering.",
        logo: "/images/universities/umat-logo.png",
        isActive: true
    },
    {
        name: "Ashesi University",
        shortName: "ASHESI",
        location: {
            city: "Berekuso",
            region: "Eastern",
            coordinates: {
                latitude: 5.7645,
                longitude: -0.1595
            }
        },
        establishedYear: 2002,
        type: "Private",
        website: "https://www.ashesi.edu.gh",
        description: "Liberal arts university emphasizing leadership and innovation.",
        logo: "/images/universities/ashesi-logo.png",
        isActive: true
    },
    {
        name: "Central University",
        shortName: "CU",
        location: {
            city: "Accra",
            region: "Greater Accra",
            coordinates: {
                latitude: 5.6037,
                longitude: -0.1870
            }
        },
        establishedYear: 1998,
        type: "Private",
        website: "https://www.central.edu.gh",
        description: "A leading private university in Ghana.",
        logo: "/images/universities/cu-logo.png",
        isActive: true
    },
    {
        name: "Valley View University",
        shortName: "VVU",
        location: {
            city: "Accra",
            region: "Greater Accra",
            coordinates: {
                latitude: 5.6037,
                longitude: -0.1870
            }
        },
        establishedYear: 1979,
        type: "Private",
        website: "https://www.vvu.edu.gh",
        description: "A Seventh-day Adventist university offering diverse programs.",
        logo: "/images/universities/vvu-logo.png",
        isActive: true
    },
    {
        name: "Presbyterian University College",
        shortName: "PUC",
        location: {
            city: "Abetifi",
            region: "Eastern",
            coordinates: {
                latitude: 6.6745,
                longitude: -0.7516
            }
        },
        establishedYear: 1996,
        type: "Private",
        website: "https://www.presbyuniversity.edu.gh",
        description: "A Presbyterian church-affiliated university.",
        logo: "/images/universities/puc-logo.png",
        isActive: true
    },
    {
        name: "University of Professional Studies, Accra",
        shortName: "UPSA",
        location: {
            city: "Accra",
            region: "Greater Accra",
            coordinates: {
                latitude: 5.6037,
                longitude: -0.1870
            }
        },
        establishedYear: 1965,
        type: "Public",
        website: "https://www.upsa.edu.gh",
        description: "Focused on professional and management studies.",
        logo: "/images/universities/upsa-logo.png",
        isActive: true
    },
    {
        name: "Ho Technical University",
        shortName: "HTU",
        location: {
            city: "Ho",
            region: "Volta",
            coordinates: {
                latitude: 6.6110,
                longitude: 0.4720
            }
        },
        establishedYear: 1968,
        type: "Technical",
        website: "https://www.htu.edu.gh",
        description: "A technical university offering technology-focused programs.",
        logo: "/images/universities/htu-logo.png",
        isActive: true
    },
    {
        name: "Bolgatanga Technical University",
        shortName: "BTU",
        location: {
            city: "Bolgatanga",
            region: "Upper East",
            coordinates: {
                latitude: 10.7856,
                longitude: -0.8516
            }
        },
        establishedYear: 1999,
        type: "Technical",
        website: "https://www.btu.edu.gh",
        description: "A technical university in northern Ghana.",
        logo: "/images/universities/btu-logo.png",
        isActive: true
    },
    {
        name: "Takoradi Technical University",
        shortName: "TTU",
        location: {
            city: "Takoradi",
            region: "Western",
            coordinates: {
                latitude: 4.8845,
                longitude: -1.7554
            }
        },
        establishedYear: 1954,
        type: "Technical",
        website: "https://www.ttu.edu.gh",
        description: "A technical university specializing in engineering and technology.",
        logo: "/images/universities/ttu-logo.png",
        isActive: true
    }
];

module.exports = ghanianUniversities;
