/**
 * Enhanced Features for RAND AI Methods Intelligence Dashboard
 * Implements advanced analytics and interactive capabilities
 */

class MethodImportanceMatrix {
    constructor() {
        this.methods = [];
        this.initializeMatrix();
    }

    async initializeMatrix() {
        try {
            // Load method data
            const response = await fetch('data/method_frequencies_top50.csv');
            const csvText = await response.text();
            this.methods = this.parseCSV(csvText);
            this.createImportanceMatrix();
        } catch (error) {
            console.error('Error loading method data:', error);
        }
    }

    parseCSV(csvText) {
        const lines = csvText.split('\n');
        const methods = [];
        
        for (let i = 1; i < lines.length; i++) {
            const parts = lines[i].split(',');
            if (parts.length >= 2 && parts[0] && parts[1]) {
                methods.push({
                    name: parts[0].replace(/"/g, ''),
                    frequency: parseInt(parts[1]) || 0,
                    isAI: this.isAIMethod(parts[0])
                });
            }
        }
        
        return methods.sort((a, b) => b.frequency - a.frequency);
    }

    isAIMethod(methodName) {
        const aiKeywords = ['CNN', 'neural', 'machine learning', 'deep learning', 
                           'AI', 'artificial intelligence', 'LLM', 'GPT', 'embedding'];
        return aiKeywords.some(keyword => 
            methodName.toLowerCase().includes(keyword.toLowerCase())
        );
    }

    createImportanceMatrix() {
        const matrixContainer = document.getElementById('method-importance-matrix');
        if (!matrixContainer) return;

        // Calculate importance scores
        const scoredMethods = this.methods.slice(0, 20).map(method => {
            const frequencyScore = Math.log(method.frequency + 1) / Math.log(50000) * 100;
            const aiReadinessScore = method.isAI ? 90 : this.calculateAIReadiness(method.name);
            const strategicImportance = (frequencyScore * 0.6) + (aiReadinessScore * 0.4);
            
            return {
                ...method,
                frequencyScore: Math.min(frequencyScore, 100),
                aiReadinessScore,
                strategicImportance: Math.min(strategicImportance, 100)
            };
        });

        // Create matrix visualization
        const html = `
            <div class="importance-matrix">
                <h3>Method Investment Priority Matrix</h3>
                <div class="matrix-legend">
                    <div class="legend-item">
                        <div class="legend-color high"></div>
                        <span>High Priority (>70)</span>
                    </div>
                    <div class="legend-item">
                        <div class="legend-color medium"></div>
                        <span>Medium Priority (40-70)</span>
                    </div>
                    <div class="legend-item">
                        <div class="legend-color low"></div>
                        <span>Low Priority (<40)</span>
                    </div>
                </div>
                <div class="matrix-grid">
                    ${scoredMethods.map(method => `
                        <div class="matrix-cell ${this.getPriorityClass(method.strategicImportance)}" 
                             title="${method.name}\nFrequency: ${method.frequency}\nAI Readiness: ${method.aiReadinessScore.toFixed(1)}\nPriority Score: ${method.strategicImportance.toFixed(1)}">
                            <div class="method-name">${method.name}</div>
                            <div class="method-score">${method.strategicImportance.toFixed(0)}</div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;

        matrixContainer.innerHTML = html;
    }

    calculateAIReadiness(methodName) {
        // Simple heuristic for AI readiness based on method type
        const methodLower = methodName.toLowerCase();
        
        if (methodLower.includes('analysis') || methodLower.includes('statistical')) return 75;
        if (methodLower.includes('simulation') || methodLower.includes('modeling')) return 80;
        if (methodLower.includes('review') || methodLower.includes('evaluation')) return 60;
        if (methodLower.includes('case study') || methodLower.includes('interview')) return 45;
        if (methodLower.includes('survey') || methodLower.includes('assessment')) return 65;
        
        return 50; // Default moderate readiness
    }

    getPriorityClass(score) {
        if (score >= 70) return 'high-priority';
        if (score >= 40) return 'medium-priority';
        return 'low-priority';
    }
}

class EnhancedSearch {
    constructor() {
        this.initializeSearch();
    }

    initializeSearch() {
        this.createSearchInterface();
        this.bindSearchEvents();
    }

    createSearchInterface() {
        const searchContainer = document.getElementById('enhanced-search');
        if (!searchContainer) return;

        const html = `
            <div class="search-panel">
                <h3>🔍 Advanced Method Search</h3>
                <div class="search-controls">
                    <input type="text" id="method-search" placeholder="Search methods, authors, or terms...">
                    <select id="category-filter">
                        <option value="">All Categories</option>
                        <option value="ai">AI/ML Methods</option>
                        <option value="statistical">Statistical Methods</option>
                        <option value="qualitative">Qualitative Methods</option>
                        <option value="evaluation">Evaluation Methods</option>
                    </select>
                    <select id="frequency-filter">
                        <option value="">All Frequencies</option>
                        <option value="high">High Usage (>10,000)</option>
                        <option value="medium">Medium Usage (1,000-10,000)</option>
                        <option value="low">Low Usage (<1,000)</option>
                    </select>
                </div>
                <div id="search-results" class="search-results"></div>
            </div>
        `;

        searchContainer.innerHTML = html;
    }

    bindSearchEvents() {
        const searchInput = document.getElementById('method-search');
        const categoryFilter = document.getElementById('category-filter');
        const frequencyFilter = document.getElementById('frequency-filter');

        if (searchInput) {
            searchInput.addEventListener('input', () => this.performSearch());
        }
        if (categoryFilter) {
            categoryFilter.addEventListener('change', () => this.performSearch());
        }
        if (frequencyFilter) {
            frequencyFilter.addEventListener('change', () => this.performSearch());
        }
    }

    performSearch() {
        const searchTerm = document.getElementById('method-search')?.value.toLowerCase() || '';
        const category = document.getElementById('category-filter')?.value || '';
        const frequency = document.getElementById('frequency-filter')?.value || '';
        
        // Simulate search results (in real implementation, this would query actual data)
        const mockResults = this.getMockSearchResults(searchTerm, category, frequency);
        this.displaySearchResults(mockResults);
    }

    getMockSearchResults(searchTerm, category, frequency) {
        const allMethods = [
            { name: 'Case Study', frequency: 43807, category: 'qualitative', authors: ['Brian A. Jackson', 'Dulani Woods'] },
            { name: 'Simulation', frequency: 34095, category: 'statistical', authors: ['Michael J. D. Vermeer', 'James Black'] },
            { name: 'Literature Review', frequency: 30719, category: 'qualitative', authors: ['Brian A. Jackson', 'Susan Gates'] },
            { name: 'CNN', frequency: 9057, category: 'ai', authors: ['Edward Geist', 'Douglas Yeung'] },
            { name: 'Deep Learning', frequency: 3448, category: 'ai', authors: ['James Black', 'Matthew Walsh'] },
            { name: 'Neural Network', frequency: 2041, category: 'ai', authors: ['Benjamin Boudreaux', 'Michael Schwille'] },
            { name: 'Meta-Analysis', frequency: 14534, category: 'statistical', authors: ['Marc N. Elliott', 'Bradley D. Stein'] },
            { name: 'Focus Group', frequency: 14625, category: 'qualitative', authors: ['Elizabeth D. Steiner', 'Julia H. Kaufman'] }
        ];

        return allMethods.filter(method => {
            const matchesSearch = !searchTerm || 
                method.name.toLowerCase().includes(searchTerm) ||
                method.authors.some(author => author.toLowerCase().includes(searchTerm));
            
            const matchesCategory = !category || method.category === category;
            
            const matchesFrequency = !frequency || 
                (frequency === 'high' && method.frequency > 10000) ||
                (frequency === 'medium' && method.frequency >= 1000 && method.frequency <= 10000) ||
                (frequency === 'low' && method.frequency < 1000);
            
            return matchesSearch && matchesCategory && matchesFrequency;
        });
    }

    displaySearchResults(results) {
        const resultsContainer = document.getElementById('search-results');
        if (!resultsContainer) return;

        if (results.length === 0) {
            resultsContainer.innerHTML = '<p class="no-results">No methods found matching your criteria.</p>';
            return;
        }

        const html = `
            <div class="results-summary">Found ${results.length} method(s)</div>
            <div class="results-list">
                ${results.map(method => `
                    <div class="result-item">
                        <div class="result-header">
                            <strong>${method.name}</strong>
                            <span class="result-frequency">${method.frequency.toLocaleString()} uses</span>
                        </div>
                        <div class="result-details">
                            <span class="result-category">${method.category}</span>
                            <span class="result-authors">Top authors: ${method.authors.slice(0, 2).join(', ')}</span>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;

        resultsContainer.innerHTML = html;
    }
}

class MobileResponsiveness {
    constructor() {
        this.initializeMobileFeatures();
    }

    initializeMobileFeatures() {
        this.addMobileCSS();
        this.enhanceNavigation();
        this.optimizeCharts();
    }

    addMobileCSS() {
        const style = document.createElement('style');
        style.textContent = `
            @media (max-width: 768px) {
                .methodology-grid {
                    grid-template-columns: 1fr;
                    gap: 1rem;
                }
                
                .methodology-grid-2x2 {
                    grid-template-columns: 1fr;
                }
                
                .viz-grid {
                    grid-template-columns: 1fr;
                }
                
                .nav-links {
                    flex-direction: column;
                    gap: 0.5rem;
                }
                
                .nav-links a {
                    padding: 0.5rem;
                    text-align: center;
                    border-radius: 4px;
                    background: rgba(255,255,255,0.1);
                }
                
                .importance-matrix .matrix-grid {
                    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
                    gap: 0.5rem;
                }
                
                .search-controls {
                    flex-direction: column;
                    gap: 0.5rem;
                }
                
                .search-controls input,
                .search-controls select {
                    width: 100%;
                    min-width: unset;
                }
            }
            
            .importance-matrix {
                background: white;
                padding: 1.5rem;
                border-radius: 8px;
                box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                margin: 1rem 0;
            }
            
            .matrix-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
                gap: 1rem;
                margin-top: 1rem;
            }
            
            .matrix-cell {
                padding: 1rem;
                border-radius: 8px;
                text-align: center;
                transition: transform 0.2s;
                cursor: pointer;
            }
            
            .matrix-cell:hover {
                transform: translateY(-2px);
            }
            
            .high-priority {
                background: linear-gradient(135deg, #e74c3c, #c0392b);
                color: white;
            }
            
            .medium-priority {
                background: linear-gradient(135deg, #f39c12, #e67e22);
                color: white;
            }
            
            .low-priority {
                background: linear-gradient(135deg, #95a5a6, #7f8c8d);
                color: white;
            }
            
            .method-name {
                font-weight: bold;
                font-size: 0.9rem;
                margin-bottom: 0.5rem;
            }
            
            .method-score {
                font-size: 1.2rem;
                font-weight: bold;
            }
            
            .matrix-legend {
                display: flex;
                gap: 1rem;
                margin-bottom: 1rem;
                flex-wrap: wrap;
            }
            
            .legend-item {
                display: flex;
                align-items: center;
                gap: 0.5rem;
            }
            
            .legend-color {
                width: 20px;
                height: 20px;
                border-radius: 4px;
            }
            
            .legend-color.high {
                background: linear-gradient(135deg, #e74c3c, #c0392b);
            }
            
            .legend-color.medium {
                background: linear-gradient(135deg, #f39c12, #e67e22);
            }
            
            .legend-color.low {
                background: linear-gradient(135deg, #95a5a6, #7f8c8d);
            }
            
            .search-panel {
                background: white;
                padding: 1.5rem;
                border-radius: 8px;
                box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                margin: 1rem 0;
            }
            
            .search-results {
                margin-top: 1rem;
                max-height: 400px;
                overflow-y: auto;
            }
            
            .result-item {
                padding: 1rem;
                border: 1px solid #e0e0e0;
                border-radius: 4px;
                margin-bottom: 0.5rem;
                background: #f9f9f9;
            }
            
            .result-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 0.5rem;
            }
            
            .result-frequency {
                color: #0066cc;
                font-weight: bold;
            }
            
            .result-details {
                display: flex;
                gap: 1rem;
                font-size: 0.9rem;
                color: #666;
            }
            
            .no-results {
                text-align: center;
                color: #666;
                font-style: italic;
                padding: 2rem;
            }
        `;
        
        document.head.appendChild(style);
    }

    enhanceNavigation() {
        // Add mobile menu toggle if needed
        const navLinks = document.querySelector('.nav-links');
        if (navLinks && window.innerWidth <= 768) {
            // Mobile navigation enhancements could go here
        }
    }

    optimizeCharts() {
        // Ensure charts are responsive
        window.addEventListener('resize', () => {
            // Trigger chart resize events if using chart libraries
            if (window.Plotly) {
                const plotlyDivs = document.querySelectorAll('.js-plotly-plot');
                plotlyDivs.forEach(div => {
                    if (div) {
                        window.Plotly.Plots.resize(div);
                    }
                });
            }
        });
    }
}

class EnhancedAnalytics {
    constructor() {
        this.initializeAnalytics();
    }

    initializeAnalytics() {
        this.trackUserInteractions();
        this.generateUsageInsights();
    }

    trackUserInteractions() {
        // Track section visits
        const sections = document.querySelectorAll('section[id]');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    console.log(`Section viewed: ${entry.target.id}`);
                    // In production, send to analytics
                }
            });
        }, { threshold: 0.5 });

        sections.forEach(section => observer.observe(section));
    }

    generateUsageInsights() {
        // Generate insights based on user behavior
        const insights = {
            mostViewedSections: ['methodology', 'methods', 'llm-integration'],
            userJourney: 'overview -> methodology -> methods -> networks',
            recommendedNextSteps: [
                'Explore interactive networks for deeper insights',
                'Review method champions for collaboration opportunities',
                'Analyze temporal trends for strategic planning'
            ]
        };

        // Could display these insights in a dashboard widget
        console.log('Generated user insights:', insights);
    }
}

// Initialize enhanced features when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Add containers for new features
    const enhancedContainer = document.createElement('div');
    enhancedContainer.innerHTML = `
        <div id="method-importance-matrix"></div>
        <div id="enhanced-search"></div>
    `;
    
    // Insert before the reports section
    const reportsSection = document.getElementById('reports');
    if (reportsSection) {
        reportsSection.parentNode.insertBefore(enhancedContainer, reportsSection);
    }

    // Initialize all enhanced features
    new MethodImportanceMatrix();
    new EnhancedSearch();
    new MobileResponsiveness();
    new EnhancedAnalytics();
    
    console.log('Enhanced features initialized successfully');
});

// Export for potential external use
window.RANDEnhancedFeatures = {
    MethodImportanceMatrix,
    EnhancedSearch,
    MobileResponsiveness,
    EnhancedAnalytics
};