# nweb-projekt6

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