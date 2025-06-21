# 🧠 Supabase Database Schema Documentation

This schema supports a platform for user authentication, profile management, idea submission and validation, mentor feedback, and file storage.

---



## 📋 Table: `users` (Supabase Auth-Managed)

| Column       | Type     | Constraints              |
|--------------|----------|--------------------------|
| id           | uuid     | Primary key              |
| full_name    | text     | Required                 |
| role         | text     | ('User', 'Admin')        |
| created_at   | timestamp| Default: `now()`         |
| last_login   | timestamp| Updated on login         |
| language     | text     | e.g., "en", "hi", "fr"   |

Used for authentication and base identity. Supabase manages this table via the auth system.

---

## 🧑 Table: `profile`

| Column   | Type  | Constraints              |
|----------|-------|--------------------------|
| id       | uuid  | PK, FK → users.id        |
| initials | text  | Required                 |
| online   | bool  | Default: `false`         |

Stores user profile card data (initials, online status) shown in UI.

---

## 📊 Table: `activity`

| Column          | Type      | Constraints           |
|------------------|-----------|------------------------|
| id               | uuid      | PK, FK → users.id      |
| submissions      | int4      | Default: 0             |
| last_login       | timestamp | Auto updated           |
| account_created  | timestamp | Default: `now()`       |

Tracks activity metrics (e.g., number of submissions, login info).

---

## 📂 Table: `files`

| Column     | Type      | Constraints              |
|------------|-----------|--------------------------|
| id         | uuid      | Primary key              |
| user_id    | uuid      | FK → users.id            |
| name       | text      | File name                |
| size       | text      | e.g., "2 MB"             |
| file_url   | text      | Supabase storage path    |
| uploaded_at| timestamp | Default: `now()`         |

Tracks uploaded files associated with users.

---

## 💡 Table: `ideas`

| Column       | Type      | Constraints              |
|--------------|-----------|--------------------------|
| id           | uuid      | Primary key              |
| user_id      | uuid      | FK → users.id            |
| title        | text      | Required                 |
| description  | text      | Optional long text       |
| file_url     | text      | Optional file path       |
| notion_link  | text      | Optional Notion link     |
| status       | text      | e.g., 'submitted', etc.  |
| submitted_at | timestamp | Default: `now()`         |

Core table for startup ideas submitted by users.

---

## 📈 Table: `reports`

| Column         | Type      | Constraints            |
|----------------|-----------|------------------------|
| id             | uuid      | Primary key            |
| idea_id        | uuid      | FK → ideas.id          |
| tam            | numeric   | Market size - TAM      |
| sam            | numeric   | Market size - SAM      |
| som            | numeric   | Market size - SOM      |
| scorecard      | jsonb     | Computed metrics       |
| roadmap        | text      | MVP roadmap            |
| gtm_strategy   | text      | Go-to-market strategy  |
| pitch_deck_url | text      | URL to uploaded deck   |
| created_at     | timestamp | Default: `now()`       |

Detailed validation reports for each submitted idea.

---

## 📬 Table: `submissions`

| Column        | Type      | Constraints             |
|---------------|-----------|-------------------------|
| id            | uuid      | Primary key             |
| user_id       | uuid      | FK → users.id           |
| idea_id       | uuid      | FK → ideas.id           |
| type          | text      | e.g., 'pitch', 'doc'    |
| submitted_at  | timestamp | Default: `now()`        |

Tracks files, types, or data submissions per user per idea.

---

## 🧑‍🏫 Table: `mentor_feedback`

| Column     | Type      | Constraints              |
|------------|-----------|--------------------------|
| id         | uuid      | Primary key              |
| mentor_id  | uuid      | FK → users.id            |
| idea_id    | uuid      | FK → ideas.id            |
| feedback   | text      | Required                 |
| score      | text      | e.g., A+, Good, 9/10     |
| created_at | timestamp | Default: `now()`         |

Mentors give feedback and scoring for submitted ideas.

---

## ⚙️ Table: `settings`

| Column       | Type    | Constraints              |
|--------------|---------|--------------------------|
| user_id      | uuid    | PK, FK → users.id        |
| notifications| boolean | Default: `true`          |
| theme        | text    | e.g., 'light', 'dark'    |

User settings like theme and notifications.

---

## 🔐 Primary Keys

All primary keys are UUIDs for global uniqueness:

- `id` in most tables.
- `user_id` in `settings` acts as both PK and FK.

## 🔗 Foreign Keys

| Table            | Column        | References       |
|------------------|---------------|------------------|
| profile          | id            | users(id)        |
| activity         | id            | users(id)        |
| files            | user_id       | users(id)        |
| ideas            | user_id       | users(id)        |
| reports          | idea_id       | ideas(id)        |
| mentor_feedback  | mentor_id     | users(id)        |
| mentor_feedback  | idea_id       | ideas(id)        |
| submissions      | user_id       | users(id)        |
| submissions      | idea_id       | ideas(id)        |
| settings         | user_id       | users(id)        |

## 🔗 Table Relationships

```
users.id           --> profile.id
users.id           --> activity.id
users.id           --> files.user_id
users.id           --> ideas.user_id
users.id           --> settings.user_id
users.id           --> mentor_feedback.mentor_id
users.id           --> submissions.user_id

ideas.id           --> reports.idea_id
ideas.id           --> submissions.idea_id
ideas.id           --> mentor_feedback.idea_id
```

---

## ✅ Constraints & Notes

- All UUIDs are auto-generated using `uuid_generate_v4()`.
- Timestamps use `now()` as default for tracking creation.
- `users` is managed by Supabase Auth, but additional tables expand the user metadata.
- Foreign keys are **cascaded** for deletion prevention where necessary.

---

## ✅ Notes

- All timestamps default to `now()` unless specified.
- Some fields (like `file_url`, `notion_link`) are nullable.
- Use Supabase Row-Level Security (RLS) to protect sensitive tables.

## 📌 Summary

This schema is optimized for:
- Authenticated user interactions
- Startup idea submissions
- Mentor feedback loop
- File and profile management
- Rich reporting and scoring

> Consider using Supabase Row Level Security (RLS) for access control.
