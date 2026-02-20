// src/data/GovtPortals.js

/**
 * Data structure containing key official government portals for the Sitemap and Footer.
 * These links are relevant to youth, skill development, and Bihar administration.
 */

// Key Bihar Government Portals
const biharGovtLinks = [
    { 
        name: 'Bihar Official Portal', 
        url: 'https://state.bihar.gov.in/',
        description: 'The main portal of the Government of Bihar.'
    },
    { 
        name: 'Bihar Skill Development Mission (BSDM)', 
        url: 'https://skillmissionbihar.org/',
        description: 'Focuses on skilling initiatives across the state.'
    },
    { 
        name: 'Mukhyamantri Udyami Yojna', 
        url: 'https://udyami.bihar.gov.in/',
        description: 'Scheme for promoting entrepreneurship among all categories of youth.'
    },
    { 
        name: 'Saat Nishchay (Economic Resolution & Youth Power)', 
        url: 'https://7nishchay.bihar.gov.in/',
        description: 'Bihar\'s core development scheme, including Student Credit Card.'
    },
    { 
        name: 'Bihar e-Governance Services', 
        url: 'https://serviceonline.bihar.gov.in/',
        description: 'Portal for availing various government services online (RTPS).'
    },
];

// Key Central Government Portals relevant to Youth
const centralGovtLinks = [
    { 
        name: 'Skill India Mission', 
        url: 'https://www.skillindia.gov.in/',
        description: 'National umbrella mission for skill development.'
    },
    { 
        name: 'National Career Service (NCS)', 
        url: 'https://www.ncs.gov.in/',
        description: 'Job matching, career counselling, and youth registration.'
    },
    { 
        name: 'PMKVY Scheme', 
        url: 'https://pmkvyofficial.org/',
        description: 'Pradhan Mantri Kaushal Vikas Yojana training and certification.'
    },
    { 
        name: 'Digital India', 
        url: 'https://www.digitalindia.gov.in/',
        description: 'Platform for access to all digital government initiatives.'
    },
];

/**
 * Export the structured data object.
 */
export const govtPortals = {
    bihar: biharGovtLinks,
    central: centralGovtLinks,
};