document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('storyModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');
    const closeBtn = document.querySelector('.close-btn');
    const hiddenStoryField = document.getElementById('hiddenStoryField');
    const commentBox = document.getElementById('commentBox');
    
    const galleryCards = document.querySelectorAll('.gallery-card');
    const presetButtons = document.querySelectorAll('.preset-btn');

    // 1. Kufungua Modal na Kuweka Data za Story
    galleryCards.forEach(card => {
        card.addEventListener('click', (event) => {
            if (event.target.closest('.like-btn')) return;

            const title = card.getAttribute('data-title');
            const story = card.getAttribute('data-story');
            
            modalTitle.innerText = title;
            modalBody.innerText = story;
            hiddenStoryField.value = title;
            
            modal.style.display = 'flex';

            // GOOGLE ANALYTICS: Inarekodi kuwa mtu amefungua story gani
            if (typeof gtag === 'function') {
                gtag('event', 'view_story', {
                    'story_title': title
                });
            }
        });
    });

    // 2. Mfumo wa Like (Kadi)
    const likeButtons = document.querySelectorAll('.like-btn');
    likeButtons.forEach(btn => {
        btn.addEventListener('click', (event) => {
            event.stopPropagation(); 
            
            const card = btn.closest('.gallery-card');
            const title = card.getAttribute('data-title');
            const countSpan = btn.querySelector('.like-count');
            let currentLikes = parseInt(countSpan.innerText);
            
            if (btn.classList.contains('liked')) {
                btn.classList.remove('liked');
                countSpan.innerText = currentLikes - 1;
            } else {
                btn.classList.add('liked');
                countSpan.innerText = currentLikes + 1;

                // GOOGLE ANALYTICS: Inarekodi kuwa mtu amelike picha gani
                if (typeof gtag === 'function') {
                    gtag('event', 'like_artwork', {
                        'artwork_title': title
                    });
                }
            }
        });
    });

    // 3. Vitufe vya Haraka (Quick Feedback) kuandika kwenye fomu
    presetButtons.forEach(button => {
        button.addEventListener('click', () => {
            commentBox.value = button.innerText;

            // GOOGLE ANALYTICS: Inarekodi kuwa wametumia kitufe gani cha automatic
            if (typeof gtag === 'function') {
                gtag('event', 'click_preset_feedback', {
                    'feedback_text': button.innerText
                });
            }
        });
    });

    // 4. Kufunga Modal
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
});


