# RAND AI Methods Intelligence Dashboard

## Overview
This dashboard presents comprehensive analysis of research methods used across RAND Corporation publications from 2016-2025, with focus on AI integration patterns.

## Deployment Instructions

### GitHub Pages Setup
1. Push this `docs/` directory to your GitHub repository
2. Go to Settings → Pages
3. Select "Deploy from a branch"
4. Choose "main" branch and "/docs" folder
5. Save and wait for deployment

### Local Testing
```bash
cd docs
python3 -m http.server 8000
# Visit http://localhost:8000
```

## Data Updates

### When Gemini Analysis Completes
1. Copy `gemini_analysis_complete.csv` to `data/`
2. Update statistics in `index.html`
3. Regenerate relevant visualizations
4. Push updates to GitHub

### File Structure
```
docs/
├── index.html              # Main dashboard
├── wizmap.html            # Network visualization
├── css/                   # Stylesheets
├── js/                    # JavaScript files
├── data/                  # JSON/CSV data files
├── visualizations/        # Images and animations
│   ├── static/           # PNG visualizations
│   └── animations/       # GIF animations
└── reports/              # Detailed reports
```

## Key Insights
- 231 unique methods tracked
- 2,840% growth in AI methods (2016-2025)
- Only 2.4% active AI integration despite growth
- Clear division specializations identified
- Strong author-method networks drive adoption

## Technical Notes
- Built with vanilla HTML/CSS/JavaScript for simplicity
- Data pre-processed from 564K text chunks
- Visualizations created with Python (matplotlib, seaborn)
- Network data ready for D3.js integration

## Contact
For questions about the analysis methodology or data, refer to the full report.
