from fastapi import HTTPException, APIRouter
from database import conn, cursor
from model import Note

router = APIRouter()

notes = []

#homepage
@router.get("/")
def home():
    return {"Message": "Welcome Overlord"}

@router.post("/notes")
def add_note(note: Note):
    cursor.execute("INSERT INTO notes (title, content) VALUES (?,?)", (note.title, note.content))
    conn.commit()
    return

@router.get("/notes")
def print_note():
    cursor.execute("SELECT * FROM notes")
    rows = cursor.fetchall()
    notes = []
    for i in rows:
        notes.append(
            {
                "id": i[0],
                "title": i[1],
                "content": i[2]
            }
        )
    print(rows)
    return notes

@router.get("/notes/{note_id}")
def get_note(note_id: int):
    if note_id < 0 or note_id >= len(notes):
        raise HTTPException(status_code= 404, detail="Invalid Operation")
    return notes[note_id]

@router.put("/notes/{note_id}")
def update_note(note_id: int, note: Note):
    if note_id < 0 or note_id >= len(notes):
        raise HTTPException(status_code= 404, detail="Invalid Operation")
    notes[note_id] = note
    return {"Message": "Note updated"}



@router.delete("/notes/{note_id}")
def delete_note(note_id: int):
    cursor.execute("DELETE FROM notes WHERE id = ?", (note_id,))
    conn.commit()

    return {"message": "Note deleted"}



@router.get("/search")
def search(keyword: str):
    return [
            note for note in notes 
            if keyword.lower() in note.title.lower()
            or keyword.lower() in note.content.lower()
        ]
