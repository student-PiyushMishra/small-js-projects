window.addEventListener("DOMContentLoaded", () => {

    const nav_elems = document.querySelector(".nav-elems");
    const mobile_nav = document.querySelector(".mobile-nav");

    const checkScreenWidth = () => {
        if (window.innerWidth < 1000) {
            // Inject the menu icon
            nav_elems.innerHTML = `<i class="ri-menu-3-fill" style="color:#c0392b;font-size:1.2rem;font-weight:900;"></i>`;
            mobile_nav.style.display = 'flex';

        } else {
            // Restore original nav elements
            nav_elems.innerHTML = `
                    <a href="#" style="color:#c0392b;">Home</a>
                    <a href="#">About</a>
                    <a href="#">Services</a>
                    <a href="#">Contact</a>
                `;
        }
    };

    nav_elems.addEventListener("click", () => {
        if (nav_elems.innerHTML === `<i class="ri-menu-3-fill" style="color:#c0392b;font-size:1.2rem;font-weight:900;"></i>`) {
            mobile_nav.style.right = '0%';
        }
    })

    const cross = document.querySelector(".mobile-nav .cross");
    cross.addEventListener("click", function () {
        mobile_nav.style.right = "-100%";
    })
    checkScreenWidth();
    window.addEventListener("resize", checkScreenWidth);

    window.addEventListener('scroll', () => {
        const nav = document.querySelector("nav");
        const scrollTop = window.scrollY;
        if (scrollTop > 100) {
            nav.classList.add("nav-sticky");
        }
        else {
            nav.classList.remove("nav-sticky");
        }
    });
});