# Arhitektura

React, Vite i GSAP grade statički sajt. Skripta `scripts/prerender.mjs` generiše zaseban HTML za svaku srpsku i englesku rutu iz `src/site-data.js`. Pri učitavanju JavaScript zamenjuje statički prikaz interaktivnim React prikazom. Naslovi, opisi, putanje i oznake jezika postoje u HTML-u.

Sadržaj usluga i projekata nalazi se u `src/site-data.js`, dok su stranice i oba jezika u `src/App.jsx`. Animirana Canvas skulptura i ScrollTrigger nalaze se u `src/components.jsx`, a pauza, zvuk i prelazi u `src/Experience.jsx`. Korisnički podaci se ne prikupljaju.

`SITE_URL` omogućava generisanje mape sajta i canonical adresa. Pre javne objave potrebno je potvrditi Netlify hosting, ponovo proveriti prikaz i interakcije i dopuniti pravne podatke operatera kada budu dostupni.
