# Danubius Studio

Originalan, kompletan prezentacioni sajt digitalnog studija, inspirisan javno vidljivom strukturom i interakcijama sajta [Underpond](https://www.underpond.io/). Sopstveni identitet, tekstovi, ilustracije i kod. Radni naziv **Danubius** može se promeniti pre objave.

## Status

- Lokalna implementacija: 24 generisane HTML stranice.
- 12 autorskih, jasno označenih konceptualnih studija slučaja.
- GitHub i Netlify nisu povezani; javna objava čeka izričito odobrenje vlasnika.
- Kontakt forma lokalno samo proverava unos. Produkcijsko slanje zahteva Netlify Forms aktivaciju i završnu proveru.
- Poslovni podaci, stvarni portfolio, tim i kontakt vlasnika nisu dostavljeni. Sajt se zato predstavlja kao koncept studija.

## Pokretanje

Potreban je Node.js 22.12+ (provereno i na Node 24).

```sh
npm ci
npm run dev
```

Otvoriti adresu koju Vite ispiše, obično `http://127.0.0.1:5173`.

```sh
npm run build
npm test
npm run preview
```

`dist/` sadrži gotov statički sajt. Ne otvarati HTML dvoklikom preko `file://`; koristiti lokalni server da bi putanje ka resursima radile.

## Tehnologija

React 19, Vite 7, GSAP + ScrollTrigger, CSS i Canvas 2D za originalnu interaktivnu skulpturu. Nije potreban server aplikacije, baza ni plaćeni API. Izabran je statički React sa generisanjem HTML-a zato što su sadržaj i navigacija prezentacioni, a deployment na Netlify jednostavan i prenosiv.

Svaka ruta dobija zaseban HTML, naslov i opis. React zamenjuje statički prikaz interaktivnom verzijom kada se učita. Obične veze omogućavaju direktno otvaranje, istoriju pregledača i osnovno čitanje bez JavaScripta. Canvas skulptura i napredne interakcije zahtevaju JavaScript.

## Stranice

| Grupa                 | Rute                                                                                                                                                                                                                                                                             |
| --------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Glavne                | `/`, `/projects`, `/about`, `/services`                                                                                                                                                                                                                                          |
| Usluge                | `/branding`, `/development`, `/marketing`, `/legacy`                                                                                                                                                                                                                             |
| Kontakt i informacije | `/contact`, `/legal`, `/thank-you`, `/404`                                                                                                                                                                                                                                       |
| Studije slučaja       | `/projects/forma`, `/projects/otherday`, `/projects/velora`, `/projects/cove-residences`, `/projects/squeeze`, `/projects/fieldwork`, `/projects/common-ground`, `/projects/wayfarer`, `/projects/stillpoint`, `/projects/luma`, `/projects/relay`, `/projects/current-exchange` |

## Uređivanje

- `src/data.js`: sadržaj svih projekata i usluga, meta-opisi, lista ruta.
- `src/App.jsx`: stranice i kontakt forma.
- `src/components.jsx`: zajedničke komponente, skulptura, galerija, navigacija, animacije.
- `src/Experience.jsx`: prelazi, zvuk na zahtev, korisničko pauziranje animacija, kursor.
- `src/Studies.jsx`: trag ilustracija i pokretne studije dizajna.
- `src/styles.css`: tokeni, raspored, responzivni stilovi i vizuelni efekti.
- `scripts/prerender.mjs`: generisanje svih stranica, SEO i mapa sajta.
- `netlify.toml`: build, bezbednosna zaglavlja i keširanje.

Jezik sadržaja je engleski, kao na referenci. Dokumentacija je na srpskom. Identitet je autorski koncept, ne tvrdnja o postojećoj firmi ili registrovanom žigu.

## Dokumentacija

- [Analiza reference i obuhvat](docs/REFERENCE-AUDIT.md)
- [Dizajn i arhitektura](docs/ARCHITECTURE.md)
- [GitHub i Netlify objava](docs/DEPLOYMENT.md)
- [Provera i ograničenja](docs/QA.md)
- [Licence i autorski materijal](THIRD_PARTY_NOTICES.md)

## Pred objavu

Potvrditi ime projekta, GitHub vlasnika i vidljivost repozitorijuma, Netlify nalog i javnu objavu. Zatim podesiti `SITE_URL` na odobreni HTTPS domen. Ako se gradi kroz Netlify, skripta može koristiti Netlify `URL` promenljivu. Bez domena se namerno ne generišu izmišljene canonical adrese i sitemap.

Pre prihvatanja stvarnih upita dopuniti podatke operatera i privatnost; pravna stranica opisuje koncept, nije pravni obrazac za neidentifikovano preduzeće. Ovo ne sprečava objavu jasno označenog demonstracionog sajta sa isključenim prikupljanjem podataka.
