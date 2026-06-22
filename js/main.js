
(function() {
    'use strict';

    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const backToTop = document.getElementById('backToTop');
    const navLinks = document.querySelectorAll('.nav-link');
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    const showMoreBtn = document.getElementById('showMoreBtn');
    const additionalProjects = document.querySelectorAll('.additional-projects');
    
    // 网络提示弹窗
    const networkModal = document.getElementById('networkModal');
    const networkModalBtn = document.getElementById('networkModalBtn');
    
    if (networkModal && networkModalBtn) {
        networkModalBtn.addEventListener('click', function() {
            networkModal.classList.add('hidden');
            localStorage.setItem('hideNetworkModal', 'true');
        });
        
        // 检查是否已经关闭过弹窗
        if (localStorage.getItem('hideNetworkModal') === 'true') {
            networkModal.classList.add('hidden');
        }
    }

    // 图片懒加载
    const lazyImages = document.querySelectorAll('img.lazy');
    if (lazyImages.length > 0) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px 0px',
            threshold: 0.01
        });

        lazyImages.forEach(img => {
            imageObserver.observe(img);
        });
    }

    // 导航栏滚动效果
    function handleScroll() {
        const scrollY = window.scrollY;

        if (scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        if (scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // 移动端菜单切换
    navToggle.addEventListener('click', function() {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // 点击导航链接后关闭菜单
    navLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // 回到顶部
    backToTop.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Intersection Observer 滚动动画
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -60px 0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animateElements.forEach(function(el) {
        observer.observe(el);
    });

    // 为时间轴和卡片添加交错动画延迟
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach(function(item, index) {
        const content = item.querySelector('.timeline-content');
        if (content) {
            content.style.transitionDelay = (index * 0.15) + 's';
        }
    });

    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(function(card, index) {
        card.style.transitionDelay = (index * 0.15) + 's';
    });

    const honorCards = document.querySelectorAll('.honor-card');
    honorCards.forEach(function(card, index) {
        card.style.transitionDelay = (index * 0.1) + 's';
    });

    const skillCards = document.querySelectorAll('.skill-card');
    skillCards.forEach(function(card, index) {
        card.style.transitionDelay = (index * 0.1) + 's';
    });

    // 展示更多项目功能
    if (showMoreBtn && additionalProjects.length > 0) {
        showMoreBtn.addEventListener('click', function() {
            const isExpanded = additionalProjects[0].classList.contains('show');
            
            if (!isExpanded) {
                additionalProjects.forEach(function(project) {
                    project.classList.add('show');
                });
                showMoreBtn.classList.add('active');
                showMoreBtn.querySelector('span').textContent = '收起项目';
                
                // 平滑滚动到展开的项目
                setTimeout(function() {
                    additionalProjects[0].scrollIntoView({ behavior: 'smooth', block: 'center' });
                }, 100);
            } else {
                additionalProjects.forEach(function(project) {
                    project.classList.remove('show');
                });
                showMoreBtn.classList.remove('active');
                showMoreBtn.querySelector('span').textContent = '展示更多项目';
            }
        });
    }

    // 证书图片点击放大功能
    const certificateImages = document.querySelectorAll('.certificate-image img');
    const modalOverlay = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const modalClose = document.getElementById('modalClose');

    certificateImages.forEach(function(img) {
        img.addEventListener('click', function() {
            modalImage.src = this.src;
            modalImage.alt = this.alt;
            modalOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    // 关闭模态框
    function closeModal() {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    modalClose.addEventListener('click', closeModal);

    modalOverlay.addEventListener('click', function(e) {
        if (e.target === modalOverlay) {
            closeModal();
        }
    });

    // ESC键关闭模态框
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
            closeModal();
        }
    });
})();
