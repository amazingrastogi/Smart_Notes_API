from fastapi import HTTPException, APIRouter
from model import Note

router = APIRouter()

notes = []

#homepage
@router.get("/")
def home():
    return {"Message": "Welcome Overlord"}

@router.post("/notes")
def add_note(note: Note):
    notes.append(note)
    return {"Message": "Note added"}

@router.get("/notes")
def print_note():
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
def delete_note(note_id:int):
     if note_id < 0 or note_id >= len(notes):
        raise HTTPException(status_code= 404, detail="Invalid Operation")
     notes.pop(note_id)
     return {"Message": "Note deleted"}

@router.get("/search")
def search(keyword: str):
    return [
            note for note in notes 
            if keyword.lower() in note.title.lower()
            or keyword.lower() in note.content.lower()
        ]
