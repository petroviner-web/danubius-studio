# Dizajn i arhitektura

## Identitet

Danubius povezuje promenu i jasno oblikovanje ideje. Paleta: šumskozelena `#172c25`, papir `#f4f3eb`, limeta `#d7ed87`. Sekundarne boje pripadaju konceptima, a ne interfejsu. Manrope nosi naslove i tekst; DM Mono služi za metapodatke; sistemski Georgia italic daje urednički kontrast. Fontovi se isporučuju lokalno.

Vizuali su CSS/SVG/Canvas konstrukcije: arhitektonske mase, orbite, putanje, citrus i modularna mreža. Nema udaljenih slika, tracking pixela ili plaćenih asset servisa. Koncepti imaju sopstvenu paletu, naziv, narativ i varijacije prikaza.

## Renderovanje

Vite gradi bundle. Node skripta učitava React App kroz Vite SSR i poziva `renderToString` za svaku rutu iz `data.js`. Rezultat je direktorijum po ruti, plus pravi `404.html`. Browser nakon učitavanja zamenjuje statički HTML interaktivnim React prikazom. Nema SPA rewrite pravila koje bi nepostojeće stranice predstavljalo kao HTTP 200.

Interne veze koriste normalnu navigaciju. Animirana zavesa kratko odlaže klik samo kada su animacije omogućene. Ctrl/Cmd klik, novi tabovi, hash veze i spoljne adrese zadržavaju standardno ponašanje. `pageshow` uklanja zavesu pri povratku iz istorije.

## Animacije i dostupnost

GSAP matchMedia aktivira skrol efekte samo bez `prefers-reduced-motion`. Cleanup uklanja aktivne animacije i event listenere. Skulptura ograničava gustinu piksela, prati vidljivost i ne crta kada je dokument skriven. Ne koristi WebGL, pa nema zahtev za specifičnom GPU podrškom.

Native dialog daje fokus-trap, Escape i inertnu pozadinu. Forma ima vidljive labele, HTML validaciju, status slanja, poruku o grešci i honeypot. Galerije imaju dugmad i tastaturu, a skrol sadržaj ostaje u prirodnom redosledu DOM-a. Dodati su skip link, fokus prstenovi i preference za pauzu i zvuk. Zvuk je inicijalno isključen i nema automatskog audio playbacka.

## Sadržaj i bezbednost

Forma u lokalnom pregledu ne šalje podatke. Produkcija POST-uje URL-encoded podatke na isti origin za Netlify Forms. Netlify detektuje prerenderovani obrazac; form detection treba aktivirati u nalogu pre objave. Aktivacija i realno slanje ostaju deployment provera, ne lokalno dokazana funkcija.

CSP ograničava resurse na isti origin, uz data URI slike i inline stilove potrebne za React/GSAP. Nema tajni u klijentskom kodu. `.env`, `.netlify` i zavisnosti isključeni su iz Git-a. Pravna stranica mora dobiti stvarni identitet operatera pre komercijalnog korišćenja.

## Proširenje

Za novi projekat dodati zapis u `projects`; rute i prerender lista nastaju automatski. Za stvarne fotografije zameniti `ProjectArt` lokalnim optimizovanim AVIF/WebP resursima uz dimenzije i alternativni tekst. Za CMS može se zameniti samo sloj podataka pri buildu. Za integraciju kalendara dodati potvrđen URL vlasnika, ne Underpondov kontakt.
