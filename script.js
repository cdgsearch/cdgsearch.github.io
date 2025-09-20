// Research Paper Interactive Media Controller
class MediaController {
    constructor() {
        this.fixedMedia = this.initializeFixedMedia();
        this.init();
    }

    init() {
        this.setupVideoPlayers();
        this.setupImageViewers();
        this.setupSmoothScrolling();
        this.setupSimpleDropdown();
        this.disableZoomOnFixedImages();
        this.setupMediaLibrary();
    }

    // Initialize fixed media library with descriptions
    initializeFixedMedia() {
        return {
            "Methodology Diagrams": [
                {
                    title: "Data Processing Pipeline",
                    description: "A comprehensive data preprocessing pipeline showing raw data input, cleaning steps, feature extraction, normalization, and final processed output",
                    type: "image",
                    mediaUrl: "https://via.placeholder.com/1024x1024/f8f9fa/6c757d?text=Data+Processing+Pipeline",
                    dimensions: "1024x1024"
                },
                {
                    title: "Machine Learning Workflow", 
                    description: "A complete machine learning workflow diagram showing data collection, preprocessing, model training, validation, testing, and deployment phases",
                    type: "image",
                    mediaUrl: "https://via.placeholder.com/1920x1080/f8f9fa/6c757d?text=ML+Workflow",
                    dimensions: "1920x1080"
                },
                {
                    title: "Neural Network Architecture",
                    description: "A detailed neural network architecture diagram showing input layer, multiple hidden layers, activation functions, and output layer",
                    type: "image", 
                    mediaUrl: "https://via.placeholder.com/512x4512/f8f9fa/6c757d?text=Neural+Network+Architecture",
                    dimensions: "512x4512"
                }
            ],
            "Results Visualizations": [
                {
                    title: "Performance Comparison Chart",
                    description: "A professional bar chart comparing accuracy, precision, and recall metrics across different machine learning models",
                    type: "image",
                    mediaUrl: "https://via.placeholder.com/1024x1024/f8f9fa/6c757d?text=Performance+Comparison",
                    dimensions: "1024x1024"
                },
                {
                    title: "Confusion Matrix Heatmap",
                    description: "A detailed confusion matrix heatmap with color coding and numerical values for multi-class prediction results",
                    type: "image",
                    mediaUrl: "https://via.placeholder.com/800x600/f8f9fa/6c757d?text=Confusion+Matrix",
                    dimensions: "800x600"
                },
                {
                    title: "Training Progress Curves",
                    description: "Multiple line graphs showing training and validation loss, accuracy curves over epochs",
                    type: "image",
                    mediaUrl: "https://via.placeholder.com/1920x1080/f8f9fa/6c757d?text=Training+Curves",
                    dimensions: "1920x1080"
                }
            ],
            "System Architecture": [
                {
                    title: "Distributed System Design",
                    description: "A technical architecture diagram showing microservices, databases, load balancers, and communication protocols",
                    type: "image",
                    mediaUrl: "https://via.placeholder.com/1920x1080/f8f9fa/6c757d?text=Distributed+System",
                    dimensions: "1920x1080"
                },
                {
                    title: "Data Flow Architecture", 
                    description: "A comprehensive data flow diagram showing data sources, processing components, and storage systems",
                    type: "image",
                    mediaUrl: "https://via.placeholder.com/1024x1024/f8f9fa/6c757d?text=Data+Flow+Architecture",
                    dimensions: "1024x1024"
                }
            ],
            "Video Demonstrations": [
                {
                    title: "Algorithm Execution Demo",
                    description: "A real-time demonstration of algorithm execution showing input processing and results",
                    type: "video",
                    mediaUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
                    dimensions: "1920x1080"
                },
                {
                    title: "System Interface Demo",
                    description: "A user interface demonstration showing system interactions and real-time responses",
                    type: "video", 
                    mediaUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_2mb.mp4",
                    dimensions: "1920x1080"
                }
            ]
        };
    }

    // Setup Simple Dropdown Selector
    setupSimpleDropdown() {
        this.createSimpleDropdownPanel();
    }

    createSimpleDropdownPanel() {
        const panel = document.createElement('div');
        panel.className = 'simple-dropdown-panel';
        panel.id = 'simpleDropdownPanel';
        
        const header = document.createElement('h3');
        header.textContent = '📋 Research Media Library';
        
        const description = document.createElement('p');
        description.className = 'panel-description';
        description.textContent = 'Browse our collection of research visualizations. Select any item to view the corresponding media instantly.';
        
        // Simple dropdown selector
        const selectorContainer = document.createElement('div');
        selectorContainer.className = 'simple-selectors';
        
        const mediaSelect = document.createElement('select');
        mediaSelect.className = 'main-media-dropdown';
        mediaSelect.innerHTML = '<option value="">Choose a research visualization...</option>';
        
        // Populate dropdown with all media items
        Object.entries(this.fixedMedia).forEach(([category, items]) => {
            const optgroup = document.createElement('optgroup');
            optgroup.label = category;
            
            items.forEach((item, index) => {
                const option = document.createElement('option');
                option.value = `${category}|${index}`;
                option.textContent = `${item.title} (${item.type})`;
                optgroup.appendChild(option);
            });
            
            mediaSelect.appendChild(optgroup);
        });
        
        selectorContainer.appendChild(mediaSelect);
        
        // Media display area
        const mediaDisplay = document.createElement('div');
        mediaDisplay.className = 'simple-media-display';
        mediaDisplay.id = 'simpleMediaDisplay';
        
        const mediaPlaceholder = document.createElement('div');
        mediaPlaceholder.className = 'simple-placeholder';
        mediaPlaceholder.innerHTML = `
            <div class="placeholder-content">
                <div class="placeholder-icon">🎨</div>
                <h4>Select Media to Display</h4>
                <p>Choose any item from the dropdown above to view the research visualization</p>
            </div>
        `;
        
        mediaDisplay.appendChild(mediaPlaceholder);
        
        // Assemble panel
        panel.appendChild(header);
        panel.appendChild(description);
        panel.appendChild(selectorContainer);
        panel.appendChild(mediaDisplay);
        
        // Add event listener
        mediaSelect.addEventListener('change', (e) => {
            this.displaySelectedMedia(e.target.value, mediaDisplay);
        });
        
        // Insert panel before the generation panel
        const generationPanel = document.getElementById('mediaGenerationPanel');
        if (generationPanel) {
            generationPanel.parentNode.insertBefore(panel, generationPanel);
        } else {
            const main = document.querySelector('.container');
            const footer = main.querySelector('.paper-footer');
            if (footer) {
                main.insertBefore(panel, footer);
            } else {
                main.appendChild(panel);
            }
        }
    }

    displaySelectedMedia(selection, mediaDisplay) {
        // Clear current content
        this.clearSimpleMediaDisplay(mediaDisplay);
        
        if (!selection) {
            return; // Show placeholder
        }
        
        const [category, index] = selection.split('|');
        const mediaData = this.fixedMedia[category][parseInt(index)];
        
        if (!mediaData) return;
        
        // Create media container
        const mediaContainer = document.createElement('div');
        mediaContainer.className = 'selected-media-container';
        
        // Create header with media info
        const header = document.createElement('div');
        header.className = 'media-header';
        header.innerHTML = `
            <h4>${mediaData.title}</h4>
            <div class="media-info">
                <span class="info-tag">${mediaData.type.toUpperCase()}</span>
                <span class="info-tag">${mediaData.dimensions}</span>
                <span class="info-tag">${category}</span>
            </div>
        `;
        
        // Create description display
        const descriptionDisplay = document.createElement('div');
        descriptionDisplay.className = 'simple-media-description';
        descriptionDisplay.innerHTML = `
            <strong>📝 Description:</strong> ${mediaData.description}
        `;
        
        // Create media figure
        const figure = document.createElement('figure');
        figure.className = 'media-figure simple-media-figure';
        
        if (mediaData.type === 'video') {
            this.createSimpleVideo(figure, mediaData);
        } else {
            this.createSimpleImage(figure, mediaData);
        }
        
        // Create caption
        const caption = document.createElement('figcaption');
        caption.innerHTML = `<strong>Figure:</strong> ${mediaData.title} - ${mediaData.description.substring(0, 100)}...`;
        figure.appendChild(caption);
        
        // Create action buttons
        const actions = document.createElement('div');
        actions.className = 'simple-actions';
        
        const addToPageBtn = this.createButton('📄 Add to Research Page', 'Add this media to the research page');
        const viewFullBtn = this.createButton('🔍 View Fullscreen', 'View in fullscreen');
        
        actions.appendChild(addToPageBtn);
        actions.appendChild(viewFullBtn);
        
        // Add event listeners
        addToPageBtn.addEventListener('click', () => {
            this.addMediaToResearchPage(figure.cloneNode(true), mediaData);
        });
        
        viewFullBtn.addEventListener('click', () => {
            if (mediaData.type === 'video') {
                this.openFullscreenVideo(mediaData.mediaUrl);
            } else {
                this.openFullscreenImageViewer(mediaData.mediaUrl);
            }
        });
        
        // Assemble container
        mediaContainer.appendChild(header);
        mediaContainer.appendChild(descriptionDisplay);
        mediaContainer.appendChild(figure);
        mediaContainer.appendChild(actions);
        
        mediaDisplay.appendChild(mediaContainer);
        
        // Initialize media viewers
        if (mediaData.type === 'video') {
            this.createVideoControls(figure.querySelector('video'));
        } else {
            this.createImageViewer(figure.querySelector('img'));
        }
        
        // Smooth scroll to media
        mediaContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    createSimpleImage(figure, mediaData) {
        const img = document.createElement('img');
        img.src = mediaData.mediaUrl;
        img.alt = mediaData.title;
        img.className = mediaData.dimensions === '512x4512' ? 'large-image' : '';
        
        figure.appendChild(img);
    }

    createSimpleVideo(figure, mediaData) {
        const video = document.createElement('video');
        video.className = 'demo-video';
        video.preload = 'metadata';
        
        const source = document.createElement('source');
        source.src = mediaData.mediaUrl;
        source.type = 'video/mp4';
        
        video.appendChild(source);
        figure.appendChild(video);
    }

    clearSimpleMediaDisplay(mediaDisplay) {
        while (mediaDisplay.firstChild) {
            mediaDisplay.removeChild(mediaDisplay.firstChild);
        }
        
        const placeholder = document.createElement('div');
        placeholder.className = 'simple-placeholder';
        placeholder.innerHTML = `
            <div class="placeholder-content">
                <div class="placeholder-icon">🎨</div>
                <h4>Select Media to Display</h4>
                <p>Choose any item from the dropdown above to view the research visualization</p>
            </div>
        `;
        
        mediaDisplay.appendChild(placeholder);
    }

    addMediaToResearchPage(figure, mediaData) {
        // Find appropriate section to add media
        const sections = document.querySelectorAll('.content-section');
        const targetSection = sections[sections.length - 2]; // Add to second-to-last section
        
        if (targetSection) {
            // Add a subtle indicator that this was added from library
            figure.classList.add('library-added');
            targetSection.appendChild(figure);
            
            // Re-initialize media functionality
            if (mediaData.type === 'video') {
                this.createVideoControls(figure.querySelector('video'));
            } else {
                this.createImageViewer(figure.querySelector('img'));
            }
            
            // Scroll to added media
            figure.scrollIntoView({ behavior: 'smooth', block: 'center' });
            
            // Show success message
            this.showNotification(`✅ "${mediaData.title}" added to research page!`);
        }
    }

    openFullscreenVideo(videoUrl) {
        const overlay = document.createElement('div');
        overlay.className = 'fullscreen-overlay';
        
        const video = document.createElement('video');
        video.src = videoUrl;
        video.className = 'fullscreen-video';
        video.controls = true;
        video.autoplay = true;
        
        const closeBtn = document.createElement('button');
        closeBtn.textContent = '✕';
        closeBtn.className = 'fullscreen-close';
        closeBtn.addEventListener('click', () => {
            document.body.removeChild(overlay);
        });
        
        overlay.appendChild(video);
        overlay.appendChild(closeBtn);
        document.body.appendChild(overlay);
        
        // Close on overlay click
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                document.body.removeChild(overlay);
            }
        });
    }

    createPromptDropdownPanel() {
        const panel = document.createElement('div');
        panel.className = 'prompt-dropdown-panel';
        panel.id = 'promptDropdownPanel';
        
        const header = document.createElement('h3');
        header.textContent = '🎯 Quick Prompt Selector';
        
        const description = document.createElement('p');
        description.className = 'panel-description';
        description.textContent = 'Choose from predefined research prompts and see the generated media instantly below.';
        
        // Category and prompt selectors
        const selectorContainer = document.createElement('div');
        selectorContainer.className = 'dropdown-selectors';
        
        const categorySelect = document.createElement('select');
        categorySelect.className = 'category-dropdown';
        categorySelect.innerHTML = '<option value="">Select a category...</option>';
        
        Object.keys(this.predefinedPrompts).forEach(category => {
            const option = document.createElement('option');
            option.value = category;
            option.textContent = category;
            categorySelect.appendChild(option);
        });
        
        const promptSelect = document.createElement('select');
        promptSelect.className = 'prompt-dropdown';
        promptSelect.innerHTML = '<option value="">First select a category</option>';
        promptSelect.disabled = true;
        
        const generateBtn = this.createButton('🚀 Generate Selected Media', 'Generate media from selected prompt');
        generateBtn.className += ' dropdown-generate-btn';
        generateBtn.disabled = true;
        
        selectorContainer.appendChild(categorySelect);
        selectorContainer.appendChild(promptSelect);
        selectorContainer.appendChild(generateBtn);
        
        // Preview area for prompt details
        const promptPreview = document.createElement('div');
        promptPreview.className = 'prompt-preview-area';
        promptPreview.style.display = 'none';
        
        const promptTitle = document.createElement('h4');
        promptTitle.className = 'preview-title';
        
        const promptDescription = document.createElement('div');
        promptDescription.className = 'preview-description';
        
        const promptDetails = document.createElement('div');
        promptDetails.className = 'preview-details';
        
        promptPreview.appendChild(promptTitle);
        promptPreview.appendChild(promptDescription);
        promptPreview.appendChild(promptDetails);
        
        // Media display area
        const mediaDisplay = document.createElement('div');
        mediaDisplay.className = 'dropdown-media-display';
        mediaDisplay.id = 'dropdownMediaDisplay';
        
        const mediaPlaceholder = document.createElement('div');
        mediaPlaceholder.className = 'media-placeholder';
        mediaPlaceholder.innerHTML = `
            <div class="placeholder-content">
                <div class="placeholder-icon">🎨</div>
                <h4>Generated Media Will Appear Here</h4>
                <p>Select a prompt from the dropdown above to generate and preview research media</p>
            </div>
        `;
        
        mediaDisplay.appendChild(mediaPlaceholder);
        
        // Assemble panel
        panel.appendChild(header);
        panel.appendChild(description);
        panel.appendChild(selectorContainer);
        panel.appendChild(promptPreview);
        panel.appendChild(mediaDisplay);
        
        // Add event listeners
        this.addDropdownEventListeners(categorySelect, promptSelect, generateBtn, promptPreview, mediaDisplay);
        
        // Insert panel before the generation panel
        const generationPanel = document.getElementById('mediaGenerationPanel');
        if (generationPanel) {
            generationPanel.parentNode.insertBefore(panel, generationPanel);
        } else {
            const main = document.querySelector('.container');
            const footer = main.querySelector('.paper-footer');
            if (footer) {
                main.insertBefore(panel, footer);
            } else {
                main.appendChild(panel);
            }
        }
    }

    addDropdownEventListeners(categorySelect, promptSelect, generateBtn, promptPreview, mediaDisplay) {
        let selectedPromptData = null;
        
        // Category selection
        categorySelect.addEventListener('change', (e) => {
            const selectedCategory = e.target.value;
            
            if (selectedCategory) {
                // Enable and populate prompt dropdown
                promptSelect.disabled = false;
                promptSelect.innerHTML = '<option value="">Select a prompt...</option>';
                
                this.predefinedPrompts[selectedCategory].forEach((prompt, index) => {
                    const option = document.createElement('option');
                    option.value = index;
                    option.textContent = prompt.title;
                    promptSelect.appendChild(option);
                });
            } else {
                promptSelect.disabled = true;
                promptSelect.innerHTML = '<option value="">First select a category</option>';
                generateBtn.disabled = true;
                promptPreview.style.display = 'none';
                this.clearMediaDisplay(mediaDisplay);
            }
        });
        
        // Prompt selection
        promptSelect.addEventListener('change', (e) => {
            const selectedCategory = categorySelect.value;
            const selectedIndex = e.target.value;
            
            if (selectedCategory && selectedIndex !== '') {
                selectedPromptData = this.predefinedPrompts[selectedCategory][selectedIndex];
                generateBtn.disabled = false;
                
                // Show prompt preview
                this.showPromptPreview(promptPreview, selectedPromptData);
            } else {
                selectedPromptData = null;
                generateBtn.disabled = true;
                promptPreview.style.display = 'none';
            }
        });
        
        // Generate button
        generateBtn.addEventListener('click', () => {
            if (selectedPromptData) {
                this.generateFromDropdownSelection(selectedPromptData, mediaDisplay);
            }
        });
    }

    showPromptPreview(previewArea, promptData) {
        const title = previewArea.querySelector('.preview-title');
        const description = previewArea.querySelector('.preview-description');
        const details = previewArea.querySelector('.preview-details');
        
        title.textContent = promptData.title;
        description.innerHTML = `<strong>Prompt:</strong> ${promptData.prompt}`;
        details.innerHTML = `
            <span class="detail-item"><strong>Type:</strong> ${promptData.type.charAt(0).toUpperCase() + promptData.type.slice(1)}</span>
            <span class="detail-item"><strong>Dimensions:</strong> ${promptData.dimensions}</span>
            <span class="detail-item"><strong>Estimated Time:</strong> ${promptData.type === 'video' ? '30-60 seconds' : '5-15 seconds'}</span>
        `;
        
        previewArea.style.display = 'block';
    }

    generateFromDropdownSelection(promptData, mediaDisplay) {
        // Clear previous media
        this.clearMediaDisplay(mediaDisplay);
        
        // Create loading state
        const loadingContainer = document.createElement('div');
        loadingContainer.className = 'dropdown-loading';
        loadingContainer.innerHTML = `
            <div class="loading-spinner"></div>
            <h4>Generating ${promptData.title}...</h4>
            <p>Creating ${promptData.type} with dimensions ${promptData.dimensions}</p>
            <div class="progress-indicator">
                <div class="progress-bar">
                    <div class="progress-fill"></div>
                </div>
                <span class="progress-text">0%</span>
            </div>
        `;
        
        mediaDisplay.appendChild(loadingContainer);
        
        // Animate progress bar
        const progressFill = loadingContainer.querySelector('.progress-fill');
        const progressText = loadingContainer.querySelector('.progress-text');
        let progress = 0;
        
        const progressInterval = setInterval(() => {
            progress += Math.random() * 15;
            if (progress > 95) progress = 95;
            
            progressFill.style.width = progress + '%';
            progressText.textContent = Math.round(progress) + '%';
        }, 200);
        
        // Simulate generation time
        const generationTime = promptData.type === 'video' ? 4000 : 2500;
        
        setTimeout(() => {
            clearInterval(progressInterval);
            progressFill.style.width = '100%';
            progressText.textContent = '100%';
            
            setTimeout(() => {
                mediaDisplay.removeChild(loadingContainer);
                this.displayGeneratedMedia(promptData, mediaDisplay);
            }, 500);
        }, generationTime);
    }

    displayGeneratedMedia(promptData, mediaDisplay) {
        const mediaContainer = document.createElement('div');
        mediaContainer.className = 'generated-media-container';
        
        // Create header with prompt info
        const header = document.createElement('div');
        header.className = 'generated-header';
        header.innerHTML = `
            <h4>✨ ${promptData.title}</h4>
            <div class="generation-info">
                <span class="info-badge">${promptData.type.toUpperCase()}</span>
                <span class="info-badge">${promptData.dimensions}</span>
                <span class="info-badge">Generated ${new Date().toLocaleTimeString()}</span>
            </div>
        `;
        
        // Create media figure
        const figure = document.createElement('figure');
        figure.className = 'media-figure dropdown-generated';
        
        if (promptData.type === 'video') {
            this.createDropdownVideo(figure, promptData);
        } else {
            this.createDropdownImage(figure, promptData);
        }
        
        // Create caption
        const caption = document.createElement('figcaption');
        caption.innerHTML = `<strong>Generated ${promptData.type}:</strong> ${promptData.prompt.substring(0, 150)}...`;
        figure.appendChild(caption);
        
        // Create action buttons
        const actions = document.createElement('div');
        actions.className = 'media-actions';
        
        const downloadBtn = this.createButton('💾 Download', 'Download generated media');
        const editBtn = this.createButton('✏️ Edit Prompt', 'Edit this prompt');
        const regenerateBtn = this.createButton('🔄 Regenerate', 'Generate again');
        const addToPageBtn = this.createButton('📄 Add to Page', 'Add to research page');
        
        actions.appendChild(downloadBtn);
        actions.appendChild(editBtn);
        actions.appendChild(regenerateBtn);
        actions.appendChild(addToPageBtn);
        
        // Add event listeners
        regenerateBtn.addEventListener('click', () => {
            this.generateFromDropdownSelection(promptData, mediaDisplay);
        });
        
        addToPageBtn.addEventListener('click', () => {
            this.addGeneratedMediaToPage(figure.cloneNode(true), promptData);
        });
        
        editBtn.addEventListener('click', () => {
            this.openPromptEditorForDropdown(promptData, mediaDisplay);
        });
        
        // Assemble container
        mediaContainer.appendChild(header);
        mediaContainer.appendChild(figure);
        mediaContainer.appendChild(actions);
        
        mediaDisplay.appendChild(mediaContainer);
        
        // Initialize media viewers
        if (promptData.type === 'video') {
            this.createVideoControls(figure.querySelector('video'));
        } else {
            this.createImageViewer(figure.querySelector('img'));
        }
        
        // Scroll to media
        mediaContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    createDropdownImage(figure, promptData) {
        const [width, height] = promptData.dimensions.split('x').map(Number);
        
        const img = document.createElement('img');
        img.src = `https://via.placeholder.com/${width}x${height}/f8f9fa/6c757d?text=${encodeURIComponent(promptData.title)}+${width}x${height}`;
        img.alt = promptData.title;
        img.className = width === 512 && height === 4512 ? 'large-image' : '';
        
        figure.appendChild(img);
    }

    createDropdownVideo(figure, promptData) {
        const video = document.createElement('video');
        video.className = 'demo-video';
        video.preload = 'metadata';
        
        const source = document.createElement('source');
        source.src = 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4';
        source.type = 'video/mp4';
        
        video.appendChild(source);
        figure.appendChild(video);
    }

    clearMediaDisplay(mediaDisplay) {
        while (mediaDisplay.firstChild) {
            mediaDisplay.removeChild(mediaDisplay.firstChild);
        }
        
        const placeholder = document.createElement('div');
        placeholder.className = 'media-placeholder';
        placeholder.innerHTML = `
            <div class="placeholder-content">
                <div class="placeholder-icon">🎨</div>
                <h4>Generated Media Will Appear Here</h4>
                <p>Select a prompt from the dropdown above to generate and preview research media</p>
            </div>
        `;
        
        mediaDisplay.appendChild(placeholder);
    }

    addGeneratedMediaToPage(figure, promptData) {
        // Find appropriate section to add media
        const sections = document.querySelectorAll('.content-section');
        const targetSection = sections[sections.length - 1]; // Add to last section
        
        if (targetSection) {
            targetSection.appendChild(figure);
            
            // Re-initialize media functionality
            if (promptData.type === 'video') {
                this.createVideoControls(figure.querySelector('video'));
            } else {
                this.createImageViewer(figure.querySelector('img'));
            }
            
            // Add prompt controls
            this.addPromptControls(figure, Date.now());
            
            // Scroll to added media
            figure.scrollIntoView({ behavior: 'smooth', block: 'center' });
            
            // Show success message
            this.showNotification('✅ Media added to research page successfully!');
        }
    }

    openPromptEditorForDropdown(promptData, mediaDisplay) {
        const modal = this.createModal('Edit Prompt: ' + promptData.title);
        
        const textarea = document.createElement('textarea');
        textarea.className = 'prompt-editor';
        textarea.value = promptData.prompt;
        textarea.rows = 4;
        
        const buttonContainer = document.createElement('div');
        buttonContainer.className = 'modal-buttons';
        
        const saveBtn = this.createButton('💾 Save & Regenerate', 'Save changes and regenerate');
        const cancelBtn = this.createButton('❌ Cancel', 'Cancel changes');
        
        buttonContainer.appendChild(saveBtn);
        buttonContainer.appendChild(cancelBtn);
        
        modal.appendChild(textarea);
        modal.appendChild(buttonContainer);
        
        saveBtn.addEventListener('click', () => {
            promptData.prompt = textarea.value;
            this.closeModal();
            this.generateFromDropdownSelection(promptData, mediaDisplay);
        });
        
        cancelBtn.addEventListener('click', () => {
            this.closeModal();
        });
        
        document.body.appendChild(modal);
        textarea.focus();
    }

    showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification-toast';
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // Show animation
        setTimeout(() => notification.classList.add('show'), 100);
        
        // Hide animation
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }



    // Video Player Utilities
    setupVideoPlayers() {
        const videos = document.querySelectorAll('.demo-video');
        videos.forEach(video => {
            this.createVideoControls(video);
        });
    }

    createVideoControls(video) {
        const container = video.closest('.media-figure');
        const controlsContainer = document.createElement('div');
        controlsContainer.className = 'video-controls';
        
        // Custom controls
        const controls = {
            playPause: this.createButton('⏯️', 'Play/Pause'),
            progress: this.createProgressBar(),
            time: this.createTimeDisplay(),
            speed: this.createSpeedControl(),
            fullscreen: this.createButton('⛶', 'Fullscreen'),
            volume: this.createVolumeControl()
        };

        // Add controls to container
        Object.values(controls).forEach(control => {
            controlsContainer.appendChild(control);
        });

        container.appendChild(controlsContainer);

        // Event listeners
        this.addVideoEventListeners(video, controls);
    }

    createButton(text, title) {
        const button = document.createElement('button');
        button.textContent = text;
        button.title = title;
        button.className = 'video-btn';
        return button;
    }

    createProgressBar() {
        const container = document.createElement('div');
        container.className = 'progress-container';
        
        const bar = document.createElement('div');
        bar.className = 'progress-bar';
        
        const fill = document.createElement('div');
        fill.className = 'progress-fill';
        
        bar.appendChild(fill);
        container.appendChild(bar);
        
        return container;
    }

    createTimeDisplay() {
        const time = document.createElement('span');
        time.className = 'time-display';
        time.textContent = '0:00 / 0:00';
        return time;
    }

    createSpeedControl() {
        const select = document.createElement('select');
        select.className = 'speed-control';
        const speeds = ['0.5x', '0.75x', '1x', '1.25x', '1.5x', '2x'];
        
        speeds.forEach(speed => {
            const option = document.createElement('option');
            option.value = parseFloat(speed);
            option.textContent = speed;
            if (speed === '1x') option.selected = true;
            select.appendChild(option);
        });
        
        return select;
    }

    createVolumeControl() {
        const container = document.createElement('div');
        container.className = 'volume-container';
        
        const button = document.createElement('button');
        button.textContent = '🔊';
        button.className = 'volume-btn';
        
        const slider = document.createElement('input');
        slider.type = 'range';
        slider.min = '0';
        slider.max = '1';
        slider.step = '0.1';
        slider.value = '1';
        slider.className = 'volume-slider';
        
        container.appendChild(button);
        container.appendChild(slider);
        
        return container;
    }

    addVideoEventListeners(video, controls) {
        // Play/Pause
        controls.playPause.addEventListener('click', () => {
            if (video.paused) {
                video.play();
            } else {
                video.pause();
            }
        });

        // Progress bar
        const progressFill = controls.progress.querySelector('.progress-fill');
        const progressBar = controls.progress.querySelector('.progress-bar');
        
        video.addEventListener('timeupdate', () => {
            const progress = (video.currentTime / video.duration) * 100;
            progressFill.style.width = progress + '%';
            
            // Update time display
            const current = this.formatTime(video.currentTime);
            const total = this.formatTime(video.duration);
            controls.time.textContent = `${current} / ${total}`;
        });

        progressBar.addEventListener('click', (e) => {
            const rect = progressBar.getBoundingClientRect();
            const pos = (e.clientX - rect.left) / rect.width;
            video.currentTime = pos * video.duration;
        });

        // Speed control
        controls.speed.addEventListener('change', (e) => {
            video.playbackRate = parseFloat(e.target.value);
        });

        // Fullscreen
        controls.fullscreen.addEventListener('click', () => {
            if (video.requestFullscreen) {
                video.requestFullscreen();
            } else if (video.webkitRequestFullscreen) {
                video.webkitRequestFullscreen();
            }
        });

        // Volume control
        const volumeSlider = controls.volume.querySelector('.volume-slider');
        const volumeBtn = controls.volume.querySelector('.volume-btn');
        
        volumeSlider.addEventListener('input', (e) => {
            video.volume = e.target.value;
            volumeBtn.textContent = e.target.value == 0 ? '🔇' : '🔊';
        });

        volumeBtn.addEventListener('click', () => {
            video.muted = !video.muted;
            volumeBtn.textContent = video.muted ? '🔇' : '🔊';
        });
    }

    formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    }

    // Image Viewer for Large Images (only for media library, not teaser/method figures)
    setupImageViewers() {
        const images = document.querySelectorAll('.media-figure img');
        images.forEach(img => {
            // Skip teaser and method figures - they should be fixed/non-zoomable
            if (img.classList.contains('teaser-image') || img.classList.contains('large-image')) {
                return;
            }
            this.createImageViewer(img);
        });
    }

    createImageViewer(img) {
        const figure = img.closest('.media-figure');
        
        // Create wrapper for scrollable image
        const wrapper = document.createElement('div');
        wrapper.className = 'image-viewer-wrapper';
        
        const container = document.createElement('div');
        container.className = 'image-viewer-container';
        
        // Clone image for viewer
        const viewerImg = img.cloneNode();
        viewerImg.className = 'scrollable-image';
        
        container.appendChild(viewerImg);
        wrapper.appendChild(container);
        
        // Create controls
        const controls = document.createElement('div');
        controls.className = 'image-controls';
        
        const zoomIn = this.createButton('🔍+', 'Zoom In');
        const zoomOut = this.createButton('🔍-', 'Zoom Out');
        const reset = this.createButton('⟲', 'Reset View');
        const fullscreen = this.createButton('⛶', 'Fullscreen View');
        
        controls.appendChild(zoomIn);
        controls.appendChild(zoomOut);
        controls.appendChild(reset);
        controls.appendChild(fullscreen);
        
        wrapper.appendChild(controls);
        
        // Replace original image with viewer
        img.style.display = 'none';
        figure.insertBefore(wrapper, img);
        
        // Add functionality
        this.addImageViewerEvents(container, viewerImg, controls);
    }

    addImageViewerEvents(container, img, controls) {
        let scale = 1;
        let panX = 0;
        let panY = 0;
        let isDragging = false;
        let startX = 0;
        let startY = 0;

        const updateTransform = () => {
            img.style.transform = `scale(${scale}) translate(${panX}px, ${panY}px)`;
        };

        // Zoom controls
        controls.children[0].addEventListener('click', () => {
            scale = Math.min(scale * 1.2, 5);
            updateTransform();
        });

        controls.children[1].addEventListener('click', () => {
            scale = Math.max(scale / 1.2, 0.1);
            updateTransform();
        });

        controls.children[2].addEventListener('click', () => {
            scale = 1;
            panX = 0;
            panY = 0;
            updateTransform();
        });

        // Fullscreen view
        controls.children[3].addEventListener('click', () => {
            this.openFullscreenImageViewer(img.src);
        });

        // Mouse wheel zoom
        container.addEventListener('wheel', (e) => {
            e.preventDefault();
            const delta = e.deltaY > 0 ? 0.9 : 1.1;
            scale = Math.max(0.1, Math.min(5, scale * delta));
            updateTransform();
        });

        // Mouse drag for panning
        container.addEventListener('mousedown', (e) => {
            isDragging = true;
            startX = e.clientX - panX;
            startY = e.clientY - panY;
            container.style.cursor = 'grabbing';
        });

        document.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            panX = e.clientX - startX;
            panY = e.clientY - startY;
            updateTransform();
        });

        document.addEventListener('mouseup', () => {
            isDragging = false;
            container.style.cursor = 'grab';
        });

        // Touch support for mobile
        let lastTouchDistance = 0;
        
        container.addEventListener('touchstart', (e) => {
            if (e.touches.length === 2) {
                const touch1 = e.touches[0];
                const touch2 = e.touches[1];
                lastTouchDistance = Math.hypot(
                    touch2.clientX - touch1.clientX,
                    touch2.clientY - touch1.clientY
                );
            } else if (e.touches.length === 1) {
                isDragging = true;
                startX = e.touches[0].clientX - panX;
                startY = e.touches[0].clientY - panY;
            }
        });

        container.addEventListener('touchmove', (e) => {
            e.preventDefault();
            
            if (e.touches.length === 2) {
                const touch1 = e.touches[0];
                const touch2 = e.touches[1];
                const distance = Math.hypot(
                    touch2.clientX - touch1.clientX,
                    touch2.clientY - touch1.clientY
                );
                
                if (lastTouchDistance > 0) {
                    const scaleChange = distance / lastTouchDistance;
                    scale = Math.max(0.1, Math.min(5, scale * scaleChange));
                    updateTransform();
                }
                
                lastTouchDistance = distance;
            } else if (e.touches.length === 1 && isDragging) {
                panX = e.touches[0].clientX - startX;
                panY = e.touches[0].clientY - startY;
                updateTransform();
            }
        });

        container.addEventListener('touchend', () => {
            isDragging = false;
            lastTouchDistance = 0;
        });
    }

    openFullscreenImageViewer(imageSrc) {
        const overlay = document.createElement('div');
        overlay.className = 'fullscreen-overlay';
        
        const img = document.createElement('img');
        img.src = imageSrc;
        img.className = 'fullscreen-image';
        
        const closeBtn = document.createElement('button');
        closeBtn.textContent = '✕';
        closeBtn.className = 'fullscreen-close';
        closeBtn.addEventListener('click', () => {
            document.body.removeChild(overlay);
        });
        
        overlay.appendChild(img);
        overlay.appendChild(closeBtn);
        document.body.appendChild(overlay);
        
        // Close on overlay click
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                document.body.removeChild(overlay);
            }
        });
        
        // Close on escape key
        document.addEventListener('keydown', function escapeHandler(e) {
            if (e.key === 'Escape') {
                if (document.body.contains(overlay)) {
                    document.body.removeChild(overlay);
                }
                document.removeEventListener('keydown', escapeHandler);
            }
        });
    }

    // Smooth Scrolling
    setupSmoothScrolling() {
        // Smooth scroll to sections
        const links = document.querySelectorAll('a[href^="#"]');
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(link.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Add scroll progress indicator
        this.addScrollProgress();
    }

    addScrollProgress() {
        const progressBar = document.createElement('div');
        progressBar.className = 'scroll-progress';
        document.body.appendChild(progressBar);

        window.addEventListener('scroll', () => {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            progressBar.style.width = scrolled + '%';
        });
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new MediaController();
});

// Utility functions
window.mediaUtils = {
    // Function to add new videos dynamically
    addVideo: function(src, container) {
        const video = document.createElement('video');
        video.src = src;
        video.className = 'demo-video';
        video.controls = false; // We'll use custom controls
        container.appendChild(video);
        
        // Re-initialize for new video
        const controller = new MediaController();
        controller.createVideoControls(video);
    },
    
    // Function to add new images dynamically
    addImage: function(src, container) {
        const figure = document.createElement('figure');
        figure.className = 'media-figure';
        
        const img = document.createElement('img');
        img.src = src;
        img.alt = 'Research Image';
        
        const caption = document.createElement('figcaption');
        caption.innerHTML = '<strong>Figure:</strong> Dynamic image';
        
        figure.appendChild(img);
        figure.appendChild(caption);
        container.appendChild(figure);
        
        // Re-initialize for new image
        const controller = new MediaController();
        controller.createImageViewer(img);
    },

    // Explicitly disable zoom functionality on teaser and method figures
    disableZoomOnFixedImages() {
        const teaserImages = document.querySelectorAll('.teaser-image');
        const methodImages = document.querySelectorAll('.large-image');
        
        [...teaserImages, ...methodImages].forEach(img => {
            // Prevent wheel events (mouse scroll zoom)
            img.addEventListener('wheel', (e) => {
                e.preventDefault();
                e.stopPropagation();
            }, { passive: false });
            
            // Prevent touch events that could cause zoom
            img.addEventListener('touchstart', (e) => {
                if (e.touches.length > 1) {
                    e.preventDefault();
                    e.stopPropagation();
                }
            }, { passive: false });
            
            // Prevent double-tap zoom on mobile
            img.addEventListener('dblclick', (e) => {
                e.preventDefault();
                e.stopPropagation();
            });
            
            // Prevent context menu which could interfere
            img.addEventListener('contextmenu', (e) => {
                e.preventDefault();
            });
        });
    },

    // Setup Interactive Media Library
    setupMediaLibrary() {
        const thumbnails = document.querySelectorAll('.media-thumbnail');
        const modal = document.getElementById('mediaViewerModal');
        const modalClose = document.getElementById('modalClose');
        const backdrop = modal?.querySelector('.modal-backdrop');

        if (!modal) return;

        // Add click listeners to thumbnails
        thumbnails.forEach(thumbnail => {
            thumbnail.addEventListener('click', () => {
                const type = thumbnail.dataset.type;
                const src = thumbnail.dataset.src;
                const title = thumbnail.dataset.title;
                const description = thumbnail.dataset.description;
                
                this.openMediaViewer(type, src, title, description);
            });
        });

        // Close modal listeners
        modalClose?.addEventListener('click', () => this.closeMediaViewer());
        backdrop?.addEventListener('click', () => this.closeMediaViewer());
        
        // Keyboard close
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.style.display !== 'none') {
                this.closeMediaViewer();
            }
        });
    },

    // Open Media Viewer Modal
    openMediaViewer(type, src, title, description) {
        const modal = document.getElementById('mediaViewerModal');
        const modalTitle = modal.querySelector('.modal-title');
        const mediaContainer = document.getElementById('modalMediaContainer');
        const modalDescription = document.getElementById('modalDescription');
        const modalControls = document.getElementById('modalControls');

        // Set title
        modalTitle.textContent = title;

        // Clear previous content
        mediaContainer.innerHTML = '';
        modalControls.innerHTML = '';

        if (type === 'image') {
            this.setupModalImage(src, title, mediaContainer, modalControls);
        } else if (type === 'video') {
            this.setupModalVideo(src, title, mediaContainer, modalControls);
        }

        // Set description
        modalDescription.innerHTML = `
            <h4>${title}</h4>
            <p>${description}</p>
        `;

        // Show modal
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    },

    // Setup Modal Image with Scroll Zoom
    setupModalImage(src, title, container, controls) {
        const img = document.createElement('img');
        img.src = src;
        img.alt = title;
        img.className = 'modal-image';
        
        // Image zoom and pan state
        let scale = 1;
        let isDragging = false;
        let startX = 0;
        let startY = 0;
        let translateX = 0;
        let translateY = 0;

        // Update image transform
        const updateTransform = () => {
            img.style.transform = `scale(${scale}) translate(${translateX}px, ${translateY}px)`;
        };

        // Scroll zoom functionality
        const handleWheel = (e) => {
            e.preventDefault();
            
            const rect = container.getBoundingClientRect();
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            // Mouse position relative to container
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;
            
            // Calculate zoom
            const zoomIntensity = 0.1;
            const delta = e.deltaY > 0 ? -zoomIntensity : zoomIntensity;
            const newScale = Math.max(0.5, Math.min(5, scale + delta));
            
            if (newScale !== scale) {
                // Adjust translation to zoom towards mouse position
                const scaleChange = newScale / scale;
                translateX = (translateX - (mouseX - centerX)) * scaleChange + (mouseX - centerX);
                translateY = (translateY - (mouseY - centerY)) * scaleChange + (mouseY - centerY);
                
                scale = newScale;
                updateTransform();
                updateZoomLevel();
            }
        };

        // Drag functionality
        const handleMouseDown = (e) => {
            isDragging = true;
            startX = e.clientX - translateX;
            startY = e.clientY - translateY;
            img.classList.add('dragging');
        };

        const handleMouseMove = (e) => {
            if (!isDragging) return;
            
            translateX = e.clientX - startX;
            translateY = e.clientY - startY;
            updateTransform();
        };

        const handleMouseUp = () => {
            isDragging = false;
            img.classList.remove('dragging');
        };

        // Touch support for mobile
        let initialDistance = 0;
        let initialScale = 1;

        const handleTouchStart = (e) => {
            if (e.touches.length === 2) {
                // Pinch zoom start
                const touch1 = e.touches[0];
                const touch2 = e.touches[1];
                initialDistance = Math.sqrt(
                    Math.pow(touch1.clientX - touch2.clientX, 2) +
                    Math.pow(touch1.clientY - touch2.clientY, 2)
                );
                initialScale = scale;
            } else if (e.touches.length === 1) {
                // Single touch drag
                isDragging = true;
                startX = e.touches[0].clientX - translateX;
                startY = e.touches[0].clientY - translateY;
            }
        };

        const handleTouchMove = (e) => {
            e.preventDefault();
            
            if (e.touches.length === 2) {
                // Pinch zoom
                const touch1 = e.touches[0];
                const touch2 = e.touches[1];
                const currentDistance = Math.sqrt(
                    Math.pow(touch1.clientX - touch2.clientX, 2) +
                    Math.pow(touch1.clientY - touch2.clientY, 2)
                );
                
                const newScale = Math.max(0.5, Math.min(5, initialScale * (currentDistance / initialDistance)));
                scale = newScale;
                updateTransform();
                updateZoomLevel();
            } else if (e.touches.length === 1 && isDragging) {
                // Single touch drag
                translateX = e.touches[0].clientX - startX;
                translateY = e.touches[0].clientY - startY;
                updateTransform();
            }
        };

        const handleTouchEnd = () => {
            isDragging = false;
        };

        // Add event listeners
        container.addEventListener('wheel', handleWheel, { passive: false });
        img.addEventListener('mousedown', handleMouseDown);
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
        
        // Touch events
        container.addEventListener('touchstart', handleTouchStart, { passive: false });
        container.addEventListener('touchmove', handleTouchMove, { passive: false });
        container.addEventListener('touchend', handleTouchEnd);

        // Add to container
        container.appendChild(img);

        // Create zoom controls
        const zoomControls = document.createElement('div');
        zoomControls.className = 'zoom-controls';

        const zoomInBtn = this.createButton('🔍+', 'Zoom In');
        zoomInBtn.className = 'control-button';
        zoomInBtn.addEventListener('click', () => {
            scale = Math.min(5, scale + 0.2);
            updateTransform();
            updateZoomLevel();
        });

        const zoomOutBtn = this.createButton('🔍-', 'Zoom Out');
        zoomOutBtn.className = 'control-button';
        zoomOutBtn.addEventListener('click', () => {
            scale = Math.max(0.5, scale - 0.2);
            updateTransform();
            updateZoomLevel();
        });

        const resetBtn = this.createButton('⟲', 'Reset View');
        resetBtn.className = 'control-button secondary';
        resetBtn.addEventListener('click', () => {
            scale = 1;
            translateX = 0;
            translateY = 0;
            updateTransform();
            updateZoomLevel();
        });

        const zoomLevel = document.createElement('span');
        zoomLevel.className = 'zoom-level';
        
        const updateZoomLevel = () => {
            zoomLevel.textContent = `${Math.round(scale * 100)}%`;
        };
        
        updateZoomLevel();

        zoomControls.appendChild(zoomOutBtn);
        zoomControls.appendChild(zoomLevel);
        zoomControls.appendChild(zoomInBtn);
        zoomControls.appendChild(resetBtn);

        controls.appendChild(zoomControls);

        // Fit to container initially
        img.onload = () => {
            const containerRect = container.getBoundingClientRect();
            const imgRect = img.getBoundingClientRect();
            
            if (imgRect.width > containerRect.width || imgRect.height > containerRect.height) {
                const scaleX = containerRect.width / imgRect.width;
                const scaleY = containerRect.height / imgRect.height;
                scale = Math.min(scaleX, scaleY) * 0.9;
                updateTransform();
                updateZoomLevel();
            }
        };
    },

    // Setup Modal Video
    setupModalVideo(src, title, container, controls) {
        const video = document.createElement('video');
        video.src = src;
        video.className = 'modal-video';
        video.controls = true;
        video.autoplay = false;
        
        container.appendChild(video);

        // Create video controls
        const fullscreenBtn = this.createButton('⛶', 'Fullscreen');
        fullscreenBtn.className = 'control-button';
        fullscreenBtn.addEventListener('click', () => {
            if (video.requestFullscreen) {
                video.requestFullscreen();
            }
        });

        const downloadBtn = this.createButton('💾', 'Download');
        downloadBtn.className = 'control-button secondary';
        downloadBtn.addEventListener('click', () => {
            const a = document.createElement('a');
            a.href = src;
            a.download = title + '.mp4';
            a.click();
        });

        controls.appendChild(fullscreenBtn);
        controls.appendChild(downloadBtn);
    },

    // Close Media Viewer
    closeMediaViewer() {
        const modal = document.getElementById('mediaViewerModal');
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        
        // Clean up event listeners
        const mediaContainer = document.getElementById('modalMediaContainer');
        mediaContainer.innerHTML = '';
    }
};