// 项目详情页面 - 图片点击放大功能
(function() {
    'use strict';

    // 获取所有项目图片（包括局部放大图）
    const galleryImages = document.querySelectorAll('.gallery-image');
    const zoomImages = document.querySelectorAll('.zoom-image');
    const modalOverlay = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const modalClose = document.getElementById('modalClose');

    // 视频播放控制 - 自定义播放按钮
    const videoContainers = document.querySelectorAll('.video-container');
    videoContainers.forEach(function(container) {
        const video = container.querySelector('video');
        const overlay = container.querySelector('.video-play-overlay');
        
        if (!video || !overlay) return;

        // 点击播放按钮开始播放
        overlay.addEventListener('click', function() {
            video.play();
            overlay.classList.add('hidden');
        });
        
        // 视频点击也可以播放
        video.addEventListener('click', function() {
            if (video.paused) {
                video.play();
                overlay.classList.add('hidden');
            }
        });
        
        // 视频暂停时显示播放按钮
        video.addEventListener('pause', function() {
            if (video.currentTime > 0 && video.currentTime < video.duration) {
                // 如果视频未结束且暂停，显示播放按钮
                overlay.classList.remove('hidden');
            }
        });
        
        // 视频播放结束，显示重播按钮
        video.addEventListener('ended', function() {
            overlay.classList.remove('hidden');
            const playBtn = overlay.querySelector('.play-button-large svg');
            if (playBtn) {
                playBtn.innerHTML = '<path d="M12 5V1L7 6l5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z"/>';
            }
        });
    });

    // 为所有图片添加点击事件
    function addClickHandler(images) {
        images.forEach(function(img) {
            img.addEventListener('click', function() {
                modalImage.src = this.src;
                modalImage.alt = this.alt;
                modalOverlay.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        });
    }

    // 为主图和局部放大图都添加点击事件
    addClickHandler(galleryImages);
    addClickHandler(zoomImages);

    // 关闭模态框
    function closeModal() {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    // 点击关闭按钮
    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }

    // 点击模态框背景关闭
    if (modalOverlay) {
        modalOverlay.addEventListener('click', function(e) {
            if (e.target === modalOverlay) {
                closeModal();
            }
        });
    }

    // ESC键关闭模态框
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modalOverlay && modalOverlay.classList.contains('active')) {
            closeModal();
        }
    });
})();
