from pydantic import BaseModel
from datetime import datetime

class Note(BaseModel):
    title: str
    content: str
    created_at: datetime = datetime.utcnow()

