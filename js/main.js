/**
 * DIGITAL PORTFOLIO JAVASCRIPT - BY NGUYEN QUANG THANG (K70 UET-VNU)
 * Functionality: Automatic Nav Link Active, Mobile Menu, Typing Effect, Back-to-Top
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Automatic Nav Link Active Highlight (Handles sub-pages like cns.html and bai1.html)
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link');
    
    let activeFound = false;
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        
        // Remove active class initially
        link.classList.remove('active');
        
        // Match path name
        if (currentPath.includes(href) && href !== 'index.html') {
            link.classList.add('active');
            activeFound = true;
        } else if (href === 'index.html' && (currentPath.endsWith('/') || currentPath.endsWith('/index.html') || currentPath === '')) {
            link.classList.add('active');
            activeFound = true;
        }
    });

    // Special match for sub-pages (cns.html, bai1.html, tong-ket.html) -> highlight "Hành trình học tập" (journey.html)
    if (currentPath.includes('cns.html') || currentPath.includes('bai') || currentPath.includes('tong-ket')) {
        navLinks.forEach(link => {
            if (link.getAttribute('href') === 'journey.html') {
                link.classList.add('active');
                activeFound = true;
            } else {
                link.classList.remove('active');
            }
        });
    }

    // Fallback if no match is found (e.g., local file open direct double-click)
    if (!activeFound) {
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            // If the local file name is part of the URL (e.g. file:///.../about.html)
            if (window.location.href.includes(href)) {
                link.classList.add('active');
                activeFound = true;
            }
        });

        // Special match for local files direct open sub-pages (cns.html, bai1.html, tong-ket.html)
        if (window.location.href.includes('cns.html') || window.location.href.includes('bai') || window.location.href.includes('tong-ket')) {
            navLinks.forEach(link => {
                if (link.getAttribute('href') === 'journey.html') {
                    link.classList.add('active');
                } else {
                    link.classList.remove('active');
                }
            });
        }
    }
    
    // Default fallback to index.html if still not resolved
    if (!activeFound && navLinks.length > 0 && !window.location.href.includes('cns.html') && !window.location.href.includes('bai')) {
        navLinks[0].classList.add('active');
    }

    // 2. Mobile Menu Toggle
    const navToggle = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            // Toggle hamburger animation
            const spans = navToggle.querySelectorAll('span');
            spans[0].style.transform = navMenu.classList.contains('active') ? 'rotate(45deg) translate(6px, 6px)' : 'none';
            spans[1].style.opacity = navMenu.classList.contains('active') ? '0' : '1';
            spans[2].style.transform = navMenu.classList.contains('active') ? 'rotate(-45deg) translate(6px, -6px)' : 'none';
        });

        // Close menu when a link is clicked
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                const spans = navToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            });
        });
    }

    // 3. Typing Effect (for Hero subtitle / description typing simulation on index.html)
    const typeElement = document.querySelector('.typing-effect');
    if (typeElement) {
        const text = typeElement.getAttribute('data-text') || "";
        let index = 0;
        
        function type() {
            if (index < text.length) {
                typeElement.textContent += text.charAt(index);
                index++;
                setTimeout(type, 30);
            }
        }
        // Start typing
        typeElement.textContent = "";
        setTimeout(type, 800);
    }

    // 4. Back to Top Button
    const backToTopBtn = document.querySelector('.back-to-top');

    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // 5. Contact Form Submit Mock (for contact.html)
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Show custom alert styling or message
            const name = document.getElementById('formName').value;
            alert(`Cảm ơn ${name}! Tin nhắn của bạn đã được giả lập gửi thành công (Mock Submit).`);
            contactForm.reset();
        });
    }

    // 6. 3D Tilt Effect for Avatar Card (about.html)
    const avatarWrapper = document.querySelector('.avatar-wrapper');
    if (avatarWrapper) {
        // Dynamically create glare element
        const glare = document.createElement('div');
        glare.className = 'glare-effect';
        avatarWrapper.appendChild(glare);
        
        avatarWrapper.addEventListener('mousemove', (e) => {
            const rect = avatarWrapper.getBoundingClientRect();
            const x = e.clientX - rect.left; // x position within element
            const y = e.clientY - rect.top;  // y position within element
            
            // Normalize coordinates from -0.5 to 0.5
            const normalizeX = (x / rect.width) - 0.5;
            const normalizeY = (y / rect.height) - 0.5;
            
            // Calculate rotation (max 15 degrees)
            const rotateX = -normalizeY * 15;
            const rotateY = normalizeX * 15;
            
            avatarWrapper.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            
            // Glare overlay position
            const glareX = (x / rect.width) * 100;
            const glareY = (y / rect.height) * 100;
            glare.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(0, 242, 254, 0.15) 0%, transparent 60%)`;
        });
        
        avatarWrapper.addEventListener('mouseleave', () => {
            // Smoothly reset
            avatarWrapper.style.transition = 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)';
            avatarWrapper.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
            glare.style.background = 'transparent';
        });
        
        avatarWrapper.addEventListener('mouseenter', () => {
            // Faster transition on enter to avoid laggy feeling
            avatarWrapper.style.transition = 'transform 0.1s ease';
        });
    }
});

// Hàm mở Modal có animation phóng to từ điểm click và định vị động
window.openPdfAnimated = function(event, pdfUrl) {
    const modal = document.getElementById("pdfModal");
    const content = document.getElementById("modalContent");
    const iframe = document.getElementById("pdfViewer");

    if (modal && content && iframe) {
        // 1. Gán link PDF
        iframe.src = pdfUrl;

        // 2. Tính toán tọa độ tuyệt đối (tính đến cuộn trang)
        // event.pageX và event.pageY là tọa độ chuột so với tài liệu
        const clickX = event.pageX;
        const clickY = event.pageY;

        // 3. Đặt vị trí động cho Modal content về điểm click
        // CSS .modal-content transform: translate(-50%, -50%) kết hợp với position: absolute sẽ đảm bảo nó nằm giữa điểm click
        content.style.left = `${clickX}px`;
        content.style.top = `${clickY}px`;
        
        // Đặt transform-origin về center để modal mở ra từ điểm giữa
        content.style.transformOrigin = 'center';

        // 4. Hiển thị khối modal (flex) nhưng chưa active animation
        modal.style.display = "flex";

        // 5. Thêm class open để kích hoạt animation
        // Timeout để đảm bảo animation chạy mượt mà
        setTimeout(() => {
            modal.classList.add("open");
        }, 10); 
    }
};

// Hàm đóng Modal có animation thu nhỏ về
window.closePdfAnimated = function() {
    const modal = document.getElementById("pdfModal");
    const iframe = document.getElementById("pdfViewer");
    const content = document.getElementById("modalContent");
    
    if (modal && iframe && content) {
        // 1. Gỡ class open để kích hoạt animation thu nhỏ và mờ dần
        modal.classList.remove("open");

        // 2. Chờ animation chạy xong (0.4s = 400ms) rồi mới ẩn hoàn toàn display và reset
        setTimeout(() => {
            modal.style.display = "none";
            iframe.src = ""; // Reset iframe
            // Reset vị trí modal content để tránh lỗi hiển thị lần sau
            content.style.left = 'unset';
            content.style.top = 'unset';
        }, 400); 
    }
};

// Bấm ra ngoài khoảng trống (vùng nền đen) để đóng
window.onclick = function(event) {
    const modal = document.getElementById("pdfModal");
    if (event.target === modal) {
        window.closePdfAnimated();
    }
};

