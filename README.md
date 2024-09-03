# React Library

This is an abstracted frontend library belonging to a larger monorepo, abstracted to a generic library from its original context, and provides a general system design prototype (this isn't supposed to display fully functional code because there are important parts that have intentionally been omitted).

This library is intented to display a few things:

1. System Design.
2. Domain Driven Design style micro-libraries with your standard onion architecture.
3. How to scaffold out an NX-style library without NX.
4. Micro-frontend patterns with a "light app, heavy lib" design pattern: inspired by https://www.angulararchitects.io/en/ebooks/micro-frontends-and-moduliths-with-angular/.
5. How to create React components and moving parts that are small and "clean".
6. How to create what I call "legos".
7. How to break libraries into moving domains such as shell, feature, util, shared, ui, data-access, domain, and application.
8. How to break libraries into swimlanes (swimlanes are import areas and sections of an application).
9. This system design and the parent folder would also contain the micro-libraries for the backend (currently it only shows the frontend); frontends are prefixed with app and backend with api; this results in grouping folders within the parent folder so app and api are grouped together.

