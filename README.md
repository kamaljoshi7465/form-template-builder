# 🧩 Form Template Builder

A drag-and-drop form template builder built with **React**, **Tailwind CSS**, and **@hello-pangea/dnd**. This app allows users to create customizable form templates with sections and fields, preview them in real-time, and generate forms from saved templates.

---

## 📌 Features

### 🔧 Template Builder
- Create up to **5 templates**.
- Each template consists of **multiple sections**, each with a title.
- Drag-and-drop to arrange **fields within sections** (no cross-section dragging).
- Add fields of the following types:
  - **Short Answer** (Text)
  - **Paragraph** (Textarea)
  - **Number**
  - **Dropdown** (Enum)
  - **Boolean** (Yes/No Checkbox)
- Basic validation for required fields and dropdown options.
- **Real-time preview** of field rendering.
- Persist data using **localStorage**.
- Only shows a **Done** button when the section is edited.

### 🧾 Form Renderer (Planned)
- Select a saved template.
- Dynamically render the form UI based on the selected template.
- Validate inputs on submission.
- Store submitted data to localStorage.

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/kamaljoshi7465/form-template-builder.git
cd form-template-builder
