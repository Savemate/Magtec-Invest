/* ===== CSS Variables ===== */
:root {
    /* Updated Seafoam Color Palette */
    --seafoam: #8DADA7;
    --leaf: #667848;
    --lime-rind: #E2E098;
    --ocean: #406270;
    --latte: #C5AA99;
    
    /* Background & Surface Colors */
    --bg-primary: #FFFEF5;
    --bg-secondary: #F5F0C5;
    --bg-light: #FFFDD0;
    
    /* Text Colors */
    --text-dark: #406270;
    --text-medium: #667848;
    --text-light: #8DADA7;
    --text-muted: #5F5B46;
    --text-gray: #A3ADAD;
    
    /* UI Colors */
    --border-color: rgba(64, 98, 112, 0.1);
    --shadow-color: rgba(64, 98, 112, 0.08);
    --primary-color: #8DADA7;
    --secondary-color: #667848;
    --accent-color: #406270;
    --warm-accent: #C5AA99;
    --bright-accent: #E2E098;
    
    /* Shadows */
    --shadow-sm: 0 2px 8px var(--shadow-color);
    --shadow-md: 0 4px 12px var(--shadow-color);
    --shadow-lg: 0 8px 24px var(--shadow-color);
    
    /* Transitions */
    --transition-fast: 0.2s ease;
    --transition-normal: 0.3s ease;
    --transition-slow: 0.5s ease;
    
    /* Border Radius */
    --radius-sm: 6px;
    --radius-md: 12px;
    --radius-lg: 20px;
    --radius-xl: 30px;
}

/* ===== Base Styles ===== */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

html {
    scroll-behavior: smooth;
    scroll-padding-top: 80px;
}

body {
    font-family: 'Poppins', sans-serif;
    background-color: var(--bg-primary);
    color: var(--text-dark);
    line-height: 1.6;
    overflow-x: hidden;
}

.container {
    width: 90%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
}

.section {
    padding: 80px 0;
}

/* ===== Typography ===== */
h1, h2, h3, h4 {
    font-family: 'Montserrat', sans-serif;
    font-weight: 700;
    line-height: 1.2;
    color: var(--accent-color);
}

h1 {
    font-size: 3rem;
    margin-bottom: 1rem;
}

h2 {
    font-size: 2.25rem;
    margin-bottom: 1rem;
}

h3 {
    font-size: 1.5rem;
    margin-bottom: 0.75rem;
    color: var(--secondary-color);
}

h4 {
    font-size: 1.25rem;
    margin-bottom: 0.5rem;
    color: var(--secondary-color);
}

p {
    margin-bottom: 1rem;
    color: var(--text-muted);
}

/* ===== Navigation ===== */
.navbar {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background: rgba(255, 254, 245, 0.98);
    backdrop-filter: blur(10px);
    z-index: 1000;
    box-shadow: var(--shadow-sm);
    border-bottom: 1px solid var(--border-color);
}

.nav-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 0;
    max-width: 1200px;
    margin: 0 auto;
    width: 90%;
}

.nav-logo {
    display: flex;
    align-items: center;
    gap: 10px;
    text-decoration: none;
}

.logo-icon {
    width: 40px;
    height: 40px;
    background: linear-gradient(135deg, var(--primary-color) 0%, var(--accent-color) 100%);
    color: var(--bg-primary);
    border-radius: var(--radius-md);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    font-weight: 700;
    font-family: 'Montserrat', sans-serif;
}

.logo-text {
    display: flex;
    flex-direction: column;
    line-height: 1;
}

.logo-main {
    font-size: 24px;
    font-weight: 700;
    color: var(--accent-color);
    letter-spacing: -0.5px;
}

.logo-sub {
    font-size: 14px;
    font-weight: 600;
    color: var(--primary-color);
    letter-spacing: 1px;
}

/* ===== Hamburger Menu ===== */
.nav-toggle {
    display: none;
    cursor: pointer;
    background: none;
    border: none;
    padding: 8px;
    z-index: 1001;
}

.bar {
    display: block;
    width: 25px;
    height: 3px;
    background: var(--accent-color);
    margin: 5px 0;
    transition: all 0.3s ease;
    border-radius: 2px;
}

.nav-toggle.active .bar:nth-child(1) {
    transform: rotate(-45deg) translate(-5px, 6px);
}

.nav-toggle.active .bar:nth-child(2) {
    opacity: 0;
}

.nav-toggle.active .bar:nth-child(3) {
    transform: rotate(45deg) translate(-5px, -6px);
}

.nav-menu {
    display: flex;
    align-items: center;
    gap: 2rem;
    list-style: none;
    margin: 0;
    padding: 0;
}

.nav-link {
    color: var(--secondary-color);
    text-decoration: none;
    font-weight: 500;
    font-size: 1rem;
    transition: var(--transition-fast);
    position: relative;
    padding: 0.5rem 0;
}

.nav-link::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px;
    background: var(--primary-color);
    transition: var(--transition-normal);
}

.nav-link:hover,
.nav-link.active {
    color: var(--accent-color);
}

.nav-link:hover::after,
.nav-link.active::after {
    width: 100%;
}

.nav-cta {
    background: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%);
    color: var(--bg-primary);
    padding: 0.75rem 1.5rem;
    border-radius: var(--radius-md);
    text-decoration: none;
    font-weight: 600;
    transition: var(--transition-normal);
    border: 2px solid transparent;
    white-space: nowrap;
}

.nav-cta:hover {
    background: transparent;
    color: var(--primary-color);
    border-color: var(--primary-color);
    transform: translateY(-2px);
}

/* ===== Mobile Navigation Styles ===== */
@media (max-width: 768px) {
    .nav-toggle {
        display: block;
    }
    
    .nav-menu {
        position: fixed;
        top: 70px;
        left: 0;
        width: 100%;
        background: var(--bg-primary);
        flex-direction: column;
        align-items: center;
        padding: 2rem;
        gap: 1.5rem;
        box-shadow: var(--shadow-lg);
        transform: translateY(-100%);
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 999;
    }
    
    .nav-menu.active {
        transform: translateY(0);
        opacity: 1;
        visibility: visible;
    }
    
    .nav-link {
        font-size: 1.1rem;
        padding: 0.75rem 0;
    }
    
    .nav-cta {
        width: 100%;
        text-align: center;
    }
}

/* ===== Hero Section ===== */
.hero {
    padding: 150px 0 80px;
    background: linear-gradient(135deg, 
        rgba(255, 254, 245, 0.9) 0%,
        rgba(141, 173, 167, 0.15) 100%);
    position: relative;
    overflow: hidden;
}

.hero-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    align-items: center;
    max-width: 1200px;
    margin: 0 auto;
    width: 90%;
}

.location-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: linear-gradient(135deg, var(--primary-color) 0%, var(--accent-color) 100%);
    color: var(--bg-primary);
    padding: 8px 20px;
    border-radius: 50px;
    font-size: 14px;
    font-weight: 500;
    margin-bottom: 2rem;
}

.hero-title {
    margin-bottom: 1.5rem;
}

.title-line {
    display: block;
}

.hero-subtitle {
    font-size: 1.2rem;
    margin-bottom: 2.5rem;
    max-width: 500px;
    color: var(--secondary-color);
}

.hero-actions {
    display: flex;
    gap: 1rem;
    margin-bottom: 3rem;
}

.btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    padding: 1rem 2rem;
    border-radius: var(--radius-md);
    font-weight: 600;
    text-decoration: none;
    border: none;
    cursor: pointer;
    transition: var(--transition-normal);
    font-size: 1rem;
}

.btn-dark {
    background: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%);
    color: var(--bg-primary);
    border: 2px solid transparent;
}

.btn-dark:hover {
    background: transparent;
    color: var(--primary-color);
    border-color: var(--primary-color);
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
}

.btn-outline {
    background: transparent;
    color: var(--primary-color);
    border: 2px solid var(--primary-color);
}

.btn-outline:hover {
    background: var(--primary-color);
    color: var(--bg-primary);
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
}

.hero-visual {
    position: relative;
    height: 400px;
}

.design-showcase {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 300px;
    height: 300px;
}

.design-element {
    border-radius: var(--radius-lg);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: var(--bg-primary);
    font-size: 1.5rem;
    gap: 10px;
    transition: var(--transition-normal);
    box-shadow: var(--shadow-md);
}

.design-element:hover {
    transform: translateY(-5px);
    box-shadow: var(--shadow-lg);
}

.design-element span {
    font-size: 14px;
    font-weight: 500;
}

.color-palette {
    display: flex;
    gap: 10px;
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
}

.color-chip {
    width: 40px;
    height: 40px;
    border-radius: var(--radius-md);
    transition: var(--transition-normal);
    box-shadow: var(--shadow-sm);
}

.color-chip:hover {
    transform: scale(1.1);
    box-shadow: var(--shadow-md);
}

/* Apply new seafoam colors to design elements and color chips */
.design-element:nth-child(1) { background: var(--seafoam); }
.design-element:nth-child(2) { background: var(--leaf); }
.design-element:nth-child(3) { background: var(--ocean); }
.design-element:nth-child(4) { background: var(--latte); }

.color-chip:nth-child(1) { background: var(--seafoam); }
.color-chip:nth-child(2) { background: var(--leaf); }
.color-chip:nth-child(3) { background: var(--lime-rind); }
.color-chip:nth-child(4) { background: var(--ocean); }
.color-chip:nth-child(5) { background: var(--latte); }

.scroll-down {
    position: absolute;
    bottom: 30px;
    left: 50%;
    transform: translateX(-50%);
}

.mouse {
    width: 30px;
    height: 50px;
    border: 2px solid var(--primary-color);
    border-radius: 15px;
    position: relative;
}

.wheel {
    width: 4px;
    height: 10px;
    background: var(--primary-color);
    border-radius: 2px;
    position: absolute;
    top: 10px;
    left: 50%;
    transform: translateX(-50%);
    animation: scroll 2s infinite;
}

@keyframes scroll {
    0% {
        opacity: 1;
        transform: translateX(-50%) translateY(0);
    }
    100% {
        opacity: 0;
        transform: translateX(-50%) translateY(20px);
    }
}

/* ===== Section Header ===== */
.section-header {
    text-align: center;
    margin-bottom: 3rem;
    max-width: 800px;
    margin-left: auto;
    margin-right: auto;
}

.section-title {
    position: relative;
    margin-bottom: 1rem;
}

.title-label {
    display: block;
    font-size: 1rem;
    font-weight: 600;
    color: var(--primary-color);
    text-transform: uppercase;
    letter-spacing: 2px;
    margin-bottom: 0.5rem;
}

.section-subtitle {
    font-size: 1.1rem;
    color: var(--secondary-color);
    max-width: 600px;
    margin: 0 auto;
}

/* ===== About Section ===== */
.about-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    align-items: center;
}

.about-text {
    display: flex;
    flex-direction: column;
    gap: 2rem;
}

.quote-box {
    background: linear-gradient(135deg, rgba(141, 173, 167, 0.05) 0%, rgba(226, 224, 152, 0.05) 100%);
    padding: 2rem;
    border-radius: var(--radius-lg);
    border-left: 4px solid var(--primary-color);
    position: relative;
    box-shadow: var(--shadow-sm);
}

.quote-box i {
    position: absolute;
    top: 1rem;
    left: 1rem;
    font-size: 2rem;
    color: rgba(141, 173, 167, 0.2);
}

.quote-box p {
    font-size: 1.2rem;
    font-weight: 500;
    color: var(--accent-color);
    position: relative;
    z-index: 1;
    font-style: italic;
}

.features-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.5rem;
}

.feature {
    padding: 1.5rem;
    background: var(--bg-primary);
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-md);
    border: 1px solid var(--border-color);
    transition: var(--transition-normal);
}

.feature:hover {
    transform: translateY(-5px);
    box-shadow: var(--shadow-lg);
    border-color: var(--primary-color);
}

.feature-icon {
    width: 50px;
    height: 50px;
    background: linear-gradient(135deg, var(--primary-color) 0%, var(--accent-color) 100%);
    color: var(--bg-primary);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1rem;
    font-size: 1.5rem;
}

.about-image {
    position: relative;
}

.image-frame {
    position: relative;
    border-radius: var(--radius-xl);
    overflow: hidden;
    box-shadow: var(--shadow-lg);
    background: linear-gradient(135deg, var(--lime-rind) 0%, var(--latte) 100%);
    height: 400px;
    border: 1px solid var(--border-color);
}

.grid-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: 
        linear-gradient(rgba(141, 173, 167, 0.1) 1px, transparent 1px),
        linear-gradient(90deg, rgba(141, 173, 167, 0.1) 1px, transparent 1px);
    background-size: 20px 20px;
}

.image-content {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 2rem;
    background: linear-gradient(transparent, rgba(64, 98, 112, 0.9));
    color: var(--bg-primary);
}

.image-content h3 {
    color: var(--bg-primary);
    margin-bottom: 0.5rem;
}

.image-content p {
    color: rgba(255, 255, 255, 0.8);
    margin: 0;
}

/* ===== Services Section ===== */
.services {
    background: linear-gradient(135deg, 
        rgba(141, 173, 167, 0.08) 0%,
        rgba(255, 254, 245, 0.8) 100%);
}

.services-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 2rem;
}

.service-card {
    background: var(--bg-primary);
    border-radius: var(--radius-lg);
    padding: 2rem;
    box-shadow: var(--shadow-md);
    border: 1px solid var(--border-color);
    transition: var(--transition-normal);
}

.service-card:hover {
    transform: translateY(-10px);
    box-shadow: var(--shadow-lg);
    border-color: var(--primary-color);
}

.service-icon {
    width: 60px;
    height: 60px;
    background: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%);
    color: var(--bg-primary);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1.5rem;
    font-size: 1.5rem;
}

.service-card h3 {
    margin-bottom: 1rem;
    font-size: 1.25rem;
}

.service-card > p {
    color: var(--secondary-color);
    margin-bottom: 1.5rem;
}

.service-features {
    list-style: none;
    margin: 1.5rem 0;
}

.service-features li {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 0.5rem;
    color: var(--secondary-color);
    font-size: 0.95rem;
}

.service-features i {
    color: var(--primary-color);
    font-size: 0.8rem;
}

/* ===== Savemate Section ===== */
.savemate-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    align-items: center;
}

.savemate-info h3 {
    margin-bottom: 1rem;
}

.savemate-info > p {
    margin-bottom: 2rem;
    color: var(--secondary-color);
}

.savemate-features {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    margin-bottom: 2rem;
}

.feature-card {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
    padding: 1rem;
    background: rgba(141, 173, 167, 0.05);
    border-radius: var(--radius-md);
    border-left: 3px solid var(--primary-color);
}

.feature-card i {
    font-size: 1.5rem;
    color: var(--primary-color);
    margin-top: 0.25rem;
}

.feature-card h4 {
    margin-bottom: 0.25rem;
}

.feature-card p {
    color: var(--secondary-color);
    margin: 0;
    font-size: 0.95rem;
}

.savemate-visual {
    position: relative;
}

.app-preview {
    position: relative;
    height: 400px;
}

.app-screen {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 280px;
    background: var(--bg-primary);
    border-radius: var(--radius-lg);
    padding: 1.5rem;
    box-shadow: var(--shadow-lg);
    border: 1px solid var(--border-color);
}

.app-header {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 1.5rem;
}

.app-logo {
    width: 40px;
    height: 40px;
    background: linear-gradient(135deg, var(--primary-color) 0%, var(--accent-color) 100%);
    color: var(--bg-primary);
    border-radius: var(--radius-md);
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    font-size: 1.5rem;
}

.app-title {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--accent-color);
}

.app-content {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.deal-item {
    padding: 1rem;
    background: rgba(141, 173, 167, 0.08);
    border-radius: var(--radius-md);
    border-left: 3px solid var(--primary-color);
    transition: var(--transition-fast);
}

.deal-item:hover {
    background: rgba(141, 173, 167, 0.12);
    transform: translateX(5px);
}

.store-name {
    font-weight: 600;
    color: var(--accent-color);
    margin-bottom: 5px;
    font-size: 0.95rem;
}

.deal-info {
    font-size: 0.9rem;
    color: var(--secondary-color);
}

/* ===== Resume Builder Section ===== */
.resume-builder {
    background: linear-gradient(135deg, 
        rgba(255, 254, 245, 0.9) 0%,
        rgba(141, 173, 167, 0.15) 100%);
}

.resume-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    margin-top: 2rem;
}

.resume-form-container {
    background: var(--bg-primary);
    border-radius: var(--radius-lg);
    padding: 2rem;
    box-shadow: var(--shadow-lg);
    border: 1px solid var(--border-color);
}

.resume-form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
}

.form-section {
    display: none;
    animation: fadeIn 0.5s ease;
}

.form-section.active {
    display: block;
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.form-section h3 {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 1.5rem;
    padding-bottom: 1rem;
    border-bottom: 2px solid rgba(141, 173, 167, 0.2);
    color: var(--accent-color);
}

.form-section h3 i {
    color: var(--primary-color);
}

.form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    margin-bottom: 1rem;
}

@media (max-width: 768px) {
    .form-row {
        grid-template-columns: 1fr;
    }
}

.resume-form .form-group {
    position: relative;
    margin-bottom: 1.5rem;
}

.resume-form .form-group input,
.resume-form .form-group textarea,
.resume-form .form-group select {
    width: 100%;
    padding: 1rem 0;
    border: none;
    border-bottom: 2px solid rgba(141, 173, 167, 0.3);
    background: transparent;
    font-family: 'Poppins', sans-serif;
    font-size: 1rem;
    color: var(--accent-color);
    transition: var(--transition-fast);
}

.resume-form .form-group textarea {
    resize: vertical;
    min-height: 80px;
}

.resume-form .form-group label {
    position: absolute;
    top: 1rem;
    left: 0;
    color: var(--primary-color);
    pointer-events: none;
    transition: var(--transition-fast);
    font-size: 0.95rem;
}

.resume-form .form-group small {
    display: block;
    margin-top: 0.5rem;
    color: var(--primary-color);
    font-size: 0.85rem;
}

.resume-form .form-group input:focus,
.resume-form .form-group textarea:focus,
.resume-form .form-group select:focus {
    outline: none;
    border-bottom-color: var(--primary-color);
}

.resume-form .form-group input:focus + label,
.resume-form .form-group textarea:focus + label,
.resume-form .form-group select:focus + label,
.resume-form .form-group input:not(:placeholder-shown) + label,
.resume-form .form-group textarea:not(:placeholder-shown) + label,
.resume-form .form-group select:not([value=""]) + label {
    top: -0.5rem;
    font-size: 0.85rem;
    color: var(--primary-color);
}

.form-actions {
    display: flex;
    justify-content: space-between;
    margin-top: 2rem;
    padding-top: 1.5rem;
    border-top: 2px solid rgba(141, 173, 167, 0.2);
}

.entry-item {
    background: rgba(141, 173, 167, 0.08);
    border-radius: var(--radius-md);
    padding: 1.5rem;
    margin-bottom: 1rem;
    border: 1px solid var(--border-color);
    position: relative;
    transition: var(--transition-fast);
}

.entry-item:hover {
    border-color: var(--primary-color);
}

.entry-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 1rem;
}

.entry-title {
    font-weight: 600;
    color: var(--accent-color);
    font-size: 1.1rem;
}

.remove-entry {
    background: rgba(141, 173, 167, 0.2);
    border: none;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--secondary-color);
    cursor: pointer;
    transition: var(--transition-fast);
}

.remove-entry:hover {
    background: rgba(141, 173, 167, 0.3);
    color: var(--accent-color);
}

/* Resume Preview Styles */
.resume-preview-container {
    background: var(--bg-primary);
    border-radius: var(--radius-lg);
    overflow: hidden;
    box-shadow: var(--shadow-lg);
    border: 1px solid var(--border-color);
    display: flex;
    flex-direction: column;
    max-height: 800px;
}

.preview-header {
    background: linear-gradient(135deg, var(--primary-color) 0%, var(--accent-color) 100%);
    color: var(--bg-primary);
    padding: 1.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.preview-header h3 {
    color: var(--bg-primary);
    margin: 0;
    display: flex;
    align-items: center;
    gap: 10px;
}

.resume-preview {
    flex: 1;
    padding: 2rem;
    overflow-y: auto;
    background: #ffffff;
}

.preview-placeholder {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    text-align: center;
    color: var(--secondary-color);
}

.preview-placeholder i {
    font-size: 4rem;
    margin-bottom: 1rem;
    color: var(--primary-color);
}

.preview-placeholder p {
    font-size: 1.1rem;
    margin-bottom: 0.5rem;
}

.placeholder-sub {
    font-size: 0.9rem;
    color: var(--primary-color);
}

/* Resume Template Styles */
.resume-template {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    color: var(--accent-color);
    max-width: 800px;
    margin: 0 auto;
}

.resume-header {
    padding-bottom: 1.5rem;
    margin-bottom: 1.5rem;
    border-bottom: 3px solid var(--primary-color);
}

.resume-name {
    font-size: 2.5rem;
    font-weight: 700;
    color: var(--accent-color);
    margin-bottom: 0.5rem;
}

.resume-title {
    font-size: 1.2rem;
    color: var(--secondary-color);
    margin-bottom: 1rem;
    font-weight: 500;
}

.resume-contact {
    display: flex;
    flex-wrap: wrap;
    gap: 1.5rem;
    margin-bottom: 1rem;
}

.contact-item {
    display: flex;
    align-items: center;
    gap: 8px;
    color: var(--secondary-color);
    font-size: 0.95rem;
}

.contact-item i {
    color: var(--primary-color);
    width: 16px;
}

.resume-section {
    margin-bottom: 2rem;
}

.section-title {
    font-size: 1.3rem;
    font-weight: 700;
    color: var(--accent-color);
    padding-bottom: 0.5rem;
    margin-bottom: 1rem;
    border-bottom: 2px solid rgba(141, 173, 167, 0.2);
    display: flex;
    align-items: center;
    gap: 10px;
}

.section-title i {
    font-size: 1rem;
    color: var(--primary-color);
}

.work-item, .education-item {
    margin-bottom: 1.5rem;
}

.item-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 0.5rem;
}

.job-title, .degree-title {
    font-size: 1.1rem;
    font-weight: 600;
    color: var(--accent-color);
}

.company-name, .school-name {
    font-size: 1rem;
    color: var(--secondary-color);
    margin-bottom: 0.5rem;
}

.dates {
    font-size: 0.9rem;
    color: var(--primary-color);
    font-weight: 500;
}

.job-description, .education-details {
    font-size: 0.95rem;
    color: var(--secondary-color);
    line-height: 1.5;
}

.skills-list {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-top: 0.5rem;
}

.skill-tag {
    background: rgba(141, 173, 167, 0.15);
    color: var(--accent-color);
    padding: 0.4rem 1rem;
    border-radius: 20px;
    font-size: 0.9rem;
    font-weight: 500;
    border: 1px solid rgba(141, 173, 167, 0.3);
    transition: var(--transition-fast);
}

.skill-tag:hover {
    background: rgba(141, 173, 167, 0.25);
}

/* Progress Indicator */
.progress-indicator {
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin: 2rem 0;
}

.progress-step {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: rgba(141, 173, 167, 0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    color: var(--secondary-color);
    transition: var(--transition-normal);
    position: relative;
}

.progress-step.active {
    background: var(--primary-color);
    color: var(--bg-primary);
}

.progress-step.completed {
    background: var(--secondary-color);
    color: var(--bg-primary);
}

.progress-step::after {
    content: '';
    position: absolute;
    width: 30px;
    height: 3px;
    background: rgba(141, 173, 167, 0.2);
    right: -30px;
    top: 50%;
    transform: translateY(-50%);
}

.progress-step:last-child::after {
    display: none;
}

/* Fade out animation for removing entries */
@keyframes fadeOut {
    from {
        opacity: 1;
        transform: translateY(0);
    }
    to {
        opacity: 0;
        transform: translateY(-10px);
    }
}

/* ===== Contact Section ===== */
.contact-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
}

.contact-info {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

.info-card {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
    padding: 1.5rem;
    background: var(--bg-primary);
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-md);
    border: 1px solid var(--border-color);
    transition: var(--transition-normal);
}

.info-card:hover {
    transform: translateY(-5px);
    box-shadow: var(--shadow-lg);
    border-color: var(--primary-color);
}

.info-icon {
    width: 50px;
    height: 50px;
    background: linear-gradient(135deg, var(--primary-color) 0%, var(--accent-color) 100%);
    color: var(--bg-primary);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.25rem;
    flex-shrink: 0;
}

.info-content h3 {
    margin-bottom: 0.5rem;
    font-size: 1.1rem;
    color: var(--accent-color);
}

.contact-link {
    color: var(--primary-color);
    text-decoration: none;
    font-weight: 600;
    font-size: 1rem;
    transition: var(--transition-fast);
}

.contact-link:hover {
    color: var(--secondary-color);
    text-decoration: underline;
}

.info-content p {
    color: var(--secondary-color);
    margin: 0.25rem 0 0 0;
    font-size: 0.9rem;
}

.contact-form {
    background: var(--bg-primary);
    border-radius: var(--radius-lg);
    padding: 2rem;
    box-shadow: var(--shadow-lg);
    border: 1px solid var(--border-color);
}

.contact-form h3 {
    margin-bottom: 0.5rem;
    color: var(--accent-color);
}

.contact-form > p {
    color: var(--secondary-color);
    margin-bottom: 2rem;
    font-size: 0.95rem;
}

.form-group {
    position: relative;
    margin-bottom: 1.5rem;
}

.form-group input,
.form-group textarea,
.form-group select {
    width: 100%;
    padding: 1rem 0;
    border: none;
    border-bottom: 2px solid rgba(141, 173, 167, 0.3);
    background: transparent;
    font-family: 'Poppins', sans-serif;
    font-size: 1rem;
    color: var(--accent-color);
    transition: var(--transition-fast);
}

.form-group textarea {
    resize: vertical;
    min-height: 100px;
}

.form-group select {
    appearance: none;
    cursor: pointer;
    background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%238DADA7' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
    background-repeat: no-repeat;
    background-position: right 0.7rem top 50%;
    background-size: 1rem auto;
    padding-right: 2rem;
}

.form-group label {
    position: absolute;
    top: 1rem;
    left: 0;
    color: var(--primary-color);
    pointer-events: none;
    transition: var(--transition-fast);
    font-size: 0.95rem;
}

.form-group input:focus,
.form-group textarea:focus,
.form-group select:focus {
    outline: none;
    border-bottom-color: var(--primary-color);
}

.form-group input:focus + label,
.form-group textarea:focus + label,
.form-group select:focus + label,
.form-group input:not(:placeholder-shown) + label,
.form-group textarea:not(:placeholder-shown) + label,
.form-group select:not([value=""]) + label {
    top: -0.5rem;
    font-size: 0.85rem;
    color: var(--primary-color);
}

.contact-form button[type="submit"] {
    width: 100%;
    margin-top: 1rem;
    background: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%);
    color: var(--bg-primary);
    border: 2px solid transparent;
}

.contact-form button[type="submit"]:hover {
    background: transparent;
    color: var(--primary-color);
    border-color: var(--primary-color);
}

/* ===== Footer ===== */
.footer {
    background: linear-gradient(135deg, var(--accent-color) 0%, var(--secondary-color) 100%);
    color: var(--bg-primary);
    padding: 3rem 0 1.5rem;
}

.footer-content {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 3rem;
    margin-bottom: 2rem;
}

.footer-brand {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.footer-tagline {
    font-size: 1rem;
    color: rgba(255, 253, 208, 0.9);
    font-weight: 300;
}

.footer-contact p {
    color: rgba(255, 253, 208, 0.8);
    margin: 0.5rem 0;
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 0.9rem;
}

.footer-contact i {
    color: var(--lime-rind);
    font-size: 0.9rem;
}

.footer-links {
    display: grid;
    grid-template-columns: 1fr 40px 1fr;
    gap: 1rem;
}

.link-group {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
}

.link-group h4 {
    color: var(--bg-primary);
    margin-bottom: 1rem;
    font-size: 1rem;
}

.link-group a {
    color: rgba(255, 253, 208, 0.8);
    text-decoration: none;
    transition: var(--transition-fast);
    font-size: 0.9rem;
}

.link-group a:hover {
    color: var(--lime-rind);
}

.link-group-spacer {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.link-group-spacer::after {
    content: '';
    width: 1px;
    height: 80%;
    background: rgba(255, 253, 208, 0.3);
}

.footer-bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 1.5rem;
    border-top: 1px solid rgba(255, 253, 208, 0.2);
}

.copyright p {
    color: rgba(255, 253, 208, 0.6);
    margin: 0.25rem 0;
    font-size: 0.85rem;
}

.footer-social {
    display: flex;
    gap: 1rem;
}

.social-link {
    width: 40px;
    height: 40px;
    background: rgba(255, 253, 208, 0.15);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--bg-primary);
    font-size: 1.2rem;
    transition: var(--transition-normal);
    text-decoration: none;
}

.social-link:hover {
    background: var(--lime-rind);
    color: var(--accent-color);
    transform: translateY(-2px);
}

/* ===== Cookies Popup ===== */
.cookies-popup {
    position: fixed;
    bottom: 20px;
    left: 20px;
    right: 20px;
    max-width: 400px;
    background: var(--bg-primary);
    border-radius: var(--radius-lg);
    padding: 1.5rem;
    box-shadow: var(--shadow-lg);
    border: 1px solid var(--border-color);
    z-index: 9999;
    transform: translateY(100%);
    opacity: 0;
    transition: transform 0.5s ease, opacity 0.5s ease;
}

.cookies-popup.show {
    transform: translateY(0);
    opacity: 1;
}

.cookies-content {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

.cookies-text h3 {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 0.5rem;
    color: var(--accent-color);
}

.cookies-text h3 i {
    color: var(--primary-color);
}

.cookies-text p {
    color: var(--secondary-color);
    font-size: 0.95rem;
    margin-bottom: 1rem;
}

.cookies-links {
    display: flex;
    gap: 1rem;
}

.cookies-links a {
    color: var(--primary-color);
    text-decoration: none;
    font-size: 0.9rem;
    font-weight: 500;
    transition: var(--transition-fast);
}

.cookies-links a:hover {
    color: var(--secondary-color);
    text-decoration: underline;
}

.cookies-buttons {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
}

.cookies-buttons .btn {
    flex: 1;
    min-width: 120px;
    padding: 0.75rem 1rem;
    font-size: 0.9rem;
}

/* ===== Return to Top Button ===== */
.return-to-top {
    position: fixed;
    bottom: 80px;
    right: 20px;
    width: 50px;
    height: 50px;
    background: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%);
    color: var(--bg-primary);
    border-radius: 50%;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
    opacity: 0;
    visibility: hidden;
    transform: translateY(20px);
    transition: all var(--transition-normal);
    z-index: 999;
    box-shadow: var(--shadow-md);
}

.return-to-top.show {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
}

.return-to-top:hover {
    background: transparent;
    color: var(--primary-color);
    border: 2px solid var(--primary-color);
    transform: translateY(-5px);
}

/* ===== Resume CTA Section ===== */
.resume-cta {
    background: linear-gradient(135deg, 
        var(--accent-color) 0%,
        var(--secondary-color) 100%);
    color: var(--bg-primary);
    text-align: center;
}

.resume-cta .section-title,
.resume-cta .section-subtitle {
    color: var(--bg-primary);
}

.resume-cta .title-label {
    color: var(--lime-rind);
}

.resume-cta-content {
    max-width: 900px;
    margin: 0 auto;
}

.resume-features {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 2rem;
    margin: 3rem 0;
}

.resume-features .feature {
    background: rgba(255, 253, 208, 0.15);
    padding: 2rem;
    border-radius: var(--radius-lg);
    border: 1px solid rgba(255, 253, 208, 0.3);
    transition: var(--transition-normal);
}

.resume-features .feature:hover {
    transform: translateY(-5px);
    background: rgba(255, 253, 208, 0.2);
    border-color: var(--lime-rind);
}

.resume-features .feature-icon {
    width: 60px;
    height: 60px;
    background: var(--lime-rind);
    color: var(--accent-color);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 1rem;
    font-size: 1.5rem;
}

.resume-features h3 {
    color: var(--bg-primary);
    margin-bottom: 0.5rem;
}

.resume-features p {
    color: rgba(255, 253, 208, 0.9);
    margin: 0;
    font-size: 0.95rem;
}

.resume-cta-action {
    margin-top: 3rem;
}

.btn-large {
    padding: 1.25rem 3rem;
    font-size: 1.1rem;
}

.cta-note {
    margin-top: 1rem;
    color: rgba(255, 253, 208, 0.8);
    font-size: 0.9rem;
}

/* ===== Resume Builder Page Specific Styles ===== */
.resume-page .navbar {
    background: var(--bg-primary);
}

.resume-builder-section {
    padding-top: 120px;
}

.resume-tips {
    margin-top: 4rem;
    padding: 2rem;
    background: linear-gradient(135deg, rgba(141, 173, 167, 0.08) 0%, rgba(226, 224, 152, 0.08) 100%);
    border-radius: var(--radius-lg);
    border: 1px solid var(--border-color);
}

.resume-tips h3 {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 1.5rem;
    color: var(--accent-color);
}

.resume-tips h3 i {
    color: var(--primary-color);
}

.tips-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1.5rem;
}

.tip {
    padding: 1.5rem;
    background: var(--bg-primary);
    border-radius: var(--radius-md);
    border: 1px solid var(--border-color);
    transition: var(--transition-fast);
}

.tip:hover {
    border-color: var(--primary-color);
    transform: translateY(-3px);
}

.tip h4 {
    color: var(--accent-color);
    margin-bottom: 0.5rem;
}

.tip p {
    color: var(--secondary-color);
    margin: 0;
    font-size: 0.95rem;
}

/* Fix for resume preview PDF generation */
.resume-template {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    color: var(--accent-color);
    max-width: 800px;
    margin: 0 auto;
    background: white;
    padding: 40px;
    box-sizing: border-box;
}

/* Ensure PDF generation works properly */
#resumeContent {
    width: 100%;
    height: auto;
    background: white;
}

/* Fix for form navigation */
.logo-link {
    text-decoration: none;
    display: flex;
    align-items: center;
    gap: 10px;
}

/* ===== Template Selection Styles ===== */
.template-selection {
    margin: 2rem 0 3rem;
    padding: 2rem;
    background: linear-gradient(135deg, rgba(141, 173, 167, 0.08) 0%, rgba(197, 170, 153, 0.08) 100%);
    border-radius: var(--radius-lg);
    border: 1px solid var(--border-color);
}

.template-selection h3 {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 1.5rem;
    color: var(--accent-color);
}

.template-selection h3 i {
    color: var(--primary-color);
}

.template-options {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
}

.template-option {
    background: var(--bg-primary);
    border-radius: var(--radius-md);
    overflow: hidden;
    border: 2px solid transparent;
    transition: var(--transition-normal);
    cursor: pointer;
}

.template-option:hover {
    transform: translateY(-5px);
    box-shadow: var(--shadow-lg);
}

.template-option.active {
    border-color: var(--primary-color);
    box-shadow: var(--shadow-md);
}

.template-preview {
    height: 180px;
    background: #f8f9fa;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1.5rem;
}

.template-sample {
    width: 100%;
    height: 100%;
    border-radius: 4px;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.modern-template .sample-header {
    background: linear-gradient(135deg, var(--primary-color) 0%, var(--accent-color) 100%);
    color: white;
    padding: 10px;
    height: 30px;
}

.classic-template .sample-header {
    background: var(--secondary-color);
    color: white;
    padding: 10px;
    height: 30px;
}

.executive-template .sample-header {
    background: var(--accent-color);
    color: white;
    padding: 10px;
    height: 30px;
}

.sample-content {
    padding: 15px;
    background: white;
}

.sample-line {
    height: 8px;
    background: #e0e0e0;
    margin: 8px 0;
    border-radius: 4px;
}

.sample-line.short {
    width: 70%;
}

.template-info {
    padding: 1.5rem;
}

.template-info h4 {
    margin-bottom: 0.5rem;
    color: var(--accent-color);
}

.template-info p {
    color: var(--secondary-color);
    margin: 0;
    font-size: 0.95rem;
}

/* Preview Header with Template Name */
.preview-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: linear-gradient(135deg, var(--primary-color) 0%, var(--accent-color) 100%);
    color: var(--bg-primary);
    padding: 1.5rem;
}

.preview-title {
    display: flex;
    flex-direction: column;
    gap: 5px;
}

.preview-title h3 {
    color: var(--bg-primary);
    margin: 0;
    display: flex;
    align-items: center;
    gap: 10px;
}

.selected-template {
    font-size: 0.9rem;
    color: rgba(255, 253, 208, 0.9);
    display: flex;
    align-items: center;
    gap: 5px;
}

#currentTemplateName {
    font-weight: 600;
    color: var(--lime-rind);
}

/* Resume Template Styles */
.resume-template {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    color: var(--accent-color);
    max-width: 800px;
    margin: 0 auto;
    background: white;
    padding: 40px;
    box-sizing: border-box;
    min-height: 297mm; /* A4 height */
    box-shadow: 0 0 20px rgba(0,0,0,0.1);
}

/* Modern Template */
.resume-template.modern {
    font-family: 'Open Sans', sans-serif;
}

.resume-template.modern .resume-header {
    text-align: center;
    padding-bottom: 2rem;
    margin-bottom: 2rem;
    border-bottom: 3px solid var(--primary-color);
}

.resume-template.modern .resume-name {
    font-size: 2.8rem;
    font-weight: 700;
    color: var(--accent-color);
    margin-bottom: 0.5rem;
    letter-spacing: -0.5px;
}

.resume-template.modern .resume-title {
    font-size: 1.4rem;
    color: var(--secondary-color);
    margin-bottom: 1.5rem;
    font-weight: 500;
}

.resume-template.modern .resume-contact {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 1.5rem;
    margin-bottom: 1rem;
}

.resume-template.modern .section-title {
    font-size: 1.4rem;
    font-weight: 700;
    color: var(--accent-color);
    padding-bottom: 0.5rem;
    margin-bottom: 1.5rem;
    border-bottom: 2px solid var(--primary-color);
    position: relative;
}

.resume-template.modern .section-title::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 60px;
    height: 2px;
    background: var(--primary-color);
}

.resume-template.modern .work-item,
.resume-template.modern .education-item {
    margin-bottom: 1.8rem;
    padding-left: 1rem;
    border-left: 2px solid rgba(141, 173, 167, 0.3);
}

.resume-template.modern .skill-tag {
    background: rgba(141, 173, 167, 0.15);
    color: var(--accent-color);
    padding: 0.5rem 1rem;
    border-radius: 20px;
    font-size: 0.9rem;
    font-weight: 500;
    border: 1px solid rgba(141, 173, 167, 0.3);
    display: inline-block;
    margin: 0.3rem;
}

/* Classic Template */
.resume-template.classic {
    font-family: 'Roboto', sans-serif;
}

.resume-template.classic .resume-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 1.5rem;
    margin-bottom: 2rem;
    border-bottom: 2px solid var(--secondary-color);
}

.resume-template.classic .resume-name {
    font-size: 2.5rem;
    font-weight: 700;
    color: var(--secondary-color);
    margin-bottom: 0.5rem;
}

.resume-template.classic .resume-title {
    font-size: 1.3rem;
    color: var(--secondary-color);
    font-weight: 500;
}

.resume-template.classic .resume-contact {
    text-align: right;
}

.resume-template.classic .contact-item {
    margin-bottom: 0.5rem;
    font-size: 0.95rem;
    color: var(--secondary-color);
}

.resume-template.classic .section-title {
    font-size: 1.3rem;
    font-weight: 700;
    color: var(--secondary-color);
    padding-bottom: 0.5rem;
    margin-bottom: 1.5rem;
    border-bottom: 1px solid rgba(102, 120, 72, 0.3);
    text-transform: uppercase;
    letter-spacing: 1px;
}

.resume-template.classic .item-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.5rem;
}

.resume-template.classic .job-title,
.resume-template.classic .degree-title {
    font-size: 1.1rem;
    font-weight: 600;
    color: var(--secondary-color);
}

.resume-template.classic .dates {
    font-size: 0.9rem;
    color: var(--primary-color);
    font-weight: 500;
    background: rgba(141, 173, 167, 0.15);
    padding: 0.3rem 0.8rem;
    border-radius: 3px;
}

.resume-template.classic .skill-tag {
    background: rgba(141, 173, 167, 0.15);
    color: var(--secondary-color);
    padding: 0.4rem 1rem;
    border-radius: 3px;
    font-size: 0.9rem;
    font-weight: 500;
    border: 1px solid rgba(141, 173, 167, 0.3);
    display: inline-block;
    margin: 0.2rem;
}

/* Executive Template */
.resume-template.executive {
    font-family: 'Montserrat', sans-serif;
    background: #f8f9fa;
}

.resume-template.executive .resume-header {
    background: var(--accent-color);
    color: white;
    padding: 2.5rem;
    margin: -40px -40px 2rem -40px;
}

.resume-template.executive .resume-name {
    font-size: 3rem;
    font-weight: 700;
    color: white;
    margin-bottom: 0.5rem;
    letter-spacing: -0.5px;
}

.resume-template.executive .resume-title {
    font-size: 1.5rem;
    color: rgba(255, 255, 255, 0.9);
    margin-bottom: 1.5rem;
    font-weight: 400;
}

.resume-template.executive .resume-contact {
    display: flex;
    flex-wrap: wrap;
    gap: 1.5rem;
}

.resume-template.executive .contact-item {
    color: rgba(255, 255, 255, 0.9);
    font-size: 0.95rem;
}

.resume-template.executive .resume-content {
    padding: 0 2rem;
}

.resume-template.executive .section-title {
    font-size: 1.4rem;
    font-weight: 700;
    color: var(--accent-color);
    padding-bottom: 0.5rem;
    margin-bottom: 1.5rem;
    position: relative;
    padding-left: 1.5rem;
}

.resume-template.executive .section-title::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 4px;
    background: var(--accent-color);
}

.resume-template.executive .work-item,
.resume-template.executive .education-item {
    margin-bottom: 2rem;
    padding: 1.5rem;
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    border-left: 4px solid var(--accent-color);
}

.resume-template.executive .skill-tag {
    background: var(--accent-color);
    color: white;
    padding: 0.5rem 1.2rem;
    border-radius: 4px;
    font-size: 0.9rem;
    font-weight: 500;
    display: inline-block;
    margin: 0.3rem;
    border: none;
}

/* Common template styles */
.resume-contact {
    display: flex;
    flex-wrap: wrap;
    gap: 1.5rem;
    margin-bottom: 1rem;
}

.contact-item {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 0.95rem;
}

.contact-item i {
    width: 16px;
    text-align: center;
    color: var(--primary-color);
}

.resume-section {
    margin-bottom: 2rem;
}

.work-item, .education-item {
    margin-bottom: 1.5rem;
}

.item-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 0.5rem;
}

.job-title, .degree-title {
    font-size: 1.1rem;
    font-weight: 600;
}

.company-name, .school-name {
    font-size: 1rem;
    margin-bottom: 0.5rem;
}

.dates {
    font-size: 0.9rem;
    font-weight: 500;
}

.job-description, .education-details {
    font-size: 0.95rem;
    line-height: 1.5;
}

.skills-list {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-top: 0.5rem;
}

/* ===== Responsive Design ===== */
@media (max-width: 1024px) {
    .hero-container,
    .about-content,
    .savemate-content,
    .contact-container,
    .resume-container {
        grid-template-columns: 1fr;
        gap: 3rem;
    }
    
    .footer-content {
        grid-template-columns: 1fr;
        gap: 2rem;
    }
    
    .footer-links {
        grid-template-columns: 1fr 30px 1fr;
    }
    
    .hero {
        padding: 140px 0 60px;
    }
    
    .hero-visual {
        height: 300px;
        order: -1;
    }
    
    .resume-preview-container {
        order: -1;
    }
}

@media (max-width: 768px) {
    .footer-links {
        grid-template-columns: 1fr;
        gap: 2rem;
    }
    
    .link-group-spacer {
        display: none;
    }
    
    .footer-bottom {
        flex-direction: column;
        gap: 1rem;
        text-align: center;
    }
    
    .cookies-popup {
        left: 20px;
        right: 20px;
        max-width: none;
    }
    
    .cookies-buttons {
        flex-direction: column;
    }
    
    .cookies-buttons .btn {
        min-width: 100%;
    }
    
    h1 {
        font-size: 2.25rem;
    }
    
    h2 {
        font-size: 1.75rem;
    }
    
    .section {
        padding: 60px 0;
    }
    
    .hero-actions {
        flex-direction: column;
    }
    
    .btn {
        width: 100%;
        text-align: center;
    }
    
    .services-grid {
        grid-template-columns: 1fr;
    }
}

@media (max-width: 480px) {
    .design-showcase {
        width: 250px;
        height: 250px;
    }
    
    .app-screen {
        width: 240px;
    }
    
    .cookies-popup {
        bottom: 10px;
        left: 10px;
        right: 10px;
    }
    
    .return-to-top {
        bottom: 70px;
        right: 15px;
        width: 45px;
        height: 45px;
    }
    
    .template-options {
        grid-template-columns: 1fr;
    }
    
    .preview-header {
        flex-direction: column;
        gap: 1rem;
        align-items: flex-start;
    }
    
    .resume-template {
        padding: 20px;
    }
    
    .resume-template.executive .resume-header {
        padding: 1.5rem;
        margin: -20px -20px 1.5rem -20px;
    }
    
    .resume-template.executive .resume-content {
        padding: 0;
    }
}

/* Reduce motion for accessibility */
@media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
    }
}