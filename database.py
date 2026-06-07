import sqlite3

conn = sqlite3.connect("notes.db", check_same_thread=False)
cursor = conn.cursor()

# create db
cursor.execute(""" CREATE TABLE IF NOT EXISTS notes(
               id INTEGER PRIMARY KEY AUTOINCREMENT,
               title TEXT,
               content TEXT)"""
            )
conn.commit()