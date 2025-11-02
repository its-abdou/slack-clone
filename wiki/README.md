# 📚 GitHub Wiki Documentation

This directory contains all the documentation pages for the Slack Clone project wiki.

## 📂 Structure

This wiki contains 10 comprehensive pages:

1. **Home.md** - Project introduction and navigation
2. **Présentation.md** - Project overview, goals, and team
3. **Architecture.md** - Technical stack, folder structure, and data flow
4. **User-Story-Template.md** - Reusable template for user stories
5. **User-Stories.md** - 6 detailed user stories with acceptance criteria
6. **Sprints.md** - Sprint planning and retrospectives
7. **Veille.md** - Competitive analysis and technology trends
8. **Tests.md** - Test scenarios and validation
9. **Bilan.md** - Project summary, achievements, and roadmap
10. **Contributions.md** - Team member contributions

## 🚀 How to Use

### Option 1: GitHub Wiki (Recommended)

These files are designed to be uploaded to the GitHub Wiki:

1. Go to your repository: https://github.com/its-abdou/slack-clone
2. Click on the "Wiki" tab
3. Create a new page for each .md file
4. Copy the content from each file to the corresponding wiki page
5. The internal links will work automatically

### Option 2: View Locally

You can read these files directly in any Markdown viewer:

```bash
cd wiki
# Use your favorite markdown viewer
# Examples:
# - VSCode: Open folder and preview .md files
# - Browser: Install a markdown viewer extension
# - Command line: mdless Home.md
```

### Option 3: Generate PDF

Generate a complete PDF document with all pages:

```bash
cd wiki
pandoc Home.md Présentation.md Architecture.md User-Story-Template.md User-Stories.md Sprints.md Veille.md Tests.md Bilan.md Contributions.md -o TP3_Prime.pdf --toc
```

**Requirements:**
```bash
# Install pandoc
sudo apt install pandoc  # Linux/WSL
brew install pandoc      # macOS
```

## 📖 Navigation

Start with **Home.md** which contains links to all other pages.

## ✅ Verification Checklist

- [x] All 10 pages created
- [x] Internal links properly formatted
- [x] GitHub repository links use correct username (its-abdou)
- [x] File paths reference actual repository structure
- [x] Markdown tables formatted correctly
- [x] Code blocks with proper syntax highlighting
- [x] User Stories include acceptance criteria checkboxes
- [x] Sprints include anchored links to User Stories
- [x] All pages have navigation links (Home/Previous/Next)

## 🎓 Academic Context

**Course**: TP3 Prime – Wiki orienté gestion de projet technique  
**Due Date**: Monday, November 3, 2025  
**Project**: Slack Clone (Full-stack MERN application)

## 📝 Notes

- All content is in French as required by the assignment
- Links to repository files use the `its-abdou` username
- User Stories follow the "En tant que / Je veux / Afin de" format
- Technical details are extracted from actual code in the repository
- Documentation follows Agile project management best practices

---

**Generated**: November 2, 2025  
**Repository**: https://github.com/its-abdou/slack-clone
