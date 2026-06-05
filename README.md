# Smart Notes API
Smart Notes API is a FastAPI-based backend application that allows users to create, update, delete, and search notes through RESTful APIs. It demonstrates clean API design, structured code organization, and efficient handling of request-response workflows.
## Project Structure

### Why split into 3 modules?

Instead of writing everything in a single file, I divided the project into smaller modules to keep the code clean and easier to understand.

This helps in:
- Keeping code organized
- Making it easier to read and update
- Following how real backend projects are structured

---

### File Overview

**main.py**  
This is the entry point of the application. It creates the FastAPI app and connects all the routes.

**router.py**  
This file contains all the API endpoints (CRUD operations and search). It handles incoming requests and returns responses.

**model.py**  
This file defines the data structure using Pydantic. It ensures that the input data follows the required format.
