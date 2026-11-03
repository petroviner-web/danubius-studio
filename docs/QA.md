# Provera

Provereno lokalno: produkcijski build generiše 24 stranice; automatizovani testovi proveravaju sadržaj, putanje, detekciju forme, 404 i odsustvo preuzetih pratećih skripti reference. U pregledaču su provereni desktop i mobilni prikaz, meni, promena projekta, filter, FAQ, galerija i validacija kontakt forme bez slanja. Uočen problem pri hidrataciji uklonjen je zamenom statičkog prikaza interaktivnim React prikazom po učitavanju.

Pre objave potrebna je provera na stvarnom Netlify deploymentu: HTTP 404, domen i SEO, isporuka sadržaja, mobilni uređaji, CSP, prijem obrasca i obaveštenja. Mapa sajta i canonical adrese se generišu tek kada je poznat HTTPS domen. Slanje obrasca i postojanje slobodnog imena poddomena nisu lokalno potvrđeni.
