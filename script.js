(function () {
    var root = document.documentElement;
    try { var t = localStorage.getItem('pf-theme'); if (t) root.setAttribute('data-theme', t); } catch (e) { }

    document.addEventListener('DOMContentLoaded', function () {

        var tb = document.getElementById('theme');
        function icon() { tb.textContent = root.getAttribute('data-theme') === 'dark' ? '☀️' : '🌙'; }
        icon();
        tb.addEventListener('click', function () {
            var n = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
            root.setAttribute('data-theme', n);
            try { localStorage.setItem('pf-theme', n); } catch (e) { }
            icon();
        });

        var sb = document.getElementById('sidebar');
        document.getElementById('burger').addEventListener('click', function (e) { e.stopPropagation(); sb.classList.toggle('open'); });
        document.addEventListener('click', function (e) { if (!sb.contains(e.target)) sb.classList.remove('open'); });

        var io = new IntersectionObserver(function (entries) {
            entries.forEach(function (en) {
                if (!en.isIntersecting) return;
                var el = en.target;
                el.classList.add('show');
                var f = el.querySelector('.fill');
                if (f) f.style.width = f.dataset.w + '%';
                var c = el.querySelector('[data-count]');
                if (c) count(c);
                io.unobserve(el);
            });
        }, { threshold: .15 });
        document.querySelectorAll('.reveal').forEach(function (el, i) {
            el.style.transitionDelay = (i % 4) * 90 + 'ms';
            io.observe(el);
        });
        function count(el) {
            var to = +el.dataset.count, cur = 0, step = Math.max(1, Math.ceil(to / 30));
            var iv = setInterval(function () { cur = Math.min(to, cur + step); el.textContent = cur; if (cur >= to) clearInterval(iv); }, 35);
        }

        var typed = document.getElementById('typed');
        if (typed) {
            var words = ['Web Developer', 'C++ Programmer', 'Network Enthusiast', 'Layout Designer'];
            var w = 0, ch = 0, del = false;
            (function tick() {
                var word = words[w];
                typed.textContent = word.slice(0, ch);
                if (!del && ch === word.length) { del = true; return setTimeout(tick, 1400); }
                if (del && ch === 0) { del = false; w = (w + 1) % words.length; }
                ch += del ? -1 : 1;
                setTimeout(tick, del ? 45 : 90);
            })();
        }

        var form = document.getElementById('contact-form');
        if (form) form.addEventListener('submit', function (e) {
            e.preventDefault();
            document.getElementById('ok').style.display = 'block';
            form.reset();
        });
    });
})();