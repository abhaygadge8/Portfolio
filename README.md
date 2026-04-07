# Abhay Gadge Portfolio

Personal portfolio website for Abhay Gadge, built as a responsive static site and designed to showcase experience, skills, projects, education, and contact details.

## Overview

This project is a portfolio website for a Software Engineer and Java Backend Developer based in Pune, India. It highlights:

- professional summary
- technical skills
- work experience
- selected projects
- education
- certifications and activities
- contact information and social links

## Tech Stack

- HTML5
- CSS3
- JavaScript
- Bootstrap 5
- Bootstrap Icons
- AOS (Animate On Scroll)
- Google Apps Script for contact form backend
- Google Sheets for response storage

## Project Structure

```text
Portfolio/
|-- index.html
|-- style.css
|-- script.js
|-- .nojekyll
|-- CONTACT_FORM_SETUP.md
|-- google-apps-script/
|   |-- contact-form.gs
|-- assets/
```

## Features

- responsive single-page portfolio layout
- animated hero section with typing effect
- about, skills, experience, projects, education, and contact sections
- social media links for LinkedIn, GitHub, X, Instagram, and email
- project filtering by category
- back-to-top button
- contact form validation
- optional contact form integration with email and Google Sheets

## Experience Included

The portfolio currently includes:

- Software Engineer at Scorpion Advanced System Pvt. Ltd.
- Software Developer Intern at COEP Technological University
- Data Analyst at Blue Planet Infosolutions Pvt. Ltd.

## Local Development

To run the site locally, open `index.html` in your browser.

If you want a better local preview, use VS Code Live Server or any static file server.

## Contact Form Setup

The contact form frontend is already connected to a configurable backend endpoint through the `data-endpoint` attribute in `index.html`.

To make the form:

- send messages to your email
- store submissions in a Google Sheet in your Drive

follow the instructions in [CONTACT_FORM_SETUP.md](CONTACT_FORM_SETUP.md).

The Google Apps Script backend file is here:

- [google-apps-script/contact-form.gs](google-apps-script/contact-form.gs)

## Deployment

This site is ready for GitHub Pages deployment.

### GitHub Pages

1. Push the repository to GitHub.
2. Open the repository on GitHub.
3. Go to `Settings` -> `Pages`.
4. Under `Build and deployment`, choose:
   - `Source: Deploy from a branch`
   - `Branch: main`
   - `Folder: / (root)`
5. Save.

Expected GitHub Pages URL:

```text
https://abhaygadge8.github.io/Portfolio/
```

The repository also includes `.nojekyll` so static assets are served directly by GitHub Pages.

## Custom Domain

If you want to use a custom domain with GitHub Pages:

1. Configure the custom domain in GitHub Pages settings.
2. Add the required DNS records at your domain provider.
3. Enable HTTPS after DNS verification succeeds.

## Author

Abhay Vijayrao Gadge

- Email: `abhaygadge8@gmail.com`
- LinkedIn: `https://www.linkedin.com/in/abhay-gadge-372130178`
- GitHub: `https://github.com/abhaygadge8`
- X: `https://x.com/AbhayGadge8620`
- Instagram: `https://www.instagram.com/abhigadge8`

