Flask
$ pip install Flask flask-restful
$ py -3 -m venv venv
$ venv\Scripts\activate
$ flask --app hello run

Next js
$ npx create-next-app@latest
$ npm run dev

Frontend u Reactu, backend u Flasku, baza u Postgresu
Model sa proslog kolegija
Pokrenem server od Reacta na 3000, pokrenem server od Flaska na 5000, i Postgres na 3001
Zatim u browseru otvorim localhost:3000 gdje se dobije sucelje
Preko sucelja se uploada slika koja se onda salje Flasku koji preko modela izracuna vjerojatnosti,
te vrati rezultat na ekran i spremi ga u bazu
Preko drugog sucelja na frontendu se dode do tablice u kojoj su ispisani svi podaci iz baze.