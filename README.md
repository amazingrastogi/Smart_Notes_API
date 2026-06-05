# Smart Notes API
Smart Notes API is a FastAPI-based backend application that allows users to create, update, delete, and search notes through RESTful APIs. It demonstrates clean API design, structured code organization, and efficient handling of request-response workflows.
# Project Structure
Why 3 modules?
Instead of writing everything in one file, the project is divided into smaller modules to keep the code clean and easier to manage.
Even though this is a beginner project, this structure helps in:

Keeping code organized
Making it easier to read and update
Following how real backend projects are structured


# File Overview
main.py
This is the entry point of the application. It creates the FastAPI app and connects all the routes.

router.py
This file contains all the API endpoints (CRUD operations and search). It handles how requests are processed and how responses are returned.

model.py
This file defines the structure of the data using Pydantic. It ensures that the input data (like notes) follows the required format.
