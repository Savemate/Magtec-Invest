// Resume Builder JavaScript with Multiple Templates
document.addEventListener('DOMContentLoaded', function() {
    console.log('Resume Builder - Initializing...');
    
    initResumeBuilder();
    initNavigation();
    updateCopyrightYear();
    initReturnToTop();
    initTemplateSelection();
    
    console.log('Resume Builder initialized successfully!');
});

// ===== TEMPLATE SELECTION =====
function initTemplateSelection() {
    console.log('Initializing template selection...');
    
    const templateOptions = document.querySelectorAll('.template-option');
    const currentTemplateName = document.getElementById('currentTemplateName');
    
    // Set initial template
    window.selectedTemplate = 'modern';
    
    templateOptions.forEach(option => {
        option.addEventListener('click', function() {
            // Remove active class from all options
            templateOptions.forEach(opt => opt.classList.remove('active'));
            
            // Add active class to clicked option
            this.classList.add('active');
            
            // Update selected template
            const template = this.dataset.template;
            window.selectedTemplate = template;
            
            // Update template name display
            if (currentTemplateName) {
                const templateNames = {
                    'modern': 'Modern',
                    'classic': 'Classic',
                    'executive': 'Executive'
                };
                currentTemplateName.textContent = templateNames[template];
            }
            
            console.log('Selected template:', template);
            
            // Regenerate preview if there's data
            if (window.resumeData) {
                generateResumePreview();
            }
        });
    });
}

// ===== NAVIGATION =====
function initNavigation() {
    console.log('Initializing navigation...');
    
    const mobileMenu = document.getElementById('mobileMenu');
    const navMenu = document.getElementById('navMenu');
    
    if (!mobileMenu || !navMenu) {
        console.error('Navigation elements not found!');
        return;
    }
    
    // Toggle mobile menu
    function toggleMenu() {
        console.log('Toggling menu...');
        mobileMenu.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Prevent body scrolling when menu is open
        if (navMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
            console.log('Menu opened - body scroll locked');
        } else {
            document.body.style.overflow = '';
            console.log('Menu closed - body scroll restored');
        }
    }
    
    // Add click event to hamburger button
    mobileMenu.addEventListener('click', function(event) {
        event.stopPropagation();
        console.log('Hamburger button clicked');
        toggleMenu();
    });
    
    // Close menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link, .nav-cta');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            console.log('Navigation link clicked:', this.textContent);
            if (window.innerWidth <= 768 && navMenu.classList.contains('active')) {
                console.log('Closing menu on mobile');
                mobileMenu.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.nav-container') && 
            navMenu.classList.contains('active')) {
            console.log('Clicked outside menu - closing');
            mobileMenu.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // Close menu on escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && navMenu.classList.contains('active')) {
            console.log('Escape key pressed - closing menu');
            mobileMenu.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // Close menu on window resize (if switching to desktop)
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && navMenu.classList.contains('active')) {
            console.log('Window resized to desktop - closing menu');
            mobileMenu.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    console.log('Navigation initialized successfully');
}

// ===== RESUME BUILDER =====
function initResumeBuilder() {
    console.log('Initializing resume builder...');
    
    const resumeForm = document.getElementById('resumeForm');
    const previewContainer = document.getElementById('resumePreview');
    const downloadBtn = document.getElementById('downloadResume');
    const previewBtn = document.getElementById('previewResume');
    
    if (!resumeForm || !previewContainer) {
        console.log('Resume builder elements not found');
        return;
    }
    
    // Add first work experience entry
    addWorkExperienceEntry();
    
    // Add first education entry
    addEducationEntry();
    
    // Form navigation
    const progressSteps = document.querySelectorAll('.progress-step');
    
    // Next section buttons
    document.querySelectorAll('.next-section').forEach(button => {
        button.addEventListener('click', function() {
            const nextSection = this.dataset.next;
            navigateToSection(nextSection);
        });
    });
    
    // Previous section buttons
    document.querySelectorAll('.prev-section').forEach(button => {
        button.addEventListener('click', function() {
            const prevSection = this.dataset.prev;
            navigateToSection(prevSection);
        });
    });
    
    // Add work experience
    document.getElementById('addWorkExperience').addEventListener('click', addWorkExperienceEntry);
    
    // Add education
    document.getElementById('addEducation').addEventListener('click', addEducationEntry);
    
    // Preview resume
    if (previewBtn) {
        previewBtn.addEventListener('click', generateResumePreview);
    }
    
    // Download PDF
    if (downloadBtn) {
        downloadBtn.addEventListener('click', downloadResumePDF);
    }
    
    // Auto-update preview on form changes
    resumeForm.addEventListener('input', debounce(generateResumePreview, 500));
    
    // Initialize form fields
    initializeResumeFormFields();
    
    console.log('Resume builder initialized successfully');
}

// Navigate between sections
function navigateToSection(sectionId) {
    const currentActive = document.querySelector('.form-section.active');
    const nextSection = document.getElementById(`${sectionId}-section`);
    const progressSteps = document.querySelectorAll('.progress-step');
    
    if (currentActive && nextSection) {
        // Update active class
        currentActive.classList.remove('active');
        nextSection.classList.add('active');
        
        // Update progress indicator
        progressSteps.forEach(step => {
            step.classList.remove('active');
            if (step.dataset.step === sectionId) {
                step.classList.add('active');
            }
            
            // Mark previous steps as completed
            const stepOrder = ['personal-info', 'work-history', 'education', 'skills'];
            const currentIndex = stepOrder.indexOf(sectionId);
            const stepIndex = stepOrder.indexOf(step.dataset.step);
            
            if (stepIndex < currentIndex) {
                step.classList.add('completed');
            } else if (stepIndex > currentIndex) {
                step.classList.remove('completed');
            }
        });
        
        // Scroll to top of form
        const formContainer = document.querySelector('.resume-form-container');
        formContainer.scrollTop = 0;
    }
}

// Add work experience entry
function addWorkExperienceEntry() {
    const container = document.getElementById('workHistoryEntries');
    const count = document.querySelectorAll('.work-entry').length + 1;
    
    const entryHTML = `
        <div class="entry-item work-entry" data-id="${count}">
            <div class="entry-header">
                <div class="entry-title">Work Experience #${count}</div>
                <button type="button" class="remove-entry" onclick="removeEntry(this)">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            
            <div class="form-group">
                <input type="text" id="jobTitle${count}" placeholder=" " required>
                <label for="jobTitle${count}">Job Title *</label>
            </div>
            
            <div class="form-row">
                <div class="form-group">
                    <input type="text" id="company${count}" placeholder=" " required>
                    <label for="company${count}">Company Name *</label>
                </div>
                
                <div class="form-group">
                    <input type="text" id="location${count}" placeholder=" ">
                    <label for="location${count}">Location</label>
                </div>
            </div>
            
            <div class="form-row">
                <div class="form-group">
                    <input type="month" id="startDate${count}" placeholder=" " required>
                    <label for="startDate${count}">Start Date *</label>
                </div>
                
                <div class="form-group">
                    <input type="month" id="endDate${count}" placeholder=" ">
                    <label for="endDate${count}">End Date (leave blank if current)</label>
                </div>
            </div>
            
            <div class="form-group">
                <textarea id="description${count}" rows="3" placeholder=" "></textarea>
                <label for="description${count}">Job Description</label>
                <small>Describe your responsibilities and achievements</small>
            </div>
        </div>
    `;
    
    container.insertAdjacentHTML('beforeend', entryHTML);
    initializeResumeFormFields();
}

// Add education entry
function addEducationEntry() {
    const container = document.getElementById('educationEntries');
    const count = document.querySelectorAll('.education-entry').length + 1;
    
    const entryHTML = `
        <div class="entry-item education-entry" data-id="${count}">
            <div class="entry-header">
                <div class="entry-title">Education #${count}</div>
                <button type="button" class="remove-entry" onclick="removeEntry(this)">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            
            <div class="form-group">
                <input type="text" id="degree${count}" placeholder=" " required>
                <label for="degree${count}">Qualification *</label>
            </div>
            
            <div class="form-row">
                <div class="form-group">
                    <input type="text" id="school${count}" placeholder=" " required>
                    <label for="school${count}">School/University *</label>
                </div>
            </div>
            
            <div class="form-row">
                <div class="form-group">
                    <input type="month" id="eduStartDate${count}" placeholder=" ">
                    <label for="eduStartDate${count}">Start Date</label>
                </div>
                
                <div class="form-group">
                    <input type="month" id="eduEndDate${count}" placeholder=" ">
                    <label for="eduEndDate${count}">End Date</label>
                </div>
            </div>
            
            <div class="form-group">
                <textarea id="eduDetails${count}" rows="2" placeholder=" "></textarea>
                <label for="eduDetails${count}">Additional Details</label>
            </div>
        </div>
    `;
    
    container.insertAdjacentHTML('beforeend', entryHTML);
    initializeResumeFormFields();
}

// Remove entry
function removeEntry(button) {
    const entry = button.closest('.entry-item');
    if (entry && document.querySelectorAll('.entry-item').length > 1) {
        entry.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => {
            entry.remove();
            // Renumber remaining entries
            updateEntryNumbers();
        }, 300);
    }
}

// Update entry numbers
function updateEntryNumbers() {
    // Update work experience entries
    document.querySelectorAll('.work-entry').forEach((entry, index) => {
        const title = entry.querySelector('.entry-title');
        if (title) {
            title.textContent = `Work Experience #${index + 1}`;
        }
    });
    
    // Update education entries
    document.querySelectorAll('.education-entry').forEach((entry, index) => {
        const title = entry.querySelector('.entry-title');
        if (title) {
            title.textContent = `Education #${index + 1}`;
        }
    });
}

// Initialize resume form fields
function initializeResumeFormFields() {
    const formGroups = document.querySelectorAll('.resume-form .form-group');
    formGroups.forEach(group => {
        const input = group.querySelector('input, textarea, select');
        const label = group.querySelector('label');
        
        if (input && label) {
            function updateLabel() {
                if (input.value || (input.tagName === 'SELECT' && input.value !== '')) {
                    label.style.top = '-0.5rem';
                    label.style.fontSize = '0.85rem';
                    label.style.color = '#222222';
                } else {
                    label.style.top = '1rem';
                    label.style.fontSize = '0.95rem';
                    label.style.color = '#888888';
                }
            }
            
            // Initial update
            updateLabel();
            
            // Set initial values for labels
            setTimeout(updateLabel, 100);
            
            // Update on input/change
            input.addEventListener('input', updateLabel);
            input.addEventListener('change', updateLabel);
            input.addEventListener('focus', function() {
                label.style.color = '#222222';
            });
            input.addEventListener('blur', updateLabel);
        }
    });
}

// Generate resume preview
function generateResumePreview() {
    console.log('Generating resume preview...');
    
    const previewContainer = document.getElementById('resumePreview');
    const downloadBtn = document.getElementById('downloadResume');
    
    // Get form data
    const formData = {
        personal: {
            name: document.getElementById('fullName').value.trim(),
            title: document.getElementById('jobTitle').value.trim(),
            email: document.getElementById('email').value.trim(),
            phone: document.getElementById('phone').value.trim(),
            location: document.getElementById('location').value.trim(),
            linkedin: document.getElementById('linkedin').value.trim(),
            summary: document.getElementById('summary').value.trim()
        },
        work: [],
        education: [],
        skills: document.getElementById('skills').value.trim()
    };
    
    // Get work experience
    document.querySelectorAll('.work-entry').forEach(entry => {
        const id = entry.dataset.id;
        formData.work.push({
            title: document.getElementById(`jobTitle${id}`).value.trim(),
            company: document.getElementById(`company${id}`).value.trim(),
            location: document.getElementById(`location${id}`).value.trim(),
            startDate: document.getElementById(`startDate${id}`).value,
            endDate: document.getElementById(`endDate${id}`).value,
            description: document.getElementById(`description${id}`).value.trim()
        });
    });
    
    // Get education
    document.querySelectorAll('.education-entry').forEach(entry => {
        const id = entry.dataset.id;
        formData.education.push({
            degree: document.getElementById(`degree${id}`).value.trim(),
            school: document.getElementById(`school${id}`).value.trim(),
            startDate: document.getElementById(`eduStartDate${id}`).value,
            endDate: document.getElementById(`eduEndDate${id}`).value,
            details: document.getElementById(`eduDetails${id}`).value.trim()
        });
    });
    
    // Generate HTML for preview based on selected template
    const resumeHTML = generateResumeHTML(formData, window.selectedTemplate);
    previewContainer.innerHTML = resumeHTML;
    
    // Enable download button if basic info is filled
    if (formData.personal.name && formData.personal.title && formData.personal.email) {
        downloadBtn.disabled = false;
    } else {
        downloadBtn.disabled = true;
    }
    
    // Store form data for PDF generation
    window.resumeData = formData;
}

// Generate resume HTML based on template
function generateResumeHTML(data, template = 'modern') {
    if (!data.personal.name) {
        return `
            <div class="preview-placeholder">
                <i class="fas fa-file-pdf"></i>
                <p>Fill out the form to see your resume preview</p>
                <p class="placeholder-sub">Your professional resume will appear here</p>
            </div>
        `;
    }
    
    // Format date
    function formatDate(dateString) {
        if (!dateString) return 'Present';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    }
    
    // Generate skills list
    function generateSkillsList(skillsText) {
        if (!skillsText) return '';
        const skills = skillsText.split(',').map(skill => skill.trim()).filter(skill => skill);
        return skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('');
    }
    
    // Template-specific HTML generators
    const templateGenerators = {
        modern: (data) => generateModernTemplate(data),
        classic: (data) => generateClassicTemplate(data),
        executive: (data) => generateExecutiveTemplate(data)
    };
    
    // Get the appropriate template generator
    const generateTemplate = templateGenerators[template] || templateGenerators.modern;
    
    return generateTemplate(data);
}

// Modern Template
function generateModernTemplate(data) {
    return `
        <div class="resume-template modern" id="resumeContent">
            <div class="resume-header">
                <h1 class="resume-name">${data.personal.name || 'Your Name'}</h1>
                <div class="resume-title">${data.personal.title || 'Professional Title'}</div>
                
                <div class="resume-contact">
                    ${data.personal.email ? `
                        <div class="contact-item">
                            <i class="fas fa-envelope"></i>
                            <span>${data.personal.email}</span>
                        </div>
                    ` : ''}
                    
                    ${data.personal.phone ? `
                        <div class="contact-item">
                            <i class="fas fa-phone"></i>
                            <span>${data.personal.phone}</span>
                        </div>
                    ` : ''}
                    
                    ${data.personal.location ? `
                        <div class="contact-item">
                            <i class="fas fa-map-marker-alt"></i>
                            <span>${data.personal.location}</span>
                        </div>
                    ` : ''}
                    
                    ${data.personal.linkedin ? `
                        <div class="contact-item">
                            <i class="fab fa-linkedin"></i>
                            <span>LinkedIn Profile</span>
                        </div>
                    ` : ''}
                </div>
            </div>
            
            ${data.personal.summary ? `
                <div class="resume-section">
                    <h3 class="section-title"><i class="fas fa-user"></i> Professional Summary</h3>
                    <p class="job-description">${data.personal.summary}</p>
                </div>
            ` : ''}
            
            ${data.work.length > 0 ? `
                <div class="resume-section">
                    <h3 class="section-title"><i class="fas fa-briefcase"></i> Work Experience</h3>
                    ${data.work.map(job => `
                        <div class="work-item">
                            <div class="item-header">
                                <div>
                                    <div class="job-title">${job.title || 'Job Title'}</div>
                                    <div class="company-name">${job.company || 'Company Name'}</div>
                                </div>
                                <div class="dates">
                                    ${formatDate(job.startDate)} - ${job.endDate ? formatDate(job.endDate) : 'Present'}
                                </div>
                            </div>
                            ${job.location ? `<div class="company-name">${job.location}</div>` : ''}
                            ${job.description ? `<div class="job-description">${job.description.replace(/\n/g, '<br>')}</div>` : ''}
                        </div>
                    `).join('')}
                </div>
            ` : ''}
            
            ${data.education.length > 0 ? `
                <div class="resume-section">
                    <h3 class="section-title"><i class="fas fa-graduation-cap"></i> Education</h3>
                    ${data.education.map(edu => `
                        <div class="education-item">
                            <div class="item-header">
                                <div>
                                    <div class="degree-title">${edu.degree || 'Qualification'}</div>
                                    <div class="school-name">${edu.school || 'School/University'}</div>
                                </div>
                                ${edu.startDate ? `
                                    <div class="dates">
                                        ${formatDate(edu.startDate)} - ${edu.endDate ? formatDate(edu.endDate) : 'Present'}
                                    </div>
                                ` : ''}
                            </div>
                            ${edu.details ? `<div class="education-details">${edu.details.replace(/\n/g, '<br>')}</div>` : ''}
                        </div>
                    `).join('')}
                </div>
            ` : ''}
            
            ${data.skills ? `
                <div class="resume-section">
                    <h3 class="section-title"><i class="fas fa-star"></i> Skills</h3>
                    <div class="skills-list">
                        ${generateSkillsList(data.skills)}
                    </div>
                </div>
            ` : ''}
        </div>
    `;
}

// Classic Template
function generateClassicTemplate(data) {
    return `
        <div class="resume-template classic" id="resumeContent">
            <div class="resume-header">
                <div>
                    <h1 class="resume-name">${data.personal.name || 'Your Name'}</h1>
                    <div class="resume-title">${data.personal.title || 'Professional Title'}</div>
                </div>
                
                <div class="resume-contact">
                    ${data.personal.email ? `
                        <div class="contact-item">
                            <i class="fas fa-envelope"></i>
                            <span>${data.personal.email}</span>
                        </div>
                    ` : ''}
                    
                    ${data.personal.phone ? `
                        <div class="contact-item">
                            <i class="fas fa-phone"></i>
                            <span>${data.personal.phone}</span>
                        </div>
                    ` : ''}
                    
                    ${data.personal.location ? `
                        <div class="contact-item">
                            <i class="fas fa-map-marker-alt"></i>
                            <span>${data.personal.location}</span>
                        </div>
                    ` : ''}
                    
                    ${data.personal.linkedin ? `
                        <div class="contact-item">
                            <i class="fab fa-linkedin"></i>
                            <span>LinkedIn Profile</span>
                        </div>
                    ` : ''}
                </div>
            </div>
            
            ${data.personal.summary ? `
                <div class="resume-section">
                    <h3 class="section-title">PROFESSIONAL SUMMARY</h3>
                    <p class="job-description">${data.personal.summary}</p>
                </div>
            ` : ''}
            
            ${data.work.length > 0 ? `
                <div class="resume-section">
                    <h3 class="section-title">WORK EXPERIENCE</h3>
                    ${data.work.map(job => `
                        <div class="work-item">
                            <div class="item-header">
                                <div class="job-title">${job.title || 'Job Title'}</div>
                                <div class="dates">
                                    ${formatDate(job.startDate)} - ${job.endDate ? formatDate(job.endDate) : 'Present'}
                                </div>
                            </div>
                            <div class="company-name">${job.company || 'Company Name'}${job.location ? `, ${job.location}` : ''}</div>
                            ${job.description ? `<div class="job-description">${job.description.replace(/\n/g, '<br>')}</div>` : ''}
                        </div>
                    `).join('')}
                </div>
            ` : ''}
            
            ${data.education.length > 0 ? `
                <div class="resume-section">
                    <h3 class="section-title">EDUCATION</h3>
                    ${data.education.map(edu => `
                        <div class="education-item">
                            <div class="item-header">
                                <div class="degree-title">${edu.degree || 'Qualification'}</div>
                                ${edu.startDate ? `
                                    <div class="dates">
                                        ${formatDate(edu.startDate)} - ${edu.endDate ? formatDate(edu.endDate) : 'Present'}
                                    </div>
                                ` : ''}
                            </div>
                            <div class="school-name">${edu.school || 'School/University'}</div>
                            ${edu.details ? `<div class="education-details">${edu.details.replace(/\n/g, '<br>')}</div>` : ''}
                        </div>
                    `).join('')}
                </div>
            ` : ''}
            
            ${data.skills ? `
                <div class="resume-section">
                    <h3 class="section-title">SKILLS</h3>
                    <div class="skills-list">
                        ${generateSkillsList(data.skills)}
                    </div>
                </div>
            ` : ''}
        </div>
    `;
}

// Executive Template
function generateExecutiveTemplate(data) {
    return `
        <div class="resume-template executive" id="resumeContent">
            <div class="resume-header">
                <h1 class="resume-name">${data.personal.name || 'Your Name'}</h1>
                <div class="resume-title">${data.personal.title || 'Professional Title'}</div>
                
                <div class="resume-contact">
                    ${data.personal.email ? `
                        <div class="contact-item">
                            <i class="fas fa-envelope"></i>
                            <span>${data.personal.email}</span>
                        </div>
                    ` : ''}
                    
                    ${data.personal.phone ? `
                        <div class="contact-item">
                            <i class="fas fa-phone"></i>
                            <span>${data.personal.phone}</span>
                        </div>
                    ` : ''}
                    
                    ${data.personal.location ? `
                        <div class="contact-item">
                            <i class="fas fa-map-marker-alt"></i>
                            <span>${data.personal.location}</span>
                        </div>
                    ` : ''}
                    
                    ${data.personal.linkedin ? `
                        <div class="contact-item">
                            <i class="fab fa-linkedin"></i>
                            <span>LinkedIn Profile</span>
                        </div>
                    ` : ''}
                </div>
            </div>
            
            <div class="resume-content">
                ${data.personal.summary ? `
                    <div class="resume-section">
                        <h3 class="section-title">Professional Summary</h3>
                        <p class="job-description">${data.personal.summary}</p>
                    </div>
                ` : ''}
                
                ${data.work.length > 0 ? `
                    <div class="resume-section">
                        <h3 class="section-title">Career Experience</h3>
                        ${data.work.map(job => `
                            <div class="work-item">
                                <div class="item-header">
                                    <div class="job-title">${job.title || 'Job Title'}</div>
                                    <div class="dates">
                                        ${formatDate(job.startDate)} - ${job.endDate ? formatDate(job.endDate) : 'Present'}
                                    </div>
                                </div>
                                <div class="company-name">${job.company || 'Company Name'}${job.location ? ` | ${job.location}` : ''}</div>
                                ${job.description ? `<div class="job-description">${job.description.replace(/\n/g, '<br>')}</div>` : ''}
                            </div>
                        `).join('')}
                    </div>
                ` : ''}
                
                ${data.education.length > 0 ? `
                    <div class="resume-section">
                        <h3 class="section-title">Education & Qualifications</h3>
                        ${data.education.map(edu => `
                            <div class="education-item">
                                <div class="item-header">
                                    <div class="degree-title">${edu.degree || 'Qualification'}</div>
                                    ${edu.startDate ? `
                                        <div class="dates">
                                            ${formatDate(edu.startDate)} - ${edu.endDate ? formatDate(edu.endDate) : 'Present'}
                                        </div>
                                    ` : ''}
                                </div>
                                <div class="school-name">${edu.school || 'School/University'}</div>
                                ${edu.details ? `<div class="education-details">${edu.details.replace(/\n/g, '<br>')}</div>` : ''}
                            </div>
                        `).join('')}
                    </div>
                ` : ''}
                
                ${data.skills ? `
                    <div class="resume-section">
                        <h3 class="section-title">Core Competencies</h3>
                        <div class="skills-list">
                            ${generateSkillsList(data.skills)}
                        </div>
                    </div>
                ` : ''}
            </div>
        </div>
    `;
}

// Format date helper function
function formatDate(dateString) {
    if (!dateString) return 'Present';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
}

// Generate skills list helper function
function generateSkillsList(skillsText) {
    if (!skillsText) return '';
    const skills = skillsText.split(',').map(skill => skill.trim()).filter(skill => skill);
    return skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('');
}

// Download resume as PDF
async function downloadResumePDF() {
    console.log('Downloading resume as PDF...');
    
    const downloadBtn = document.getElementById('downloadResume');
    const originalText = downloadBtn.innerHTML;
    
    // Show loading state
    downloadBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating PDF...';
    downloadBtn.disabled = true;
    
    try {
        // Get the resume content
        const element = document.getElementById('resumeContent');
        
        if (!element) {
            throw new Error('Resume content not found');
        }
        
        // Create a clone of the element for PDF generation
        const elementClone = element.cloneNode(true);
        
        // Remove any interactive elements
        elementClone.querySelectorAll('button, input, select, textarea').forEach(el => el.remove());
        
        // Set up options
        const opt = {
            margin: [0.5, 0.5],
            filename: `Resume_${window.resumeData?.personal?.name.replace(/\s+/g, '_') || 'MyResume'}_${window.selectedTemplate}.pdf`,
            image: { 
                type: 'jpeg', 
                quality: 0.98 
            },
            html2canvas: { 
                scale: 2,
                useCORS: true,
                letterRendering: true,
                backgroundColor: '#ffffff',
                scrollX: 0,
                scrollY: 0,
                windowWidth: element.scrollWidth,
                windowHeight: element.scrollHeight
            },
            jsPDF: { 
                unit: 'in', 
                format: 'a4', 
                orientation: 'portrait' 
            }
        };
        
        // Generate and save PDF
        await html2pdf().set(opt).from(elementClone).save();
        
        // Show success message
        showNotification(`Resume downloaded successfully! (${window.selectedTemplate} template)`, 'success');
        
    } catch (error) {
        console.error('PDF generation error:', error);
        showNotification('Error generating PDF. Please try again.', 'error');
    } finally {
        // Restore button
        downloadBtn.innerHTML = originalText;
        downloadBtn.disabled = false;
    }
}

// Show notification
function showNotification(message, type = 'info') {
    console.log('Showing notification:', { message, type });
    
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.setAttribute('role', 'alert');
    notification.setAttribute('aria-live', 'polite');
    
    const icon = type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle';
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${icon}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#222222' : '#444444'};
        color: #FFFDD0;
        padding: 15px 20px;
        border-radius: 8px;
        display: flex;
        align-items: center;
        gap: 10px;
        max-width: 350px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        animation: slideIn 0.3s ease;
        border: 1px solid rgba(255,253,208,0.1);
        font-size: 0.95rem;
    `;
    
    // Add animation keyframes
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            
            @keyframes slideOut {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Add to document
    document.body.appendChild(notification);
    
    // Auto-remove after 5 seconds
    const removeTimeout = setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 5000);
    
    // Remove on click
    notification.addEventListener('click', () => {
        clearTimeout(removeTimeout);
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    });
}

// Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Update copyright year
function updateCopyrightYear() {
    const yearElement = document.getElementById('currentYear');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

// Return to top button
function initReturnToTop() {
    const returnToTopBtn = document.getElementById('returnToTop');
    
    if (!returnToTopBtn) return;
    
    // Show/hide button based on scroll position
    function toggleReturnButton() {
        if (window.scrollY > 300) {
            returnToTopBtn.classList.add('show');
        } else {
            returnToTopBtn.classList.remove('show');
        }
    }
    
    window.addEventListener('scroll', toggleReturnButton);
    toggleReturnButton();
    
    // Scroll to top when clicked
    returnToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}