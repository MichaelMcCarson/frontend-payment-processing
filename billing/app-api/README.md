# @demo/billing-app-api

API for the billing section for the frontend application

This library provides an exit point for the inner workings of the swimlane and prevents unintended exporting of internal moving parts. This way you have a "port" or entry point into the system. 

The problem you run into with importing individual libraries is that not every exported function or entity is intended to be used externally, and is only intended to be used, for example, in the application layer (when exported from say the domain layer). 
