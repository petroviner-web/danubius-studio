# Analiza javne reference

Pregled: 3. novembar 2026. Izvori: [početna](https://www.underpond.io/), [mapa sajta](https://www.underpond.io/sitemap.xml), javni HTML svih 21 ruta, prikaz početne, menija i portfolija u pregledaču. Nije bilo prijavljivanja ni pristupa privatnim podacima. Stara verzija `/projects` u web pretrazi nije korišćena kao aktuelna: provereni su živi HTML i pregledač.

Javna mapa sadrži početnu, about, services, projects, četiri detaljne usluge, legal i 12 CMS studija. Svaka ima pandan u novom sajtu; dodati su lokalni kontakt, potvrda poruke i 404.

## Mapiranje studija

| Referentna ruta                 | Originalna konceptualna studija |
| ------------------------------- | ------------------------------- |
| `/projects/j3-architecture`     | `/projects/forma`               |
| `/projects/roya`                | `/projects/otherday`            |
| `/projects/lugtranz`            | `/projects/velora`              |
| `/projects/cardak-residences`   | `/projects/cove-residences`     |
| `/projects/fructal`             | `/projects/squeeze`             |
| `/projects/gier-construct`      | `/projects/fieldwork`           |
| `/projects/good-energy`         | `/projects/common-ground`       |
| `/projects/takween-aldar`       | `/projects/wayfarer`            |
| `/projects/reeland-investments` | `/projects/stillpoint`          |
| `/projects/triton`              | `/projects/luma`                |
| `/projects/unival-logistics`    | `/projects/relay`               |
| `/projects/us-first-exchange`   | `/projects/current-exchange`    |

Mapiranje je obuhvat broja i tipa stranica, ne tvrdnja da koncepti predstavljaju te klijente. Sadržaj svake studije je originalan i ima zaseban izazov, centralnu ideju, iskustvo i isporuke.

## Efekti: zapažanje i implementacija

| Javni signal reference                                   | Danubius implementacija                                                                                |
| -------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| Veliki uvodni natpis i interaktivna Unicorn Studio scena | Originalna Canvas skulptura, reakcija na pokazivač, velika tipografija, GSAP uvod                      |
| Full-screen navigacija                                   | Animirani native dialog sa fokusom, Escape i povratkom fokusa                                          |
| Page-transition atributi                                 | Kratka autorska zavesa pri internom prelazu; normalna navigacija bez JS                                |
| Spotlight tekst i skrol                                  | ScrollTrigger postepeno isticanje reči i otkrivanje sekcija                                            |
| Sticky prikaz odabranih projekata                        | Tri velika složena sticky panela, paralaksa slike, zasebni linkovi                                     |
| Portfolio preko ekrana sa 12 projekata i strelicama      | Karusel sa strelicama, tastaturom, prevlačenjem i brojačem; dodatni filtrirani indeks                  |
| Usluge i sticky paneli                                   | Četiri složena panela na desktopu, stabilan vertikalni sadržaj na mobilnom                             |
| O kulturi, image-trail atributi i tim                    | Autorski kolaž, reakcija na pokazivač, trag autorskih pločica, horizontalna galerija disciplina        |
| Testimonials karusel                                     | Pet autorskih principa sa istim tipom kontrola; bez izmišljenih klijentskih izjava                     |
| Detaljne usluge, problemi, rezultati i proces            | Zaseban uvod, izazov, pristup, isporuke, četiri koraka, povezana studija i FAQ                         |
| Studije slučaja, veliki mediji i naredni projekat        | 12 priča sa velikim autorskim vizualima, galerijom/lightboxom, pokretnom studijom i sledećim projektom |
| Video-reveal i lazy-player atributi                      | Originalne proceduralne pokretne studije sa Play/Pause. Tuđi video fajlovi se ne preuzimaju            |
| Hover sound atributi                                     | Tih sintetički zvuk samo nakon eksplicitnog uključivanja posetioca                                     |
| Grain, kursor, CTA marquee, footer-wave                  | Lokalna tekstura, kontekstualni kursor, pokretni CTA, blaga deformacija završnog natpisa               |
| Vreme i povratak na vrh                                  | Sat za Europe/Belgrade i nativni anchor                                                                |

## Granice reverznog inženjeringa

Ovo je originalna interpretacija posmatranih obrazaca, ne identična kopija svakog shader-a, tajminga, inercije ili sekvence. Javni HTML potvrđuje upotrebu GSAP, ScrollTrigger, SplitText, Observer, Draggable, InertiaPlugin, Lenis, HLS i Unicorn Studio. Spoljna Slater skripta nije preuzeta zbog greške verifikacije sertifikata; zaštita nije zaobiđena. Zato se njen tačan algoritam ne tvrdi kao potvrđen.

Specifične razlike: nema kopije Unicorn scene, nema automatskog prelaska u narednu studiju pri kraju skrola, nema HLS klijentskih videa, reference na stvaran tim su zamenjene disciplinama, a horizontalno pinovan proces zamenjen preglednom mrežom koraka. Efekti su pojednostavljeni na telefonu i pri smanjenom kretanju. Ovo je dokumentovan obuhvat, a ne tvrdnja o potpunoj piksel-po-piksel ili efekt-po-efekt identičnosti.

Nijedan izvorni HTML, CSS, JS, logo, fotografija, izjava ili sertifikat Underponda nije uključen u isporučenu aplikaciju. Sirovi materijal istraživanja ostaje van repozitorijuma, u radnom direktorijumu.
