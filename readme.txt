Način pokretanja:
Najbolje je pokrenuti pomoću docker-compose-a, jer se tako pokreće i backend.
Naredbu koju treba pokrenuti je: `docker-compose up --build`
Nakon toga, aplikacija je dostupna na adresi: `http://localhost:3000/`

Ako nemate docker, možete pokrenuti i sa sljedećim naredbama:
- `cd backend`
- `pip install -r requirements.txt`
- `uvicorn main:app --reload`
- `cd ../`
- `npm install`
- `npm run dev`

URL u cloudu: https://web2-projekt6-9v7e.onrender.com

Implementirani zahtjevi:
- interpolation/one-way binding - Da - src/components/BookItem.vue (linija 4) - u obliku {{ book.title }}
- two-way binding - Da - src/views/HomePage.vue (linija 6) - searchQuery je dvosmjerno povezan s inputom
- methods - Da - skoro svaka komponenta ima neku metodu (npr. src/components/BookList.vue (linija 38))
- computed properties - Da - src/components/BookList.vue (linija 28) - computed property booksWithCartState je definiran kako bi nadogradio podatke o knjigama s podacima iz wishliste
- barem jedan scoped style - Da - src/views/CartView.vue (linija 13) - style je definiran samo za taj view
- koristiti barem jedan lifecycle hook - Da - src/views/HomePage.vue (linija 126 i 138) - beforeMount i unmounted
- routing (više stranica) - Da - u src/router/index.js su definirane sve rute i u src/App.vue je definiran RouterView
- aplikacija mora biti bookmarkable, tako da rade linkovi - Da - sve rute su bookmarkable te i search query parametar se može bookmarkati
- dinamičko usmjeravanje s 404 stranicom ("catch all") - Da - u src/router/index.js je definirana ruta za 404 stranicu
- (barem) dvije komponente
    - komponenta bez stanja, koristiti properties - Da - src/components/BookItem.vue (linija 46)
    - komponenta sa stanjem - Da - src/views/HomePage.vue (linija 76)
- barem jedna komponenta mora emitirati barem jedan event - Da - src/components/BookItem.vue (linija 49) - komponenta emitira event kada korisnik klikne na gumb za dodavanje u/micanje iz wishlistu
- store (Pinia) - Da - src/store/index.js i koristi se u src/views/CartView.vue (linija 31)
- asinkroni dohvat podataka s backenda - Da - src/views/HomePage.vue (linija 110 i 132) za dohvat recommendations i search, a backend je definiran u ./backend/main.py
