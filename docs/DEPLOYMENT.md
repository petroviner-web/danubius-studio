# GitHub i Netlify: pripremljen postupak

## Granica autorizacije

Korisnik je izričito tražio odobrenje pre povezivanja naloga ili javne objave. Lokalni kod, build, testovi i konfiguracija pripremljeni su bez tih povezivanja. Nisu kreirani udaljeni repo, Netlify projekat, token niti javni URL.

Predlog za odobrenje:

- naziv: `danubius-studio` (radni predlog);
- GitHub: novi **privatni** repo na nalogu ili organizaciji koju korisnik izabere;
- Netlify: besplatni plan, bez plaćenih dodataka;
- poddomen: `danubius-studio.netlify.app`, samo ako je slobodan; drugi naziv zahteva korisnikov izbor;
- javno objavljivanje konceptualnog sajta i povezivanje Netlify projekta sa tim repozitorijumom.

Dostupnost naziva i ograničenja naloga proveravaju se prilikom odobrenog deploymenta. Ne obećavati rezervaciju imena ili besplatan neograničeni saobraćaj.

## Koraci posle odobrenja

1. Korisnik se prijavljuje u GitHub/Netlify ako nije već prijavljen. Lozinke, tokene i kodove ne unositi u chat ili repozitorijum.
2. Kreirati odobreni privatni GitHub repo i push-ovati lokalnu granu. Odabrati produkcijsku granu u Netlify-u.
3. Importovati repo u Netlify. Odobriti aplikaciji pristup samo tom repozitorijumu kad interfejs to omogućava.
4. Build command: `npm run build`; publish: `dist`; Node: `22` (konfiguracija već u `netlify.toml`).
5. Postaviti odobreni site name i `SITE_URL` na konačni HTTPS origin bez završne kose crte.
6. Ako se kontakt koristi za stvarne upite, prvo dopuniti operatera i kontakt privatnosti, aktivirati Netlify Forms detection i podesiti vlasnikove notifikacije. U suprotnom objaviti demonstracionu formu bez slanja.
7. Pokrenuti deployment i sačekati terminalni uspeh.
8. Proveriti naslovnu, svih 12 dubokih ruta, usluge, kontakt, sitemap, robots, 404 status, mobilni prikaz i CSP.
9. Poslati odobren test upit i proveriti prijem u Netlify Forms; ne tvrditi da email stiže dok nije potvrđeno.
10. Korisniku vratiti tačan GitHub URL, javni Netlify URL, commit SHA i datum objave.

## Komande za postojeći lokalni repo

Tek nakon odobrenja i potvrde naloga, naziva i vidljivosti:

```sh
gh repo create OWNER/danubius-studio --private --source=. --remote=origin --push
```

Netlify Git import omogućava buduće automatske buildove iz odabrane grane. Ne povezivati novi remote pre odobrenja. Tokeni nisu deo komandi ili dokumentacije.

## Praktične napomene

- `dist/` je build artefakt, nije izvor koji se ručno održava.
- `SITE_URL` menja canonical i sitemap; naziv brenda se uređuje u sadržaju.
- Uključeni su `404.html` i bezbednosna zaglavlja, bez catch-all SPA prepisivanja.
- Open Graph SVG radi kao lokalni grafički asset, ali neke društvene mreže zahtevaju PNG/JPEG. Za pouzdan share-preview izvesti odobrenu naslovnu grafiku u PNG i promeniti meta-putanju.
- Vraćanje prethodnog deploymenta radi se preko istorije Netlify deployeva. Ne brisati repo ili projekat radi rollbacka.

Zvanična dokumentacija: [Vite static deploy](https://vite.dev/guide/static-deploy.html), [Netlify Forms](https://docs.netlify.com/manage/forms/setup/).
